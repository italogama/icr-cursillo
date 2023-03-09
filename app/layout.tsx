import Head from 'next/head';
import Script from 'next/script';
import '../styles/globals.css';
export const metadata = {
  title: 'Cursilho da Cristandade Igreja Cristã em Recife',
  description: 'Criado por Gama Code',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <Script src="https://sdk.mercadopago.com/js/v2" />
      <Script src="https://www.mercadopago.com/v2/security.js"></Script>
      <body>{children}</body>
    </html>
  );
}
