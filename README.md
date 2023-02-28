<!DOCTYPE html>
<html>
  <body>
    <h1>React Native Chat App</h1>
    <p>This is a mobile chat app built with React Native and Firebase. It allows users to sign in with their name, choose a background color, and chat with other users in real-time. The app also has features for sending images and locations, and it works offline with local storage.</p>
    <img width=25% src="https://user-images.githubusercontent.com/112701190/221927945-725716bf-92ba-411c-ab8c-7de39511b5d5.gif">
    <ul>
  <li><a href="https://github.com/wentdavid/hello-world/blob/main/README.md#features">Features</a></li>
  <li><a href="https://github.com/wentdavid/hello-world/blob/main/README.md#user-stories">User Stories</a></li>
  <li><a href="https://github.com/wentdavid/hello-world/blob/main/README.md#getting-started">Getting Started</a></li>
  <li><a href="https://github.com/wentdavid/hello-world/blob/main/README.md#database-configuration">Database Configuration</a></li>
  <li><a href="https://github.com/wentdavid/hello-world/blob/main/README.md#running-the-app">Running the App</a></li>
  <li><a href="https://github.com/wentdavid/hello-world/blob/main/README.md#dependencies">Dependencies</a></li>
  <li><a href="https://github.com/wentdavid/hello-world/blob/main/README.md#dependencies">Dependencies</a></li>
  <li><a href="https://github.com/wentdavid/hello-world/blob/main/README.md#license">License</a></li>
</ul>
    
    <h2>Features</h2>
    <ul>
    <li>Real-time chat between users</li>
    <img width=25% src="https://user-images.githubusercontent.com/112701190/221928209-f5412ee7-77ee-4868-a3af-0fc2e5e7ea44.PNG">
    <li>Send and receive images</li>
    <li>Send and receive location</li>
    <img width=25% src="https://user-images.githubusercontent.com/112701190/221927253-a6e8a84c-40fe-4b46-8eb1-c4768740f626.PNG">
    <li>Offline mode (view previous messages while offline)</li>
    <li>Anonymous authentication with Firebase</li>
    </ul>
    <h2>User Stories</h2>
    <ul>
      <li>As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family</li>
      <li>As a user, I want to be able to send messages to my friends and family members to exchange the latest news.</li>
      <li>As a user, I want to send images to my friends to show them what I’m currently doing.</li>
      <li>As a user, I want to share my location with my friends to show them where I am.</li>
      <li>As a user, I want to be able to read my messages offline so I can reread conversations at any time.</li>
      <li>As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.</li>
    </ul>
    <h2>Getting Started</h2>
    <p>
      To get started with this app, you will need to have the following
      installed:
    </p>
    <ul>
      <li>Node.js</li>
      <li>npm</li>
      <li>Expo CLI</li>
      <li>Xcode (for iOS testing)</li>
      <li>Android Studio (for Android testing)</li>
    </ul>
    <p>
      After installing the prerequisites, clone the project repository and
      navigate to the project directory in your terminal. Run the following
      command to install the project dependencies:
    </p>
    <h2>Database Configuration</h2>
    <h3>Firebase</h3>
<p>This project uses Firebase, a platform for building web and mobile applications, to store and retrieve chat messages.</p>
<p>The following Firebase services are used:</p>
<ul>
  <li><strong>Cloud Firestore</strong>: a flexible, scalable database for mobile, web, and server development.</li>
  <li><strong>Authentication</strong>: a service that provides sign-up and sign-in functionality for your app.</li>
</ul>
<p>The chat messages are stored in a Cloud Firestore collection called <code>messages</code>, which has the following fields:</p>
<ul>
  <li><code>uid</code>: the user ID of the person who sent the message.</li>
  <li><code>_id</code>: a unique identifier for the message.</li>
  <li><code>text</code>: the text content of the message.</li>
  <li><code>createdAt</code>: the timestamp of when the message was sent.</li>
  <li><code>user</code>: an object containing information about the user who sent the message, including their user ID, name, and avatar image URL.</li>
  <li><code>image</code>: an optional URL of an image sent with the message.</li>
  <li><code>location</code>: an optional object containing latitude and longitude values for the user's current location.</li>
</ul>
<p>When a message is sent, it is added to the <code>messages</code> collection in Firestore using the <code>add()</code> method. The <code>onSnapshot()</code> method is used to listen for updates to the collection in real time and update the UI accordingly.</p>
<p>Authentication is used to allow anonymous users to sign in to the app and send messages. When a user signs in anonymously, they are assigned a unique user ID that is stored in the <code>uid</code> field of the <code>messages</code> collection. This allows messages to be associated with the user who sent them even though the user is anonymous.</p>
<p>To configure the database in this chat application, we are using Firebase Firestore.</p>
<p>First, we initialize the Firebase app with our project's API keys and configuration details:</p>
<pre>
const firebase = require("firebase");
require("firebase/firestore");

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
  });
}
</pre>
<p>Next, we create a reference to the Firestore collection that we will be using to store our chat messages:</p>
<pre>
this.referenceChatMessages = firebase.firestore().collection("messages");
</pre>
<p>When a new message is added to the chat, we can use the following code to add the message to the Firestore collection:</p>
<pre>
const message = this.state.messages[0];
this.referenceChatMessages.add({
  uid: this.state.uid,
  _id: message._id,
  text: message.text || "",
  createdAt: message.createdAt,
  user: message.user,
  image: message.image || null,
  location: message.location || null,
});
</pre>
<p>We can also use the following code to retrieve the chat messages from the Firestore collection:</p>
<pre>
this.unsubscribe = this.referenceChatMessages
  .orderBy("createdAt", "desc")
  .onSnapshot(this.onCollectionUpdate, (error) => {
    console.log("Snapshot", error);
});
</pre>
<p>And finally, when the component unmounts, we can use the following code to unsubscribe from the Firestore collection:</p>
<pre>
if (this.isConnected) {
  this.unsubscribe();
  this.authUnsubscribe();
}
</pre>
<p>By using Firebase Firestore, we can easily store and retrieve our chat messages in real-time, making it a great choice for building chat applications.</p>
    <pre>npm install</pre>
    <h2>Running the App</h2>
    <p>
      To run the app using Expo, run the following command:
    </p>
    <pre>expo start</pre>
    <p>
      This will start the Expo development server and open the Expo developer
      tools in your browser. From there, you can run the app in an iOS or
      Android simulator, or on a physical device using the Expo app.
    </p>
     <p>
      Alternatively, you can use Xcode to test the app on an iOS simulator, or
      use Android Studio to test the app on an Android emulator or physical
      device.
    </p>
    <img width=25% src="https://user-images.githubusercontent.com/112701190/221928827-6966121d-0810-4f0b-9669-d312b2604508.mov">
  <h2>Dependencies</h2>
    <ul>
      <li>React Native</li>
      <li>Firebase</li>
      <li>Gifted Chat</li>
      <li>Expo</li>
      <li>NetInfo</li>
      <li>Async Storage</li>
      <li>React Native Maps</li>
      <li>React Native Gesture Handler</li>
      <li>Expo Permissions</li>
      <li>Expo Image Picker</li>
      <li>Expo Location</li>
      <li>React Native Action Sheet</li>
      <li>Prop Types</li>
    </ul>
    <h2>Contributing</h2>
    <p>
      If you'd like to contribute to this project, please fork the repository
      and make your changes on a new branch. Once you've made your changes,
      submit a pull request and we'll review your changes.
    </p>
    <h2>License</h2>
    <p>
      This project is licensed under the MIT License.
    </p>
  </body>
</html>