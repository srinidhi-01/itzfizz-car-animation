import './globals.css';

export const metadata = {
  title: 'ITZFIZZ — Car Animation',
  description: 'Virtual-scroll driven car hero animation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
