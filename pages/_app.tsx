import { AppProps } from 'next/app';
import 'firebase/firestore';
import 'firebase/auth';
import { FuegoProvider } from '@nandorojo/swr-firestore';

import { AuthProvider } from 'app/AuthProvider';
import { Layout } from 'layout/Layout';
import { Fuego } from 'utils/fuego';

import '../styles/main.css';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const fuego = new Fuego(firebaseConfig);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <FuegoProvider fuego={fuego}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FuegoProvider>
    </AuthProvider>
  );
}
