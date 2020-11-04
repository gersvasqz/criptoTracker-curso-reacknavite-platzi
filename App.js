import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import CoinsStack from 'cryptoTracker2/src/components/coins/CoinsStack';
import FavoritesStack from 'cryptoTracker2/src/components/favorites/FavoritesStack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import Colors from 'cryptoTracker2/src/res/colors';

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        tabBarOptions={{
          tintColor: '#fefefe',
          style: {
            backgroundColor: Colors.blackPearl,
          },
        }}>
        <Tabs.Screen
          name="coins"
          component={CoinsStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                tyle={{ tintColor: color, width: size, height: size }}
                source={require('cryptoTracker2/src/assets/bank.png')}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({ size, color }) => (
              <Image
                tyle={{ tintColor: color, width: size, height: size }}
                source={require('cryptoTracker2/src/assets/star.png')}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
