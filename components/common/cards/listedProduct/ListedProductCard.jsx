import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./listedProductCardStyles";
import { COLORS, SIZES } from "../../../../constants";

const ListedProductCard = ({product}) => {

    const wrapperStyle = product.isSponso == true ? styles.wrapperSponso : styles.wrapper;

    const colors = [COLORS.notation1, COLORS.notation2, COLORS.notation3, COLORS.notation4, COLORS.notation5];

    const noteToColor = (note) => {
        const tranche = Math.floor(note / 2) + 1;

        if (tranche > 0 && tranche <= colors.length)
            return colors[tranche-1];
        return COLORS.invalidNotation;
    };

    return (
        <View style={commonStyles.subcontainer}>
            <View style={wrapperStyle}>
                <View style={styles.imgContiner}>
                    <Image 
                    source={{
                        uri: "https://s1.medias-norauto.fr/images_produits/70382800475/400x400/nettoyant-jantes-hot-rims-meguiar-s-710-ml--356783.jpg"
                    }}
                    style={styles.img}
                    />
                </View>
                <View style={styles.datasContainer}>
                    {product.isSponso==true ? 
                    <View style={styles.sponsoContainer}>
                        <Text style={styles.sponso}> Sponsorisé </Text>
                    </View> : null}
                    <Text style={styles.branded}> {product.brand} | {product.category} </Text>
                    <Text style={styles.name}> {product.name} </Text>
                    <View style={styles.noteContainer}>
                        <View style={{padding: 10, borderRadius: 10, width: 50, backgroundColor: noteToColor(product.note)}}>
                            <Text style={styles.noteText}>{product.note}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ListedProductCard;