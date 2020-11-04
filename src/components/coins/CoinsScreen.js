import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import Http from 'cryptoTracker2/src/libs/http';
import CoinsItems from './CoinsItems';
import Colors from 'cryptoTracker2/src/res/colors';
import CoinSearch from './CoinSearch';

class CoinsScreen extends React.Component {
  state = {
    coins: [],
    allCoins: [],
    loading: false,
  };

  componentDidMount = () => {
    this.getCoins();
  };

  getCoins = async () => {
    this.setState({ loading: true });
    const coins = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({ coins: coins.data, allCoins: coins.data, loading: false });
  };

  handlePress = (coin) => {
    this.props.navigation.navigate('CoinDetail', { coin });
  };

  handleSearch = (query) => {
    const { allCoins } = this.state;

    const coinsFiltered = allCoins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase()),
    );

    this.setState({ coins: coinsFiltered });
  };

  render() {
    const { coins, loading } = this.state;
    return (
      <View style={style.container}>
        <CoinSearch onChange={this.handleSearch} />
        {loading ? (
          <ActivityIndicator style={style.loader} color="#fff" size="large" />
        ) : null}
        <FlatList
          data={coins}
          renderItem={({ item }) => (
            <CoinsItems
              item={item}
              onPress={() => {
                this.handlePress(item);
              }}
            />
          )}
        />
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.charade,
  },
  tittleText: {
    color: '#fff',
    textAlign: 'center',
  },
  btn: {
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText: {
    color: '#fff',
    textAlign: 'center',
  },
  loader: {
    marginTop: 60,
  },
});

export default CoinsScreen;
