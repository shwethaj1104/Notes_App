import { StatusBar } from "expo-status-bar";
import * as eva from "@eva-design/eva";
import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Layout,
} from "@ui-kitten/components";
import { useState } from "react";
import AsyncStorage from "@react-native-community/async-storage";

export default function CreateNote() {
  const [note, setNote] = useState("");
  const navigation = useNavigation();

  const saveNote = async () => {
    const value = await AsyncStorage.getItem("NOTES");
    const n = value ? JSON.parse(value) : [];
    n.push(note);
    await AsyncStorage.setItem("NOTES", JSON.stringify(n)).then(() =>
      navigation.navigate("AllNotes")
    );
    setNote("");
  };

  return (
    <View>
      <TextInput
        value={note}
        onChangeText={setNote}
        style={{ color: "#fff", fontSize: 22 }}
        multiline={true}
        autoFocus
        selectionColor="#fff"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.bottom}
      >
        <Button
          style={StyleSheet.button}
          appearance="filled"
          onPress={saveNote}
        >
          Create Note
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222B45",
    color: "white",
    padding: 30,
    paddingTop: 80,

    width: Dimensions.get("window").width,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
  button: {
    marginBottom: 30,
  },
});
