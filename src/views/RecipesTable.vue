<template>
  <div class="recipes-index">
    <h1>All Recipes</h1>
    <div>
      Filter Title: <input v-model="titleFilter" list="titles">

      <datalist id="titles">
        <option v-for="recipe in recipes">{{recipe.title}}</option>
      </datalist>
    </div>

    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col" v-on:click="setSortAttribute('id')">ID {{ orderIndicator('id') }}</th>
        <th scope="col" v-on:click="setSortAttribute('title')">Title {{ orderIndicator('title') }}</th> 
        <th scope="col" v-on:click="setSortAttribute('chef')">Chef {{ orderIndicator('chef') }}</th>
        <th scope="col" v-on:click="setSortAttribute('prep_time')">Prep Time {{ orderIndicator('prep_time') }}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="recipe in orderBy(filterBy(recipes, titleFilter, 'title'), sortAttribute, sortOrder)">
        <!-- filtering and ordering at the same time -->
        <td>
          {{ recipe.id }}
        </td>
        <td>
          <router-link v-bind:to="'/recipes/' + recipe.id">
            {{ recipe.title }}
          </router-link>
        </td>
        <td>
          {{ recipe.chef }}
        </td>
        <td>
          {{ recipe.formatted.prep_time }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
  img{

    width: 250px;

  }
</style>

<script>
var axios = require('axios');
import Vue2Filters from "vue2-filters";

export default {
  data: function() {
    return {
      recipes: [],
      currentRecipe: {},
      titleFilter: '',
      sortAttribute: 'title',
      sortOrder: 1
    };
  },
  created: function() {
    axios.get("/api/recipes")
      .then(response => {
        this.recipes = response.data;
      });
  },
  methods: {
    setSortAttribute: function(inputAttribute) {
      if(this.sortAttribute === inputAttribute) {
        this.sortOrder *= -1
      } else {
        this.sortAttribute = inputAttribute;
        this.sortOrder = 1;
      }
    },
    orderIndicator: function(inputAttribute) {

      if (this.sortAttribute === inputAttribute && this.sortOrder == 1) {
        return 8595;
      } else if (this.sortAttribute === inputAttribute && this.sortOrder == -1) {
        return 8593;
      } else {
        return " ";
      }
    }
  },
  mixins: [Vue2Filters.mixin]
};
</script>
