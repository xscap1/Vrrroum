import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./listedProductCardStyles";

const ListedProductCard = ({product, colorNote}) => {

    const wrapperStyle = product.isSponso == true ? styles.wrapperSponso : styles.wrapper;

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
                        <View style={{borderRadius: 100, width: 40, height: 40, justifyContent: 'center', backgroundColor: colorNote}}>
                            <Text style={commonStyles.noteText}>{product.note}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ListedProductCard;