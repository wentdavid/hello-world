// This code imports the required React Native components for creating a chat app.
import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import * as Animatable from "react-native-animatable";

const backgroundColors = {
  black: { backgroundColor: "#000000" },
  grey: { backgroundColor: "#8a95a5" },
  purple: { backgroundColor: "#474056" },
  green: { backgroundColor: "#94ae89" },
};

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
    const keyboardVerticalOffset = Platform.OS === "ios" ? 50 : 0; // adjust the offset for iOS devices
    // The return statement returns the JSX code for rendering the chat app UI.
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView
          style={styles.innerContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <ImageBackground
            source={require("../assets/background-image.gif")}
            style={[styles.container, styles.image]}
          >
            <Animatable.Text style={styles.title} animation="pulse" duration={1000} iterationCount={2} iterationDelay={2000} >
              hello-world
            </Animatable.Text>

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
                    onPress={() =>
                      this.setState({ color: grey.backgroundColor })
                    }
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
        </KeyboardAvoidingView>
      </View>
    );
  }
}

// This StyleSheet object defines the styles used in the app.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    paddingBottom: 0, // set a paddingBottom to make sure there is enough space at the bottom of the screen
  },

  image: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "black",
    fontSize: 50,
    fontWeight: "200",
    marginTop: 80,
  },

  inputBox: {
    backgroundColor: "#fff",
    marginBottom: 30,
    height: "44%",
    width: "88%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 35,
    paddingHorizontal: 10,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 100,
  },

  nameBox: {
    height: 50,
    width: "88%",
    borderColor: "rgba(0, 0, 0, 0.4)",
    borderWidth: 1,
    borderRadius: 3,
    color: "#757083",
    opacity: 50,
    fontSize: 16,
    fontWeight: "300",
    paddingLeft: 10,
  },

  colorSelector: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "300",
    color: "#757083",
    opacity: 100,
  },

  colorWrapper: {
    flexDirection: "row",
  },

  color: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 10,
  },

  chatBox: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 30,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 100,
    borderWidth: 0,
  },

  chatBoxText: {
    color: "#fff",
    fontWeight: "300",
    paddingRight: 10,
  },

  colorSelected: {
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#5f5f5f",
  },
});