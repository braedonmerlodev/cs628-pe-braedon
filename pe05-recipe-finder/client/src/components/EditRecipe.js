import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    ingredients: [''],
    instructions: '',
    cookingTime: '',
    difficulty: 'Easy',
    servings: '',
    image: '',
    category: 'Dinner'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/recipes/${id}`);
        setFormData({
          title: data.title,
          ingredients: data.ingredients,
          instructions: data.instructions,
          cookingTime: data.cookingTime,
          difficulty: data.difficulty,
          servings: data.servings,
          image: data.image,
          category: data.category
        });
        setError(null);
      } catch (err) {
        setError('Error fetching recipe: ' + err.message);
        console.error('Error fetching recipe:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({
      ...formData,
      ingredients: newIngredients
    });
  };

  const addIngredientField = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, '']
    });
  };

  const removeIngredientField = (index) => {
    if (formData.ingredients.length > 1) {
      const newIngredients = [...formData.ingredients];
      newIngredients.splice(index, 1);
      setFormData({
        ...formData,
        ingredients: newIngredients
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Filter out empty ingredients
      const filteredIngredients = formData.ingredients.filter(ing => ing.trim() !== '');
      
      const recipeData = {
        ...formData,
        ingredients: filteredIngredients,
        cookingTime: parseInt(formData.cookingTime),
        servings: parseInt(formData.servings)
      };
      
      await axios.put(`/api/recipes/${id}`, recipeData);
      navigate(`/recipe/${id}`);
    } catch (err) {
      setError('Error updating recipe: ' + err.message);
      console.error('Error updating recipe:', err);
    }
  };

  if (loading) return <div className="loader">Loading recipe...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="edit-recipe">
      <h1>Edit Recipe</h1>
      
      <form onSubmit={handleSubmit} className="recipe-form">
        <div className="form-group">
          <label htmlFor="title">Recipe Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-input">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                placeholder="Enter an ingredient"
                required
              />
              <button 
                type="button" 
                onClick={() => removeIngredientField(index)}
                className="btn-remove"
                disabled={formData.ingredients.length <= 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={addIngredientField}
            className="btn-add"
          >
            Add Ingredient
          </button>
        </div>
        
        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows="6"
            required
          ></textarea>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cookingTime">Cooking Time (minutes)</label>
            <input
              type="number"
              id="cookingTime"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="servings">Servings</label>
            <input
              type="number"
              id="servings"
              name="servings"
              value={formData.servings}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="difficulty">Difficulty</label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg (optional)"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-submit">
            Update Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe; 