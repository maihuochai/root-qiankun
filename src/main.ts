import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initGlobalState, registerMicroApps, start } from 'qiankun'

Vue.config.productionTip = false

/**
 * 核心思想：
 *    1.通过qiankun框架的action进行主应用与微应用之间的通讯，当主应用/微应用修改数据时通知微应用/主应用并更新store数据
 *    2.通过定义数据应用类型来判断该进行的操作
 * 思路：
 *    全局state：需要提交的数据
 *    提交的全局state：
 *        fromType:'MAIN_APPLICATION' | 'MICRO_APPLICATION'
 *        ...:其余需要暴露的数据
 *    主项目：
 *        1.设定全局state
 *        2.初始化action对象并向外暴露
 *        3.改写store中与子应用共用数据部分：荷载用一个对象包裹，对象中带一个枚举类型数据：来源应用类型
 *        (根据类型进行state更新操作，若来自主应用，则不更新全局state数据,)
 *        4.监听全局数据变化，如果来来自微应用则提交相关荷载
 *        5.挂载微应用时传入全局state
 *     微应用：
 *        1.添加一个vuex模块（globalDataData，名称可根据需要来定），mutation荷载用一个对象包裹，
 *        对象中带一个枚举类型数据：来源应用类型(根据来源类型做相应的更新数据操作；如果来自微应用即本应用，则更新全局state数据)
 *        2.挂载时接收全局数据更新至全局数据模块
 *        4.将更新全局数据的函数暴露出去
 *        5.监听全局数据变化，如果来自主应用则提交相关荷载
 */
const globalState: GlobalState = {
  fromType: undefined,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  record: store.state.user.record
}
export const action = initGlobalState(globalState)
action.onGlobalStateChange((state) => {
  if (state?.fromType === 'MICRO_APPLICATION' ?? false) {
    store.commit('user/SET_RECORD', {
      record: state.record,
      fromType: state.fromType
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#rootApp')

function genActioneRule (routerPrefix: any) {
  return (location: Location) => location.pathname.startsWith(routerPrefix)
}

registerMicroApps(
  [
    {
      name: '@qiankun/goods',
      entry: '//localhost:80',
      props: {
        globalState
      },
      container: '#appContainer',
      activeRule: genActioneRule('/goods')
    },
    {
      name: '@qiankun/personal',
      entry: '//localhost:81',
      props: {
        globalState
      },
      container: '#appContainer',
      activeRule: genActioneRule('/personal')
    }
  ],
  {
    beforeMount (app): Promise<any> {
      return Promise.resolve().then(() => {
        store.commit('SET_LOADING', true)
      })
    },
    afterMount (app): Promise<any> {
      return new Promise(resolve => {
        setTimeout(() => {
          store.commit('SET_LOADING', false)
          resolve()
        }, 100)
      })
    }
  }
)

start()
