import { Alert } from "react-native";
import axios from "axios";

const url = "http://3.37.9.131:4000";

const TargetUpdate = async (req) => {
  try {
    let res = await axios.post(`${url}/Target/Update`, req);
    if (res.data.message === "입력 성공!")
      Alert.alert("목표 생산량", "입력 성공!");
    else Alert.alert("목표 생산량", "입력 실패!");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { TargetUpdate };
