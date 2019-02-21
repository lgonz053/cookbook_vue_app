<template>
  <div class="recipes-index">

    <h1>All Recipes</h1>
    <div v-for="recipe in recipes">
      <h1>{{ recipe.title }}</h1>
      <router-link v-bind:to="'/recipes/' + recipe.id">
        <img v-bind:src="recipe.image_url " v-bind:atl="recipe.title">
      </router-link>
    </div>
  </div>
</template>

<style>
  img{
    width: 250px;
  }
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      recipes: [],
      currentRecipe: {}
    };
  },
  created: function() {
    axios.get("/api/recipes")
      .then(response => {
        this.recipes = response.data;
      });
  },
  methods: {}
};
</script>