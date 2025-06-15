import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUtensils, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import WelcomePage from './components/WelcomePage';
import AboutPage from './components/AboutPage';
import './App.css';

function RecipeGenerator() {
  const [ingredients, setIngredients] = React.useState('');
  const [recipe, setRecipe] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [savedRecipes, setSavedRecipes] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recipes');
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      const data = await response.json();
      setSavedRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setError('Failed to load saved recipes');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const ingredientsList = ingredients
        .split(',')
        .map(i => i.trim())
        .filter(i => i.length > 0);

      if (ingredientsList.length === 0) {
        throw new Error('Please enter at least one ingredient');
      }

      const response = await fetch('http://localhost:5000/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: ingredientsList,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate recipe');
      }

      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error('Error generating recipe:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const saveRecipe = async () => {
    if (!recipe) return;
    try {
      const response = await fetch('http://localhost:5000/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      await fetchSavedRecipes();
      setError(null);
    } catch (error) {
      console.error('Error saving recipe:', error);
      setError('Failed to save recipe');
    }
  };

  const rateRecipe = async (recipeId, rating) => {
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${recipeId}/rate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating }),
      });

      if (!response.ok) {
        throw new Error('Failed to rate recipe');
      }

      await fetchSavedRecipes();
    } catch (error) {
      console.error('Error rating recipe:', error);
      setError('Failed to rate recipe');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="recipe-generator-page"
    >
      <section className="recipe-generator">
        <motion.form
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onSubmit={handleSubmit}
        >
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients (comma-separated)"
            rows="4"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Recipe'}
          </motion.button>
        </motion.form>
      </section>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="error-message"
        >
          {error}
        </motion.div>
      )}

      <AnimatePresence>
        {recipe && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="generated-recipe"
          >
            <h2>{recipe.title}</h2>
            
            <div className="recipe-meta">
              <span><strong>Cooking Time:</strong> {recipe.cookingTime}</span>
              <span><strong>Difficulty:</strong> {recipe.difficulty}</span>
              <span><strong>Servings:</strong> {recipe.servings}</span>
            </div>

            <div className="recipe-tags">
              {recipe.tags?.map((tag, index) => (
                <motion.span
                  key={index}
                  className="tag"
                  whileHover={{ scale: 1.1 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {ingredient}
                </motion.li>
              ))}
            </ul>

            <h3>Instructions:</h3>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {instruction}
                </motion.li>
              ))}
            </ol>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveRecipe}
              className="save-button"
            >
              Save Recipe
            </motion.button>
          </motion.section>
        )}
      </AnimatePresence>

      <section className="saved-recipes">
        <h2>Saved Recipes</h2>
        <div className="recipe-grid">
          {savedRecipes.map((savedRecipe) => (
            <motion.div
              key={savedRecipe._id}
              className="recipe-card"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3>{savedRecipe.title}</h3>
              <div className="recipe-card-meta">
                <p><strong>Time:</strong> {savedRecipe.cookingTime}</p>
                <p><strong>Difficulty:</strong> {savedRecipe.difficulty}</p>
                <p><strong>Servings:</strong> {savedRecipe.servings}</p>
              </div>
              <div className="recipe-card-tags">
                {savedRecipe.tags?.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              <div className="recipe-card-rating">
                <span>Rating: {savedRecipe.rating || 0}/5</span>
                <div className="rating-buttons">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => rateRecipe(savedRecipe._id, rating)}
                      className={savedRecipe.rating === rating ? 'active' : ''}
                    >
                      {rating}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="main-nav">
          <Link to="/">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FontAwesomeIcon icon={faHome} /> Home
            </motion.div>
          </Link>
          <Link to="/recipe-generator">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FontAwesomeIcon icon={faUtensils} /> Recipe Generator
            </motion.div>
          </Link>
          <Link to="/about">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FontAwesomeIcon icon={faInfoCircle} /> About
            </motion.div>
          </Link>
        </nav>

        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/recipe-generator" element={<RecipeGenerator />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
