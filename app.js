import express from "express";

// Make object
const app = express();

// Port num
const PORT = 3002;

// Array for values
const list = [];

// Enables static file serving
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.get("/contact-form", (req, res) => {
  res.sendFile(`${import.meta.dirname}/views/contactpage.html`);
});

app.post("/confirm", (req, res) => {

  list.push(req.body);

  console.log(req.body);

  res.sendFile(`${import.meta.dirname}/views/confirm.html`);
});


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
