import React from "react";
import { Ionicons, Entypo, AntDesign, Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import TotalStack from "./Total";
import ProcessStack from "./Process";
import TargetStack from "./Target";
import ProductStack from "./Product";
import SettingStack from "./Setting";

const Tab = createBottomTabNavigator();

const Root = ({ navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Total"
        component={TotalStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Feather
                name="monitor"
                style={{ color: focused ? "#00B386" : "#404040" }}
                size={25}
                color="black"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Process"
        component={ProcessStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="areachart"
                style={{ color: focused ? "#00B386" : "#404040" }}
                size={25}
                color="black"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Target"
        component={TargetStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Entypo
                name="circular-graph"
                style={{ color: focused ? "#00B386" : "#404040" }}
                size={25}
                color="black"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Product"
        component={ProductStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <AntDesign
                name="copy1"
                style={{ color: focused ? "#00B386" : "#404040" }}
                size={25}
                color="black"
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingStack}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons
                name="settings-sharp"
                size={25}
                style={{ color: focused ? "#00B386" : "#404040" }}
                color="black"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const Index = () => {
  return (
    <NavigationContainer independent={true}>
      <Root />
    </NavigationContainer>
  );
};

export default Index;
