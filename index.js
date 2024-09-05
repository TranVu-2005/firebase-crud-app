import bodyParser from "body-parser";
import dotenv from "dotenv"; // Nạp biến môi trường từ tệp .env
import express from "express";
import admin from "firebase-admin";

dotenv.config(); // Nạp biến môi trường từ tệp .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Initialize Firebase Admin SDK using environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
    project_id: process.env.FIREBASE_PROJECT_ID,
  }),
});

const db = admin.firestore();

// API Routes
app.get("/items", async (req, res) => {
  const snapshot = await db.collection("items").get();
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  res.send(items);
});

app.post("/items", async (req, res) => {
  const newItem = req.body;
  const addedDoc = await db.collection("items").add(newItem);
  res.send(`New item added with ID: ${addedDoc.id}`);
});

app.put("/items/:id", async (req, res) => {
  const id = req.params.id;
  const updatedItem = req.body;
  await db.collection("items").doc(id).update(updatedItem);
  res.send(`Item with ID: ${id} has been updated`);
});

app.delete("/items/:id", async (req, res) => {
  const id = req.params.id;
  await db.collection("items").doc(id).delete();
  res.send(`Item with ID: ${id} has been deleted`);
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});