module.exports = {
  rules: [
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: ['file-loader'],
    },
  ],
  // ... otras configuraciones ...
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    fallback: {
      stream: require.resolve('stream-browserify'),
      path: false
    },
  },
};