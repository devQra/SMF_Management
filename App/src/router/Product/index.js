import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import productScreen from "../../screens/Product";

const Stack = createStackNavigator();
export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="productNav"
        component={productScreen}
      />
    </Stack.Navigator>
  );
}
