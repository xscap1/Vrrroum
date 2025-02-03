import { FlatList, SafeAreaView, ScrollView, View, Text, ActivityIndicator, TouchableOpacity, Dimensions, Modal } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import ListedProducts from "../../../components/home/ListedProducts";
import React, { useEffect, useState, useCallback } from 'react';
import NoAccess from "../../../components/common/noaccess/NoAccess";
import { COLORS, SIZES } from "../../../constants";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const FilterModal = ({ filters, visible, onClose, onSelectFilter, onReset, selectedFilter }) => {

    const renderFilterItem = ({ item, section }) => (
        <TouchableOpacity
            style={{ padding: 10, backgroundColor: selectedFilter[section] && selectedFilter[section].includes(item) ? COLORS.darkgray : 'white', marginVertical: 5, borderRadius: 5 }}
            onPress={() => onSelectFilter(section, item)}
        >
            <Text>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ width: '100%', height: '90%', backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Filtres</Text>
                        <TouchableOpacity onPress={onClose} style={{ padding: 7, backgroundColor: COLORS.darkgray, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center" }}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {filters ?
                            Object.keys(filters).map((section, index) => (
                                <View key={index} style={{ marginBottom: 20, flex: 1}}>
                                    <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{section.charAt(0).toUpperCase() + section.slice(1)}</Text>
                                    <FlatList
                                        data={filters[section]}
                                        renderItem={({ item }) => renderFilterItem({ item, section })}
                                        keyExtractor={(item, index) => `${section}-${index}`}
                                        showsVerticalScrollIndicator={false}
                                    />
                                </View>
                            )) : <ActivityIndicator />}
                        <View style={{ flexDirection: 'row', gap: 20, justifyContent: "center", padding: 10 }}>
                            <TouchableOpacity
                                onPress={onReset}
                                style={{ marginTop: 20, alignItems: 'center', backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 5, width: "30%" }}>
                                <Text style={{ color: COLORS.mainText }}>Effacer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose} style={{ marginTop: 20, alignItems: 'center', backgroundColor: COLORS.mainText, padding: 10, borderRadius: 5, width: "70%" }}>
                                <Text style={{ color: "white" }}>Valider</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const SortModal = ({ visible, onClose, onSelectSort, selectedSort }) => {
    const sorts = ["Prix croissant", "Prix décroissant", "Popularité"];

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ width: '100%', height: '90%', backgroundColor: 'white', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Trier</Text>
                        <TouchableOpacity onPress={onClose} style={{ padding: 7, backgroundColor: COLORS.darkgray, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: "center" }}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        {sorts.map((sort, index) => (
                            <TouchableOpacity
                                key={index}
                                style={{ padding: 10, backgroundColor: selectedSort === sort ? COLORS.darkgray : 'white', marginVertical: 5, borderRadius: 5 }}
                                onPress={() => onSelectSort(sort)}
                            >
                                <Text>{sort}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={onClose} style={{ marginTop: 20, alignItems: 'center', backgroundColor: COLORS.primary, padding: 10, borderRadius: 5 }}>
                        <Text style={{ color: 'white' }}>Valider</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const Category = () => {
    const router = useRouter();

    const api = require('../../../api/api');
    const filter = require('../../../constants/filters/filters');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [cursor, setCursor] = useState(null);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filterResult, setFilterresult] = useState(null);
    const [sortVisible, setSortVisible] = useState(false);
    const [selectedFilter, setSelectedFilter] = useState({});
    const [selectedSort, setSelectedSort] = useState(null);
    const [filters, setFilters] = useState(null);
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

    useEffect(() => {
        const fetchFilters = () => {
            try {
                const cat = parent != "" ? parent : category;
                const subcat = parent != "" ? category : 'products';
                var res = filter.getFilter(subcat == 'products' ? cat : subcat)
                setFilters(res);
            } catch (error) {
                console.error('Erreur lors du chargement des filtres:', error.message);
            }
        };

        fetchFilters();
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

    const handleSelectFilter = useCallback((section, filter) => {
        setSelectedFilter((prevSelectedFilter) => {
            const newSelectedFilter = { ...prevSelectedFilter };
            if (!newSelectedFilter[section]) {
                newSelectedFilter[section] = [];
            }
            if (newSelectedFilter[section].includes(filter)) {
                newSelectedFilter[section] = newSelectedFilter[section].filter((item) => item !== filter);
            } else {
                newSelectedFilter[section].push(filter);
            }
            console.log(newSelectedFilter);
            return newSelectedFilter;
        });
    }, []);

    const handleSelectSort = (sort) => {
        setSelectedSort(sort);
    };

    const showFilterModal = () => {
        setFilterVisible(true);
    };

    const validateFilter = () => {
        setFilterVisible(false);
        // Envoyer le filtre sélectionné à category.js
    };

    const validateSort = () => {
        setSortVisible(false);
        // Envoyer le tri sélectionné à category.js
    };

    const onResetFilter = () => {
        setSelectedFilter({});
    }

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
                                <Text style={{ color: COLORS.mainText }}>Filtrer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ alignItems: 'center', width: 0.2 * screenWidth, backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 10 }}
                                onPress={() => { setSortVisible(true) }}
                            >
                                <Text style={{ color: COLORS.mainText }}>Trier</Text>
                            </TouchableOpacity>
                        </View>
                        <FilterModal filters={filters} visible={filterVisible} onClose={validateFilter} onSelectFilter={handleSelectFilter} onReset={onResetFilter} selectedFilter={selectedFilter} />
                        <SortModal visible={sortVisible} onClose={validateSort} onSelectSort={handleSelectSort} selectedSort={selectedSort} />
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