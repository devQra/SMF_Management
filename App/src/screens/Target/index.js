import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import CustomButton from "../../components/Custom/CustomButton";
import CustomInput from "../../components/Custom/CustomInput";
import { TargetUpdate } from "../../api/DB.controller";

const Index = () => {
  const [name, setName] = useState("");
  const [tar_vol, setTarget] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <CustomInput value={name} setValue={setName} placeholder="설비명" />
        <CustomInput
          value={tar_vol}
          setValue={setTarget}
          placeholder="목표생산량"
        />
        <CustomButton
          onPress={() => TargetUpdate({ name, tar_vol })}
          text="입력"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFF",
  },
  view: {
    flex: 1,
    margin: 20,
  },
});

export default Index;
