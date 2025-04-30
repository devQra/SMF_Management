import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import settingScreen from "../../screens/Setting/index";

const Stack = createStackNavigator();
export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="settingNav"
        component={settingScreen}
      />
    </Stack.Navigator>
  );
}
