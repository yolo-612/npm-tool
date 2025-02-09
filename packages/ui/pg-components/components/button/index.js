import PgButton from './src/index.vue'

const ButtonInstall = {
  install(app) {
    app.component('pg-button', PgButton);
  }
}

export default ButtonInstall
export { PgButton }