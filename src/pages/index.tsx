import { Inter } from 'next/font/google';
import Head from 'next/head';
import cx from 'classnames';

import ReviewApp from '@/modules/ReviewApp';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Review App</title>
        <meta name="description" content="Front-End Challenge" />
      </Head>
      <main className={cx('flex', 'flex-col', inter.className)}>
        <h1
          className={cx(
            'py-2',
            'bg-primary-700',
            'text-white',
            'text-3xl',
            'text-center',
          )}
        >
          <span className="text-black">Review</span>
          App
        </h1>

        <ReviewApp />
      </main>
    </>
  );
}
