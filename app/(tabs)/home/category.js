import { FlatList, SafeAreaView, SectionList, ScrollView, View, Text, ActivityIndicator, TouchableOpacity, Dimensions, Modal } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import commonStyles from "../../../styles/common";
import ListedProducts from "../../../components/home/ListedProducts";
import React, { useEffect, useState, useCallback } from 'react';
import NoAccess from "../../../components/common/noaccess/NoAccess";
import { COLORS, SIZES } from "../../../constants";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const LocalizeFilterSection = (section) => {
    switch (section) {
        case 'brands':
            return 'Marques';
        case 'sizes':
            return 'Tailles';
        case 'pneu_saisons':
            return 'Saisons';
        case 'viscosities':
            return 'Viscosités';
        default:
            return section;
    }
}

const FilterModal = ({ filters, visible, onClose, onSelectFilter, onReset, selectedFilter, onValidate }) => {

    const renderFilterItem = ({ item, section }) => (
        <View>
            <TouchableOpacity
                style={{ padding: 10, backgroundColor: selectedFilter[section] && selectedFilter[section].includes(item) ? COLORS.darkgray : 'white', marginVertical: 5, borderRadius: 5 }}
                onPress={() => onSelectFilter(section, item)}
            >
                <Text>{item}</Text>
            </TouchableOpacity>
            <View style={{ height: 1, backgroundColor: COLORS.darkgray }}></View>
        </View>

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
                    <SectionList
                        sections={filters ? Object.keys(filters).map((section) => ({ title: LocalizeFilterSection(section), data: filters[section] })) : []}
                        renderItem={({ item, section, index }) => renderFilterItem({ item, section: section.title, index })}
                        keyExtractor={(item, index) => index.toString()}
                        renderSectionHeader={({ section: { title } }) => (
                            <View style={{ backgroundColor: 'white', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
                            </View>
                        )}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                    <View style={{ flexDirection: 'row', gap: 20, justifyContent: "center", padding: 10 }}>
                        <TouchableOpacity
                            onPress={onReset}
                            style={{ marginTop: 20, alignItems: 'center', backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 5, width: "30%" }}>
                            <Text style={{ color: COLORS.mainText }}>Effacer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onValidate} style={{ marginTop: 20, alignItems: 'center', backgroundColor: COLORS.mainText, padding: 10, borderRadius: 5, width: "70%" }}>
                            <Text style={{ color: "white" }}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const SortModal = ({ visible, onClose, onSelectSort, onReset, selectedSort, onValidate }) => {
    const sorts = ["Note efficacité", "Note environnement"];

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
                    <View style={{ flexDirection: 'row', gap: 20, justifyContent: "center", padding: 10 }}>
                        <TouchableOpacity
                            onPress={onReset}
                            style={{ marginTop: 20, alignItems: 'center', backgroundColor: COLORS.darkgray, padding: 10, borderRadius: 5, width: "30%" }}>
                            <Text style={{ color: COLORS.mainText }}>Effacer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onValidate} style={{ marginTop: 20, alignItems: 'center', backgroundColor: COLORS.mainText, padding: 10, borderRadius: 5, width: "70%" }}>
                            <Text style={{ color: "white" }}>Valider</Text>
                        </TouchableOpacity>
                    </View>
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
    const [tmpData, setTmpData] = useState();
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
    const cat = parent != "" ? parent : category;
    const subcat = parent != "" ? category : 'products';

    useEffect(() => {
        // const cat = parent != "" ? parent : category;
        // const subcat = parent != "" ? category : 'products';
        // api.getCategoryBatchFromApi(cat, subcat, null, setData, setLoading, setCursor);
        api.getCategoryProductsFromApi(cat, subcat, setData, setLoading);
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

        // if (Object.keys(selectedFilter).length == 0) {
        //     try {
        //         const cat = parent != "" ? parent : category;
        //         const subcat = parent != "" ? category : 'products';
        //         api.getCategoryBatchFromApi(cat, subcat, cursor, setData, setLoading, setCursor);
        //     } catch (error) {
        //         console.error('Erreur lors du chargement des données:', error);
        //     }
        // }
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

            if (newSelectedFilter[section].length === 0) {
                delete newSelectedFilter[section];
            }

            return newSelectedFilter;
        });
    }, []);

    const handleSelectSort = (sort) => {
        setSelectedSort(sort);
    };

    const showFilterModal = () => {
        setFilterVisible(true);
    };

    const onCloseFilter = () => {
        setFilterVisible(false);
    };

    const onCloseSort = () => {
        setSortVisible(false);
    };

    const onValidateSort = () => {
        setSortVisible(false);
        if (selectedSort === "Note efficacité") {
            data.sort((a, b) => b.score - a.score);
        } else if (selectedSort === "Note environnement") {
            data.sort((a, b) => b.env - a.env);
        }
        else {
            
        }
        // Envoyer le tri sélectionné à category.js
    };

    const onResetFilter = () => {
        setSelectedFilter({});
    }

    const onResetSort = () => {
        setSelectedSort("");
    }

    const onValidateFilter = async () => {
        if (Object.keys(selectedFilter).length > 0) {
            console.log(selectedFilter);
            setFilterVisible(false);
            const filteredData = await api.getApiFilterResults(selectedFilter, cat, subcat, setData);
            setData(filteredData);
        }

        else {
            setFilterVisible(false);
            api.getCategoryProductsFromApi(cat, subcat, setData, setLoading);
        }
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
                        <FilterModal filters={filters} visible={filterVisible} onClose={onCloseFilter} onSelectFilter={handleSelectFilter} onReset={onResetFilter} selectedFilter={selectedFilter} onValidate={onValidateFilter} />
                        <SortModal visible={sortVisible} onClose={onCloseSort} onSelectSort={handleSelectSort} selectedSort={selectedSort} onValidate={onValidateSort} onReset={onResetSort}/>
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