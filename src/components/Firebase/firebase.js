import app from 'firebase/app';

const config = {
    apiKey: "AIzaSyCZnDfcAkCMTOmhUBhRG7HQhQ1RiqigBBY",
    authDomain: "marvel-quizz-18001.firebaseapp.com",
    databaseURL: "https://marvel-quizz-18001.firebaseio.com",
    projectId: "marvel-quizz-18001",
    storageBucket: "marvel-quizz-18001.appspot.com",
    messagingSenderId: "873273975962",
    appId: "1:873273975962:web:679a9ef0908d48249b6b23"
};

class Firebase {
    constructor() {
        app.initializeApp(config);
    }
}
export default Firebase;