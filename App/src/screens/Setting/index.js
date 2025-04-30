import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { removeData } from "../../api/AsyncStorage.controller";

const Index = ({ navigation }) => {
  const [state, setState] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, [state]);

  return isReady ? (
    <SafeAreaView style={styles.container}>
      <Button
        title={"로그아웃"}
        style={styles.text}
        onPress={() => {
          removeData("userData").then((r) => {
            if (r) {
              setState(false);
            } else return null;
          });
        }}
      />
    </SafeAreaView>
  ) : (
    <View style={styles.appLoading}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: "#888888",
  },
});

export default Index;
