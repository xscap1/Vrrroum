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
      <Stack.Screen name="product" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="login" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="account" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="purchaseCompleted" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerBackVisible: false,
        gestureEnabled: false
      }} />
      <Stack.Screen name="resetPassword" options={{
        headerShadowVisible: false,
        headerBackTitleVisible: false
      }} />
      <Stack.Screen name="deleteAccount" options={{
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