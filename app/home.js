import React, { useState } from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import Trendings from "../components/home/Trendings";
import BestRated from "../components/home/BestRated";
import Categories from "../components/home/Categories";
import Offers from "../components/home/Offers";
import commonStyles from "../styles/common";
import Footer from "../components/common/footer/Footer";
import { SearchBar } from '@rneui/themed';
import { COLORS } from "../constants";

const Home = () => {
    const router = useRouter()

    const [search, setSearch] = useState("");

    const updateSearch = (search) => {
      setSearch(search);
    };

    return (
      <View style={commonStyles.body}>
        <SafeAreaView style={commonStyles.safeArea}>
          <Stack.Screen
            options={{
                animation: 'none',
                headerStyle: commonStyles.header,
                headerShadowVisible: false,
                headerTitle: "",
                headerBackVisible : false
            }}
          />
          
          <ScrollView style={{height:'90%'}}showsVerticalScrollIndicator={false}>
            <View style={{paddingLeft: 0.02 * ww, paddingRight: 0.02 * ww,}}>
              <SearchBar
                  placeholder="Rechercher un produit"
                  onChangeText={updateSearch}
                  value={search}
                  platform="ios"
                  containerStyle={{backgroundColor: COLORS.background}}
                  inputContainerStyle={{backgroundColor: COLORS.darkgray}}
                  inputStyle={{backgroundColor: COLORS.darkgray, color: COLORS.lightwhite}}
              />
            </View>
            <Offers />
            <Trendings />
            <BestRated />
            <Categories />
          </ScrollView>
          <View style={{height:'5%'}}>
            <Footer selected={"Home"}/>
          </View>
        </SafeAreaView>
      </View>
    );
  };
  
  export default Home;