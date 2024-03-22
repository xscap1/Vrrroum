import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, View, Text, Platform } from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import Trendings from "../../../components/home/Trendings";
import BestRated from "../../../components/home/BestRated";
import Categories from "../../../components/home/Categories";
import Offers from "../../../components/home/Offers";
import commonStyles from "../../../styles/common";
import ListedProducts from "../../../components/home/ListedProducts";
import { SearchBar } from '@rneui/themed';
import { COLORS } from "../../../constants";

const Home = () => {

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
      <View style={commonStyles.body}>
        <SafeAreaView style={commonStyles.safeArea}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingLeft: 0.02 * ww, paddingRight: 0.02 * ww, }}>
              <SearchBar
                placeholder="Rechercher un produit"
                onChangeText={updateSearch}
                value={search}
                platform={Platform.OS}
                searchIcon={null}
                containerStyle={{ backgroundColor: COLORS.background }}
                inputContainerStyle={{ backgroundColor: COLORS.darkgray, borderRadius: 10 }}
                inputStyle={{ backgroundColor: COLORS.darkgray, color: COLORS.lightwhite, paddingLeft: 10 }}
                onFocus={() => { }}
              />
            </View>
            <Offers />
            <Trendings />
            <BestRated />
            <Categories />
          </ScrollView>
        </SafeAreaView>
      </View>
  );
};

export default Home;