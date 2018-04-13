var bridge = require('rn-bridge');

// Echo every message received from react-native.
bridge.channel.on('message', msg => {
  bridge.channel.send(msg);
});

// Inform react-native node is initialized.
bridge.channel.send('Node was initialized.');
