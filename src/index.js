import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9VNI8v-CwRAnmtsSby4vq8YYi8XI1S8c",
  authDomain: "do2gether-22.firebaseapp.com",
  projectId: "do2gether-22",
  storageBucket: "do2gether-22.appspot.com",
  messagingSenderId: "241882367589",
  appId: "1:241882367589:web:fd8a4fd44c538b578be88c"
};

firebase.initializeApp(firebaseConfig);

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
