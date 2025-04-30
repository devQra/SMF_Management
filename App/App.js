import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import Root from "./src/router/index";
import Main from "./src/screens/Main/index";
import Storage from "./src/api/AsyncStorage.controller";
import { StyleSheet, Text, View } from "react-native";

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const userInfo = await Storage.getInfo("userData");
      if (userInfo) setData(true);
      else setData(false);
      setIsReady(true);
    }, 1000);
  }, []);

  return isReady ? (
    data ? (
      <Root />
    ) : (
      <Main />
    )
  ) : (
    <View style={styles.appLoading}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  appLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 80,
    color: "#FFFFFF",
  },
});

export default App;
