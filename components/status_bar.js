import React, { Component } from 'react';
import styles, { constants } from '../styles';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

export default class StatusBar extends Component {
  render() {
    return (
      <View>
        <View style={styles.statusBar}></View>
        <View style={styles.navbar}>
          <Text style={styles.navbarTitle}></Text>
        </View>
      </View>
    );
  }
}