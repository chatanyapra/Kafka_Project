const sendUserEvent = require('./producer')

const newUser = {
    userId: 'uiasd21',
    name: 'Chatanya pratap',
    action: 'USER_REGISTERED',
    timestamp: Date.now(),
}
sendUserEvent(newUser);