// SETUP MQTT ------------------------------------------

const broker = "influx.itu.dk";
const port = 9002 ;
const secured = true;
const topic="ituF2020/EXPD/dit_emne_her";
const myID = "id" + parseInt(Math.random() * 100000, 10);



// CONNECT ----------------------------------------------

let mqttClient = new Paho.MQTT.Client( broker, port, myID);

mqttClient.connect({onSuccess: onConnect, useSSL:secured});
mqttClient.onConnectionLost = conLost;
mqttClient.onMessageArrived = receiveMessage;

// MQTT Handler functions--------------------------------

function onConnect() 
{
	console.log("Connected");
	mqttClient.subscribe(topic); 
};

function sendMQTT(message) 
{
	console.log("sending");
	let  mOBJ = {deviceID:myID, content:message};
	let mSend = new Paho.MQTT.Message(JSON.stringify(mOBJ));
	mSend.destinationName = topic;
	mqttClient.send(mSend);
};

function receiveMessage(message) 
{
	console.log("message received");
	let mUnpack = JSON.parse(message.payloadString);
	let senderID = mUnpack.deviceID; 
	let receivedMessage  = mUnpack.content;
  
    //do stuff with the message
	console.log(receivedMessage);
	//document.body.style.backgroundcolor = receiveMessage;
	document.bgColor = receivedMessage;


}

function conLost() 
{
	console.log("Lost connection");
}




