import app from 'firebase/app';
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyCGrGklL3HCcqcx6TjGQ9QCMsYKM1qkfPw',
  authDomain: 'my-blobb.firebaseapp.com',
  databaseURL: 'https://my-blobb.firebaseio.com',
  projectId: 'my-blobb',
  storageBucket: 'my-blobb.appspot.com',
  messagingSenderId: '878266767138',
}; 

// const prodConfig = {
//     apiKey: process.env.REACT_APP_PROD_API_KEY,
//     authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROD_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
//   };

// const devConfig = {
//     apiKey: process.env.REACT_APP_DEV_API_KEY,
//     authDomain: process.env.REACT_APP_DEV_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
//     projectId: process.env.REACT_APP_DEV_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
// };

// const config = process.env.NODE_ENV === 'production'
// ? prodConfig : devConfig;

class Firebase {
    constructor() {
      app.initializeApp(config);

      this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
  }
  export default Firebase;