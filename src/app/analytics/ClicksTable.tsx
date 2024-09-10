'use client';

import { ClickAnalyticsData } from '@/app/ShortUrlApiClient';
import { Table } from '@mantine/core';

interface Props {
  clicks: ClickAnalyticsData;
}

export default function ClicksTable({ clicks }: Props) {
  return (
    <Table captionSide="top">
      <Table.Caption>Clicks Data</Table.Caption>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Hashed URL</Table.Th>
          <Table.Th>Num Clicks</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Object.entries(clicks).map(([hashedUrl, numClicks]) => {
          return (
            <Table.Tr key={hashedUrl}>
              <Table.Td>{hashedUrl}</Table.Td>
              <Table.Td>{numClicks}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}
