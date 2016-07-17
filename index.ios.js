import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView
} from 'react-native';

import * as firebase from 'firebase';
import styles from './styles';
import ActionButton from './components/action_button';
import StatusBar from './components/status_bar';
import ListItem from './components/list_item';

const firebaseConfig = {
  apiKey: 'AIzaSyBeox5XiYhf2OvfnwBY-47QXDEHeslbX48',
  authDomain: 'storelist-40269.firebaseapp.com',
  databaseURL: 'https://storelist-40269.firebaseio.com',
  storageBucket: 'storelist-40269.appspot.com',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

class StoreList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows([{ title: 'Pizza' }]),
    })
  }

  _renderItem(item) {
    return (
      <ListItem item={item} />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar title="Store List" />
        <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} style={styles.listview} />
        <ActionButton title="Add" />
      </View>
    );
  }
}


AppRegistry.registerComponent('StoreList', () => StoreList);