import { View, ActivityIndicator, ScrollView } from "react-native";
import Home from "./src/Page/Home";
import ModalTermos from "./src/Page/ModalTermos";
import React, { useState, useEffect } from "react";
import { initApi } from "./src/server/api.js";
import { Colors } from "./src/Styles/colorsBase.js"
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await initApi();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.background,
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <AppNavigator />
    </ScrollView>
  );
}
