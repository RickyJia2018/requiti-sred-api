// mongodb
// Product
exports.mongo_url = `mongodb://mongo:27017/docker-node-mongo`
//dev
// exports.mongo_url = `mongodb+srv://root:gucheng123@cluster0.wcgvt.mongodb.net/requitiDB?retryWrites=true&w=majority`

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

exports.MailGun_API = "96440d9709e76737188d89b531aa28d3-6ae2ecad-4113c1ac"
