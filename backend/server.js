const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);

app.post("/trigger-call", async (req, res) => {
  const to = req.body.phone;

  try {
    await client.calls.create({
      to,
      from: twilioPhone,
      url: 'http://demo.twilio.com/docs/voice.xml'
    });
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3000, () => console.log("Backend running on port 3000"));