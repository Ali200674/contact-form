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

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/contact-form", (req, res) => {
  res.render("contactpage");
});

app.post("/confirm", (req, res) => {

  list.push(req.body);

  console.log(req.body);

  res.render("confirm");
});

app.get("/admin", (req, res) => {
  res.render("admin", {list})
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
