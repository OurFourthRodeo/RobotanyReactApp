import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { Stack } from "./StackNav";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Contact" component={Stack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;