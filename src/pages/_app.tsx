import type { NextPage } from 'next';
import type { AppProps, AppType } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import { DefaultLayout } from '~/components/DefaultLayout';
import { trpc } from '~/utils/trpc';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

export type NextPageWithLayout<
  TProps = Record<string, unknown>,
  TInitialProps = TProps,
> = NextPage<TProps, TInitialProps> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = (({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return getLayout(
    <ThemeProvider
      enableSystem={true}
      enableColorScheme={true}
      attribute="class"
    >
      <Component {...pageProps} />
    </ThemeProvider>,
  );
}) as AppType;

export default trpc.withTRPC(MyApp);
