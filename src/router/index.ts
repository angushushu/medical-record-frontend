import { makeInstaller } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Homepage from '../views/Homepage.vue'
import Success from '../views/Success.vue'
import View from '../views/View.vue'
import UploadJsonSp from '../views/UploadJsonSp.vue'
import UploadXlsSp from '../views/UploadXlsSp.vue'
import EditStandards from '../views/EditStandards.vue'
import Specialties from '../views/Specialties.vue'
import Settlement from '../views/Settlement.vue'
import SettleMain from '../views/SettleMain.vue'
import SettleView from '../views/SettleView.vue'

const routes = [
  {
    path: '',
    name: 'Main',
    component: Main
  },
  {
    path: '/homepage',
    name: 'Homepage',
    component: Homepage
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/homepage/:id',
    name: 'View',
    component: View
  },
  {
    path: '/edit-standards',
    component: EditStandards,
    children:[
      {
        path:'specialties/:id',
        component:Specialties,
      },
      {
        path:'upload-json-sp',
        component:UploadJsonSp,
      },
      {
        path:'upload-xls-sp',
        component:UploadXlsSp,
      }
    ]
  },
  {
    path: '/settle-main',
    name: 'SettleMain',
    component: SettleMain,
  },
  {
    path: '/new-settle/:homepage_id',
    name: 'Settlement',
    component: Settlement,
  },
  {
    path: '/settlement/:homepage_id',
    name: 'SettleView',
    component: SettleView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
