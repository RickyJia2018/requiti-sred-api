// mongodb
// Product
// exports.mongo_url = `mongodb://mongo:27017/docker-node-mongo`
exports.mongo_url = process.env.NODE_ENV === "production" ? `mongodb://localhost/requiti` : `mongodb+srv://root:gucheng123@cluster0.wcgvt.mongodb.net/requitiDB?retryWrites=true&w=majority`


exports.mongo_url_docker = `mongodb://mongo:27017/docker-node-mongo`
exports.mongo_url_dev = `mongodb+srv://root:fake@cluster0.wcgvt.mongodb.net/requitiDB?retryWrites=true&w=majority`

exports.connect_options  = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

exports.jwt_expiry_seconds = 2592000 // 30 days

exports.saltRounds=10;

exports.MailGun_API = "aaaa-6ae2ecad-4113c1ac"
