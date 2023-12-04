require("dotenv").config();
const Pusher = require("pusher")
    
const pusher = new Pusher({
    appId: process.env.APPID_PUSHER,
    key: process.env.KEY_PUSHER,
    secret: process.env.SECRET_PUSHER,
    cluster: process.env.CLUSTER_PUSHER,
    useTLS: process.env.USETLS_PUSHER
});

module.exports = pusher;