import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import axios from "axios";

const Chart = ({ name }) => {
  const data = {
    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월"],
    datasets: [
      {
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ],
      },
    ],
  };

  return (
    <View style={styles.viewContainer}>
      <Text style={styles.workerName}>설비명 :: {name}</Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width} // from react-native
        height={180}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#FFFFFF",
          backgroundGradientFrom: "#FFFFFF",
          backgroundGradientTo: "#FFFFFF",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 205, 153, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {},
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#000000",
          },
        }}
        bezier
        style={{}}
      />
    </View>
  );
};

const Index = () => {
  const [isReady, setIsReady] = useState(false);
  const [Data, setData] = useState("");

  const getProcess = async (req) => {
    const url = "http://3.37.9.131:4000";
    try {
      const res = await axios.post(`${url}/Target/Update`, req);
      setData(res.data.worker);
    } catch (e) {
      console.log(e);
    } finally {
      setIsReady(true);
    }
  };

  useEffect(() => {
    setData("허정운");
    getProcess(Data);
    return () => {};
  }, []);

  return isReady ? (
    <SafeAreaView style={styles.main}>
      <Chart name={"1호기"} />
      <Chart name={"2호기"} />
      <Chart name={"3호기"} />
    </SafeAreaView>
  ) : (
    <View style={styles.appLoading}>
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
  },
  appLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  viewContainer: {
    borderBottomWidth: 1,
  },
  workerName: {
    alignSelf: "center",
    borderColor: "#000000",
    borderRadius: 12,
    padding: 6,
  },
});

export default Index;
