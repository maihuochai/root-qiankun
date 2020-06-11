import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { registerMicroApps, start } from 'qiankun'

interface RenderData {
  appContent: string;
  loading: boolean;
}

Vue.config.productionTip = false

let app: any = null

function render ({ appContent, loading }: RenderData) {
  if (!app) {
    app = new Vue({
      el: '#container',
      router,
      store,
      data () {
        return {
          content: appContent,
          loading
        }
      },
      render (h) {
        return h(App, {
          props: {
            content: appContent,
            loading: loading
          }
        })
      }
    })
  } else {
    app.content = appContent
    app.loading = loading
  }
}

function initApp () {
  render({ appContent: '', loading: false })
}

initApp()

function genActioneRule (routerPrefix: any) {
  return (location: Location) => location.pathname.startsWith(routerPrefix)
}

registerMicroApps([
  {
    name: 'goods-qiankun',
    entry: 'http://localhost:80',
    render,
    activeRule: genActioneRule('/goods')
  },
  {
    name: '@qiankun/personal',
    entry: 'http://localhost:81',
    render,
    activeRule: genActioneRule('/personal')
  }
])
start()
