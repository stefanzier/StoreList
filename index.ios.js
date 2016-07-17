import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  ListView,
  AlertIOS
} from 'react-native';

import firebase from 'firebase';
import styles from './styles';
import ActionButton from './components/action_button';
import StatusBar from './components/status_bar';
import ListItem from './components/list_item';

const firebaseConfig = {
  apiKey: 'AIzaSyC-sZsoCG3yyxzHn9ZkNIpTrinI-oK5x-Q',
  authDomain: 'storelist-bc8ac.firebaseapp.com',
  databaseURL: 'https://storelist-bc8ac.firebaseio.com',
  storageBucket: '',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const rootRef = firebase.database().ref();
const itemsRef = rootRef.child('items');

class StoreList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
    };

    this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {
      var items = [];
      snap.forEach((child) => {
        items.push({
          title: child.val().title,
          _key: child.key
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(items)
      });
    });
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

        <ListView dataSource={this.state.dataSource} 
                  renderRow={this._renderItem.bind(this)} 
                  enableEmptySections={true}
                  style={styles.listview} />

        <ActionButton title="Add" onPress={this._addItem.bind(this)}/>
      </View>
    );
  }

  _addItem() {
    AlertIOS.prompt(
      'Add new item',
      null,
      [
        {
          text: 'Add',
          onPress: (text) => {
            this.itemsRef.push({ title: text })
          }
        },
      ],

      'plain-text'
    );
  }
}


AppRegistry.registerComponent('StoreList', () => StoreList);