const Recipe = require('../models/recipeModel');

// @desc    Get all recipes
// @route   GET /api/recipes
// @access  Public
const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    res.json(recipes);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Get recipe by ID
// @route   GET /api/recipes/:id
// @access  Public
const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404);
      throw new Error('Recipe not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Create a new recipe
// @route   POST /api/recipes
// @access  Public
const createRecipe = async (req, res) => {
  try {
    const { 
      title, 
      ingredients, 
      instructions, 
      cookingTime, 
      difficulty, 
      servings, 
      image, 
      category 
    } = req.body;

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      cookingTime,
      difficulty,
      servings,
      image: image || 'https://via.placeholder.com/150',
      category
    });

    if (recipe) {
      res.status(201).json(recipe);
    } else {
      res.status(400);
      throw new Error('Invalid recipe data');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error: ' + error.message);
  }
};

// @desc    Update a recipe
// @route   PUT /api/recipes/:id
// @access  Public
const updateRecipe = async (req, res) => {
  try {
    const { 
      title, 
      ingredients, 
      instructions, 
      cookingTime, 
      difficulty, 
      servings, 
      image, 
      category 
    } = req.body;

    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      recipe.title = title || recipe.title;
      recipe.ingredients = ingredients || recipe.ingredients;
      recipe.instructions = instructions || recipe.instructions;
      recipe.cookingTime = cookingTime || recipe.cookingTime;
      recipe.difficulty = difficulty || recipe.difficulty;
      recipe.servings = servings || recipe.servings;
      recipe.image = image || recipe.image;
      recipe.category = category || recipe.category;

      const updatedRecipe = await recipe.save();
      res.json(updatedRecipe);
    } else {
      res.status(404);
      throw new Error('Recipe not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Delete a recipe
// @route   DELETE /api/recipes/:id
// @access  Public
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
      await Recipe.deleteOne({ _id: recipe._id });
      res.json({ message: 'Recipe removed' });
    } else {
      res.status(404);
      throw new Error('Recipe not found');
    }
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
}; 