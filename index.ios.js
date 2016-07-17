/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import * as firebase from 'firebase';
import styles from './styles';

const firebaseConfig = {
  apiKey: 'AIzaSyBeox5XiYhf2OvfnwBY-47QXDEHeslbX48',
  authDomain: 'storelist-40269.firebaseapp.com',
  databaseURL: 'https://storelist-40269.firebaseio.com',
  storageBucket: 'storelist-40269.appspot.com',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class StoreList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.center}>Test</Text>
      </View>
    );
  }
}


AppRegistry.registerComponent('StoreList', () => StoreList);
