import { Stack } from "expo-router";

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: "(tabs)",
// };

const StackLayout = () => {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="pricing" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="subscriptionManager" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="favs" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="history" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="help" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="bugReport" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
    </Stack>
  )
};

export default StackLayout;