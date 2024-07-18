import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text, Platform, ActivityIndicator, TouchableOpacity, Keyboard, Button, TouchableWithoutFeedback } from "react-native";
import Trendings from "../../../components/home/Trendings";
import BestRated from "../../../components/home/BestRated";
import Categories from "../../../components/home/Categories";
import Offers from "../../../components/home/Offers";
import commonStyles from "../../../styles/common";
import ListedProducts from "../../../components/home/ListedProducts";
import { Icon, SearchBar } from '@rneui/themed';
import { COLORS } from "../../../constants";
import DisplayTextInformations from "../../../components/common/cards/DisplayTextInformations";
import { wh } from "../../../styles/common";
import { useNavigation } from "expo-router";
import ProtectedRoute from "../../../components/sub/ProtectedRoute";

const Home = () => {

  const [search, setSearch] = useState("");
  const [isSearching, setSearching] = useState(false);
  const [searchData, setSearchData] = useState();
  const [isLoading, setLoading] = useState(true);

  const navigation = useNavigation();

  const missingSearchDataText = "Aucuns résultats trouvés pour votre recherche.";

  const api = require('../../../api/api');

  const updateSearch = (search) => {
    setSearch(search);
  };

  const clearIcon = () => {
    return (
      <Icon name="cancel" type="material" onPress={() => { setSearch(""); }} />
    );
  };

  const resetSearchBar = () => {
    setSearching(false);
    setSearch("");
    setSearchData(undefined);
    setLoading(true);
    if (Keyboard.isVisible) {
      Keyboard.dismiss();
    }
  }

  const postKeywordsToApi = async () => {
    const data = [search];
    await api.PostSearchKeywordsToApi(JSON.stringify(data), setSearchData, setLoading);
  }

  return (
    <View style={commonStyles.body}>
      <SafeAreaView style={commonStyles.flexSafeArea}>
        {/* scrollEnabled={!isSearching} */}
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
          <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View>
                <View style={{ paddingLeft: 0.02 * ww, paddingRight: 0.02 * ww, display: isSearching ? 'flex' : null, flexDirection: isSearching ? 'row' : null }}>
                  {isSearching ?
                    <TouchableOpacity onPressIn={() => { resetSearchBar(); }} style={{ padding: 10, alignSelf: 'center' }}>
                      <Icon name="arrow-back" type="material" color={COLORS.yellow} size={30} />
                    </TouchableOpacity>
                    : null}
                  <SearchBar
                    placeholder="Rechercher un produit"
                    onChangeText={updateSearch}
                    editable={true}
                    value={search}
                    platform={"ios"}
                    searchIcon={null}
                    containerStyle={{ backgroundColor: COLORS.background, width: isSearching ? '85%' : 'auto' }}
                    inputContainerStyle={{ backgroundColor: COLORS.darkgray, borderRadius: 10 }}
                    inputStyle={{ backgroundColor: COLORS.darkgray, color: COLORS.lightwhite, paddingLeft: 10 }}
                    onFocus={() => {
                      setSearching(true);
                    }}
                    returnKeyType={"search"}
                    enablesReturnKeyAutomatically={true}
                    cancelButtonTitle={""}
                    clearIcon={search != "" ? clearIcon : null}
                    onSubmitEditing={() => { postKeywordsToApi(); }}
                  />
                </View>
                {isSearching ? (

                  <View style={commonStyles.flexFullScreenContainer}>
                    <ProtectedRoute>
                      {isLoading ? (
                        <ActivityIndicator />
                      ) : (
                        searchData.length === 0 ? <View style={{ height: wh }}><DisplayTextInformations text={missingSearchDataText} /></View> : <ListedProducts products={searchData} flatlist={false} />
                      )}
                    </ProtectedRoute>
                  </View>
                ) : null}
              </View>

            </TouchableWithoutFeedback>

            {!searchData ? (
              <View>
                <Offers />
                <Trendings />
                <BestRated />
                <Categories /></View>) : null}
          </View>

        </ScrollView>
      </SafeAreaView>
    </View >
  );
};

export default Home;