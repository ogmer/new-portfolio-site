"use client";

export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "ogmer",
    jobTitle: "Software Engineer",
    description:
      "バックエンド開発を本業とし、フロントエンド開発を趣味とするエンジニアです。",
    knowsAbout: [
      "Java",
      "C++",
      "Python",
      "JavaScript",
      "SQL",
      "バックエンド開発",
      "フロントエンド開発",
    ],
    sameAs: [
      "https://github.com/ogmer",
      "https://qiita.com/ogmer",
      "https://zenn.dev/ogmer",
    ],
    email: "ogmer.net@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tokyo",
      addressCountry: "JP",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
