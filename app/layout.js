import './globals.css';

export const metadata = {
  title: 'Divyah Moments of Trance',
  description: 'Psytrance events in India by Divyah Moments of Trance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;800&family=Outfit:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="trip-bg" aria-hidden="true"><span /><span /><span /></div>
        {children}
      </body>
    </html>
  );
}
