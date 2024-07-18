import { React, useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import commonStyles from "../../../../styles/common";
import { COLORS, SIZES, icons } from "../../../../constants";

const Environnement = ({ env, hazard }) => {

    const [envDanger, setEnvDanger] = useState(false);
    const utils = require('../../../../constants/utils');
    const envHazards = ['GHS09', 'H400', 'H401', 'H402', 'H410', 'H411', 'H412', 'H413', 'H420'];
    const envDangerText = "Ce produit contient des composants nuisibles pour l'environnement, la faune aquatique, ou l'atmosphère s'il est déversé dans la nature. Il est fortement déconseillé de le jeter dans la nature."
    const noEnvDangerText = "Ce produit ne contient pas de composants nuisibles pour l'environnement, la faune aquatique ou l'atmosphère.";
    const careText = "Il est fortement déconseillé d'avaler, d'inhaler et de mettre le produit en contact avec vos yeux ou vos plaies. Tenir hors de portée des enfants. ";

    const envNote = env < 0 ? 1 : (env / 10).toFixed(1);
    const envScore = utils.envToScore(envNote);

    useEffect(() => {
        const hasCommon = utils.hasCommonItems(hazard, envHazards);
        setEnvDanger(hasCommon);
    }, []);

    return (
        <View style={{ backgroundColor: COLORS.darkgray, padding: 5, borderRadius: 10, marginTop: 20, width: '100%', padding: 10, gap: 20 }}>
            <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
                <Text style={{ color: 'white', alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}>Éco-score</Text>

                <View style={{
                    borderWidth: 2,
                    justifyContent: 'center',
                    borderStyle: 'solid',
                    borderRadius: 100,
                    borderColor: utils.noteToColor(envNote),
                    backgroundColor: utils.noteToColor(envNote),
                    width: 40,
                    height: 40,
                    alignItems: 'center',
                }}>
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: '500',
                        fontSize: SIZES.medium,
                        width: 40
                    }}>{envScore}</Text>
                </View>
            </View>

            <View style={{ gap: 10 }}>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', alignSelf: 'center', textAlign: 'center', fontWeight: 'bold' }}>Éco-danger</Text>
                    </View>
                    <View style={{ backgroundColor: 'white', borderRadius: 7, justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                        <Image source={icons.hazard_env_aquatic} style={{ width: 30, height: 30 }} />
                    </View>
                </View>
                <View>
                    <Text style={{ color: COLORS.subwhite }}>{envDanger ? envDangerText : noEnvDangerText}</Text>
                </View>
            </View>
            <View style={{ gap: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Précaution</Text>
                <Text style={{ color: COLORS.subwhite }}>{careText}</Text>
            </View>
        </View>
    );
};

export default Environnement;