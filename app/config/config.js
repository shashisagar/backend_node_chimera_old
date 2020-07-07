const config = {
  production: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || '8080',
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/product-prod'
    },
    jwt: {
      key: process.env.JWT_KEY || 'secret'
    }
  },
  development: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || '8080',
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/product-dev'
    },
    jwt: {
      key: process.env.JWT_KEY || 'secret'
    }
  },
  test: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || '8000',
    mongo: {
      uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/product-test'
    },
    jwt: {
      key: process.env.JWT_KEY || 'secret'
    }
  }
};

exports.get = function get(env) {
  return config[env] || config.production;
};
