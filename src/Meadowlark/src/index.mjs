import express from "express";
import process from "process";
import expressHandlebars from "express-handlebars";
import { runExpress } from "../../shared/run-express.mjs";

const PORT = process.env.PORT || 3000;

const makeResponseTypeText = (res) => res.type("text/plain");

const app = express();

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);

app.set("view engine", "handlebars");

app.get("/", (req, res) => res.render('home'));

app.get("/about", (req, res) => res.render('about'));

app.use((req, res) => {
  makeResponseTypeText(res);
  res.status(404);
  res.render('404');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  makeResponseTypeText(res);
  res.status(500);
  res.render('500');
});

runExpress(app, PORT);
