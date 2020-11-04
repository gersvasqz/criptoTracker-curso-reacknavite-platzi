import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  static instance = new Storage();

  store = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.error('Storage store err', e);
      return false;
    }
  };

  get = async (key) => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.error('Storage get err', e);
      throw Error(e);
    }
  };

  multiGet = async (keys) => {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (e) {
      console.error('Storage multiGet err', e);
      throw Error(e);
    }
  };

  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (e) {
      console.error('Storage getAllKeys err', e);
      throw Error(e);
    }
  };

  remove = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error('Storage remove err', e);
      return false;
    }
  };
}

export default Storage;
