import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import totalScreen from "../../screens/Total";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="totalNav"
        component={totalScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
