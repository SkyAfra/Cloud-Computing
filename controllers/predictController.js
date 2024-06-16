const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');

// controllers/predictController.js

const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

const getPredictionHistories = async (req, res) => {
  try {
    const snapshot = await db.collection('predictions').get();
    const histories = [];

    snapshot.forEach(doc => {
      histories.push({
        id: doc.id,
        history: doc.data()
      });
    });

    res.status(200).json({
      status: "success",
      data: histories
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
};

async function postPredictHandler(req, res, next) {
  try {
    const { image } = req.files;
    const { model } = req.app.locals;

    const { confidenceScore, label, explanation, suggestion } = await predictClassification(model, image);
    const id = crypto.randomUUID();

    const date = new Date();
    const formattedDate = new Intl.DateTimeFormat('en-EN', { dateStyle: 'full', timeStyle: 'long' }).format(date);
  //  const createdAt = new Date().toISOString();

    const data = {
      id,
      result: label,
      explanation,
      suggestion,
      confidenceScore,
      createdAt: formattedDate,
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

module.exports = {
  postPredictHandler,
  getPredictionHistories
};
