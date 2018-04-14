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
    this.state = {
      settings: {
        publicKey: '',
        privateKey: '',
        app: ''
      },
      recieved: null,
      internal: { type: '', payload: '', recipient: '' }
    };
    nodejs.start('main.js');
    nodejs.channel.addListener(
      'message',
      msg => {
        this.setState({ recieved: msg });
      },
      this
    );
  }
  render() {
    const { settings, internal, recieved } = this.state;
    const { publicKey, privateKey, app } = settings;
    const { payload, type, recipient } = internal;
    return (
      <View>
        <View>
          <Text>{JSON.stringify(settings)}</Text>
          <TextInput
            placeholder="app id"
            value={app}
            onChangeText={app => {
              this.setState({ settings: { app, publicKey, privateKey } });
            }}
          />
          <TextInput
            placeholder="public key"
            value={publicKey}
            onChangeText={publicKey => {
              this.setState({ settings: { app, publicKey, privateKey } });
            }}
          />
          <TextInput
            placeholder="private key"
            value={privateKey}
            onChangeText={privateKey => {
              this.setState({ settings: { app, publicKey, privateKey } });
            }}
          />
          <Button
            onPress={() => {
              nodejs.channel.send(
                JSON.stringify({ type: 'init', app, publicKey, privateKey })
              );
            }}
            title="Init"
          />
        </View>
        <View>
          <Text>Received:</Text>
          <Text>{JSON.stringify(recieved)}</Text>
        </View>
        <View>
          <Text>{JSON.stringify(internal)}</Text>
          <TextInput
            placeholder="recipient"
            value={recipient}
            onChangeText={recipient => {
              this.setState({ internal: { recipient, type, payload } });
            }}
          />
          <TextInput
            placeholder="message type"
            value={type}
            onChangeText={type => {
              this.setState({ internal: { recipient, type, payload } });
            }}
          />
          <TextInput
            placeholder="message payload"
            value={payload}
            onChangeText={payload => {
              this.setState({ internal: { recipient, type, payload } });
            }}
          />
          <Button
            onPress={() => {
              nodejs.channel.send(JSON.stringify(internal));
            }}
            title="Send"
          />
        </View>
      </View>
    );
  }
}
