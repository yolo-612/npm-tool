import PgTag from './src/index.vue'

const TagInstall = {
  install(app) {
    app.component('pg-tag', PgTag)
  }
}

export default TagInstall

export { PgTag }
