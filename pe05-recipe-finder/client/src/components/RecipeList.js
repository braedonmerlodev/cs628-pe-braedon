import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/recipes');
        setRecipes(data);
        setError(null);
      } catch (err) {
        setError('Error fetching recipes: ' + err.message);
        console.error('Error fetching recipes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`/api/recipes/${id}`);
        setRecipes(recipes.filter(recipe => recipe._id !== id));
      } catch (err) {
        setError('Error deleting recipe: ' + err.message);
        console.error('Error deleting recipe:', err);
      }
    }
  };

  if (loading) return <div className="loader">Loading recipes...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="recipe-list">
      <h1>Recipes</h1>
      {recipes.length === 0 ? (
        <p>No recipes found. Add some!</p>
      ) : (
        <div className="recipe-grid">
          {recipes.map(recipe => (
            <div key={recipe._id} className="recipe-card">
              <img src={recipe.image} alt={recipe.title} className="recipe-image" />
              <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p>Category: {recipe.category}</p>
                <p>Difficulty: {recipe.difficulty}</p>
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
                <div className="recipe-actions">
                  <Link to={`/recipe/${recipe._id}`} className="btn btn-view">
                    View Details
                  </Link>
                  <Link to={`/edit/${recipe._id}`} className="btn btn-edit">
                    Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(recipe._id)} 
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList; 