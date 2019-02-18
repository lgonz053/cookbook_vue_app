<template>
  <div class="home">
    <p>{{ recipes }}</p>
    <h1>All Recipes</h1>
    <div v-for="recipe in recipes">
      <h1>Title: {{ recipe.title }}</h1>
      <p>Prep Time: {{ recipe.prep_time }}</p>
      <p>Ingredients: {{ recipe.ingredients }}</p>
      <p>Directions: {{ recipe.directions }}</p>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require('axios');

export default {
  data: function() {
    return {
      recipes: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/recipes")
      .then(response => {
        this.recipes = response.data;
      });
  },
  methods: {}
};
</script>