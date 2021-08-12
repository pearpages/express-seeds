import { getRandomFortune } from "./fortunes.mjs";

export const home = (req, res) => res.render("home");

export const about = (req, res) =>
  res.render("about", { fortune: getRandomFortune() });

export const notFound = (req, res) => {
  res.status(404);
  res.render("404");
};

// eslint-disable-next-line no-unused-vars
export const serverError = (err, req, res, next) => {
  res.status(500);
  res.render("500");
};
