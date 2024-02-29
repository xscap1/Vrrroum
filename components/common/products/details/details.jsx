import { React, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import commonStyles from "../../../../styles/common";
import styles from "./detailsStyles";
import { COLORS, SIZES } from "../../../../constants";
import { Link } from "expo-router";

const Details = ({ product }) => {


    const [show, setShow] = useState(false);

    const Information = ({ label, text, border }) => {
        return (
            <View style={{ padding: 5 }}>
                {border ? <View style={{ width: '100%', height: 1, backgroundColor: COLORS.lightwhite }}></View> : null}
                <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5, padding: 5 }}>
                    <View style={{ width: '40%', padding: 5 }}><Text style={{ color: COLORS.lightwhite, fontSize: SIZES.medium }}>{label}</Text></View>
                    <View style={{ width: '60%', padding: 5 }}><Text style={{ color: COLORS.subwhite, fontSize: SIZES.medium, alignSelf: 'flex-end' }}>{text}</Text></View>
                </View>
            </View>
        );
    }

    return (
        <View>
            <TouchableOpacity onPress={() => {setShow(!show)}} style={{width: 100, height: 30, alignSelf: 'flex-end', marginTop: 20, marginBottom: 5}}><Text style={{color: COLORS.subwhite, fontSize: SIZES.medium, alignSelf: 'flex-end', padding: 5 }}>Voir plus</Text></TouchableOpacity>
            <View style={{ backgroundColor: COLORS.darkgray, padding: 5, borderRadius: 10}}>
                <Information label={'Nom'} text={product.name} border={false} />
                <Information label={'Marque'} text={product.brand} border={true} />
                {product.ref ?
                    <Information label={'Référence'} text={product.ref} border={true} />
                    : null}
                {product.reference ?
                    <Information label={'Référence'} text={product.reference} border={true} />
                    : null}
                <Information label={'Catégorie'} text={product.category} border={true} />

                {show ?
                    <View>
                        {product.viscosity ?
                            <Information label={'Viscosité'} text={product.viscosity} border={true} />
                            : null}
                        {product.norm_ACEA ?
                            <Information label={'Norme ACEA'} text={product.norm_ACEA} border={true} />
                            : null}
                        {product.norm_API ?
                            <Information label={'Norme API'} text={product.norm_API} border={true} />
                            : null}
                        {product.norm_man ?
                            <Information label={'Norme constructeur'} text={product.norm_man} border={true} />
                            : null}
                        {product.capacity ?
                            <Information label={'Capacité'} text={product.capacity} border={true} />
                            : null}
                        <Information label={'Scans'} text={product.scans} border={true} />
                        <Information label={'Note'} text={product.score} border={true} />
                    </View>
                    : null}

            </View>
        </View>
    );
};

export default Details;