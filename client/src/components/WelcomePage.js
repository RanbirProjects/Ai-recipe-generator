import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faBook, faUsers, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const WelcomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="welcome-page"
    >
      <div className="welcome-background">
        <div className="overlay"></div>
      </div>

      <motion.div
        variants={itemVariants}
        className="welcome-header"
      >
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
        >
          Welcome to AI Recipe Generator
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Discover amazing recipes with the power of AI
        </motion.p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="features-grid"
      >
        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="feature-card"
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <FontAwesomeIcon icon={faUtensils} size="3x" />
          </motion.div>
          <h3>AI-Powered Recipes</h3>
          <p>Get personalized recipe suggestions based on your ingredients</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          className="feature-card"
        >
          <motion.div
            initial={{ rotate: 10 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <FontAwesomeIcon icon={faBook} size="3x" />
          </motion.div>
          <h3>Save Favorites</h3>
          <p>Keep track of your favorite recipes</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          className="feature-card"
        >
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <FontAwesomeIcon icon={faUsers} size="3x" />
          </motion.div>
          <h3>Community</h3>
          <p>Share and discover recipes from other food lovers</p>
        </motion.div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="welcome-actions"
      >
        <Link to="/recipe-generator">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="primary-button"
          >
            Get Started
          </motion.button>
        </Link>
        <Link to="/about">
          <motion.button
            whileHover={{ scale: 1.1, boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="secondary-button"
          >
            Learn More
          </motion.button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, repeat: Infinity, repeatType: "reverse" }}
        className="scroll-indicator"
      >
        <FontAwesomeIcon icon={faChevronDown} size="2x" />
      </motion.div>
    </motion.div>
  );
};

export default WelcomePage; 