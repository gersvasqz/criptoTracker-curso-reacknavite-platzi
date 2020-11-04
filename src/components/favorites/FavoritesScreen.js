import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import CoinsItem from 'cryptoTracker2/src/components/coins/CoinsItems';
import FavoritesEmptyState from './FavoriteEmptyState';
import Colors from 'cryptoTracker2/src/res/colors';
import Storage from 'cryptoTracker2/src/libs/storage';

class FavoritesScreen extends React.Component {
  state = {
    favorites: [],
  };

  componentDidMount = () => {
    this.getFavorites();

    this.props.navigation.addListener('focus', this.getFavorites);
  };

  componentWillUnmount() {
    this.props.navigation.removeListener('focus', this.getFavorites);
  }

  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter((key) => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map((fav) => JSON.parse(fav[1]));
      this.setState({ favorites });
    } catch (e) {
      console.error('FavoritesScreen getFavorites error', e);
    }
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', { coin });
  };

  render() {
    const { favorites } = this.state;
    return (
      <View style={style.container}>
        {favorites.length === 0 && <FavoritesEmptyState />}
        {favorites.length > 0 && (
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
              <CoinsItem item={item} onPress={() => this.handlePress(item)} />
            )}
          />
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.charade,
    flex: 1,
  },
});

export default FavoritesScreen;
