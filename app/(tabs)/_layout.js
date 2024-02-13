import { Tabs } from "expo-router";
import commonStyles from "../../styles/common";
import { COLORS, icons } from "../../constants";
import { Image } from 'react-native';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const TabLayout = () => {
  const iconSize = 28;

  return (
    <Tabs initialRouteName="home"
      screenOptions={{
        tabBarStyle: commonStyles.tabBar,
        tabBarActiveTintColor: COLORS.yellow,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen name="home"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image
                style={{ width: iconSize, height: iconSize }}
                source={focused ? icons.home_selected : icons.home}
              />
            );
          },
        }} />

      <Tabs.Screen name="scan" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{ width: iconSize, height: iconSize }}
              source={focused ? icons.barcode_selected : icons.barcode}
            />
          );
        },
      }} />

      <Tabs.Screen name="profile" options={{
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          return (
            <Image
              style={{ width: iconSize, height: iconSize }}
              source={focused ? icons.user_selected : icons.user}
            />
          );
        },
      }} />
    </Tabs>
  )
};

export default TabLayout;