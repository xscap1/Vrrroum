import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./footerStyles";
import {icons } from "../../../constants";

const Footer = ({selected}) => {
    router = useRouter();
    const [selectedIcon, setSelectedIcon] = useState("Home");

    React.useEffect(() => {
        if (selected === "Home" || selected === "Scan" || selected === "Profile") {
          setSelectedIcon(selected);
        }
    }, [selected]);

    return (
        <View>
            <View style={styles.footer}>
                <TouchableOpacity hitSlop={{left: 40, right: 40}} onPress={ () => {
                    if (selectedIcon != "Home") router.replace(`/home`);
                }}>
                    <Image
                        style={styles.icon} 
                        source={selectedIcon === "Home" ? icons.home_selected : icons.home}/>
                    
                </TouchableOpacity>

                <TouchableOpacity hitSlop={{left: 40, right: 40}} onPress={ () => {
                    if (selectedIcon != "Scan") router.replace(`/scan`);
                }}>
                    <Image
                        style={styles.icon} 
                        source={selectedIcon === "Scan" ? icons.barcode_selected : icons.barcode}/>
                    
                </TouchableOpacity>

                <TouchableOpacity hitSlop={{left: 40, right: 40}} onPress={ () => {
                    if (selectedIcon != "Profile") router.replace(`/profile`);
                }}>
                    <Image
                        style={styles.icon} 
                        source={selectedIcon === "Profile" ? icons.user_selected : icons.user}/>
                    
                </TouchableOpacity>
            </View>
        </View>
        
    );
};

export default Footer;