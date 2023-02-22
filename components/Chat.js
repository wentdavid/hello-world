import React from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar, SystemMessage } from "react-native-gifted-chat";
import NetInfo from "@react-native-community/netinfo";
import MapView from "react-native-maps";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import CustomActions from "./CustomActions";
import { getMessages, saveMessages, deleteMessages } from "../helpers/asyncStorage";


const firebase = require("firebase");
require("firebase/firestore");

let offlineAlert = {
  _id: 1,
  text: "",
  system: true,
};

export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      uid: 0,
      user: {
        _id: "",
        name: "",
        avatar: "",
      },
      image: null,
      isConnected: false,
      loggedInText: "You are getting logged in...",
      location: null,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyBsLRysgUaf5tDiQIs6SVVR6El0cfdYNjw",
        authDomain: "chatapp-dab3a.firebaseapp.com",
        projectId: "chatapp-dab3a",
        storageBucket: "chatapp-dab3a.appspot.com",
        messagingSenderId: "509512313734",
        appId: "1:509512313734:web:eee6db58a7ed170a8c9a07",
      });
    }
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  async componentDidMount() {
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    try {
      const messages = await getMessages();
      this.setState({
        messages: messages,
      });
    } catch (error) {
      console.log("Error getting messages", error);
    }

    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        this.setState({ isConnected: true });
        console.log("online");

        this.referenceChatMessages = firebase
          .firestore()
          .collection("messages");

        this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (!user) {
            firebase.auth().signInAnonymously();
          }
          this.setState({
            uid: user.uid,
            messages: [],
            user: {
              _id: user.uid,
              name: name,
              avatar: "https://placeimg.com/140/140/any",
            },
            loggedInText: "",
          });
          this.unsubscribe = this.referenceChatMessages
            .orderBy("createdAt", "desc")
            .onSnapshot(this.onCollectionUpdate, (error) => {
              console.log("Snapshot", error);
            });
        });
      } else {
        offlineAlert = {
          _id: 1,
          text: "You are currently offline. Messages can't be updated or sent.",
          system: true,
        };

        this.setState({ isConnected: false });
      }
    });
  }

  addMessage = () => {
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
  };

  onCollectionUpdate = (querySnapshot) => {
    if (!this.state.isConnected) return;
    const messages = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: {
          _id: data.user._id,
          name: data.user.name,
          avatar: data.user.avatar || "",
        },
        image: data.image || null,
        location: data.location || null,
      });
    });
    this.setState({
      messages,
    });
  };

  componentWillUnmount() {
    if (this.isConnected) {
      this.unsubscribe();
      this.authUnsubscribe();
    }
  }

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      async () => {
        await saveMessages(this.state.messages);
        this.addMessage();
      }
    );
  }

  renderSystemMessage(props) {
    if (!this.state.isConnected) {
      return <SystemMessage {...props} textStyle={styles.systemMessage} />;
    } else {
      return null;
    }
  }

  renderInputToolbar = (props) => {
    console.log("renderInputToolbar --> props", props.isConnected);
    if (props.isConnected === false) {
      return <InputToolbar {...props} />;
    } else {
      return <InputToolbar {...props} />;
    }
  };

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "white",
          },
          right: {
            backgroundColor: "blue",
          },
        }}
      />
    );
  }

  renderCustomActions = (props) => <CustomActions {...props} />;

  renderCustomView(props) {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  }

  render() {
    let color = this.props.route.params.color;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    return (
      <ActionSheetProvider>
        <View style={[styles.container, { backgroundColor: color }]}>
          <Text>{this.state.loggedInText}</Text>

          <GiftedChat
            renderSystemMessage={this.renderSystemMessage.bind(this)}
            renderBubble={this.renderBubble.bind(this)}
            renderActions={this.renderCustomActions}
            renderCustomView={this.renderCustomView}
            renderInputToolbar={this.renderInputToolbar.bind(this)}
            showAvatarForEveryMessage={true}
            renderUsernameOnMessage={true}
            messages={
              this.state.isConnected
                ? this.state.messages
                : [offlineAlert, ...this.state.messages]
            }
            onSend={(messages) => this.onSend(messages)}
            user={{ _id: this.state.uid }}
            isConnected={this.state.isConnected}
            accessible={true}
            accessibilityLabel="Chat text input field"
            accessibilityHint='Enter your message here and press "Send" on the right to send your message '
          />
          {Platform.OS === "android" ? (
            <KeyboardAvoidingView behavior="height" />
          ) : null}
        </View>
      </ActionSheetProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


