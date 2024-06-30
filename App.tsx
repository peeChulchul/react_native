import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import CategoriesScreen from "screens/CategoriesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MealsOverviewScreens from "screens/MealsOverviewScreens";
import MealDetailScreen from "screens/MealDetailScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoriteScreen from "screens/FavoriteScreen";
import { Ionicons } from "@expo/vector-icons";
import FavoritesContextProvider from "store/context/favorites-context";
import { Provider } from "react-redux";
import { store } from "store/redux/store";
import { Meal } from "data/dummy-data";
export type RootStackParamList = {
  Drawer: undefined;
  MealsOverview: { categoryId: string };
  MealDetail: { mealId: Meal["id"] };
};

export type RootDrawerParamList = {
  Categories: undefined;
  Favorites: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();
function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#351401" },
        headerTintColor: "white",
        sceneContainerStyle: { backgroundColor: "#3f2f25" },
        drawerContentStyle: { backgroundColor: "#3f2f25" },
        drawerInactiveTintColor: "white",
        drawerActiveBackgroundColor: "#e4baa1",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="list" />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="star" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle={"light-content"} />
      <Provider store={store}>
        <FavoritesContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: { backgroundColor: "#351401" },
                headerTintColor: "white",
                contentStyle: { backgroundColor: "#3f2f25" },
                // contentStyle: { backgroundColor: "white" },
              }}
            >
              <Stack.Screen
                // name="MealsCategories"
                name="Drawer"
                component={DrawerNavigator}
                options={{
                  title: "All Categories",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="MealsOverview"
                component={MealsOverviewScreens}
                // options={({ navigation, route }) => {
                //   const catId = route.params.categoryId;
                //   return {
                //     title: catId,
                //   };
                // }}
              />
              <Stack.Screen
                name="MealDetail"
                component={MealDetailScreen}
                options={{
                  title: "About the Meal",
                }}
                // options={{
                //   headerRight: () => {
                //     return <Button title="Tap me!" />;
                //   },
                // }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesContextProvider>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
