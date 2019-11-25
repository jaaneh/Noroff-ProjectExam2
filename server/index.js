const express = require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const port = process.env.PORT || 3001;
const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  useCreateIndex: true
});

autoIncrement.initialize(mongoose.connection);

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + '../client/.next/'));

const userRoutes = require('./api/routes/user');
const establishmentRoutes = require('./api/routes/establishments');
const enquiresRoutes = require('./api/routes/enquiries');
const contactRoutes = require('./api/routes/contact');

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello there!' });
});
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/establishments', establishmentRoutes);
app.use('/api/v1/enquiries', enquiresRoutes);
app.use('/api/v1/contact', contactRoutes);

app.get('*', (req, res) => {
  res.status(400).json({ message: 'Not a valid route..' });
});

app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}/`)
);
