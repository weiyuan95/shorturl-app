'use client';

import { RawAnalyticsData } from '@/app/ShortUrlApiClient';
import { Table } from '@mantine/core';

interface Props {
  data: RawAnalyticsData[];
}

export default function RawDataTable({ data }: Props) {
  return (
    <Table captionSide="top">
      <Table.Caption>Visit Data</Table.Caption>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Hashed URL</Table.Th>
          <Table.Th>Country</Table.Th>
          <Table.Th>Created At</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {data.map(({ hashed_url, country, created_at }, i) => {
          return (
            <Table.Tr key={`${hashed_url}-${i}`}>
              <Table.Td>{hashed_url}</Table.Td>
              <Table.Td>{country}</Table.Td>
              <Table.Td>{created_at}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
}

// function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//
//   return new Intl.DateTimeFormat('en-GB', {
//     dateStyle: 'medium',
//     timeStyle: 'long',
//     timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
//   }).format(date);
// }
