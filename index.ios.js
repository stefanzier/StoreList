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
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };
    this.itemsRef = this.getRef().child('items');
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
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

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar title="Grocery List" />

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderItem.bind(this)}
          enableEmptySections={true}
          style={styles.listview}/>

        <ActionButton onPress={this._addItem.bind(this)} title="Add" />

      </View>
    )
  }

  _addItem() {
    AlertIOS.prompt(
      'Add New Item',
      null,
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
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

  _renderItem(item) {

    const onPress = () => {
      AlertIOS.prompt(
        'Complete',
        null,
        [
          {text: 'Complete', onPress: (text) => this.itemsRef.child(item._key).remove()},
          {text: 'Cancel', onPress: (text) => console.log('Cancelled')}
        ],
        'default'
      );
    };

    return (
      <ListItem item={item} onPress={onPress} />
    );
  }

}


AppRegistry.registerComponent('StoreList', () => StoreList);