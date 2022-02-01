// Import the functions you need from the SDKs you need
import initializePage from "./book";

import { initializeApp } from "firebase/app";
import {
	getAuth,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import {
	getFirestore,
	collection,
	addDoc,
	query,
	orderBy,
	limit,
	onSnapshot,
	setDoc,
	updateDoc,
	doc,
	serverTimestamp,
} from "firebase/firestore";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getPerformance } from "firebase/performance";

import { getFirebaseConfig } from "./firebase-config.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

var messageListElement = document.getElementById("messages");
var messageFormElement = document.getElementById("message-form");
var messageInputElement = document.getElementById("message");
var submitButtonElement = document.getElementById("submit");
var imageButtonElement = document.getElementById("submitImage");
var imageFormElement = document.getElementById("image-form");
var mediaCaptureElement = document.getElementById("mediaCapture");
let userPicElement = document.getElementById("user-pic");
let userNameElement = document.getElementById("user-name");
let signInButtonElement = document.getElementById("sign-in");
let signOutButtonElement = document.getElementById("sign-out");
var signInSnackbarElement = document.getElementById("must-signin-snackbar");

//initialize event listener of the page
initializePage();
// Initialize Firebase
const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);
initFirebaseAuth();
// Signs-in Friendly Chat.

async function signIn() {
	// Sign in Firebase using popup auth and Google as the identity provider.
	var provider = new GoogleAuthProvider();
	await signInWithPopup(getAuth(), provider);
}

// Signs-out of Friendly Chat.
function signOutUser() {
	// Sign out of Firebase.
	signOut(getAuth());
}

// Initialize firebase auth
function initFirebaseAuth() {
	// Listen to auth state changes.
	onAuthStateChanged(getAuth(), authStateObserver);
}

// Returns the signed-in user's profile Pic URL.
function getProfilePicUrl() {
	return getAuth().currentUser.photoURL || "/images/profile_placeholder.png";
}

// Returns the signed-in user's display name.
function getUserName() {
	return getAuth().currentUser.displayName;
}

function authStateObserver(user) {
	if (user) {
		console.log("sign-in");
		// User is signed in!
		// Get the signed-in user's profile pic and name.
		let profilePicUrl = getProfilePicUrl();
		let userName = getUserName();

		// Set the user's profile pic and name.
		userPicElement.style.backgroundImage =
			"url(" + addSizeToGoogleProfilePic(profilePicUrl) + ")";
		userNameElement.textContent = userName;

		// Show user's profile and sign-out button.
		userNameElement.removeAttribute("hidden");
		userPicElement.removeAttribute("hidden");
		signOutButtonElement.removeAttribute("hidden");

		// Hide sign-in button.
		signInButtonElement.setAttribute("hidden", "true");
	} else {
		console.log("sign-out");
		// User is signed out!
		// Hide user's profile and sign-out button.
		userNameElement.setAttribute("hidden", "true");
		userPicElement.setAttribute("hidden", "true");
		signOutButtonElement.setAttribute("hidden", "true");

		// Show sign-in button.
		signInButtonElement.removeAttribute("hidden");
	}
}

// Saves message on form submit.
signOutButtonElement.addEventListener("click", signOutUser);
signInButtonElement.addEventListener("click", signIn);
