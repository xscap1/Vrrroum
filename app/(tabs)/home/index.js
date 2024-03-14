import React, { useState } from "react";
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
    const router = useRouter()

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
      setSearch(search);
    };

    const product1 = {
      brand: 'Meguiar\'s',
      name: 'Quick detailler', 
      category: 'Nettoyant jantes',
      isSponso: true,
      note: 2.5
    }

    const product2 = {
      brand: 'Total',
      name: 'Quarts 9000 5W40', 
      category: 'Huile moteur',
      isSponso: false,
      note: 9
    }

    return (
      <View style={commonStyles.body}>
        <SafeAreaView style={commonStyles.safeArea}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{paddingLeft: 0.02 * ww, paddingRight: 0.02 * ww,}}>
              <SearchBar
                  placeholder="Rechercher un produit"
                  onChangeText={updateSearch}
                  value={search}
                  platform={Platform.OS}
                  searchIcon={null}
                  containerStyle={{backgroundColor: COLORS.background}}
                  inputContainerStyle={{backgroundColor: COLORS.darkgray, borderRadius: 10}}
                  inputStyle={{backgroundColor: COLORS.darkgray, color: COLORS.lightwhite, paddingLeft: 10}}
                  onFocus={() => {}}
              />
            </View>
            {/* <ListedProducts products={[product1, product2]}/> */}
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