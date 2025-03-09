const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    ingredients: [{
      type: String,
      required: true,
      trim: true
    }],
    instructions: {
      type: String,
      required: true
    },
    cookingTime: {
      type: Number,
      required: true
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Easy', 'Medium', 'Hard']
    },
    servings: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/150'
    },
    category: {
      type: String,
      required: true,
      enum: ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snack', 'Beverage']
    }
  },
  {
    timestamps: true,
  }
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe; 