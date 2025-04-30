import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";

const Index = () => {
  const [isReady, setIsReady] = useState(false);
  let [data, setData] = useState([]);

  const getTotal = async () => {
    const url = "http://3.37.9.131:4000";
    try {
      const res = await axios.post(`${url}/Total`);
      setData(res.data[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    getTotal();
  }, []);

  let DataSet = {
    row: [
      "설비명",
      "작업자",
      "상태",
      "생산량",
      "불량수",
      "불량률",
      "달성률",
      "목표량",
    ],
    col: [
      [
        // data.name,
        // data.worker,
        // data.state,
        // data.tar_vol,
        // data.prod_vol,
        // data.defect_cnt,
        // data.now,
        // data.defect_rate,
      ],
      // ["1호기", "허정운", "사망", "0", "0", "0", "0", "1"],
      // ["2호기", "신비", "사망", "0", "0", "0", "0", "1"],
      // ["3호기", "이유비", "사망", "0", "0", "0", "0", "1"],
    ],
  };
  const Row = () => {
    let result = [];

    for (let i = 0; i < DataSet.row.length; i++) {
      let Key = "0" + i.toString();
      result.push(
        <Text style={styles.Text} key={Key}>
          {DataSet.row[i]}
        </Text>
      );
    }

    return <View style={styles.mainRow}>{result}</View>;
  };
  const Col = () => {
    let result = [];
    let Key = "";

    for (let x = 0; x < DataSet.col.length; x++) {
      let render = [];
      for (let y = 0; y < DataSet.row.length; y++) {
        render.push(
          <Text style={styles.Text} key={(Key += y)}>
            {DataSet.col[x][y]}
          </Text>
        );
      }
      result.push(
        <View style={styles.subRow} key={(Key += x)}>
          {render}
        </View>
      );
    }
    return result;
  };

  return isReady ? (
    <SafeAreaView style={styles.container}>
      <Row />
      <Col />
    </SafeAreaView>
  ) : (
    <View style={styles.appLoading}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  appLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainRow: { flexDirection: "row" },
  subRow: { flexDirection: "row" },
  Text: { flex: 1, borderWidth: 1, textAlign: "center" },
});

export default Index;
