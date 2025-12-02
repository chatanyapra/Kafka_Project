const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "notification-group" });

async function run() {
  await consumer.connect();

  await consumer.subscribe({ topic: "user-events", fromBeginning: false });
  await consumer.subscribe({ topic: "post-events", fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      const data = JSON.parse(message.value.toString());

      console.log("🔔 Notification Service Received:", data);

      if (topic === "user-events") {
        console.log(`📩 Send Welcome Message to: ${data.name}`);
      }

      if (topic === "post-events") {
        console.log(`📣 Notify followers: New post from User ${data.userId}`);
      }
    },
  });
}

module.exports = run;
