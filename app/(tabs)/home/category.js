import { SafeAreaView, ScrollView, View, Text, ActivityIndicator, TouchableOpacity, Dimensions, Modal } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import ListedProducts from "../../../components/home/ListedProducts";
import React, { useEffect, useState } from 'react';
import NoAccess from "../../../components/common/noaccess/NoAccess";
import { COLORS, SIZES } from "../../../constants";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Category = () => {
    const router = useRouter();

    const api = require('../../../api/api');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [cursor, setCursor] = useState(null);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterResult, setFilterresult] = useState(null);
    const [sortVisible, setSortVisible] = useState(false);

    const local = useLocalSearchParams();

    const category = local.category;
    const name = local.name;
    const parent = local.parent;
    const freeToView = local.free;

    useEffect(() => {
        const cat = parent != "" ? parent : category;
        const subcat = parent != "" ? category : 'products';
        api.getCategoryBatchFromApi(cat, subcat, null, setData, setLoading, setCursor);
    }, []);

    const fetchData = () => {
        try {
            const cat = parent != "" ? parent : category;
            const subcat = parent != "" ? category : 'products';
            api.getCategoryBatchFromApi(cat, subcat, cursor, setData, setLoading, setCursor);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };

    const FilterModal = ({ visible, onClose }) => {
        return (
            <Modal
                animation="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    onClose(null);
                }}
                style={{ flex: 1 }}
            >
                <Text>Test</Text>
            </Modal>);
    }

    const showFilterModal = () => {
        setFilterVisible(true);
        const handleModalClose = (result) => {
            setFilterVisible(false);
            setFilterresult(result);
            resolve(result);
        };
        // Utiliser un effet secondaire pour lier la fonction de fermeture
        setFilterresult({ handleModalClose });
    };

    const CategoryContent = (
        <View style={commonStyles.body}>
            <SafeAreaView style={commonStyles.flexSafeArea}>
                <Stack.Screen
                    options={{
                        headerStyle: commonStyles.header,
                        headerShadowVisible: false,
                        headerTitle: "",
                    }}
                />
                <View style={commonStyles.flexContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={commonStyles.heading}>{name}</Text>
                        <View style={{ marginTop: 10, flexDirection: 'row', gap: 20, alignItems: 'center', height: 0.05 * screenHeight }}>
                            <TouchableOpacity
                                style={{ alignItems: 'center', width: 0.2 * screenWidth, backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 10 }}
                                onPress={() => { showFilterModal(); }}
                            >
                                <Text>Filtrer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ alignItems: 'center', width: 0.2 * screenWidth, backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 10 }}
                                onPress={() => { setSortVisible(true) }}
                            >
                                <Text>Trier</Text>
                            </TouchableOpacity>
                        </View>
                        {filterVisible ? <FilterModal visible={filterVisible} onClose={()=>{setFilterVisible(false);}}/>: null}    
                        {isLoading ? <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator /></View> : (
                            <ListedProducts products={data} onEndOnPress={fetchData} />
                        )}
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            {CategoryContent}
        </View>
    );
};

export default Category;