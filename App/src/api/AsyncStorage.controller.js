import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const setInfo = async (key) => {
  try {
    await AsyncStorage.setItem("userData", JSON.stringify({ loginInfo: true }));
  } catch (e) {
    console.log(e);
  }
};

const getInfo = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== undefined || null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
  }
};

const containsInfo = async (key) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (e) {
    console.log(e);
  }
};

const removeData = async (key) => {
  try {
    await AsyncStorage.clear();
    Alert.alert("로그아웃 성공!", "다시 로그인 해주세요!");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { setInfo, getInfo, containsInfo, removeData };
