const bridge = require('rn-bridge');
const node = require('overcom');

let nodeInstance = null;
bridge.channel.on('message', async msg => {
  console.log('in bridge', msg);
  msg = JSON.parse(msg);
  bridge.channel.send(String(new Date()));
  if (msg.type == 'init') {
    nodeInstance = await node.makeNode({
      logger: console.log,
      publicKey: msg.publicKey,
      privateKey: msg.privateKey,
      bootstrapPhysicalAddresses: {
        '00': { ip: '77.139.204.81', port: 33331 }
      },
      app: msg.app
    });
    bridge.channel.send(`Node initialized ${!!nodeInstance}.`);
  } else {
    const status = await nodeInstance.sendMessage(
      { recipient: msg.recipient, type: msg.type, payload: msg.payload },
      3,
      1000
    );
    bridge.channel.send(`Message status ${status}.`);
  }
});
