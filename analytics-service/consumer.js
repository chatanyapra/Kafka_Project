const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "analytics-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "analytics-group" });

async function run() {
  await consumer.connect();
  await consumer.subscribe({ topic: "user-events", fromBeginning: false });
  await consumer.subscribe({ topic: "post-events", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value.toString());
      console.log("📊 Analytics Received:", { topic, data });
    }
  });
}

module.exports = run;
