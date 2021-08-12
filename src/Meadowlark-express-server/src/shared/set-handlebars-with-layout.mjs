import expressHandlebars from "express-handlebars";

export function setHandlebarsWithLayout(app, {defaultLayout = "main", viewsFolder }) {
  app.engine(
    "handlebars",
    expressHandlebars({
      defaultLayout,
    })
  );
  app.set("views", viewsFolder);
  app.set("view engine", "handlebars");

  return app
}
