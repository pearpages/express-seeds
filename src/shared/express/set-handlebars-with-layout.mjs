import expressHandlebars from "express-handlebars";

export function setHandlebarsWithLayout(app, defaultLayout = "main") {
  app.engine(
    "handlebars",
    expressHandlebars({
      defaultLayout,
    })
  );
  return app
}
