export interface ShortenUrlResponse {
  hashed_url: string;
  target_url: string;
  salt: string;
  title: string;
  short_url: string;
}

export class ShortUrlApiClient {
  private static readonly API_URL_BASE = 'https://api.url.weiyuan.dev';
  // FOR TESTING PURPOSES ONLY FOR LOCALHOST
  // private static readonly API_URL_BASE = 'http://localhost:3000';

  static async shortenUrl(targetUrl: string): Promise<ShortenUrlResponse> {
    const apiUrl = `${ShortUrlApiClient.API_URL_BASE}/api/url`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        target_url: targetUrl,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to shorten URL');
    }

    return (await response.json()) as ShortenUrlResponse;
  }
}
