const fs = require("fs");
const use = require("@tensorflow-models/universal-sentence-encoder");
// const tf = require("@tensorflow/tfjs-node");
const asyncHandler = require("express-async-handler");

const path = require("path");

let documents = [];
const documentPath = path.join(__dirname, "../data/document.json");

try {
  documents = JSON.parse(fs.readFileSync(documentPath, "utf8"));
  console.log("Documents loaded successfully!");
} catch (error) {
  console.error("Error loading documents:", error.message);
  documents = [];
}

function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

let model;
use
  .load()
  .then((loadedModel) => {
    model = loadedModel;
    console.log("Model loaded successfully!");
  })
  .catch((error) => {
    console.error("Error loading model:", error);
  });

// Chatbot endpoint
exports.chatbot = asyncHandler(async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res
      .status(400)
      .json({ error: "Please provide a question in the request body." });
  }

  if (!model) {
    return res
      .status(503)
      .json({ error: "Model is still loading. Please try again later." });
  }

  if (documents.length === 0) {
    return res
      .status(500)
      .json({ error: "No documents available to process." });
  }

  try {
    // Generate embeddings for the question and documents
    const [queryEmbedding, docEmbeddings] = await Promise.all([
      model.embed(question),
      model.embed(documents),
    ]);

    // Convert embeddings to arrays
    const queryArray = await queryEmbedding.array();
    const docArrays = await docEmbeddings.array();
    let maxSimilarity = 0;
    let bestMatch = "";

    // Compare embeddings
    docArrays.forEach((docArray, index) => {
      const similarity = cosineSimilarity(queryArray[0], docArray);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        bestMatch = documents[index];
      }
    });

    res.json({
      question,
      answer: bestMatch,
      similarity: maxSimilarity.toFixed(2),
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});
