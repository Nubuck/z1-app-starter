const use = [
  [
    '@z1/preset-dev-neutrino/lib/react',
    {
      publicPath: '/',
      html: {
        title: 'Z1 Screen Cmd',
        links: ['https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css'],
        appMountHtmlSnippet:
          '<div id="root" class="flex flex-col w-full h-full"></div>',
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
  use,
}
