import './globals.css';

export const metadata = {
  title: 'Pixroro',
  description: 'pixro 首页与素材市场原型，基于 Next.js App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
