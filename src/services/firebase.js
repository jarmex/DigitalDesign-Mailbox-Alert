import firebase from 'react-native-firebase';

class FirebaseService {
  constructor() {
    this.ref = firebase.firestore().collection('mailbox');
    this.users = firebase.firestore().collection('user');
    this.auth = firebase.auth();
  }

  login(email, password) {
    try {
      return this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      try {
        return this.auth.createUserWithEmailAndPassword(email, password);
      } catch {
        return null;
      }
    }
  }

  async load(id) {
    const doc = await this.ref.doc(id).get();
    if (doc.exists) {
      return doc.data();
    }

    const defaultDoc = {
      status: false,
      date: new Date().toJSON(),
    };
    await this.ref.doc(id).set(defaultDoc);
    return doc;
  }

  saveUserToken = (device, token) => {
    const dataToSave = {
      device,
      token,
    };
    // get the current user
    return new Promise((resolve, reject) => {
      // get id for the new document
      this.users
        .doc(this.auth.currentUser.email)
        .set(dataToSave)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  };

  getData = () => {
    // console.log(this.auth.currentUser.email);
    return new Promise((resolve, reject) => {
      this.unsubscribe = this.ref
        .orderBy('date', 'DESC')
        .limit(100)
        .onSnapshot((snapquery) => {
          const maildata = [];

          snapquery.forEach((doc) => {
            const { status, date, pickupdate } = doc.data();
            maildata.push({
              key: doc.id,
              doc, // DocumentSnapshot
              status,
              date,
              pickupdate,
            });
          });
          // check for pending
          const pending = maildata.find((item) => item.status === true);
          resolve({ maildata, pending });
        });
    });
  };

  unSubscribe = () => {
    this.unsubscribe();
  };

  db = () => this.ref;
}

export const firebaseService = new FirebaseService();
