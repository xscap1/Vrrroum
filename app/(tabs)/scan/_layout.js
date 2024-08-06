import { Stack } from "expo-router";
import { COLORS } from "../../../constants";

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: "(tabs)",
// };

const StackLayout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{
      headerTintColor: COLORS.yellow
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="product" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="notation" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
    </Stack>
  )
};

export default StackLayout;