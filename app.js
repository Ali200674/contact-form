import express from "express";

// Make object
const app = express();

// Port num
const PORT = 3002;

// Enables static file serving
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/contactpage.html`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
