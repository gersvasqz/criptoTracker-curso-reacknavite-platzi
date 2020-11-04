import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import Colors from 'cryptoTracker2/src/res/colors';

const CoinsItem = ({ item, onPress }) => {
  const getImageArrow = () =>
    item.percent_change_1h > 0
      ? require('cryptoTracker2/src/assets/arrow_up.png')
      : require('cryptoTracker2/src/assets/arrow_down.png');

  return (
    <Pressable onPress={onPress} style={style.conteiner}>
      <View style={style.row}>
        <Text style={style.symbolText}>{item.symbol}</Text>
        <Text style={style.nameText}>{item.name}</Text>
        <Text style={style.priceText}>{`$${item.price_usd}`}</Text>
      </View>

      <View style={style.row}>
        <Text style={style.percentText}> {item.percent_change_1h}</Text>
        <Image style={style.imageIcon} source={getImageArrow()} />
      </View>
    </Pressable>
  );
};

const style = StyleSheet.create({
  conteiner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: Colors.zircon,
    borderBottomWidth: 1,
    paddingLeft: Platform.OS === 'ios' ? 0 : 16,
    marginLeft: Platform.OS === 'ios' ? 16 : 0,
  },
  row: {
    flexDirection: 'row',
  },
  symbolText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  nameText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 16,
  },
  percentText: {
    color: '#fff',
    fontSize: 12,
    marginRight: 8,
  },
  priceText: {
    color: '#fff',
    fontSize: 14,
  },
  imageIcon: {
    width: 22,
    height: 22,
  },
});

export default CoinsItem;
