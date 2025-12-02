const sendPostEvent = require('./producer')

const newpost = {
    postId: 'post12',
    userId: "user001",
    content: "Learning Kafka with NodeJS",
    action: "POST_CREATED",
    timestamp: Date.now()
}

sendPostEvent(newpost);