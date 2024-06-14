const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

async function postPredictHandler(req, res, next) {
  try {
    const { image } = req.files;
    const { model } = req.app.locals;

    const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id,
      result: label,
      explanation,
      suggestion,
      confidenceScore,
      createdAt,
    };

    await storeData(id, data);

    res.status(201).json({
      status: 'success',
      message: confidenceScore > 0.05 
        ? 'Model is predicted successfully.' 
        : 'Model is predicted successfully but under threshold. Please use the correct picture',
      data,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { postPredictHandler };
