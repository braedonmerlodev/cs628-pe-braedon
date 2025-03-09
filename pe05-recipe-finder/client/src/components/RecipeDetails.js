import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/api/recipes/${id}`);
        setRecipe(data);
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

  if (loading) return <div className="loader">Loading recipe details...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (!recipe) return <div className="error-message">Recipe not found</div>;

  return (
    <div className="recipe-details">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          <span>Category: {recipe.category}</span>
          <span>Difficulty: {recipe.difficulty}</span>
          <span>Cooking Time: {recipe.cookingTime} minutes</span>
          <span>Servings: {recipe.servings}</span>
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="recipe-image-container">
          <img src={recipe.image} alt={recipe.title} className="recipe-detail-image" />
        </div>
        
        <div className="recipe-info-container">
          <div className="ingredients-section">
            <h2>Ingredients</h2>
            <ul className="ingredients-list">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
          
          <div className="instructions-section">
            <h2>Instructions</h2>
            <div className="instructions-text">
              {recipe.instructions.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="recipe-actions">
        <Link to="/" className="btn btn-back">
          Back to Recipes
        </Link>
        <Link to={`/edit/${recipe._id}`} className="btn btn-edit">
          Edit Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetails; 