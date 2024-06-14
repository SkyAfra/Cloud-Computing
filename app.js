require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const predictRoutes = require('./routes/predictRoutes');
const loadModel = require('./services/loadModel');
const errorHandlingMiddleware = require('./middlewares/errorHandlingMiddleware');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

const PORT = process.env.PORT || 8081;


(async () => {
  const model = await loadModel();
  app.locals.model = model;
  
  app.use('/auth', authRoutes);
  app.use('/predict', predictRoutes);

  app.use(errorHandlingMiddleware);

  app.listen(PORT, () => {
    console.log(`Server started at: http://localhost:${PORT}`);
  });
})();
