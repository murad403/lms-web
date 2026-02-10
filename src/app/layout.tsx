// This file exists so Next.js recognizes the app directory.
// The actual root layout with html/body is in [locale]/layout.tsx

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
