import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        
        {/* Meta Tags */}
        <meta name="description" content="SMB Panel - Cheapest & Fastest SMM Services. Boost your social media presence with high-quality followers, likes, views, and more!" />
        <meta name="keywords" content="SMM panel, social media marketing, buy followers, buy likes, Instagram, Facebook, TikTok, YouTube, Twitter" />
        <meta name="author" content="SMB Panel" />
        
        {/* Open Graph */}
        <meta property="og:title" content="SMB Panel - Boost Your Social Media" />
        <meta property="og:description" content="Cheapest & Fastest SMM Services. Get real followers, likes, and views instantly!" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/favicon.svg" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0f172a" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <body className="font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
