require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const OpenAI = require('openai');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI configuration
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/recipe-generator', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Recipe Schema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [String],
  instructions: [String],
  userId: String,
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  cookingTime: String,
  difficulty: String,
  servings: Number,
  tags: [String]
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Helper function to generate recipe prompt
const generateRecipePrompt = (ingredients) => {
  return `Create a detailed recipe using these ingredients: ${ingredients.join(', ')}. 
  Format the response as a JSON object with the following structure:
  {
    "title": "Recipe name",
    "ingredients": ["ingredient1", "ingredient2", ...],
    "instructions": ["step1", "step2", ...],
    "cookingTime": "estimated time",
    "difficulty": "easy/medium/hard",
    "servings": number,
    "tags": ["tag1", "tag2", ...]
  }
  Make sure the recipe is practical and includes common pantry items if needed.`;
};

// Routes
app.post('/api/generate-recipe', async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({ error: 'Please provide valid ingredients' });
    }

    const prompt = generateRecipePrompt(ingredients);

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 1000
    });

    const recipe = JSON.parse(completion.choices[0].message.content);
    
    // Validate recipe structure
    if (!recipe.title || !recipe.ingredients || !recipe.instructions) {
      throw new Error('Invalid recipe format received from AI');
    }

    res.json(recipe);
  } catch (error) {
    console.error('Recipe generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recipe',
      details: error.message 
    });
  }
});

app.post('/api/recipes', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    console.error('Save recipe error:', error);
    res.status(500).json({ 
      error: 'Failed to save recipe',
      details: error.message 
    });
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(recipes);
  } catch (error) {
    console.error('Fetch recipes error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch recipes',
      details: error.message 
    });
  }
});

app.get('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Fetch recipe error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch recipe',
      details: error.message 
    });
  }
});

app.put('/api/recipes/:id/rate', async (req, res) => {
  try {
    const { rating } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { rating },
      { new: true }
    );
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Rate recipe error:', error);
    res.status(500).json({ 
      error: 'Failed to rate recipe',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    details: err.message 
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 