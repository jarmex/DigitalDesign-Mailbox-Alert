import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import AsyncStorage from '@react-native-community/async-storage';
import { firebaseService } from '../services/firebase';

const getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      try {
        await firebaseService.saveUserToken('iPhone', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
      } catch {
        //
      }
    }
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
          console.log('permission rejected');
        }
      }
    };
    checkPermission();
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

    let unsubDisplayLister;
    // iOS specific code
    if (Platform.OS === 'ios') {
      // The firebase onNotificationDisplayed is called when the notification is shown
      unsubDisplayLister = firebase.notifications().onNotificationDisplayed((notification) => {
        setNotification(notification);
      });
    }
    checkBkNotications();

    return () => {
      notificationListener();
      notificationOpenedListener();
      if (unsubDisplayLister) {
        unsubDisplayLister();
      }
    };
  }, []);

  return [token, notify];
};

export default useMessaging;
