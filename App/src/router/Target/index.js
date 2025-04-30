import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import targetScreen from "../../screens/Target";

const Stack = createStackNavigator();
export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="targetNav"
        component={targetScreen}
      />
    </Stack.Navigator>
  );
}
