import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import processScreen from "../../screens/Process";

const Stack = createStackNavigator();
export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="processNav"
        component={processScreen}
      />
    </Stack.Navigator>
  );
}
