import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBrain, faCode, faUsers, faUtensils, faLightbulb, faChartLine } from '@fortawesome/free-solid-svg-icons';

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="about-page"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="about-header"
      >
        <h1>About AI Recipe Generator</h1>
        <p>Revolutionizing the way we discover and create recipes</p>
      </motion.div>

      <div className="about-content">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="about-section"
        >
          <FontAwesomeIcon icon={faBrain} size="3x" />
          <h2>Powered by AI</h2>
          <div className="section-content">
            <p>Our advanced AI technology analyzes your ingredients and creates personalized recipe suggestions that match your taste and dietary preferences.</p>
            <ul className="feature-list">
              <li>
                <FontAwesomeIcon icon={faLightbulb} />
                <span>Smart ingredient analysis that understands cooking combinations</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faChartLine} />
                <span>Personalized recommendations based on your cooking history</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faUtensils} />
                <span>Adaptive learning that improves suggestions over time</span>
              </li>
            </ul>
            <p className="unique-point">What makes us unique: Our AI doesn't just suggest recipes - it learns from your cooking patterns and adapts to your preferences, making each suggestion more personalized than the last.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="about-section"
        >
          <FontAwesomeIcon icon={faCode} size="3x" />
          <h2>Modern Technology</h2>
          <div className="section-content">
            <p>Built with cutting-edge web technologies to provide a seamless and responsive experience across all devices.</p>
            <ul className="feature-list">
              <li>
                <FontAwesomeIcon icon={faCode} />
                <span>Real-time recipe generation using OpenAI's latest models</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCode} />
                <span>Instant recipe saving and synchronization across devices</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faCode} />
                <span>Offline access to your saved recipes</span>
              </li>
            </ul>
            <p className="unique-point">What makes us unique: Our platform combines the power of AI with modern web technologies to create an experience that's both powerful and user-friendly, setting new standards in recipe generation technology.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="about-section"
        >
          <FontAwesomeIcon icon={faUsers} size="3x" />
          <h2>Community Driven</h2>
          <div className="section-content">
            <p>Join a community of food enthusiasts, share your recipes, and discover new culinary adventures.</p>
            <ul className="feature-list">
              <li>
                <FontAwesomeIcon icon={faUsers} />
                <span>Share your AI-generated recipes with the community</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faUsers} />
                <span>Rate and review recipes from other users</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faUsers} />
                <span>Join cooking challenges and events</span>
              </li>
            </ul>
            <p className="unique-point">What makes us unique: Our community isn't just about sharing recipes - it's about creating a space where AI and human creativity come together to inspire new culinary experiences.</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="about-footer"
      >
        <h3>Our Mission</h3>
        <div className="mission-content">
          <p>To make cooking more accessible and enjoyable for everyone by combining the power of artificial intelligence with the art of cooking.</p>
          <div className="mission-points">
            <div className="mission-point">
              <h4>Accessibility</h4>
              <p>Making gourmet cooking accessible to everyone, regardless of skill level</p>
            </div>
            <div className="mission-point">
              <h4>Innovation</h4>
              <p>Pushing the boundaries of what's possible in recipe creation</p>
            </div>
            <div className="mission-point">
              <h4>Community</h4>
              <p>Building a global community of food enthusiasts</p>
            </div>
          </div>
          <p className="unique-point">What makes us unique: We're not just creating another recipe app - we're building a platform that bridges the gap between traditional cooking and AI innovation, making it easier for everyone to create amazing meals.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutPage; 