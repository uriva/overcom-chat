import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Button,
  Text,
  View,
  TextInput
} from 'react-native';
import nodejs from 'nodejs-mobile-react-native';

export default class App extends Component {
  constructor() {
    super();
    this.state = { text: 'initial sent', recieved: 'initial recieved' };
    nodejs.start('main.js');
    nodejs.channel.addListener(
      'message',
      msg => {
        this.setState({ recieved: msg });
      },
      this
    );
  }
  submit() {
    nodejs.channel.send(this.state.text);
  }
  render() {
    const { text, recieved } = this.state;
    return (
      <View>
        <Text>{recieved}</Text>
        <TextInput
          value={text}
          onChangeText={text => {
            this.setState({ text });
          }}
        />
        <Button
          onPress={() => {
            this.submit();
          }}
          title="submit"
        />
      </View>
    );
  }
}
