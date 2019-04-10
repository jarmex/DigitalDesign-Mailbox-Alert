import firebase from 'react-native-firebase';

class FirebaseService {
  constructor() {
    this.ref = firebase.firestore().collection('mailbox');
    this.auth = firebase.auth();
  }

  login(email, password) {
    try {
      return this.auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      try {
        return this.auth.createUserWithEmailAndPassword(email, password);
      } catch (error) {
        return null;
      }
    }
  }

  async load(id) {
    const doc = await this.ref.doc(id).get();
    if (doc.exists) {
      return doc.data();
    } else {
      const defaultDoc = {
        status: false,
        date: new Date().toJSON(),
      };
      await this.ref.doc(id).set(defaultDoc);
      return doc;
    }
  }

  getData = () => {
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
