import Vue from 'vue'
import Router from 'vue-router'
import RecipesIndex from './views/RecipesIndex.vue'
import RecipesNew from './views/RecipesNew.vue'
import RecipesShow from './views/RecipesShow.vue'
import RecipesEdit from './views/RecipesEdit.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'recipes-index', component: RecipesIndex},
    { path: '/recipes', name: 'recipes-index', component: RecipesIndex},
    { path: '/recipes/new', name: 'recipes-new', component: RecipesNew },
    { path: '/recipes/:id', name: 'recipes-shows', component: RecipesShow },
    { path: '/recipes/:id/edit', name: 'recipes-edit', component: RecipesEdit }
  ]
})
