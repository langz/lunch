import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyBd8scKSUXzssKMMAl_Rk65jl4H7Zw0WM0",
    databaseURL: "https://lunch-5f318.firebaseio.com",
};
var fire = firebase.initializeApp(config);
export default fire;