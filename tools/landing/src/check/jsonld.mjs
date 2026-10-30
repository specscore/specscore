/**
 * Structured data for /check/. Built from the same strings the page shows.
 */
export function jsonLd({ title, description, url, lang, h1, faqs, home }) {
  return [
    {
      '@type': ['WebApplication', 'SoftwareApplication'],
      name: title,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      description,
      url,
      inLanguage: lang,
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      browserRequirements: 'Requires a browser with WebAssembly.',
    },
    {
      '@type': 'FAQPage',
      url,
      inLanguage: lang,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'SpecScore.md', item: home || 'https://specscore.md/' },
        { '@type': 'ListItem', position: 2, name: h1, item: url },
      ],
    },
  ];
}
