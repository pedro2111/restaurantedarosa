const proxy = [
    {
      context: '/api',
      //target: 'http://localhost:8080',
      target: 'https://cozinhadarosa.herokuapp.com:8080',
      pathRewrite: {'^/api' : ''},
      secure: false,
      changeOrigin: true
    }
  ];
  module.exports = proxy;