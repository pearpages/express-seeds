export function hideAppDetailsInResponse(app) {
   app.disable('x-powered-by');
   return app;
}
