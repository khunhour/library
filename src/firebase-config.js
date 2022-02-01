const config = {
	apiKey: "AIzaSyCmMbFwWZYubcfcopowOOLDwBMupXTqlOc",
	authDomain: "library-b7aba.firebaseapp.com",
	projectId: "library-b7aba",
	storageBucket: "library-b7aba.appspot.com",
	messagingSenderId: "275669996212",
	appId: "1:275669996212:web:41e1386247de6158017de1",
};

export function getFirebaseConfig() {
	if (!config || !config.apiKey) {
		throw new Error(
			"No Firebase configuration object provided." +
				"\n" +
				"Add your web app's configuration object to firebase-config.js"
		);
	} else {
		return config;
	}
}
