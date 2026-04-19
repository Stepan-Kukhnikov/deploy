const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.deploy') });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:Stepan-Kukhnikov/deploy-mesto.git',
      path: DEPLOY_PATH,
      key: '~/.ssh/vm_key',
      'post-deploy': 'cd frontend && npm ci && NODE_OPTIONS=--openssl-legacy-provider npm run build',
    },
  },
};