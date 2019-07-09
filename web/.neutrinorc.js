const OmitJsForCssPlugin = require('webpack-omit-js-for-css-plugin')

function styleLoaders() {
  return [
    {
      loader: 'postcss-loader',
      options: {
        plugins() {
          return [
            require('tailwindcss')('./tailwind.config.js'),
            require('autoprefixer'),
          ]
        },
      },
    },
  ]
}

const use = [
  [
    '@z1/preset-dev-neutrino/lib/react',
    {
      publicPath: '/',
      html: {
        title: 'Z1 App Starter',
        links: [
          {
            href: '/static/fonts/line-awesome-font-awesome.css',
            rel: 'stylesheet',
          },
        ],
      },
      targets: {
        browsers: ['safari >= 6'],
      },
      minify: {
        babel: false,
      },
    },
  ],
  neutrino =>
    neutrino.config
      .entry('vendor')
      .add('react')
      .add('react-dom')
      .add('react-redux')
      .add('redux')
      .add('@z1/lib-api-box-client')
      .add('@z1/lib-feature-box')
      .add('@z1/lib-ui-schema'),
  [
    '@z1/preset-dev-neutrino/lib/style-loader',
    {
      loaders: styleLoaders(),
      test: /\.css$/,
      extractId: 'extract',
      extract: {
        plugin: {
          filename: '[name].css',
          ignoreOrder: false,
          allChunks: true,
        },
        loader: {
          fallback: 'style-loader',
          use: styleLoaders(),
        },
      },
    },
  ],
]

if (process.env.NODE_ENV !== 'development') {
  use.push('@z1/preset-dev-neutrino/lib/uglify')
}

use.push('@z1/preset-dev-neutrino/lib/jest')
use.push(neutrino =>
  neutrino.config.module
    .rule('compile')
    .test(/\.(js|jsx|vue|ts|tsx|mjs)$/)
    .include.add(/preset-feathers-client/)
    .add(/preset-task/)
)

module.exports = {
  options: {
    output: 'lib',
    root: __dirname,
  },
  env: {
    NODE_ENV: {
      production: {
        use: [
          neutrino =>
            neutrino.config
              .plugin('junk')
              .after('extract')
              .use(OmitJsForCssPlugin)
              .end(),
        ],
      },
    },
  },
  use,
}
