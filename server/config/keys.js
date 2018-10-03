if (process.env.NODE_ENV === 'production'){ // NODE_ENV set by heroku
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}