import Vue from 'vue'
import Router from 'vue-router'
import NudgeRoom from '@/components/NudgeRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'NudgeRoom',
      component: NudgeRoom
    }
  ]
})
