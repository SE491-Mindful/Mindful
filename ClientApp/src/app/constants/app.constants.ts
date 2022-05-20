
export const AppRoutes = {
  Login: 'login',
  Preferences: 'preferences',
  Calendar: 'calendar',
  CreateAccount: 'createAccount',
  Focus: 'focus'
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const FirebaseConfig = {
  apiKey: 'AIzaSyDFtijVvYfE6ttxGGIFosKDTe3x7spSTK4',
  authDomain: 'mindful-c1d5e.firebaseapp.com',
  projectId: 'mindful-c1d5e',
  storageBucket: 'mindful-c1d5e.appspot.com',
  messagingSenderId: '1085302276666',
  appId: '1:1085302276666:web:0f2616c0cca84b21f6eb03',
  measurementId: 'G-YZS4H10MCM'
};

export const FirebaseCollectionKeys = {
  users: 'Users',
  preferences: 'Preferences'
};

// This is the default state of the app for chrome localStorage.
export const AppDefaultStorageObj = {
  test1: 'test1',
  test2: 'test2',
  test3: 'test3'
};

export const AppSessionStorageKey = {
  userName: 'UserName',
  preferences: 'Preferences'
};

export const AppLocalStorageKey = {

};
