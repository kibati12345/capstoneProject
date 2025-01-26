const express = require('express');
// const mongoose = require('mongoose'); // Commenting out MongoDB-related imports
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection (Commented Out)
// mongoose.connect('mongodb://localhost:27017/business_partner_platform', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Root Route (Add this block here)
app.get('/', (req, res) => {
  res.send('Welcome to the Business Partner API!');
});

// Routes
app.use('/api/users', userRoutes);

// Server Setup
const PORT = 5002;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
