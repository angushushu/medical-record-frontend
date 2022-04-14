import { makeInstaller } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Homepage from '../views/Homepage.vue'
import Success from '../views/Success.vue'
import View from '../views/View.vue'
import SubmitSpecialties from '../views/SubmitSpecialties.vue'
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
  // {
  //   path: '/submit-specialties',
  //   name: 'SubmitSpecialties',
  //   component: SubmitSpecialties
  // },
  {
    path: '/edit-standards',
    component: EditStandards,
    children:[
      {
        path:'specialties',
        component:Specialties,
      },
      {
        path:'submit-specialities',
        component:SubmitSpecialties
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
