"use client";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import { LanguageProvider } from "./languageContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloProvider client={client}>
      <LanguageProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
      </LanguageProvider>
    </ApolloProvider>
  );
}
