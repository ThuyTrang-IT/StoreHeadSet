module.exports = {
  apps: [
    {
      name: 'HeadSet',
      script: 'index.js', // the entry point of your application
      watch: true,
      env: {
        NODE_ENV: 'production', // or 'development' if needed
      },
    },
  ],
};
