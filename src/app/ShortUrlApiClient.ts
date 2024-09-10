export interface ShortUrl {
  hashed_url: string;
  target_url: string;
  salt: string;
  title: string;
  short_url: string;
}

export interface RawAnalyticsData {
  hashed_url: string;
  created_at: string;
  country: string;
}
export type ClickAnalyticsData = Record<string, number>;

export class ShortUrlApiClient {
  private static readonly API_URL_BASE =
    process.env.NODE_ENV == 'development' ? 'http://localhost:3000' : 'https://api.url.weiyuan.dev';

  static async getRawAnalytics(): Promise<RawAnalyticsData[]> {
    const apiUrl = `${ShortUrlApiClient.API_URL_BASE}/api/analytics/url/raw`;
    // Need to not cache this result, if not the data is not re-fetched on refresh
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      console.error('Unable to fetch raw analytics data');
      return [] as RawAnalyticsData[];
    }

    return (await response.json()).raw_data as RawAnalyticsData[];
  }

  static async getClickAnalytics(): Promise<ClickAnalyticsData> {
    const apiUrl = `${ShortUrlApiClient.API_URL_BASE}/api/analytics/url/clicks`;
    // Need to not cache this result, if not the data is not re-fetched on refresh
    const response = await fetch(apiUrl, { cache: 'no-store' });

    if (!response.ok) {
      console.error('Unable to fetch click analytics data');
      return {} as Record<string, number>;
    }

    return (await response.json()).clicks as ClickAnalyticsData;
  }

  static async getShortUrl(shortUrl: string): Promise<ShortUrl> {
    const apiUrl = `${ShortUrlApiClient.API_URL_BASE}/api/url/${shortUrl}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error('Short URL does not exist, or the server is down');
    }

    const body = await response.json();

    return body as ShortUrl;
  }

  static async shortenUrl(targetUrl: string): Promise<ShortUrl> {
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

    return (await response.json()) as ShortUrl;
  }
}
