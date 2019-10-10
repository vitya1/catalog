module.exports = {
  devServer: {
    proxy: {
      '/data.json': {
        target: 'http://127.0.0.1:3000',
        secure: false,
        changeOrigin: true,
        logLevel: 'info',
      },
      '/names.js': {
        target: 'http://127.0.0.1:3000',
        secure: false,
        changeOrigin: true,
        logLevel: 'info',
      },
    },
  },
};
