module.exports = {
  //lintOnSave: false,
  devServer: {
    overlay: {
      warnings: false,
      errors: false,
    },
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
};
