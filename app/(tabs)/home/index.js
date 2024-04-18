import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, Platform, ActivityIndicator, TouchableOpacity, Keyboard } from "react-native";
import { Stack, useRouter, Link } from "expo-router";
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

const Home = () => {

  const [search, setSearch] = useState("");
  const [isSearching, setSearching] = useState(false);
  const [searchData, setSearchData] = useState();
  const [isLoading, setLoading] = useState(true);

  const missingSearchDataText = "Aucuns résultats trouvés pour votre recherche.";

  const api = require('../../../api/api');

  const updateSearch = (search) => {
    setSearch(search);
  };

  const clearIcon = () => {
    return (
      <Icon name="cancel" type="material" onPress={resetSearchBar} />
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
      <SafeAreaView style={commonStyles.safeArea}>
        {/* scrollEnabled={!isSearching} */}
        <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={"always"}>
          <View style={{ paddingLeft: 0.02 * ww, paddingRight: 0.02 * ww, display: 'flex', flexDirection: 'row' }}>
            {isSearching ?
              <TouchableOpacity onPressIn={() => { resetSearchBar(); }} style={{ padding: 10, alignSelf: 'center' }}>
                <Icon name="arrow-back" type="material" color={COLORS.yellow} size={30} />
              </TouchableOpacity>
              : null}
            <SearchBar
              placeholder="Rechercher un produit"
              onChangeText={updateSearch}
              value={search}
              platform={Platform.OS}
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
              onSubmitEditing={() => { postKeywordsToApi(); console.log(isSearching); }}
            />
          </View>
          {isSearching ? (
            <View style={commonStyles.flexFullScreenContainer}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                searchData.length == 0 ? <View style={{ height: wh }}><DisplayTextInformations text={missingSearchDataText} /></View> : <ListedProducts products={searchData} flatlist={false} />
              )}
                </View>
          ) : null}
              {!searchData ? (<View><Offers />
                <Trendings />
                <BestRated />
                <Categories /></View>) : null}
            </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;