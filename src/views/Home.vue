<template>
  <div class="home">

    <h1>All Recipes</h1>
    <div v-for="recipe in recipes">
      <h1>{{ recipe.title }}</h1>
      <img v-bind:src="recipe.image_url " v-bind:atl="recipe.title">
      <div>
        <button v-on:click="showRecipe(recipe)">More Info</button>
      </div>
      <div v-if="recipe === currentRecipe">
        <p>Prep Time: {{ recipe.prep_time }}</p>
        <p>Ingredients: {{ recipe.ingredients }}</p>
        <p>Directions: {{ recipe.directions }}</p>

        <div>
          <h4>Edit Recipe</h4>
          <div>
            <div>
              Title: <input v-model="recipe.title">
            </div>

            <div>
              Chef: <input v-model="recipe.chef">
            </div>

            <div>
              Prep Time: <input v-model="recipe.prep_time">
            </div>

            <div>
              Ingredients: <input v-model="recipe.ingredients">
            </div>

            <div>
              Directions: <input v-model="recipe.directions">
            </div>

            <div>
              Image Url: <input v-model="recipe.image_url">
            </div>

            <button v-on:click="updateRecipe(recipe)">Update</button>
            <button v-on:click="destroyRecipe(recipe)">Delete</button>
          </div>
        </div>
      </div>
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
  methods: {
    showRecipe: function(inputRecipe) {
      if (this.currentRecipe === inputRecipe) {
        this.currentRecipe = {};
      } else {
        this.currentRecipe = inputRecipe;
      }
    },
    updateRecipe: function(inputRecipe) {
      var params = {
                    title: inputRecipe.title,
                    chef: inputRecipe.chef,
                    prep_time: inputRecipe.prep_time,
                    ingredients: inputRecipe.ingredients,
                    directions: inputRecipe.directions,
                    image_url: inputRecipe.image_url
                   };

      axios.patch("/api/recipes/" + inputRecipe.id, params)
        .then(response => {
          console.log("Success", response.data);
          inputRecipe = response.data
        });
    },
    destroyRecipe: function(inputRecipe) {
      axios.delete("/api/recipes/" + inputRecipe.id)
        .then(response => {
          console.log("Success", response.data);
          var index = this.recipes.indexOf(inputRecipe);
          this.recipes.splice(index, 1);
        });
    }
  }
};
</script>