export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The <html> and <body> are rendered by app/[locale]/layout.tsx so the
  // correct lang + dir attributes can be applied per-locale.
  return children;
}
