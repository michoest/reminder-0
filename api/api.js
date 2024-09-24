// api.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dayjs = require("dayjs");
const webpush = require('web-push');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3003;

app.use(cors("*"));
app.use(express.json());
app.use(morgan("combined"));

// Ping route
app.get("/ping", async (req, res, next) => {
  res.send("pong");
});

// Reminders routes
// app.get("/reminders", async (req, res, next) => {
//   const reminders = [
//     {
//       id: "b1a901e5-2cd8-44e8-a117-fa95e14e188f",
//       title: "Doctor's appointment",
//       date: "2024-09-30T10:00:00",
//       status: "pending",
//     },
//     {
//       id: "4dcc2624-e1ed-480e-b73b-002b7c3ee5d8",
//       title: "Pay electricity bill",
//       date: "2024-09-25T09:00:00",
//       status: "completed",
//     },
//     {
//       id: "2aa7997f-4e58-48e2-916e-c09893f8bdc8",
//       title: "Team meeting",
//       date: "2024-09-26T14:30:00",
//       status: "pending",
//     },
//     {
//       id: "5f32b149-23d3-4819-b151-770a26e8520d",
//       title: "Buy groceries",
//       date: "2024-09-27T18:00:00",
//       status: "pending",
//     },
//     {
//       id: "129ecf2f-f5de-4f3b-976c-d4bd97b5fbbb",
//       title: "Submit project report",
//       date: "2024-09-29T17:00:00",
//       status: "pending",
//     },
//   ];

//   return res.json({ reminders });
// });

// Set VAPID keys
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails('mailto:mail@michoest.com', publicVapidKey, privateVapidKey);

const subscriptions = [];
// Subscribe route
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
  
    subscriptions.push(subscription);
  });
  
// Send push notification
const sendPushNotifications = () => {
    const payload = { title: 'Schallo', message: 'Schie weht?', timestamp: dayjs() };

    subscriptions.forEach(async subscription => {
        try {
            await webpush.sendNotification(subscription, payload);
        }
        catch (err) {
            console.error(err);
        }
    });
};

let timer = null;
app.get('/start', (req, res, next) => {
    timer = setInterval(sendPushNotifications, 10000);

    return res.json({ numberOfSubscriptions: subscriptions.length });
});

app.get('/stop', (req, res, next) => {
    clearInterval(timer);
    timer = null;

    return res.json({ stopped: true });
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
