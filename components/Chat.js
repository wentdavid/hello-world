import React from "react";
import { View, Platform, KeyboardAvoidingView, Text, Button, TextInput, StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";


export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: "This is a system message",
          createdAt: new Date(),
          system: true,
        },
      ],
    };
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
        }}
      />
    );
  }

  render() {
    let color = this.props.route.params.color;
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    return (
      <View style={[styles.container, { backgroundColor: color }]}>
        <Button
          title="Go to Start"
          onPress={() => this.props.navigation.navigate("Start")}
        />
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" ? (
          <KeyboardAvoidingView behavior="height" />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
    
