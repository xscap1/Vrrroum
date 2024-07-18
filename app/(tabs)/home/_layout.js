import { Stack } from "expo-router";
import commonStyles from "../../../styles/common";

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: "(tabs)",
// };

const StackLayout = () => {
  return (
    <Stack>
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
    </Stack>
  )
};

export default StackLayout;