import '../styles/globals.css';
import { Glegoo } from 'next/font/google';

const glegoo = Glegoo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-glegoo',
  weight: '700'
})

function MyApp ({ Component, pageProps }) {
  return (
    <div className={glegoo.variable}>
      <Component { ...pageProps } />
    </div>
  );
}

export default MyApp;
