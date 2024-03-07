import React, { ReactNode, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import CodeSnippet from "./CodeSnippet";
import ExpandableContainer from "./ExpandableContainer";
import Separator from "./Separator";



const CodeGuide = () => {
  const steps = [
    {
      title: "Step 1: Initialize OneSignal",
      code: `OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);`,
    },
    {
      title: "Step 2: Check if notifications are enabled",
      code: `let areNotificationsEnabled = OneSignal.Notifications.hasPermission()`,
    },
    {
      title:
        "Step 3: Show prompt to enable notifications if they are not enabled, that you can configure on the one signal dashboard",
      code: `if (!areNotificationsEnabled) { OneSignal.inAppMessages.setTrigger("showPrompt", "true"); }`,
    },
    {
      title: "(optional)Step 4: Set the external_id",
      code: `OneSignal.login('user_id');`,
      description: `You can also set a "external_id" from your app to get saved on the one signal subscription. Basically you will create a "bond" between your server/database and the one signal subscription. So after that it gets easier to send notifications to a specific user from your server, for example. This is how you set the external_id, you will use this if your app has a authentication flow`,
    },
    {
      title:
        "(optional)Step 5: Listen to the change of the push subscription and do what you want!",
      code: `OneSignal.User.pushSubscription.addEventListener('change', (subscription) => {  //Do what you want here :) });`,
    },
  ];

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {steps.map((step, index) => (
        <View key={index}>
          <ExpandableContainer title={step.title} key={index}>
            {step.description && (
              <ExpandableContainer.Description>
                {step.description}
              </ExpandableContainer.Description>
            )}
            <CodeSnippet>{step.code}</CodeSnippet>
          </ExpandableContainer>
          {/* if is not the last step, add a separator */}
          {index !== steps.length - 1 && <Separator />}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 16,
    fontWeight: "normal",
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 4,
    fontSize: 16,
    fontWeight: "normal",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});

export default CodeGuide;
