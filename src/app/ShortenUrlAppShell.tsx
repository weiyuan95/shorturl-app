'use client';

import { AppShell, Burger, Group, Title, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';

import classes from './shell.module.css';

export default function ShortenUrlAppShell({ children }: Readonly<{ children: ReactNode }>) {
  const [opened, { toggle }] = useDisclosure();
  const router = useRouter();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Title>ShortURL</Title>
            <Group ml="xl" gap={0} visibleFrom="sm">
              <UnstyledButton
                className={classes.control}
                onClick={() => {
                  router.push('/');
                }}
              >
                Shorten a URL
              </UnstyledButton>
              <UnstyledButton
                className={classes.control}
                onClick={() => {
                  router.push('/analytics');
                }}
              >
                Analytics
              </UnstyledButton>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <UnstyledButton className={classes.control}>Shorten a URL</UnstyledButton>
        <UnstyledButton className={classes.control}>Analytics</UnstyledButton>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
