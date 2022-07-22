const TerserPlugin = require('terser-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  webpack: (config) => {
    config.optimization.minimizer.push(
      new TerserPlugin({
        minify: TerserPlugin.swcMinify,
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
        }
      })
    )

    return config
  }
}

module.exports = nextConfig
