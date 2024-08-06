import { View, SafeAreaView, Text, ActivityIndicator } from 'react-native';
import { Redirect, useRouter, useFocusEffect } from 'expo-router';
import commonStyles from '../styles/common';
import { COLORS } from '../constants';

// export default function Index() {
//     return <Redirect href="/home" />;
// }

export default function Index() {
    const router = useRouter();

    useFocusEffect(() => {
        // Call the replace method to redirect to a new route without adding to the history.
        // We do this in a useFocusEffect to ensure the redirect happens every time the screen
        // is focused.
        router.replace('/home');
    });

    // return (
    //     <View style={commonStyles.flexSafeArea}>
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
    //             <View style={{flexDirection:'row'}}>
    //                 <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 30 }}>Vrrroum</Text>
    //                 <Text style={{ color: COLORS.yellow, fontWeight: 'bold', fontSize: 30 }}>.</Text>
    //             </View>
    //             <ActivityIndicator style={{ marginTop: 10 }} />
    //         </View>
    //     </View>
    // );
}