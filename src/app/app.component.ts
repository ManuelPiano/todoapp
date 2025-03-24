import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8_YkAlGGB6FADO9RuxpomSyBkgHWz8gc",
  authDomain: "task-app-747eb.firebaseapp.com",
  projectId: "task-app-747eb",
  storageBucket: "task-app-747eb.firebasestorage.app",
  messagingSenderId: "829872554499",
  appId: "1:829872554499:web:719231d144080fe7c44436",
  measurementId: "G-1Q1W1TGPLJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  welcome = 'Hola!';
  tasks = [
    'Instalar Angular CLI',
    'Crear nuevo proyecto',
    'Crear componentes',  
  ]
}
