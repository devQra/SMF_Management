import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";

const Index = () => {
  const [isReady, setIsReady] = useState(false);
  const [data, setData] = useState("");

  const getProduct = async () => {
    const url = "http://3.37.9.131:4000";
    try {
      const res = await axios.post(`${url}/Product`);
      setData(res.data[0]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  let DataSet = {
    row: ["설비이름", "제품번호", "제품명", "불량여부", "생산일"],
    col: [
      [
        data.name,
        data.num,
        data.item,
        data.tar_vol,
        data.id_defect,
        data.prod_data,
      ],
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
