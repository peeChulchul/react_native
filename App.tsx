import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "screens/ManageExpense";
import RecentExpenses from "screens/RecentExpenses";
import AllExpenses from "screens/AllExpenses";
import { GlobalStyles } from "constants/style";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "components/UI/IconButton";
import ExpensesContextProvider from "store/expenses-context";

export type RootStackParamList = {
  ExpensesOverview: undefined;
  ManageExpense?: { expenseId: string };
};

export type RootBottomTabsParamList = {
  RecentExpenses: undefined;
  AllExpenses: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator<RootBottomTabsParamList>();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              onPress={() => {
                navigation.navigate("ManageExpense");
              }}
              color={tintColor}
              size={24}
              icon="add"
            />
          );
        },
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon({ color, size }) {
            return (
              <Ionicons name="hourglass" size={size} color={color}></Ionicons>
            );
          },
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon({ color, size }) {
            return (
              <Ionicons name="calendar" size={size} color={color}></Ionicons>
            );
          },
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle="default" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              options={{
                headerShown: false,
              }}
              component={ExpensesOverview}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{ presentation: "modal" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
