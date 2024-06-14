const tf = require('@tensorflow/tfjs-node');
const { InputError } = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image.data)
      .resizeNearestNeighbor([128, 128])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score);

    let label, explanation, suggestion;

    if (confidenceScore < 0.0005) {
      label = 'Non-biodegradable';
      explanation = "Non-biodegradable waste cannot decompose naturally and can harm the environment.";
      suggestion = "Dispose of non-biodegradable waste in appropriate recycling bins or waste management facilities.";
    } else {
      label = 'Biodegradable';
      explanation = "Biodegradable waste can decompose naturally by bacteria or other living organisms.";
      suggestion = "Dispose of biodegradable waste in compost bins to help the environment.";
    }

    return { confidenceScore, label, explanation, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
