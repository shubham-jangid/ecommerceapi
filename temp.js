const express = require("express");
const app = express();

app.param("id", function (req, res, next, id) {
  console.log("CALLED ONLY ONCE" + id);
  req.id = { id: id };
  next();
});

app.get("/user/admin/:id", function (req, res) {
  console.log("although this matches");

  res.send(req.id + " --" + req.params.id);
});
app.listen(4000);
