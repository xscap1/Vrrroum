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
      <Stack.Screen name="product" options={{
        headerStyle: commonStyles.header,
        headerShadowVisible: false,
        headerTitle: "",
      }} />
    </Stack>
  )
};

export default StackLayout;