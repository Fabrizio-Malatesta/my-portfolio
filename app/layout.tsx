import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Fabrizio Malatesta | Bioinformatics Researcher & UC San Diego Student",
  description:
    "Bioinformatics researcher at UCSD exploring computational genomics, genetic variation, and statistical genetics. UC LEADS Scholar.",
  keywords: [
    "bioinformatics",
    "computational genomics",
    "statistical genetics",
    "GWAS",
    "computational biology",
    "UC San Diego",
    "UCSD",
    "UC LEADS",
    "Fabrizio Malatesta",
    "researcher",
    "Salk Institute",
    "genomics",
  ],
  openGraph: {
    title: "Fabrizio Malatesta | Bioinformatics Researcher",
    description:
      "Bioinformatics researcher at UCSD exploring computational genomics, genetic variation, and statistical genetics. UC LEADS Scholar.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Fabrizio Malatesta | Bioinformatics Researcher",
    description:
      "Bioinformatics researcher at UCSD exploring computational genomics, genetic variation, and statistical genetics. UC LEADS Scholar.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fabrizio Malatesta",
  jobTitle: "Undergraduate Researcher",
  affiliation: {
    "@type": "Organization",
    name: "University of California, San Diego",
  },
  email: "famalatesta@ucsd.edu",
  sameAs: ["https://www.linkedin.com/in/fabrizio-malatesta-10a1b4341"],
  knowsAbout: [
    "Bioinformatics",
    "Computational Genomics",
    "Statistical Genetics",
    "GWAS",
    "Molecular Biology",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
