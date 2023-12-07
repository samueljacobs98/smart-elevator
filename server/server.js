const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/api/lift/request", (req, res) => {
  const liftNumber = Math.floor(Math.random() * 3.99);
  res.json({ lift: liftNumber });
});

server.get("/api/lift/status", (req, res) => {
  const db = router.db;
  const status = db.get("status").value();
  res.json(status);
});

server.get("/api/lift/config", (req, res) => {
  const db = router.db;
  const config = db.get("config").value();
  res.json(config);
});

server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running");
});
