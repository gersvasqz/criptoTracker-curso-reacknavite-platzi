/* eslint-disable react/no-did-mount-set-state */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SectionList,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import Colors from 'cryptoTracker2/src/res/colors';
import Http from 'cryptoTracker2/src/libs/http';
import CoinMarketItem from './coinMarketItem';
import Storage from 'cryptoTracker2/src/libs/storage';

class CoinDetailScreen extends React.Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
    showFavorite: false,
  };

  async componentDidMount() {
    const { coin } = this.props.route.params;
    this.props.navigation.setOptions({ title: coin.symbol });
    await this.getMarkets(coin.id);
    this.setState({ coin }, () => {
      this.getFavorite();
    });
  }

  getSymbolIcon = (name) => {
    if (name) {
      return `https://c1.coinlore.com/img/25x25/${name}.png`;
    }
  };

  getSeccions = (coin) => {
    const sections = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];

    return sections;
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

    const markets = await Http.instance.get(url);
    this.setState({ markets });
  };

  toogleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favStr = await Storage.instance.get(key);

      if (favStr) {
        this.setState({ isFavorite: true });
      }
      this.setState({ showFavorite: true });
    } catch (e) {
      console.error('CoinDetailScreen getFavorite error', e);
    }
  };

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const storage = await Storage.instance.store(key, coin);

    if (storage) {
      this.setState({ isFavorite: true });
    }
  };

  removeFavorite = () => {
    Alert.alert('Remove favorite', 'Are yu sure?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'Remove',
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;
          await Storage.instance.remove(key);
          this.setState({ isFavorite: false });
        },
        style: 'destructive',
      },
      {
        text: 'another butoom',
        onPress: () => {},
        style: 'default',
      },
    ]);
  };

  render() {
    const { coin, markets, isFavorite, showFavorite } = this.state;
    return (
      <View style={style.container}>
        <View style={style.subHeader}>
          <View style={style.row}>
            <Image
              style={style.iconImg}
              source={{ uri: this.getSymbolIcon(coin.nameid) }}
            />
            <Text style={style.titleText}>{coin.name}</Text>
          </View>
          <View>
            {showFavorite && (
              <Pressable
                style={[
                  style.btnFavorite,
                  isFavorite ? style.btnFavoriteRemove : style.btnFavoriteAdd,
                ]}
                onPress={this.toogleFavorite}>
                <Text style={style.btnFavoriteText}>
                  {isFavorite ? 'Remove' : 'Add'} favorite
                </Text>
              </Pressable>
            )}
          </View>
        </View>
        <SectionList
          style={style.section}
          sections={this.getSeccions(coin)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={style.sectionText}>
              <Text style={style.itemText}>{item}</Text>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View style={style.sectionHeader}>
              <Text style={style.sectionText}>{section.title}</Text>
            </View>
          )}
        />

        <Text style={style.marketTitle}> Markets</Text>

        <FlatList
          style={style.list}
          horizontal={true}
          data={markets}
          renderItem={({ item }) => <CoinMarketItem item={item} />}
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
  row: {
    flexDirection: 'row',
  },
  subHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 8,
  },
  iconImg: {
    width: 25,
    height: 25,
  },
  section: {
    maxHeight: 220,
  },
  sectionHeader: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 8,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
  sectionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  list: {
    maxHeight: 100,
    paddingLeft: 16,
  },
  marketTitle: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16,
  },
  btnFavorite: {
    padding: 6,
    borderRadius: 8,
  },
  btnFavoriteText: {
    color: Colors.white,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.picton,
  },
  btnFavoriteRemove: {
    backgroundColor: Colors.carmine,
  },
});

export default CoinDetailScreen;
