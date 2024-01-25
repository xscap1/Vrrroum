import { Stack } from "expo-router";
import commonStyles from "../styles/common";

// export const unstable_settings = {
//   // Ensure any route can link back to `/`
//   initialRouteName: "(tabs)",
// };

const StackLayout = () => {
  return (
    <Stack initialRouteName="(tabs)" >
      <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
    </Stack>
  )
};

export default StackLayout;