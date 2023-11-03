const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy requests to your API server
  app.use(
    '/prod/file-upload', // The path you want to proxy
    createProxyMiddleware({
      target: 'https://sk48x8co83.execute-api.us-east-1.amazonaws.com', // The URL of your API server
      changeOrigin: true, // Enable CORS
    })
  );
};
