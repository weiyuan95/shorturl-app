'use client';

import { Button, Flex, Grid } from '@mantine/core';
import { useRouter } from 'next/navigation';

import ClicksTable from '@/app/analytics/ClicksTable';
import RawDataTable from '@/app/analytics/RawDataTable';
import { ClickAnalyticsData, RawAnalyticsData } from '@/app/ShortUrlApiClient';

interface Props {
  data: RawAnalyticsData[];
  clicks: ClickAnalyticsData;
}

export default function AnalyticsTables({ data, clicks }: Props) {
  const router = useRouter();
  return (
    <>
      <Flex justify="center">
        <Button
          onClick={() => {
            router.refresh();
          }}
        >
          Refresh data
        </Button>
      </Flex>
      <Grid justify="space-around">
        <Grid.Col span={6}>
          <RawDataTable data={data} />
        </Grid.Col>
        <Grid.Col span={4}>
          <ClicksTable clicks={clicks} />
        </Grid.Col>
      </Grid>
    </>
  );
}
