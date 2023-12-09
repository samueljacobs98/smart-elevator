const jsonServer = require("json-server");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post("/api/lift/request", (req, res) => {
  const db = router.db;
  const status = db.get("status").value();

  const maybeLift = Object.keys(status.lifts).find((lift) => {
    return status.lifts[lift].destinations.includes(req.body.to_floor);
  });

  const lift = maybeLift ? maybeLift : "B";

  res.json({ lift });
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
