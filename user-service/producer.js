const {kafka, Kafka} = require('kafkajs')
const kafka = new Kafka({
    clientId: "user-service",
    brokers: ['"localhost:9092"']
})

const producer = new kafka.producer();
async function sendUserEvent(user) {
    await producer.connect();
    await producer.send({
        topic: "user-events",
        messages: [{value: JSON.stringify(user)}]
    })
    console.log('user event send successfully')
}
module.exports = sendUserEvent;