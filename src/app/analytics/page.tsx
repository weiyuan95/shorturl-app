import { ShortUrlApiClient } from '@/app/ShortUrlApiClient';
import AnalyticsTables from '@/app/analytics/AnalyticsTables';

export default async function Page() {
  const [rawAnalyticsData, clickAnalyticsData] = await Promise.all([
    ShortUrlApiClient.getRawAnalytics(),
    ShortUrlApiClient.getClickAnalytics(),
  ]);

  return <AnalyticsTables data={rawAnalyticsData} clicks={clickAnalyticsData} />;
}
