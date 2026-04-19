require('dotenv').config();

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'backend',
    script: './app.js',
    cwd: '/home/user/deploy/backend',
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_development: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'git@github.com:Stepan-Kukhnikov/deploy.git',
      path: DEPLOY_PATH,
      'post-deploy': 'cd backend && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
    },
  },
};