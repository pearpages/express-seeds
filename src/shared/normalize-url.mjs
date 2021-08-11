export function normalizeUrl(url) {
  // normalize url by removing querystring, optional
  // trailing slash, and making it lowercase
  return url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
}
