const express = require("express");
const app = express();

// make all the files in 'public' available
app.use(express.static("public"));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

app.get("/audio", (request, response) => {
  response.sendFile(__dirname + "/views/audio.html");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
