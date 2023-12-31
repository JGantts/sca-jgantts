import { route } from 'quasar/wrappers'
import {
  Router,
  createMemoryHistory,
  createRouter,
} from 'vue-router'

import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

let router: Router | null = null

export default function (/* { store, ssrContext } */) {
  if (!router) {
    router = createRouter({
      scrollBehavior: () => ({ left: 0, top: 0 }),
      routes,

      // Leave this as is and make changes in quasar.conf.js instead!
      // quasar.conf.js -> build -> vueRouterMode
      // quasar.conf.js -> build -> publicPath
      history: createMemoryHistory(process.env.VUE_ROUTER_BASE),
    })
  }

  return router
}
