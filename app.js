// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { mongoURI } = require("./config");
const questionsRoute = require("./routes/questions");

const app = express();

app.use(cors(
  {
    origin:"*"
  }
));
app.use(express.json());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

app.use("/api", questionsRoute);
app.get("/",(req,res)=>{
  res.send("hello");
})
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
