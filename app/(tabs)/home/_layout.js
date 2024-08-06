import { Stack } from "expo-router";
import commonStyles from "../../../styles/common";
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
      <Stack.Screen name="bestRated" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="trends" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="subCategory" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="category" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="product" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="ingredients" options={{
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