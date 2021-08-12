import express from "express";
import process from "process";
import path from "path";
import { fileURLToPath } from 'url';
import expressHandlebars from "express-handlebars";
import { runExpress } from "../../shared/run-express.mjs";
import { getDirname } from "../../shared/dirname.mjs";
import * as handlers from "./handlers/handlers.mjs";

const PORT = process.env.PORT || 3000;
const __dirname = getDirname(import.meta.url);
const PUBLIC_FOLDER = path.join(__dirname, 'public');

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

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.use(handlers.notFound);

// eslint-disable-next-line no-unused-vars
app.use(handlers.serverError);

export const runApp = () => runExpress(app, PORT);

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runApp();
}
