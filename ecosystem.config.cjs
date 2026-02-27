module.exports = {
  apps: [{
    name: 'avivamiento',
    script: '.output/server/index.mjs',
    cwd: '/var/www/avivamiento_webpage/current',
    watch: false,
    instances: 1,
    autorestart: true,
    max_restarts: 5,
    env: {
      PORT: 3002,
      NODE_ENV: 'production'
    }
  }]
}
