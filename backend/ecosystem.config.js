const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env.deploy') });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'backend',
    script: './dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:Stepan-Kukhnikov/deploy.git',
      path: DEPLOY_PATH,
      key: '~/.ssh/vm_key',
      'pre-deploy-local': `scp -i ~/.ssh/vm_key ./backend/.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend/.env`,
      'post-deploy': 'cd backend && npm ci && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};