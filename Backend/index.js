const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDB = require("./db");
const path = require("path");

// Connect to MongoDB
mongoDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send-email", async (req, res) => {
  try {
    const { from, to, subject, html } = req.body;

    console.log("Received email data:", { from, to, subject, html }); // Logging request body

    const response = await axios.post(
      "https://api.resend.com/emails",
      {
        from,
        to,
        subject,
        html,
      },
      {
        headers: {
          'Authorization': `Bearer re_WWUS6sAy_F2WADKk2y4CibFYbWipqA5oZ`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log("Email sent successfully:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 500)
      .json(error.response?.data || { message: "Internal Server Error" });
  }
});

// User Routes
app.use("/api", require("./Routes/Newuser"));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
