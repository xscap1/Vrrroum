import { Stack } from "expo-router";
import commonStyles from "../styles/common";
import { AuthProvider } from "../components/auth/AuthContext";
import { SubscriptionProvider } from "../components/sub/SubcriptionContext";
// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: "(tabs)",
// };

const StackLayout = () => {
  return (
    <SubscriptionProvider>
      <AuthProvider>
        <Stack initialRouteName="(tabs)" >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </AuthProvider>
    </SubscriptionProvider>
  )
};

export default StackLayout;