import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import store from './store/index';
import { persistStore } from "redux-persist";
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen';


let persistor = persistStore(store);
const Stack = createStackNavigator();

const OpenAIApp: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen}
              options={{
                headerLeft: null, // Disable the back button
                title: 'Dashboard', // Set a custom title if needed
              }} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default OpenAIApp;
