import { StatusBar } from "expo-status-bar";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  OneSignal,
} from "react-native-onesignal";
import Constants from "expo-constants";
import { useState } from "react";
import CodeGuide from "./components/CodeGuide";
import { Button } from "./components/Button";

export default function App() {
  const [showCodeGuide, setShowCodeGuide] = useState(false);

  //Iniatialize OneSignal, that means that one signal will automatically create a subscription for the user
  OneSignal.initialize(Constants.expoConfig?.extra?.oneSignalAppId);

  // Check if the user has notifications enabled
  let areNotificationsEnabled = OneSignal.Notifications.hasPermission();

  if (!areNotificationsEnabled) {
    // Show the prompt to enable notifications, that you can configure on the one signal dashboard
    OneSignal.InAppMessages.addTrigger("showPrompt", "true");
  }
  // You can also set a "external_id" from your app to get saved on the one signal subscription
  //Basically you will create a "bond" between your server/database and the one signal subscription
  //So after that it gets easier to send notifications to a specific user from your server, for example
  //This is how you set the external_id, you will use this if your app has a authentication flow
  OneSignal.login("my_external_id");
  //You can also add tags to the user, that you can use to send notifications to a specific group of users among other things
  OneSignal.User.addTags({ key: "my-tag" });

  OneSignal.User.pushSubscription.addEventListener("change", (subscription) => {
    // You can listen to the change of the push subscription and do something here
    //A good pratice is to save the user subscription on your database
    Alert.alert("Subscription changed", JSON.stringify(subscription));
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}> One Signal + Expo template example </Text>
        <Text style={{ textAlign: "center", marginVertical: 4 }}>
          Minimal example of how to use OneSignal with Expo in the managed
          workflow using onesignal-expo-plugin
        </Text>
        <View style={{ marginTop: 20 }}>
          <Button
            title="Show code guide"
            onPress={() => {
              setShowCodeGuide(!showCodeGuide);
            }}
          />
        </View>
        {showCodeGuide && <CodeGuide />}
        <StatusBar style="dark" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
