import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FavoritesEmptyState = () => {
  return (
    <View style={style.container}>
      <Text style={style.text}>You don't have any favorite yet</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default FavoritesEmptyState;
