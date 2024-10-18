const express = require("express");
const path = require("path");
const os = require("os");

const app = express();

app.use("/home", express.static(path.join(__dirname, "src", "home")));
app.use("/coffee", express.static(path.join(__dirname, "src", "coffee")));
app.use("/regular", express.static(path.join(__dirname, "src", "regular")));
app.use("/special", express.static(path.join(__dirname, "src", "special")));
app.use("/food", express.static(path.join(__dirname, "src", "food")));
app.use("/cart", express.static(path.join(__dirname, "src", "cart")));

app.use("/src", express.static(path.join(__dirname, "src")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "home", "home.html"));
});

app.get("/food", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "food", "food.html"));
});

app.get("/coffee", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "coffee", "coffee.html"));
});

app.get("/regular", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "regular", "regular.html"));
});

app.get("/special", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "special", "special.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "cart", "cart.html"));
});

app.use((req, res) => {
  res.redirect("/");
});

const port = 4264;

const getIPAddress = () => {
  const interfaces = os.networkInterfaces();
  let ipAddress = "";
  for (const interface in interfaces) {
    interfaces[interface].forEach((details) => {
      if (details.family === "IPv4" && !details.internal) {
        ipAddress = details.address;
      }
    });
  }
  return ipAddress;
};

const getServerURL = () => {
  const ipAddress = getIPAddress();
  return `http://${ipAddress}:${port}`;
};

app.listen(port, function () {
  console.log(`Server is up at port ${port}`);
  console.log(`Server IP address: ${getIPAddress()}`);
  console.log(`Server is up at: ${getServerURL()}`);
});