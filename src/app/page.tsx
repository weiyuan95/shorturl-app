'use client';

import { useForm } from '@mantine/form';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  CopyButton,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  rem,
  Stack,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useState } from 'react';
import { handleUserUrlInput } from '@/app/urls';
import { ShortUrl, ShortUrlApiClient } from '@/app/ShortUrlApiClient';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

export default function Home() {
  const [shortenAnother, setShortenAnother] = useState(false);
  const [shortenedUrl, setShortenedUrl] = useState<ShortUrl | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      targetUrl: '',
    },
    validate: {
      targetUrl: (val) => {
        try {
          new URL(handleUserUrlInput(val));
          return null;
        } catch {
          return 'Please enter a valid URL.';
        }
      },
    },
  });

  return (
    <Container size="xs" pt="xl">
      <Paper radius="md" p="xl" mt="md" mb="md" withBorder>
        <Box pos="relative">
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ blur: 1 }} loaderProps={{ type: 'dots' }} />
          <Text size="lg" fw={500}>
            Shorten a long URL
          </Text>
          <Divider my="sm" />
          {!shortenAnother && (
            <form
              onSubmit={form.onSubmit(async ({ targetUrl }) => {
                setIsLoading(true);
                const parsedUrl = handleUserUrlInput(targetUrl);

                try {
                  const shortenedUrl = await ShortUrlApiClient.shortenUrl(parsedUrl);
                  setShortenedUrl(shortenedUrl);
                  setShortenAnother(true);
                } catch {
                  notifications.show({
                    title: 'Something went wrong',
                    message: 'Failed to shorten URL',
                    color: 'red',
                  });
                }

                setIsLoading(false);
              })}
            >
              <Stack>
                <TextInput
                  {...form.getInputProps('targetUrl')}
                  key={form.key('targetUrl')}
                  label="Shorten a long URL"
                  radius="sm"
                />
              </Stack>
              <Group justify="center" mt="xl">
                <Button type="submit" variant="filled">
                  Shorten 🪄
                </Button>
              </Group>
            </form>
          )}
          {shortenAnother && shortenedUrl && (
            <>
              <Stack>
                <TextInput readOnly label="Original URL" value={shortenedUrl.target_url} />
                <TextInput
                  readOnly
                  label="Shortened URL"
                  value={getShortUrl(shortenedUrl.hashed_url)}
                  rightSection={CopyShortUrlButton(getShortUrl(shortenedUrl.hashed_url))}
                />
                <TextInput readOnly label="Original URL page title" value={shortenedUrl.title} />
              </Stack>
              <Group justify="center" mt="xl">
                <Button
                  variant="filled"
                  onClick={() => {
                    setShortenedUrl(null);
                    setShortenAnother(false);
                    form.reset();
                  }}
                >
                  Shorten another URL
                </Button>
              </Group>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

function getShortUrl(hash: string) {
  const URL_BASE = process.env.NODE_ENV == 'development' ? 'http://localhost:3001' : 'https://url.weiyuan.dev';
  return `${URL_BASE}/${hash}`;
}

function CopyShortUrlButton(shortUrl: string) {
  return (
    <CopyButton value={shortUrl} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
            {copied ? <IconCheck style={{ width: rem(16) }} /> : <IconCopy style={{ width: rem(16) }} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}
