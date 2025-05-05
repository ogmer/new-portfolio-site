"use client";

import React from "react";

// JSON-LDデータ型
type JsonLdPerson = {
  "@context": string;
  "@type": string;
  name: string;
  jobTitle: string;
  description: string;
  knowsAbout: string[];
  sameAs: string[];
  email: string;
  address: {
    "@type": string;
    addressLocality: string;
    addressCountry: string;
  };
};

// JSON-LDスクリプトを挿入するコンポーネント
const JsonLd: React.FC = () => {
  const jsonLd: JsonLdPerson = {
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
};

export default JsonLd;
