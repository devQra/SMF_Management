import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, View } from "react-native";
import * as Font from "expo-font";
import "react-native-gesture-handler";

import CustomInput from "../../components/Custom/CustomInput";
import CustomButton from "../../components/Custom/CustomButton";
import { Login } from "../../api/User.controller";
import Register from "./Register";
import Storage from "../../api/AsyncStorage.controller";
import Root from "../../router/index";

const Index = ({ navigation }) => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(async () => {
      const userInfo = await Storage.getInfo("userData");
      if (userInfo) setData(true);
      setIsReady(true);
    }, 1000);
  }, []);

  useEffect(() => {
    const load = async () => {
      await Font.loadAsync({
        BMJUA: require("../../assets/fonts/BMJUA_ttf.ttf"),
      });
      setIsReady(true);
    };
    load().then((r) => console.log(r));
  }, []);

  return isReady ? (
    data ? (
      <SafeAreaView style={styles.container}>
        <View style={styles.mainView}>
          <Text style={styles.text}>스마트팩토리</Text>
          <Text style={styles.text}>관리자시스템</Text>
        </View>
        <View style={styles.subView}>
          <CustomInput value={id} setValue={setId} placeholder="ID" />
          <CustomInput
            value={pw}
            setValue={setPw}
            placeholder="PW"
            secureTextEntry
          />
          <CustomButton onPress={() => Login({ id, pw })} text="로그인" />
          <CustomButton
            style={styles.text}
            onPress={() => navigation.navigate("Register")}
            title={"회원가입"}
            text="회원가입"
          />
        </View>
      </SafeAreaView>
    ) : (
      <Root />
    )
  ) : (
    <View style={styles.appLoading}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#7382B5",
  },
  mainView: {
    margin: "10%",
    marginTop: 140,
  },
  subView: {
    marginHorizontal: 70,
  },
  input: {
    margin: 5,
    borderRadius: 20,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 14,
  },
  text: {
    fontSize: 50,
    alignSelf: "center",
    color: "#FFFFFF",
    fontFamily: "BMJUA",
  },
  appLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  signup: { color: "#FFFFFF" },
});

export default Index;
