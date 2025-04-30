import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import CustomInput from "../../components/Custom/CustomInput";
import CustomButton from "../../components/Custom/CustomButton";
import * as Font from "expo-font";
import { Register } from "../../api/User.controller";

const Index = ({ navigation }) => {
  const [key, setKey] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isReady, setIsReady] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <View style={styles.mainView}>
        <Text style={styles.text}>회원가입</Text>
      </View>
      <View style={styles.subView}>
        <CustomInput value={key} setValue={setKey} placeholder="KEY" />
        <CustomInput value={id} setValue={setId} placeholder="ID" />
        <CustomInput
          value={pw}
          setValue={setPw}
          placeholder="PW"
          secureTextEntry
        />
        <CustomButton
          onPress={() => {
            Register({ key, id, pw });
            navigation.popToTop();
          }}
          text="회원가입"
        />
      </View>
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
});

export default Index;
