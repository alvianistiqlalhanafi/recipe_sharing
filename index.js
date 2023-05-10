require('dotenv').config();
const express = require('express');
const app = express();
const usersRoutes = require('./routes/users');
const categoriesRoutes = require('./routes/categories');
const recipeRoutes = require('./routes/recipes');
const response = require('./utils/respons');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/categories', categoriesRoutes);
app.use('/recipes', recipeRoutes);
app.use((req, res) => {
  response(404, null, 'Endpoint not found', res);
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});