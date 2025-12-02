const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: "post-service",
    brokers: ['localhost:9092']
})

const producer = kafka.producer();

async function sendPostEvent(post){
    await producer.connect();
    await producer.send({
        topic: 'post-events',
        messages: [{value:  JSON.stringify(post)}]
    })
    console.log("post event send successfully")
}

module.exports = sendPostEvent;