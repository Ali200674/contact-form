import express from "express";
import dotenv from "dotenv"
import mysql2 from "mysql2"

dotenv.config();

const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
}).promise();

// Make object
const app = express();

// Port num
const PORT = 3002;

// Array for values
const list = [];

// Enables static file serving
// Middle ware
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

  const contact = req.body;
  contact.timestamp = new Date();

  list.push(req.body);

  console.log(req.body);

  res.render("confirm", {contact});
});

app.get("/admin", async (req, res) => {
  const [list] = await pool.query("SELECT * FROM contacts");
  res.render("admin", {list})
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
