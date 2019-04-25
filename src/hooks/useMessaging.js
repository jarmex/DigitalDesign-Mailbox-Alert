import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { firebaseService } from '../services/firebase';

const updateToken = async (fcmToken) => {
  if (fcmToken) {
    try {
      const phonetype = Platform.OS;
      await firebaseService.saveUserToken(phonetype, fcmToken);
      await AsyncStorage.setItem('fcmToken', fcmToken);
    } catch {
      //
    }
  }
};

const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    await updateToken(fcmToken);
  }
  return fcmToken;
};

const useMessaging = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const checkPermission = async () => {
      // initiallize (similar to component did mount)
      const enabled = await firebase.messaging().hasPermission();
      if (enabled) {
        // has permission. store the token for fast retrieval
        const tk = await getToken();
        setToken(tk);
      } else {
        try {
          await firebase.messaging().requestPermission();
          const tk = await getToken();
          setToken(tk);
        } catch (error) {
          console.log('permission rejected'); // eslint-disable-line
        }
      }
    };
    checkPermission();
    const onTokenRefreshListener = firebase.messaging().onTokenRefresh((fcmToken) => {
      // Process your token as required
      updateToken(fcmToken);
    });
    return () => {
      onTokenRefreshListener();
    };
  }, []);

  const [notify, setNotification] = useState(null);

  useEffect(() => {
    const checkBkNotications = async () => {
      /*
       * If your app is closed, you can check if it was opened by
       * a notification being clicked / tapped / opened as follows:
       * */
      const notificationOpen = await firebase.notifications().getInitialNotification();
      if (notificationOpen) {
        setNotification(notificationOpen.notification);
      }
    };
    /*
     * Triggered when a particular notification has been received in foreground
     * In this situation, it is up to you to decide if the notification should be shown.
     * */

    const notificationListener = firebase.notifications().onNotification((notification) => {
      // const { title, body } = notification;
      // setNotification(notification);
      // Presents the notification
      const localNotifiation = new firebase.notifications.Notification()
        .setNotificationId(notification.notificationId)
        .setTitle(notification.title)
        .setSubtitle(notification.subtitle)
        .setBody(notification.body)
        .setData(notification.data)
        .ios.setBadge(notification.ios.badge);

      firebase
        .notifications()
        .displayNotification(localNotifiation)
        .catch((err) => console.error(err));
    });

    /*
     * If your app is in background, you can listen for when a notification
     * is clicked / tapped / opened as follows:
     * */
    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened((notificationOpen) => {
        setNotification(notificationOpen.notification);
      });

    // The firebase onNotificationDisplayed is called when the notification is shown
    const unsubDisplayLister = firebase.notifications().onNotificationDisplayed((notification) => {
      setNotification(notification);
    });

    let messageListener;
    if (Platform.OS === 'android') {
      this.messageListener = firebase.messaging().onMessage((message) => {
        // Process your message as required
        setNotification(message);
      });
    }
    checkBkNotications();

    return () => {
      if (notificationListener) {
        notificationListener();
      }
      if (notificationOpenedListener) {
        notificationOpenedListener();
      }
      if (unsubDisplayLister) {
        unsubDisplayLister();
      }
      if (messageListener) {
        messageListener();
      }
    };
  }, []);

  return [token, notify];
};

export default useMessaging;
