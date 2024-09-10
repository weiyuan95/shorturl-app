/**
 * Prepends the protocol to the URL if it is missing. We default to `http://` since not all URLs are HTTPS.
 * We use this since
 *   - Technically, a URL without a protocol is invalid.
 *   - The API we're using also requires the protocol.
 * @param url
 */
export function handleUserUrlInput(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `http://${url}`;
}
