const Category = require('../model/Category.js')

module.exports.createNewCategory = async (req, res) => {
    const { name, description } = req.body;
    try {
      // Create a new category
      const category = await Category.create({
        name,
        description,
      });
  
      return res.status(201).json(category);
    } catch (error) {
      console.error('Error creating new category:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

module.exports.listAllCategories = async (req, res) => {
    try {
      // Retrieve all categories from the database
      const categories = await Category.findAll();
  
      return res.status(200).json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }