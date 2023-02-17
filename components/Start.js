// This code imports the required React Native components for creating a chat app.
import React from "react";
import { View, Text, Button, TextInput, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

// The component Start is exported as the default component of this module.
export default class Start extends React.Component {

// The constructor initializes the state of the component by setting the name to an empty string.
constructor(props) {
  super(props);
  this.state = { name: "" };
}

// The render function renders the components and styles of this app.
render() {
// This destructuring assignment extracts the background color styles from a variable called backgroundColors.
const { black, grey, purple, green } = backgroundColors;
// The return statement returns the JSX code for rendering the chat app UI.
return (
  <View style={styles.container}>
    <ImageBackground
      source={require("../assets/background-image.png")}
      style={styles.image}
    >
      <Text style={styles.title}>Chat App</Text>

      <View style={styles.inputBox}>
        <TextInput
          style={styles.nameBox}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
          placeholder="Enter your name"
        />
        <View>
          <Text style={styles.colorSelector}>Choose your background</Text>
          <View style={styles.colorWrapper}>
            {/* The TouchableOpacity component allows the user to select different background colors. */}
            <TouchableOpacity
              style={[
                styles.color,
                black,
                this.state.color === black.backgroundColor
                  ? styles.colorSelected
                  : {},
              ]}
              onPress={() =>
                this.setState({ color: black.backgroundColor })
              }
            />

            <TouchableOpacity
              style={[
                styles.color,
                grey,
                this.state.color === grey.backgroundColor
                  ? styles.colorSelected
                  : {},
              ]}
              onPress={() => this.setState({ color: grey.backgroundColor })}
            />

            <TouchableOpacity
              style={[
                styles.color,
                purple,
                this.state.color === purple.backgroundColor
                  ? styles.colorSelected
                  : {},
              ]}
              onPress={() =>
                this.setState({ color: purple.backgroundColor })
              }
            />

            <TouchableOpacity
              style={[
                styles.color,
                green,
                this.state.color === green.backgroundColor
                  ? styles.colorSelected
                  : {},
              ]}
              onPress={() =>
                this.setState({ color: green.backgroundColor })
              }
            />
          </View>
        </View>
        {/* The TouchableOpacity component allows the user to navigate to the chat screen. */}
        <TouchableOpacity
          style={[styles.nameBox, styles.chatBox]}
          onPress={() =>
            this.props.navigation.navigate("Chat", {
              name: this.state.name,
              color: this.state.color,
            })
          }
        >
          <Text style={[styles.colorSelector, styles.chatBoxText]}>
            Start Chatting
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  </View>
);
}
}



// This StyleSheet object defines the styles used in the app.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
  },

  title: {
    marginTop: 100,
    marginBottom: 30,
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },

  inputBox: {
    height: "40%",
    width: "88%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  nameInput: {
    fontSize: 16,
    fontWeight: "300",
    fontColor: "#757083",
    opacity: 50,
  },

  button: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    backgroundColor: "#757083",
  }

});