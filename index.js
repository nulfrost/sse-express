const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/events", (request, response) => {
  response.set("Cache-Control", "no-store");
  response.set("Content-Type", "text/event-stream");
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Connection", "keep-alive");
  response.flushHeaders();

  let interval = setInterval(() => {
    response.write(
      "id: " +
        uuidv4() +
        "\ndata: " +
        `Sent at ${new Date().getSeconds()}` +
        "\n\n"
    );
  }, 2000);

  response.on("close", () => {
    clearInterval(interval);
    response.end();
  });
});

app.listen(4444, () => console.log("Running SSE Server"));
