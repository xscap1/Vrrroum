import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import commonStyles from "../../../../styles/common";
import SeeMoreButton from "../../buttons/SeeMoreButton";
import { useNavigation } from "expo-router";
import ScreenHeaderBtn from '../../buttons/SeeMoreButton';
import ReportMissingData from './reportMissingData';

const ProductNotFoundCard = (code) => {

    const navigation = useNavigation();

    const [displayData, setDisplayData] = useState(false);

    return (
        <View style={commonStyles.flexContainer}>
            {displayData ? <ReportMissingData code={code.code} /> :
                <View style={commonStyles.subcontainer}><View style={{ alignItems: 'center' }}>
                    <Text style={commonStyles.text}>Produit introuvable</Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={commonStyles.subtextCenter}>Vous pouvez contribuer à l'agrandissement de Vrrroum en renseignant les informations manquantes ! Assurez-vous que vos renseignements soient corrects.</Text>
                        <ScreenHeaderBtn text={"Renseigner les informations"} handlePress={() => { setDisplayData(true); }} />
                    </View>
                </View>
                </View>}


        </View>);
}

export default ProductNotFoundCard;

