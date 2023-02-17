<!DOCTYPE html>
<html>
  <body>
    <h1>React Native Chat App</h1>
    <p>
      This is a simple chat app built using React Native. The app allows users
      to start a chat conversation and continue the conversation with
      text messages. The app uses react Navigation for screen navigation and
      react-native-gesture-handler for gesture recognition.
    </p>
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
    <h2>File Structure</h2>
    <p>
      The app is structured as follows:
    </p>
    <ul>
      <li>
        <code>App.js</code>: The main entry point of the app, which sets up the
        navigation using <code>react-navigation</code>.
      </li>
      <li>
        <code>components/Start.js</code>: The start screen of the app, which
        displays a button to start the chat.
      </li>
      <li>
        <code>components/Chat.js</code>: The chat screen of the app, which
        allows users to send messages to the chatbot and receive responses.
      </li>
    </ul>
    <h2>Dependencies</h2>
    <p>
      The app uses the following dependencies:
    </p>
    <ul>
      <li>
        <code>react-navigation</code>: A library for handling navigation between
        screens in a React Native app.
      </li>
      <li>
        <code>react-native-gesture-handler</code>: A library for gesture
        recognition in a React Native app.
      </li>
    </ul>
    <h2>Contributing</h2>
    <p>
      If you'd like to contribute to this project, please fork the repository
      and make your changes on a new branch. Once you've made your changes,
      submit a pull request and we'll review your changes.
    </p>
    <h2>License</h2>
    <p>
      This project is licensed under the MIT License. See the <code>LICENSE</code> file for more details.
    </p>
  </body>
</html>