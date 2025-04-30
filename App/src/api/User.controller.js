import React from "react";
import { Alert } from "react-native";
import Storage from "./AsyncStorage.controller";
import axios from "axios";

const url = "http://3.37.9.131:4000";

const Register = async (req) => {
  try {
    let res = await axios.post(`${url}/Admin/Register`, req);
    if (res.data.message === "회원가입 성공") {
      Alert.alert("회원가입 성공!", "로그인 해주시기 바랍니다.");
    } else
      Alert.alert("회원가입 실패!", "아이디와 비밀번호를 다시 확인해주세요.");
  } catch (e) {
    console.log(e);
  }
};

const Login = async (req) => {
  try {
    let res = await axios.post(`${url}/Admin/Login`, req);
    if (res.data.message === "로그인 성공") {
      await Storage.setInfo(req);
      Alert.alert("로그인 성공!", `${req.id}님 환영합니다.`);
    } else
      Alert.alert("로그인 실패!", "아이디와 비밀번호를 다시 확인해주세요.");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { Register, Login };
