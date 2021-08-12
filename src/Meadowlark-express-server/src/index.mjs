import express from "express";
import process from "process";
import path from "path";
import { runExpress } from "../../shared/express/run.mjs";
import { getDirname } from "../../shared/dirname.mjs";
import * as handlers from "./handlers/handlers.mjs";
import { hideAppDetailsInResponse } from "../../shared/express/hide-detais-in-response.mjs";
import { setHandlebarsWithLayout } from "../../shared/express/set-handlebars-with-layout.mjs";
import { isModuleRun } from "../../shared/is-module-run.mjs";

const PORT = process.env.PORT || 3000;
const __dirname = getDirname(import.meta.url);
const PUBLIC_FOLDER = path.join(__dirname, 'public');

const app = express();

hideAppDetailsInResponse(app);
setHandlebarsWithLayout(app);

app.set("views", path.join(__dirname, 'views'));
app.set("view engine", "handlebars");

app.use(express.static(PUBLIC_FOLDER));

app.get("/", handlers.home);

app.get("/about", handlers.about);

app.use(handlers.notFound);

// eslint-disable-next-line no-unused-vars
app.use(handlers.serverError);

export const runApp = () => runExpress(app, PORT);

if (isModuleRun) {
  runApp();
}
