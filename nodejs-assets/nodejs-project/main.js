const bridge = require('rn-bridge');
const node = require('overcom');

let nodeInstance = null;
// Echo every message received from react-native.
bridge.channel.on('message', async msg => {
  console.log('in bridge', msg);
  bridge.channel.send(String(new Date()));
  if (msg.type == 'init') {
    nodeInstance = await node.makeNode({
      logger: console.log,
      publicKey: msg.publicKey,
      privateKey: msg.privateKey,
      bootstrapPhysicalAddresses: '',
      app: msg.app
    });
  } else {
    nodeInstance.send({});
  }
});

// Inform react-native node is initialized.
bridge.channel.send('Node was initialized.');
