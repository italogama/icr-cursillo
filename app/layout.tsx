import Head from 'next/head';
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
      <body>{children}</body>
    </html>
  );
}
