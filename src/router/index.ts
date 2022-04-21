import { makeInstaller } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Homepage from '../views/Homepage.vue'
import Success from '../views/Success.vue'
import View from '../views/View.vue'
import SubmitJsonSp from '../views/SubmitJsonSp.vue'
import EditStandards from '../views/EditStandards.vue'
import Specialties from '../views/Specialties.vue'

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
        path:'specialties/:name',
        component:Specialties,
      },
      {
        path:'submit-specialties',
        component:SubmitJsonSp,
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
