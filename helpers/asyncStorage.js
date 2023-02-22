import AsyncStorage from "@react-native-async-storage/async-storage";

export const getMessages = async () => {
  let messages = "";
  try {
    messages = (await AsyncStorage.getItem("messages")) || [];
    return JSON.parse(messages);
  } catch (error) {
    console.log("Get Message -> ", error);
  }
};

export const saveMessages = async (messages) => {
  try {
    await AsyncStorage.setItem("messages", JSON.stringify(messages));
  } catch (error) {
    console.log("Save Message -> ", error);
  }
};

export const deleteMessages = async () => {
  try {
    await AsyncStorage.removeItem("messages");
    return [];
  } catch (error) {
    console.log(error.message);
  }
};


