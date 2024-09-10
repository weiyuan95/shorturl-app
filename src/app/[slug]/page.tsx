import { notFound, redirect } from 'next/navigation';
import { ShortUrlApiClient } from '@/app/ShortUrlApiClient';

export default async function Page({ params }: { params: { slug: string } }) {
  let shortUrl;

  try {
    shortUrl = await ShortUrlApiClient.getShortUrl(params.slug);
  } catch {
    return notFound();
  }

  // Should not happen, but just in case
  if (!shortUrl) {
    return notFound();
  }

  return redirect(shortUrl.short_url);
}
