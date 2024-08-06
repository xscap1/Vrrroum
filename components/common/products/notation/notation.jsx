import { React, useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import commonStyles from "../../../../styles/common";
import { COLORS, SIZES, icons } from "../../../../constants";
import Ingredient from "./ingredient";
import ListedButton from "../../buttons/ListedButton";
import { useNavigation } from "expo-router";

const Notation = ({ total, note, env, ingredients, criteria, effectiveness, durability }) => {

    const [ingredientData, setIngredientData] = useState();
    const [loading, setLoading] = useState(true);
    const utils = require('../../../../constants/utils');
    const api = require('../../../../api/api');
    const navigation = useNavigation();
    const formattedNote = utils.formatNote(note);

    // useEffect(() => {
    //     const fetchIngredients = async () => {
    //         await api.PostIngredientsToApi(JSON.stringify(ingredients), setIngredientData, setLoading);
    //     };

    //     fetchIngredients();
    // }, []);

    return (
        <View style={{ backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 10, marginTop: 20, width: '100%' }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', gap: 20, justifyContent: 'center', alignContent: 'center', marginBottom: 10 }}>
                <View style={{ width: 30, height: 30, backgroundColor: utils.noteToColor(note), borderRadius: 100, justifyContent: 'center', alignSelf: 'center' }}>

                </View>
                <View>
                    {note > 0 ?
                        <View>
                            <Text style={commonStyles.textBold}>{utils.formatNote(note)}/10</Text>
                        </View>
                        :
                        null
                    }
                    <Text style={commonStyles.subtext}>{utils.noteToText(note)}</Text>
                </View>
            </View>
            <View>
                {note > 0 ? null : <Text style={commonStyles.smalltextCenter}>Ce produit ne peut etre noté par manque d'informations. L'équipe Vrrroum travaille actuellement pour noter ce produit.</Text>}
            </View>
            <View style={{ marginTop: 10 }}>
                {note > 0 ?
                    <TouchableOpacity onPress={() => { navigation.navigate('notation', { criteria: criteria, effectiveness: effectiveness, durability: durability }); }}>
                        <View style={{
                            flexDirection: "row",
                            height: 50,
                            backgroundColor: COLORS.background,
                            borderRadius: 10,
                            justifyContent: 'space-between',
                            padding: 10
                        }}>
                            <View style={{
                                alignSelf: 'center'
                            }}>
                                <Text style={commonStyles.subtext}>Détail de la notation</Text>
                            </View>
                            <Image source={icons.list} style={{
                                height: 30,
                                width: 30,
                                alignSelf: 'center'
                            }} />
                        </View>
                    </TouchableOpacity>
                    :
                    null}

            </View>

        </View>
    );
};

export default Notation;