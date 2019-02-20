<template>
  <div class="home">

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
  methods: {
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