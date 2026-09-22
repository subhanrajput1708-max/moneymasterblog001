# Money Master Blog

> Practical online tools, educational guides, and useful resources for everyday digital and productivity tasks.

**Money Master Blog** (hosted at [moneymasterblog.site](https://www.moneymasterblog.site/)) provides free, private, client-side browser utilities alongside in-depth practical guides for digital workers, content creators, researchers, and professionals.

---

## 🌟 Key Features

### 🛠️ 15 Fast, Client-Side Browser Utilities
All utilities operate 100% locally in the visitor's browser. No entered text, passwords, or data are ever transmitted to an external server or stored in a database.

1. **Color Palette Generator**: Generate harmonic palettes, inspect HEX and RGB values, lock preferred tones, and export CSS.
2. **Text Cleaner & Case Converter**: Inspect word/character metrics, clean formatting, and convert between uppercase, lowercase, title case, sentence case, and slug format.
3. **Random Password Generator**: Generate cryptographically secure passwords client-side using `crypto.getRandomValues()` with customizable length and character sets.
4. **Lorem Ipsum Generator**: Produce customizable placeholder text by paragraph, sentence, or word count.
5. **Text Sorter**: Sort lines alphabetically (A–Z or Z–A), numerically, by line length, or in reverse order with case sensitivity options.
6. **Find & Replace Text**: Replace words, phrases, or regular expressions across documents with real-time match counting.
7. **Remove Line Breaks**: Reassemble broken lines from copied PDFs and emails into continuous paragraphs while preserving true double line breaks.
8. **Duplicate Line Remover**: Eliminate repeated entries from lists, email lists, or logs with case-sensitive or case-insensitive matching.
9. **Whitespace Remover**: Strip leading/trailing spaces, collapse multiple spaces into single spaces, and clean tabs.
10. **Text Line Counter**: Analyze line counts, non-empty lines, empty lines, word density, and average line lengths.
11. **Invisible Character Remover**: Detect and purge zero-width spaces (`\u200B`), non-breaking spaces (`\u00A0`), soft hyphens (`\u00AD`), and byte order marks (`\uFEFF`).
12. **Text Punctuation Cleaner**: Clean or normalize irregular punctuation, repeated exclamation points, or erratic symbols while safeguarding contractions and decimals.
13. **Text Number Extractor**: Extract all integers, decimals, prices, percentages, or phone patterns from text blocks into clean lists.
14. **Text Quote Remover**: Strip surrounding quotation marks, dialogue lines, or typographic smart quotes without corrupting internal apostrophes.
15. **Text Prefix & Suffix Cleaner**: Add or remove prefixes and suffixes across every line with line-numbering and case-matching tools.

---

### 📚 20 In-Depth Practical Productivity Guides
Step-by-step guides addressing real-world digital workflows:
- Cleaning text copied from PDFs without losing data
- Removing hidden and zero-width characters copied from websites
- Formatting name lists and customer records for clean spreadsheet imports
- Stripping duplicate lines from large text files
- Extracting numbers, prices, and IDs from logs
- Sorting messy lists into clean A–Z lists
- Removing line breaks while preserving paragraph flow
- Safe find-and-replace workflows in large documents
- Preparing text for online forms and copy-paste compatibility
- Preserving apostrophes during quote stripping operations
- Organizing repetitive text tasks for small businesses
- Complete 5-step checklist for pre-flight text cleaning

---

## 👤 Editorial Purpose & Author

- **Site Name**: Money Master Blog
- **Website**: [https://www.moneymasterblog.site/](https://www.moneymasterblog.site/)
- **Author**: Shahid Ali
- **Experience**: 7 years of practical experience in digital content workflows & web utilities.
- **Editorial Mission**: Providing transparent, actionable, and privacy-respecting tools and guides that help users solve common digital file, text, and formatting problems directly in their browser.

---

## 🔒 Privacy & Architecture

- **Privacy-First**: No user text, lists, or generated credentials are sent to any remote server or stored in cookies/databases. All operations run synchronously within the client's browser DOM memory.
- **Responsive Layout**: Designed with responsive breakpoints (320px to 1920px) supporting mobile, tablet, and desktop viewing.
- **Semantic SEO**: Fully optimized with unique meta titles, descriptions, OpenGraph share cards, Schema.org JSON-LD web application structured data, and an XML sitemap.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or newer recommended)
- npm

### Installation
```bash
# Clone or download the repository
git clone https://github.com/your-username/moneymasterblog.git
cd moneymasterblog

# Install dependencies
npm install

# Start the local development server
npm run dev
```

The application will be accessible at `http://localhost:3000/`.

### Building for Production
```bash
npm run build
```
Production assets are generated in the `dist/` directory.

---

## 🗺️ Sitemap & Search Engine Optimization

- **Sitemap Location**: `public/sitemap.xml` (deployed to `https://www.moneymasterblog.site/sitemap.xml`)
- **Robots.txt Location**: `public/robots.txt` (deployed to `https://www.moneymasterblog.site/robots.txt`)
- **Format**: Valid `sitemaps.org` XML (`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`)
- **Total Indexable URLs**: 28 canonical URLs (8 standalone pages + 20 practical guides)
- **Hash-Free Routing**: Zero `#` hash URLs exist in the sitemap or website routing. All URLs are clean, canonical paths:
  - Homepage: `https://www.moneymasterblog.site/`
  - Tools Directory: `https://www.moneymasterblog.site/p/tools.html`
  - Guides & Blog: `https://www.moneymasterblog.site/p/blog-page.html`
  - About Us: `https://www.moneymasterblog.site/p/about-us.html`
  - Contact Us: `https://www.moneymasterblog.site/p/contact-us.html`
  - Privacy Policy: `https://www.moneymasterblog.site/p/privacy-policy.html`
  - Terms & Conditions: `https://www.moneymasterblog.site/p/terms-conditions.html`
  - Website Disclaimer: `https://www.moneymasterblog.site/p/disclaimer.html`
  - 20 Practical Guides: `https://www.moneymasterblog.site/{year}/{month}/{article-slug}.html`

### 🔄 Automatic Sitemap Generation
When new articles or pages are added to `src/data/blogArticles.ts` or `src/utils/routes.ts`, running:
```bash
npm run build
```
automatically generates the updated `sitemap.xml` and pre-rendered standalone HTML pages in both `public/` and `dist/`.

---

## 📄 License

This project is licensed under the Apache-2.0 License.
