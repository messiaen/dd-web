const path = require('path')
const fs = require('fs')
const contextUtils = require('./lib/_contentUtils')

const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)

const readIssuesFromFiles = () => {
  let issuesDir = path.join(__dirname, 'content', 'issues')
  // console.log('Dirname: ' + issuesDir)
  let issues = []
  let files = fs.readdirSync(issuesDir)
  for (let i = 0; i < files.length; ++i) {
    if (path.extname(files[i]) !== '.json') {
      continue
    }
    // console.log('Adding issue from ' + files[i])
    let obj = JSON.parse(fs.readFileSync(path.join(issuesDir, files[i])))
    issues.push(obj)
  }
  return issues
}

const issueRoutes = (issueIndex) => {
  return Object.keys(issueIndex).map((key) => {
    return {
      route: issueIndex[key].issue.route,
      payload: issueIndex[key]
    }
  })
}

const storyRoutes = (storyIndex) => {
  return Object.keys(storyIndex).map((key) => {
    return {
      route: storyIndex[key].story.route,
      payload: storyIndex[key]
    }
  })
}

const getAllRoutes = () => {
  return new Promise(function (resolve, reject) {
    const { issueIndex, storyIndex } = contextUtils.toIndices(readIssuesFromFiles())
    let allRoutes = issueRoutes(issueIndex)
    allRoutes.push(...storyRoutes(storyIndex))
    if (allRoutes.length > 0) {
      resolve(allRoutes)
    } else {
      reject(Error('We did not find any routes'))
    }
  })
}

module.exports = {
  generate: {
    routes: getAllRoutes
  },
  /*
  modules: [
    '@nuxtjs/router'
  ],
  */
  /*
  ** Headers of the page
  */
  head: {
    title: 'Daesh Daily',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'An update on the war on ISIS' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v2' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Material+Icons' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Anton' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Archivo+Black|Open+Sans:400i,600,600i,700i,800'}
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  css: [
    '~/assets/style/app.styl',
    '~/css/app.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#1b5e20',
    height: '4px',
    failedColor: '#B71C1C',
    duration: 5000,
    rtl: false
  },
  /*
  ** Build configuration
  */
  build: {
    analyze: false,
    babel: {
      plugins: [
        ["transform-imports", {
          "vuetify": {
            "transform": "vuetify/es5/components/${member}",
            "preventFullImport": true
          }
        }]
      ]
    },
    vendor: [
      '~/plugins/vuetify.js',
      'marked',
      'cheerio'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }

      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.styl(us)?$/') {
          rule.use.push({
            loader: 'vuetify-loader',
            options: {
              theme: resolve('./assets/style/theme.styl')
            }
          })
        }
      })
    }
  }
}
