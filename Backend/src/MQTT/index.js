const awsIot = require('aws-iot-device-sdk');
const db = require('../routers/db.controller');
const client = new awsIot.device({
  keyPath: __dirname + '/cert/SMF_MNG.private.pem.key',
  certPath: __dirname + '/cert/SMF_MNG.certificate.pem.crt',
  caPath: __dirname + '/cert/RootCA.pem',
  clientId: 'SMF_MNG_Backend',
  host: 'a2hxwq5s1gvqp-ats.iot.ap-northeast-2.amazonaws.com',
});

exports.Con = () => {
  client.on('connect', () => {
    console.log('Connected to AWS IoT Core');
    client.subscribe('SMT_IT/CCIT/#');
  });
};

exports.Sub = async () => {
  client.on('message', (topic, payload) => {
    const msg = JSON.parse(payload);
    console.log(topic, msg);

    switch (topic) {
      case 'SMT_IT/CCIT/SMF_MNG/Product/h_to_s':
        db.insertProduct(msg);
        break;
      case 'SMT_IT/CCIT/SMF_MNG/Progress/h_to_s':
        db.insertProgress(msg);
        break;
      case 'SMT_IT/CCIT/SMF_MNG/Target/h_to_s':
        db.insertTarget(msg);
        break;
      case 'SMT_IT/CCIT/SENSOR/WEIGHT':
        db.insertWeight(msg);
        break;
    }
  });
};
