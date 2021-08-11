import express from "express";
import process from "process";
import path from "path";
import expressHandlebars from "express-handlebars";
import { runExpress } from "../../shared/run-express.mjs";
import { getDirname } from "../../shared/dirname.mjs";
import { getRandomFortune } from "./about/fortunes.mjs";

const PORT = process.env.PORT || 3000;
const __dirname = getDirname(import.meta.url);
const PUBLIC_FOLDER = path.join(__dirname, 'public');

const makeResponseTypeText = (res) => res.type("text/plain");

const app = express();

app.engine(
  "handlebars",
  expressHandlebars({
    defaultLayout: "main",
  })
);

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "handlebars");

app.use(express.static(PUBLIC_FOLDER));

app.get("/", (req, res) => res.render("home"));

app.get("/about", (req, res) =>
  res.render("about", { fortune: getRandomFortune() })
);

app.use((req, res) => {
  makeResponseTypeText(res);
  res.status(404);
  res.render("404");
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.message);
  makeResponseTypeText(res);
  res.status(500);
  res.render("500");
});

runExpress(app, PORT);
