# AI-Powered Recipe Generator

An intelligent recipe generator that uses AI to create recipes based on available ingredients. Users can save their favorite recipes and share them with the community.

## Features

- AI-powered recipe generation using OpenAI API
- Save and manage favorite recipes
- Modern, responsive UI
- Community recipe sharing

## Tech Stack

- Frontend: React
- Backend: Node.js/Express
- Database: MongoDB
- AI: OpenAI API

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   cd client
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_api_key
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev:full
   ```

## Deployment

### Backend Deployment (Heroku)

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku:
   ```bash
   heroku login
   ```
3. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Add MongoDB add-on:
   ```bash
   heroku addons:create mongolab
   ```
5. Set environment variables:
   ```bash
   heroku config:set OPENAI_API_KEY=your_openai_api_key
   ```
6. Deploy:
   ```bash
   git push heroku main
   ```

### Frontend Deployment (Netlify)

1. Create a Netlify account
2. Connect your GitHub repository
3. Set build settings:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/build`
4. Add environment variables in Netlify dashboard
5. Deploy!

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT 