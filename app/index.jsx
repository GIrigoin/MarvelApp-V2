import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./components/Home";
import Detail from "./components/Detail";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
