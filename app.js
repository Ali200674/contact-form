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


app.post("/confirm", async (req, res) => {
  const contact = req.body;

  const statement = `INSERT INTO contacts (first_name, last_name, job_title, company_name, linkedin_url, email, meet_option, meet_option_other, message, mailing_list, format) VALUES 
                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

  const params = [
    contact.fname,
    contact.lname,
    contact.jtitle,
    contact["company-name"],
    contact.linkedinUrl,
    contact.email,
    contact.metOption,
    contact["other-option"],
    contact.message,
    contact.mailingList === undefined ? "off" : contact.mailingList,
    contact.format === undefined ? "" : contact.format,
  ]

  contact.timestamp = new Date();

  const [result] = await pool.execute(statement, params)

  res.render("confirm", {contact});
});

app.get("/admin", async (req, res) => {
  const [list] = await pool.query("SELECT * FROM contacts");
  res.render("admin", {list})
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
