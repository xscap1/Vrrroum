import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./previewCardStyles";
import {COLORS, SIZES } from "../../../../constants"

const PreviewCard = ({product}) => {
    return (
        <View style={styles.wrapper}>
            <View style={{height:'78%'}}>
                <Image 
                source={{
                    uri: "https://s1.medias-norauto.fr/images_produits/70382800475/400x400/nettoyant-jantes-hot-rims-meguiar-s-710-ml--356783.jpg"
                }}
                style={styles.img}
                />
            </View>

            <View>
                <View style={styles.categoryBrandWrapper}>

                <View style={styles.flexchild}>
                    <View style={styles.brandWrap}>
                        <Text style={styles.brand}>Marque</Text>
                    </View>
                </View>

                <View style={styles.flexchild}>
                    <View style={styles.categoryWrap}>
                        <Text style={styles.brand}>Catégorie</Text>
                    </View>
                </View>

                </View>

                <View style={{marginTop: 10}}>
                    <View style={styles.categoryBrandWrapper}>
                        <View style={styles.brandWrap}>
                            <Text style={styles.name}>Nom</Text>
                        </View>

                        <View  style={styles.brandWrap}>
                            <Text style={styles.rate}>8/10</Text>
                        </View>
                    </View>
                </View>
            </View>

            
        </View>
    );
};

export default PreviewCard;