import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import commonStyles from "../../../../styles/common";
import SeeMoreButton from "../../buttons/SeeMoreButton";
import { useNavigation } from "expo-router";

const ProductNotFoundCard = () => {

    const navigation = useNavigation();

    return (
        <View style={commonStyles.flexContainer}>
            <View style={commonStyles.subcontainer}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={commonStyles.text}>Produit introuvable</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={commonStyles.subtextCenter}>Vous pourrez bientôt participer à l'agrandissement de Vrrroum en renseignant les données d'un produit manquant !</Text>
                    </View>
                </View>
            </View>
        </View>);
}

export default ProductNotFoundCard;

