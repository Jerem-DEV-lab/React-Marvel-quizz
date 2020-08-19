import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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
        this.auth = app.auth();
        this.db = app.firestore();
    }

    // Inscription
    signupUser = (email, password) => this.auth.createUserWithEmailAndPassword(email, password)

    // Connexion
    loginUser = (email, password) => this.auth.signInWithEmailAndPassword(email, password)

    // Déconnexion
    logOutUser = () => this.auth.signOut();

    // Récupérer le mot de passe
    passwordReset = email => this.auth.sendPasswordResetEmail(email);

    user = uid => this.db.doc(`users/${uid}`);

}
export default Firebase;