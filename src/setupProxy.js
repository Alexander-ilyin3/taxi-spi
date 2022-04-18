const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy.createProxyMiddleware('/wp-json/api/v1',
    {
      target: 'https://sjd-taxi.requestumdemo.com',
      auth: "sjd-taxi:quughaedu6eex0Qu",
      changeOrigin: true,
    },
  ))

  app.use(proxy.createProxyMiddleware('/wp-content/uploads/**',
    {
      target: 'https://sjd-taxi.requestumdemo.com',
      auth: "sjd-taxi:quughaedu6eex0Qu",
      changeOrigin: true,
    },
  ))
}
