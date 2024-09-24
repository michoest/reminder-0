// api.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dayjs = require("dayjs");

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
app.get("/reminders", async (req, res, next) => {
  const reminders = [
    {
      id: "b1a901e5-2cd8-44e8-a117-fa95e14e188f",
      title: "Doctor's appointment",
      date: "2024-09-30T10:00:00",
      status: "pending",
    },
    {
      id: "4dcc2624-e1ed-480e-b73b-002b7c3ee5d8",
      title: "Pay electricity bill",
      date: "2024-09-25T09:00:00",
      status: "completed",
    },
    {
      id: "2aa7997f-4e58-48e2-916e-c09893f8bdc8",
      title: "Team meeting",
      date: "2024-09-26T14:30:00",
      status: "pending",
    },
    {
      id: "5f32b149-23d3-4819-b151-770a26e8520d",
      title: "Buy groceries",
      date: "2024-09-27T18:00:00",
      status: "pending",
    },
    {
      id: "129ecf2f-f5de-4f3b-976c-d4bd97b5fbbb",
      title: "Submit project report",
      date: "2024-09-29T17:00:00",
      status: "pending",
    },
  ];

  return res.json({ reminders });
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
