import { ToolId, ToolMeta, ToolCategory } from '../types';

export const TOOL_CATEGORIES: ToolCategory[] = [
  'Text Tools',
  'Developer & Web Tools',
  'Image Tools',
  'Calculators',
];

export const TOOLS_DATA: ToolMeta[] = [
  // ==========================================
  // TEXT TOOLS (7)
  // ==========================================
  {
    id: 'text-cleaner',
    name: 'Text Cleaner',
    category: 'Text Tools',
    summary: 'Clean cluttered text, strip unwanted whitespace, remove blank lines, sanitize HTML tags, and normalize quotes.',
    seoTitle: 'Text Cleaner – Remove Extra Spaces, Blank Lines & Format Artifacts',
    metaDescription: 'Free online text cleaner. Remove excess spaces, strip HTML tags, delete blank lines, normalize quotes, and sanitize text locally in your browser.',
    h1: 'Online Text Cleaner & Formatting Sanitizer',
    explanation: 'When pasting content from PDFs, spreadsheets, email threads, or word processors, text often carries unwanted whitespace, irregular line breaks, mixed quotes, and hidden formatting tags. The Text Cleaner standardizes your text in one click while keeping your actual wording intact.',
    howToUse: [
      'Paste or type your unformatted text into the input box.',
      'Select cleaning options such as removing duplicate spaces, trimming lines, stripping HTML, or removing empty lines.',
      'Click "Clean Text" or use the real-time automatic mode to view the sanitized result instantly.',
      'Copy your clean text with the one-click copy button.',
    ],
    example: {
      title: 'Cleaning PDF copy with irregular gaps and HTML',
      input: '  This   paragraph  has  <b>bold tags</b>  and \n\n\n excessive   spacing.  ',
      output: 'This paragraph has bold tags and excessive spacing.',
      explanation: 'HTML markup was stripped, extra spaces between words were collapsed into single spaces, and repeated blank lines were removed.',
    },
    usefulTips: [
      'Use "Strip HTML" when migrating articles from WordPress or Google Docs into plain markdown.',
      'Combine "Trim Each Line" with "Remove Empty Lines" to format CSV columns or bullet points cleanly.',
      'All text cleaning is processed entirely in your web browser memory without sending data to any external server.',
    ],
    faqs: [
      {
        question: 'Does Text Cleaner remove numbers or punctuation?',
        answer: 'No. Text Cleaner preserves all numbers, letters, and standard punctuation. It only cleans erratic whitespace, blank lines, HTML tags, and formatting artifacts according to your selected options.',
      },
      {
        question: 'Is there a limit on how much text I can clean at once?',
        answer: 'Because the tool runs directly on your computer or phone using JavaScript, you can easily clean tens of thousands of words or large multi-page articles without delay.',
      },
      {
        question: 'Is my confidential text private when using this tool?',
        answer: 'Yes, 100% private. Your text is processed strictly inside your local browser tab. No text is ever uploaded, transmitted to an API, or saved to any database.',
      },
    ],
    relatedToolIds: ['word-counter', 'character-counter', 'case-converter', 'slug-generator'],
    privacyNote: 'Client-side processing: your text never leaves your device.',
  },
  {
    id: 'lorem-ipsum',
    name: 'Lorem Ipsum Generator',
    category: 'Text Tools',
    summary: 'Generate custom placeholder dummy text by paragraphs, sentences, or word count for web design and document mockups.',
    seoTitle: 'Lorem Ipsum Generator – Custom Dummy Text for Designers & Developers',
    metaDescription: 'Generate custom Lorem Ipsum placeholder text by paragraph, sentence, or word count. Fast, lightweight, and copy-ready dummy text utility.',
    h1: 'Lorem Ipsum Placeholder Text Generator',
    explanation: 'Lorem Ipsum has been the design industry standard dummy text since the 1500s. It provides a natural-looking distribution of letters and word lengths so designers can evaluate typographic layouts without being distracted by readable copy.',
    howToUse: [
      'Choose whether to generate by Paragraphs, Sentences, or Words.',
      'Enter the desired quantity (e.g., 3 paragraphs or 150 words).',
      'Toggle the "Start with Lorem ipsum dolor sit amet..." option if required.',
      'Click "Generate Text" and copy the placeholder content to your clipboard.',
    ],
    example: {
      title: 'Generating 2 paragraphs for a blog mockup',
      input: '2 Paragraphs with standard opening',
      output: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...',
      explanation: 'Produces realistic sentence lengths and natural paragraph structures for wireframing.',
    },
    usefulTips: [
      'Use sentence-based generation when designing brief UI components like cards, tooltips, or testimonial blocks.',
      'Use paragraph-based generation when testing font line-height, margin spacing, and long-form readability.',
      'Copy the output directly into Figma, Sketch, Webflow, or your HTML templates.',
    ],
    faqs: [
      {
        question: 'What does "Lorem Ipsum" actually mean?',
        answer: 'It originates from sections 1.10.32 and 1.10.33 of Cicero\'s "De Finibus Bonorum et Malorum" (On the Extremes of Good and Evil), written in 45 BC, scrambled to serve as nonsensical placeholder copy.',
      },
      {
        question: 'Can I generate dummy text by exact word count?',
        answer: 'Yes. Switch the count mode to "Words" and enter the exact number of words you need to fit your UI container.',
      },
      {
        question: 'Is Lorem Ipsum copyrighted?',
        answer: 'No. Lorem Ipsum is in the public domain and can be freely used in any personal or commercial project without attribution or license fees.',
      },
    ],
    relatedToolIds: ['word-counter', 'character-counter', 'text-cleaner'],
    privacyNote: 'Client-side processing: generated instantly in your browser.',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    category: 'Text Tools',
    summary: 'Count words, characters, sentences, paragraphs, reading time, and keyword frequency in real time.',
    seoTitle: 'Word Counter – Real-Time Word, Character, Reading Time & Density Calculator',
    metaDescription: 'Accurate online word counter. Measure words, characters with and without spaces, sentences, paragraphs, reading speed, and top keyword frequencies.',
    h1: 'Real-Time Word & Character Counter with Reading Time',
    explanation: 'Whether you are drafting an article, writing an essay, preparing a social media post, or submitting an academic proposal, word counts and reading time estimates ensure your writing meets editorial constraints and audience expectations.',
    howToUse: [
      'Type or paste your text into the text area.',
      'View live statistics including words, characters (with and without spaces), sentences, and paragraphs.',
      'Check the estimated reading and speaking times calculated at standard speech rates.',
      'Review the top keyword frequency table to identify overused words.',
    ],
    example: {
      title: 'Evaluating an introductory paragraph',
      input: 'Smart personal finance starts with a balanced monthly budget and an emergency fund.',
      output: 'Words: 12 | Characters (with spaces): 79 | Characters (no spaces): 68 | Sentences: 1 | Reading Time: < 1 min',
      explanation: 'Calculates comprehensive metrics simultaneously as you type.',
    },
    usefulTips: [
      'Standard silent reading speed is calculated at 200–250 words per minute, while normal speaking speed is roughly 130–150 words per minute.',
      'Use the keyword frequency list to check for repetitive phrases in SEO articles or ad copy.',
      'Clear your input with the Reset button before beginning a new analysis.',
    ],
    faqs: [
      {
        question: 'How are hyphenated words counted?',
        answer: 'Standard linguistic tokenization treats hyphenated terms (e.g., "state-of-the-art") as single compound words unless separated by explicit spaces.',
      },
      {
        question: 'Does the counter update as I type?',
        answer: 'Yes. All metrics compute dynamically on every keystroke with zero delay.',
      },
      {
        question: 'How is reading time calculated?',
        answer: 'Reading time uses an average adult reading velocity of 200 words per minute, rounded to the nearest minute or displayed in seconds for shorter snippets.',
      },
    ],
    relatedToolIds: ['character-counter', 'text-cleaner', 'case-converter'],
    privacyNote: 'Client-side processing: your writing is counted in browser memory only.',
  },
  {
    id: 'character-counter',
    name: 'Character Counter',
    category: 'Text Tools',
    summary: 'Track exact character limits for social media, SEO titles, meta descriptions, SMS messages, and ad headlines.',
    seoTitle: 'Character Counter – Check Limits for Twitter/X, SEO Meta & SMS',
    metaDescription: 'Precise character counter with presets for Twitter (280), Google SEO Title (60), Meta Description (160), and SMS (160). 100% free and client-side.',
    h1: 'Character Counter & Social Media Limit Checker',
    explanation: 'Search engines and social platforms enforce strict character cut-offs. If your Google title exceeds 60 characters or your Meta description exceeds 160 characters, it gets truncated with an ellipsis. This tool monitors exact characters and visualizes platform limit boundaries.',
    howToUse: [
      'Paste or type your text into the editor.',
      'Observe total characters, characters excluding whitespace, digits, letters, and punctuation.',
      'Check the progress bars against standard platform limits (X/Twitter, Google Title, Meta Description, SMS).',
      'Use the copy button to grab your optimized copy once it fits within target boundaries.',
    ],
    example: {
      title: 'Checking an SEO Title tag',
      input: 'How to Calculate the Real Cost of a Personal Loan Before Applying',
      output: 'Characters: 65 (Exceeds Google Title 60-char recommended limit by 5 characters)',
      explanation: 'Alerts you before search engines truncate critical keywords in search results.',
    },
    usefulTips: [
      'Keep Google Search titles under 60 characters to avoid SERP truncation on mobile displays.',
      'Keep meta descriptions between 140 and 155 characters for optimal desktop and mobile visibility.',
      'Standard single SMS messages allow up to 160 GSM-7 characters before splitting into multi-part messages.',
    ],
    faqs: [
      {
        question: 'What is the difference between characters with and without spaces?',
        answer: '"With spaces" counts every spacebar, tab, and newline keystroke as a character. "Without spaces" counts only visible letters, digits, and punctuation marks.',
      },
      {
        question: 'Do emojis count as one or two characters?',
        answer: 'Modern Unicode emojis can take 2 to 4 code units depending on whether they contain zero-width joiners or skin tone modifiers. Our counter accurately tracks standard UTF-16 code units matching platform character algorithms.',
      },
      {
        question: 'Can I test multiple lines at once?',
        answer: 'Yes. The input accepts multi-line paragraphs, bullet points, and headers.',
      },
    ],
    relatedToolIds: ['word-counter', 'slug-generator', 'text-cleaner'],
    privacyNote: 'Client-side processing: no text is logged or stored.',
  },
  {
    id: 'case-converter',
    name: 'Case Converter',
    category: 'Text Tools',
    summary: 'Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case.',
    seoTitle: 'Case Converter – UPPERCASE, lowercase, Title Case, camelCase & snake_case',
    metaDescription: 'Free online case converter. Switch text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, and kebab-case instantly.',
    h1: 'Universal Text Case Converter & Capitalization Utility',
    explanation: 'Typing text in the wrong case by accident or preparing variable names for code can require tedious manual editing. The Case Converter switches entire paragraphs or lists into any desired case style with a single click.',
    howToUse: [
      'Paste your text into the input box.',
      'Click the button corresponding to your target case format (e.g., Title Case, UPPERCASE, camelCase).',
      'Review the formatted text in real time.',
      'Click "Copy Result" to place the converted text on your clipboard.',
    ],
    example: {
      title: 'Converting a headline to Title Case and kebab-case',
      input: 'how to build a monthly budget plan',
      output: 'Title Case: "How to Build a Monthly Budget Plan" | kebab-case: "how-to-build-a-monthly-budget-plan"',
      explanation: 'Title Case capitalizes principal words; kebab-case replaces spaces with hyphens for web slugs.',
    },
    usefulTips: [
      'Use Title Case for blog article titles, email subject lines, and presentation slide headings.',
      'Use camelCase and PascalCase when writing JavaScript, TypeScript, or React component identifiers.',
      'Use snake_case or kebab-case when formatting database table columns or file names.',
    ],
    faqs: [
      {
        question: 'Does Title Case follow standard grammatical style rules?',
        answer: 'Yes. It capitalizes the first and last word as well as nouns, verbs, adjectives, and adverbs, while keeping minor prepositions, coordinating conjunctions, and articles (e.g., a, an, the, in, on, at, to) in lowercase unless they start the title.',
      },
      {
        question: 'Can I convert accidental CAPS LOCK text back to normal?',
        answer: 'Yes. Select "Sentence case" or "lowercase" to immediately rescue paragraphs accidentally typed with Caps Lock enabled.',
      },
      {
        question: 'Does the converter handle special international characters?',
        answer: 'Yes. Modern JavaScript Unicode casing correctly converts accented and non-Latin characters (e.g., é → É, ñ → Ñ, ü → Ü).',
      },
    ],
    relatedToolIds: ['slug-generator', 'text-cleaner', 'text-reverser'],
    privacyNote: 'Client-side processing: conversion runs instantly in memory.',
  },
  {
    id: 'text-reverser',
    name: 'Text Reverser',
    category: 'Text Tools',
    summary: 'Reverse letters, flip word order, invert line sequence, or generate upside-down text for testing and creative workflows.',
    seoTitle: 'Text Reverser – Reverse Letters, Words, Lines & Invert Text Online',
    metaDescription: 'Flip and reverse text online. Reverse characters, invert word order, reverse line lists, or create mirrored text instantly client-side.',
    h1: 'Online Text & Word Reverser Utility',
    explanation: 'A versatile utility for reversing character strings, inverting the order of words in sentences, flipping list lines, or testing palindromes and data parsing algorithms.',
    howToUse: [
      'Paste your string or multi-line text into the input field.',
      'Choose your reversal mode: Reverse Characters, Reverse Words, Reverse Lines, or Flip Upside-Down.',
      'Inspect the transformed output instantly.',
      'Copy the reversed string with one click.',
    ],
    example: {
      title: 'Reversing characters vs. word order',
      input: 'Money Master Blog Tools',
      output: 'Reverse Characters: "slooT golB retsaM yenoM" | Reverse Words: "Tools Blog Master Money"',
      explanation: 'Reverse characters flips the entire string backwards; reverse words inverts word order while keeping individual words readable.',
    },
    usefulTips: [
      'Use "Reverse Lines" when reversing logs, chronologically sorted records, or descending transaction lists.',
      'Use "Reverse Characters" when verifying whether a word or phrase is a palindrome (e.g., "racecar" or "level").',
      'The tool works seamlessly with Unicode strings and punctuation marks.',
    ],
    faqs: [
      {
        question: 'Will punctuation marks also be reversed?',
        answer: 'In "Reverse Characters" mode, every character including punctuation and spaces is mirrored backwards. In "Reverse Words" mode, punctuation stays attached to its associated word.',
      },
      {
        question: 'Can I reverse a large list of hundreds of lines?',
        answer: 'Yes. The algorithm handles large multi-line lists in milliseconds directly on your device.',
      },
      {
        question: 'Is any text sent to a server?',
        answer: 'No. All string manipulation executes purely within your browser tab.',
      },
    ],
    relatedToolIds: ['case-converter', 'text-cleaner', 'base64-converter'],
    privacyNote: 'Client-side processing: 100% private and offline capable.',
  },
  {
    id: 'slug-generator',
    name: 'Text-to-Slug Generator',
    category: 'Text Tools',
    summary: 'Convert article titles and headlines into clean, URL-friendly slugs with custom separators and stop-word filters.',
    seoTitle: 'Text-to-Slug Generator – Create SEO Friendly URL Slugs Online',
    metaDescription: 'Convert titles, headings, and text into SEO-friendly URL slugs. Remove accents, strip punctuation, filter stop words, and customize separators.',
    h1: 'SEO Friendly URL Slug Generator',
    explanation: 'Clean, descriptive URL slugs improve search engine crawlability and click-through rates. This generator turns human-readable titles into standardized, lowercase, hyphen-separated slugs stripped of invalid characters, symbols, and formatting.',
    howToUse: [
      'Type or paste your headline or page title into the input.',
      'Choose your preferred separator (hyphen "-" is the search engine standard, or underscore "_").',
      'Optionally toggle "Remove Stop Words" to eliminate filler terms like "the", "a", "an", "in".',
      'Copy your clean URL slug for your CMS, static site generator, or database.',
    ],
    example: {
      title: 'Generating an SEO slug for a financial guide',
      input: 'How to Calculate the Real Cost of a Personal Loan Before Applying (2026)!',
      output: 'how-to-calculate-the-real-cost-of-a-personal-loan-before-applying-2026',
      explanation: 'All letters converted to lowercase, parentheses and exclamation marks stripped, and spaces converted into clean single hyphens.',
    },
    usefulTips: [
      'Google officially recommends hyphens (-) rather than underscores (_) because its crawler treats hyphens as word separators.',
      'Keep slugs concise (typically 3 to 6 key terms) to make URLs memorable and easy to share.',
      'Accented letters (e.g., café, résumé) are automatically transliterated into Latin equivalents (cafe, resume).',
    ],
    faqs: [
      {
        question: 'Why should I remove special characters from URLs?',
        answer: 'Characters like spaces, quotes, ampersands, and question marks get percent-encoded (e.g., %20, %26) in browser address bars, making links ugly, harder to read, and prone to breaking when copied.',
      },
      {
        question: 'What are stop words?',
        answer: 'Stop words are common connective words like "a", "the", "and", "or", "of". Removing them can make very long slugs shorter without losing search intent.',
      },
      {
        question: 'Does this tool work with non-English characters?',
        answer: 'Yes. It normalizes Latin diacritics via Unicode NFD decomposition and removes non-alphanumeric symbols.',
      },
    ],
    relatedToolIds: ['case-converter', 'character-counter', 'url-converter'],
    privacyNote: 'Client-side processing: generated instantly without network calls.',
  },

  // ==========================================
  // DEVELOPER & WEB TOOLS (6)
  // ==========================================
  {
    id: 'base64-converter',
    name: 'Base64 Encoder/Decoder',
    category: 'Developer & Web Tools',
    summary: 'Encode plain text or code to Base64 and decode Base64 strings back to readable text with live syntax validation.',
    seoTitle: 'Base64 Encoder & Decoder – Convert Text to Base64 Online',
    metaDescription: 'Free online Base64 encoder and decoder. Convert text to Base64, decode Base64 strings, with UTF-8 support, live error detection, and URL-safe mode.',
    h1: 'Online Base64 Text Encoder & Decoder',
    explanation: 'Base64 is a binary-to-text encoding scheme designed to transmit data across channels that only reliably support ASCII characters. This tool lets developers quickly encode configuration strings, tokens, and payloads, or decode incoming Base64 data back to clear text.',
    howToUse: [
      'Choose "Encode" or "Decode" mode using the toggle buttons.',
      'Paste your string into the input area.',
      'Check the real-time encoded or decoded output in the result panel.',
      'Use the "Swap" button to quickly reverse the operation, or "Copy" to grab the result.',
    ],
    example: {
      title: 'Encoding a basic authentication token',
      input: 'admin:secretPassword123',
      output: 'YWRtaW46c2VjcmV0UGFzc3dvcmQxMjM=',
      explanation: 'Text converted into standard 64-character ASCII representation with required padding.',
    },
    usefulTips: [
      'Full UTF-8 encoding support ensures that emojis and international characters encode correctly without crashing.',
      'Use Base64 encoding for embedding small SVG icons or data URIs directly into CSS or HTML files.',
      'Decoding automatically alerts you if the input string contains invalid Base64 characters or improper padding.',
    ],
    faqs: [
      {
        question: 'Is Base64 an encryption method?',
        answer: 'No. Base64 is an encoding format, not encryption. Anyone can decode a Base64 string back into its original text. Never rely on Base64 alone to protect sensitive passwords or secrets.',
      },
      {
        question: 'What does the "=" symbol at the end of a Base64 string mean?',
        answer: 'The equals sign (=) represents padding characters added to ensure the binary data stream aligns to a multiple of 4 bytes.',
      },
      {
        question: 'Are my tokens or encoded secrets safe from exposure?',
        answer: 'Yes. All conversions happen entirely in your browser JavaScript environment. No data is sent over the internet.',
      },
    ],
    relatedToolIds: ['url-converter', 'json-formatter', 'password-generator'],
    privacyNote: 'Client-side processing: processed locally without server communication.',
  },
  {
    id: 'url-converter',
    name: 'URL Encoder/Decoder',
    category: 'Developer & Web Tools',
    summary: 'Encode text and query parameters for safe web URLs or decode percent-encoded URLs into human-readable characters.',
    seoTitle: 'URL Encoder & Decoder – Percent-Encoding & Query String Tool',
    metaDescription: 'Encode and decode URLs online. Convert special characters into percent-encoded entities (%20, %26, etc.) or decode complex web query strings instantly.',
    h1: 'Universal URL Encoder & Decoder Utility',
    explanation: 'Web addresses can only contain a limited set of ASCII characters. Unsafe characters like spaces, quotes, ampersands, and non-ASCII characters must be percent-encoded (RFC 3986) to prevent broken links or security vulnerabilities.',
    howToUse: [
      'Select whether to "Encode" or "Decode".',
      'Paste the URL, path, or query string into the input box.',
      'Choose between encodeURIComponent (for query parameter values) or encodeURI (for complete URLs).',
      'Copy the properly encoded or decoded string.',
    ],
    example: {
      title: 'Encoding a search query with spaces and symbols',
      input: 'https://example.com/search?q=personal loan & rates 2026',
      output: 'https://example.com/search?q=personal%20loan%20%26%20rates%202026',
      explanation: 'Spaces converted to %20 and the ampersand inside the query parameter converted to %26.',
    },
    usefulTips: [
      'Use `encodeURIComponent` when encoding individual query string values like parameter tokens or search terms.',
      'Use `encodeURI` when encoding a full URL while preserving valid protocol (https://) and path delimiters (/).',
      'The decoder automatically handles both `%20` and `+` representations of spaces.',
    ],
    faqs: [
      {
        question: 'What is percent-encoding?',
        answer: 'Percent-encoding is a mechanism where characters outside the standard URL character set are replaced with a percent sign (%) followed by their two-digit hexadecimal ASCII representation.',
      },
      {
        question: 'What happens if I try to decode an invalid URL string?',
        answer: 'The tool catches malformed URI sequences and displays a helpful error message instead of failing silently.',
      },
      {
        question: 'Does the tool log the URLs I encode?',
        answer: 'No. All URL encoding and decoding operates locally inside your browser tab.',
      },
    ],
    relatedToolIds: ['base64-converter', 'slug-generator', 'json-formatter'],
    privacyNote: 'Client-side processing: no URLs or query parameters are tracked.',
  },
  {
    id: 'json-formatter',
    name: 'JSON Formatter & Validator',
    category: 'Developer & Web Tools',
    summary: 'Format, beautify, validate, minify, and sort JSON payloads with real-time error diagnostics and line numbers.',
    seoTitle: 'JSON Formatter & Validator – Beautify, Minify & Inspect JSON Online',
    metaDescription: 'Format and validate JSON online. Beautify with 2 or 4 spaces, minify payloads, sort keys alphabetically, and diagnose syntax errors with line indicators.',
    h1: 'Online JSON Formatter, Beautifier & Validator',
    explanation: 'Working with minified API payloads or complex configuration files can be difficult without indentation. The JSON Formatter parses your JSON, highlights syntax errors with line and column indicators, and beautifies the code with your preferred indentation.',
    howToUse: [
      'Paste raw or minified JSON into the editor.',
      'Click "Format (2 Spaces)" or "Format (4 Spaces)" to beautify the structure.',
      'Click "Minify" to remove all whitespace and line breaks for production payloads.',
      'Use "Sort Keys" to alphabetize object keys for easier diff comparison.',
    ],
    example: {
      title: 'Beautifying a minified JSON response',
      input: '{"id":101,"title":"Loan Guide","published":true,"tags":["finance","loans"]}',
      output: '{\n  "id": 101,\n  "published": true,\n  "tags": [\n    "finance",\n    "loans"\n  ],\n  "title": "Loan Guide"\n}',
      explanation: 'Formatted with 2-space indentation and sorted keys for clear human readability.',
    },
    usefulTips: [
      'JSON requires double quotes ("") around all keys and string values; single quotes (\'\') will trigger a syntax error.',
      'Use "Minify" before copying payloads into API request bodies or environment variables to save bandwidth.',
      'The validator immediately catches trailing commas, which are prohibited in standard JSON.',
    ],
    faqs: [
      {
        question: 'Can this tool format large JSON files?',
        answer: 'Yes. It efficiently parses multi-megabyte JSON files directly in browser memory without sending files over the network.',
      },
      {
        question: 'Does it support comments inside JSON?',
        answer: 'Standard JSON specifications (RFC 8259) do not permit comments. If your data contains JavaScript-style comments (// or /* */), the validator will highlight them as syntax errors.',
      },
      {
        question: 'Are my private API keys or database configs safe?',
        answer: 'Yes. Processing is 100% local in your browser. No JSON is ever sent to any remote server.',
      },
    ],
    relatedToolIds: ['base64-converter', 'uuid-generator', 'url-converter'],
    privacyNote: 'Client-side processing: complete privacy for sensitive API payloads.',
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    category: 'Developer & Web Tools',
    summary: 'Generate cryptographically secure Version 4 UUIDs (Universally Unique Identifiers) in bulk with custom formatting.',
    seoTitle: 'UUID Generator – Cryptographically Secure Version 4 UUIDs Online',
    metaDescription: 'Generate random UUID v4 identifiers online. Create single or bulk UUIDs, toggle uppercase/lowercase, remove hyphens, and copy with one click.',
    h1: 'Cryptographically Secure UUID v4 Generator',
    explanation: 'Universally Unique Identifiers (UUIDs) provide a 128-bit label used to uniquely identify database records, API sessions, and software entities without requiring central coordination.',
    howToUse: [
      'Select how many UUIDs you want to generate (from 1 to 50).',
      'Toggle uppercase or lowercase format according to your code standards.',
      'Choose whether to keep or remove standard hyphens.',
      'Click "Generate UUIDs" and copy the results.',
    ],
    example: {
      title: 'Standard v4 UUID vs. No-hyphen format',
      input: 'Count: 2 | Format: Standard v4',
      output: 'f47ac10b-58cc-4372-a567-0e02b2c3d479\n9c857567-3548-472a-a926-4d436877e4e0',
      explanation: 'Follows RFC 4122 specifications with high-entropy random bits in version and variant slots.',
    },
    usefulTips: [
      'Version 4 UUIDs use pseudorandom numbers generated via `window.crypto.getRandomValues()` for maximum cryptographic security.',
      'Remove hyphens when generating 32-character database primary keys or transaction tokens.',
      'Use bulk generation to seed test databases or mock API fixtures.',
    ],
    faqs: [
      {
        question: 'What are the chances of a duplicate UUID v4 collision?',
        answer: 'Virtually zero. The probability of finding a duplicate in 103 trillion Version 4 UUIDs is one in a billion. You would need to generate billions of UUIDs per second for centuries to see a collision.',
      },
      {
        question: 'Are these UUIDs safe for database primary keys?',
        answer: 'Yes. RFC 4122 v4 UUIDs are universally supported across PostgreSQL, MySQL, MongoDB, and modern ORMs.',
      },
      {
        question: 'Do you track or store generated UUIDs?',
        answer: 'No. Each UUID is generated purely in your browser window and discarded when you close or reload the page.',
      },
    ],
    relatedToolIds: ['password-generator', 'random-number-generator', 'json-formatter'],
    privacyNote: 'Client-side CSPRNG: generated securely in your device memory.',
  },
  {
    id: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'Developer & Web Tools',
    summary: 'Generate high-resolution QR codes for websites, text, WiFi credentials, or contact info with instant PNG download.',
    seoTitle: 'QR Code Generator – Create Custom Downloadable QR Codes Free',
    metaDescription: 'Create custom QR codes online for URLs, text, and links. Customize dimensions, adjust error correction levels, and download sharp PNG images instantly.',
    h1: 'Custom Online QR Code Generator with PNG Download',
    explanation: 'Quick Response (QR) codes allow smartphones to scan links, text, or payment details instantly using the built-in camera. This generator produces crisp, scannable QR codes with adjustable error correction and downloadable high-resolution PNGs.',
    howToUse: [
      'Enter your destination URL, text, email, or message.',
      'Select your preferred QR code size (from 150px up to 500px).',
      'Choose the Error Correction Level (Low, Medium, Quartile, High).',
      'Preview the live QR code and click "Download PNG" or copy the data URL.',
    ],
    example: {
      title: 'Creating a QR code for a website link',
      input: 'https://moneymasterblog.site/p/tools.html',
      output: 'Sharp 300x300 pixel QR code canvas ready for print or digital sharing.',
      explanation: 'Encodes the URL into a high-contrast matrix scannable by any iOS or Android camera.',
    },
    usefulTips: [
      'Use High (Level H) error correction if you plan to print the QR code on flyers, packaging, or vehicles where slight smudges might occur.',
      'Always test scan your QR code with a phone before printing large batches.',
      'Keep target URLs short or use clean slugs to keep the QR code pattern simpler and faster to scan from greater distances.',
    ],
    faqs: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No. These are static QR codes. The encoded text or URL is permanently embedded in the image pattern and will work forever as long as your destination link remains online.',
      },
      {
        question: 'Are there any scan limits or fees?',
        answer: 'No. There are zero scan limits, no account signups, and no recurring fees.',
      },
      {
        question: 'Can I use the downloaded QR codes commercially?',
        answer: 'Yes. All generated QR codes are 100% royalty-free for commercial packaging, marketing brochures, menus, and signage.',
      },
    ],
    relatedToolIds: ['url-converter', 'slug-generator', 'color-palette'],
    privacyNote: 'Client-side canvas: generated locally without external tracking links.',
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    category: 'Developer & Web Tools',
    summary: 'Generate strong, uncrackable random passwords client-side using cryptographic entropy with custom character filters.',
    seoTitle: 'Password Generator – Secure, Random & Cryptographically Strong Passwords',
    metaDescription: 'Generate strong, uncrackable random passwords online. Customize length, uppercase, lowercase, numbers, and symbols. Cryptographically secure client-side generation.',
    h1: 'Cryptographically Secure Random Password Generator',
    explanation: 'Weak and reused passwords are the leading cause of security breaches. This tool uses your device’s native Cryptographically Secure Pseudorandom Number Generator (CSPRNG) to build high-entropy passwords that resist dictionary attacks and brute-force cracking.',
    howToUse: [
      'Adjust the password length slider (recommended: 14 to 24 characters).',
      'Check or uncheck uppercase, lowercase, digits, and special symbols.',
      'Optionally toggle "Avoid Ambiguous Characters" to omit confusing lookalikes (like 0 and O, or 1 and l).',
      'Click "Generate Password" and copy it directly to your password manager.',
    ],
    example: {
      title: 'Generating an ultra-secure 18-character password',
      input: 'Length: 18 | All character sets enabled | Ambiguous avoided',
      output: 'k9#vM7$pQ2*xW5!rT8',
      explanation: 'Over 100 bits of entropy, safe against advanced offline brute-force hardware.',
    },
    usefulTips: [
      'Aim for at least 16 characters for critical accounts like banking, primary email, and password manager vaults.',
      'Enable "Avoid Ambiguous Characters" if you need to manually type the password on mobile keyboards or paper backups.',
      'Never send passwords over unencrypted messaging apps or store them in plain text files.',
    ],
    faqs: [
      {
        question: 'Can the website owner see the passwords I generate?',
        answer: 'No. The generator runs strictly within your browser via JavaScript `crypto.getRandomValues()`. No password data is ever sent to our servers or logged in any network request.',
      },
      {
        question: 'What makes a password truly strong?',
        answer: 'Length and entropy. A random 16-character password combining letters, numbers, and symbols would take modern supercomputers billions of years to crack.',
      },
      {
        question: 'Should I memorize every password?',
        answer: 'No. Use a dedicated password manager (like Bitwarden, 1Password, or Apple Keychain) to store unique passwords for every site.',
      },
    ],
    relatedToolIds: ['uuid-generator', 'random-number-generator', 'base64-converter'],
    privacyNote: 'Client-side CSPRNG: zero telemetry, zero storage.',
  },

  // ==========================================
  // IMAGE TOOLS (4)
  // ==========================================
  {
    id: 'image-compressor',
    name: 'Image Compressor',
    category: 'Image Tools',
    summary: 'Compress JPG, PNG, and WebP images locally in your browser with quality controls, live previews, and file size comparison.',
    seoTitle: 'Image Compressor – Compress JPG, PNG & WebP Locally in Browser',
    metaDescription: 'Free online image compressor. Reduce image file sizes in your browser with JPG/PNG/WebP support, quality slider, side-by-side preview, and zero server upload.',
    h1: 'In-Browser Image Compressor with Zero Server Uploads',
    explanation: 'Large images slow down web page loading speeds and consume user mobile data. This Image Compressor uses the HTML5 Canvas API to compress images directly on your device, achieving significant file size reductions while keeping your photos completely private.',
    howToUse: [
      'Click or drag-and-drop an image file (JPEG, PNG, WebP) into the upload area.',
      'Adjust the quality slider (e.g., 75% offers great compression with virtually no visible loss).',
      'Choose your preferred output format (WebP, JPEG, or Original).',
      'Compare original vs. compressed file size and click "Download Compressed Image".',
    ],
    example: {
      title: 'Compressing a 3.4 MB photograph for web publishing',
      input: 'Original: 3.4 MB (JPEG, 3840x2160)',
      output: 'Compressed: 520 KB (WebP at 80% quality) — 85% file size reduction',
      explanation: 'Saves 2.88 MB of bandwidth with crisp visual fidelity.',
    },
    usefulTips: [
      'Converting to WebP format typically provides 25% to 35% better compression than standard JPEG at equivalent visual quality.',
      'A quality setting between 70% and 80% is the ideal sweet spot for blog articles and e-commerce websites.',
      'Because all compression happens in your browser, your personal photos are never uploaded to any remote server.',
    ],
    faqs: [
      {
        question: 'Is there a file size limit for image compression?',
        answer: 'You can compress images up to your device’s available browser memory (typically 20MB+ files are handled smoothly on modern laptops and smartphones).',
      },
      {
        question: 'Does this compressor support transparent PNGs?',
        answer: 'Yes. When compressing PNG files or converting to WebP, alpha transparency is preserved.',
      },
      {
        question: 'Are my photos uploaded to a cloud server?',
        answer: 'No. The entire compression process takes place locally inside your browser via HTML5 Canvas. Your files never touch any external server.',
      },
    ],
    relatedToolIds: ['image-resizer', 'image-cropper', 'color-palette'],
    privacyNote: 'Client-side processing: your images never leave your computer or phone.',
  },
  {
    id: 'image-resizer',
    name: 'Image Resizer',
    category: 'Image Tools',
    summary: 'Resize images to exact pixel dimensions or percentage scales with aspect ratio lock and social media presets.',
    seoTitle: 'Image Resizer – Resize Photos by Width, Height & Social Media Presets',
    metaDescription: 'Resize images online for free. Set exact pixel width and height, maintain aspect ratios, use social media presets (Instagram, YouTube, Twitter), and download instantly.',
    h1: 'Online Image Resizer with Aspect Ratio Lock',
    explanation: 'Uploading oversized photos wastes storage and causes layout issues. The Image Resizer lets you scale images to exact pixel dimensions, apply percentage scaling, or select popular social media canvas presets with locked proportions.',
    howToUse: [
      'Upload an image from your computer or phone.',
      'Enter your desired width or height in pixels, or choose a percentage scale (e.g., 50%).',
      'Keep "Maintain Aspect Ratio" checked to avoid distortion.',
      'Or click a preset (such as Instagram Post 1080x1080 or YouTube Thumbnail 1280x720).',
      'Preview the resized image and click "Download Resized Image".',
    ],
    example: {
      title: 'Resizing a 4000px camera photo for a blog hero banner',
      input: 'Original: 4000x3000px | Target Width: 1200px (Aspect ratio locked)',
      output: 'Resized: 1200x900px | File size reduced from 4.2 MB to 340 KB',
      explanation: 'Maintains exact proportions while making the image web-friendly.',
    },
    usefulTips: [
      'Always keep "Maintain Aspect Ratio" enabled unless you deliberately want to stretch or squish an image.',
      'Use the 1200x630px preset for OpenGraph social sharing preview images on Twitter, LinkedIn, and Facebook.',
      'Scale images down rather than scaling small images up to avoid pixelation and blurriness.',
    ],
    faqs: [
      {
        question: 'What happens if I change only the width?',
        answer: 'With "Maintain Aspect Ratio" checked, the height is automatically calculated in real time so your image never distorts.',
      },
      {
        question: 'Can I export in a different format than the original?',
        answer: 'Yes. You can choose to download your resized image as PNG, JPEG, or modern WebP.',
      },
      {
        question: 'Does resizing reduce image file size?',
        answer: 'Yes. Lowering pixel dimensions substantially cuts down total pixel count and file size.',
      },
    ],
    relatedToolIds: ['image-compressor', 'image-cropper', 'color-palette'],
    privacyNote: 'Client-side processing: resizing occurs directly on your GPU/browser canvas.',
  },
  {
    id: 'image-cropper',
    name: 'Image Cropper',
    category: 'Image Tools',
    summary: 'Crop images to standard aspect ratios (1:1, 4:3, 16:9, 9:16) or custom freeform crops with instant download.',
    seoTitle: 'Image Cropper – Crop Photos to 1:1, 16:9, 4:3 & Freeform Online',
    metaDescription: 'Free online image cropper. Crop photos with preset aspect ratios (Square 1:1, Widescreen 16:9, Standard 4:3, Stories 9:16) or freeform crop in your browser.',
    h1: 'Online Image Cropper with Preset Aspect Ratios',
    explanation: 'Trimming unwanted borders, centering a subject, or matching specific platform dimensions (like square avatar profile photos or vertical story reels) requires precise cropping. This tool provides interactive cropping with live aspect ratio locks.',
    howToUse: [
      'Upload your image into the workspace.',
      'Select an aspect ratio preset (1:1 Square, 4:3 Standard, 16:9 Widescreen, 9:16 Story, or Freeform).',
      'Adjust the crop boundary overlay to position your desired focal area.',
      'Inspect the live crop preview and download the cropped image.',
    ],
    example: {
      title: 'Cropping a landscape photo into a 1:1 profile avatar',
      input: 'Original: 1920x1080px landscape photo | Preset: 1:1 Square',
      output: 'Cropped: 1080x1080px square image focused on the subject',
      explanation: 'Extracts the perfect square frame without stretching or warping.',
    },
    usefulTips: [
      'Use 1:1 for profile pictures, avatars, and Instagram square grid posts.',
      'Use 16:9 for YouTube video thumbnails, blog hero banners, and widescreen presentations.',
      'Use 9:16 for vertical TikTok, Instagram Reels, and YouTube Shorts cover art.',
    ],
    faqs: [
      {
        question: 'Will cropping degrade the quality of my photo?',
        answer: 'No. The cropped area is extracted at full native resolution from the source image without artificial resampling.',
      },
      {
        question: 'Can I choose between PNG and JPEG download?',
        answer: 'Yes. You can export as high-quality PNG (lossless) or JPEG with adjustable quality.',
      },
      {
        question: 'Are my photos kept private?',
        answer: 'Yes. All image processing runs strictly within your browser. No photos are uploaded to any server.',
      },
    ],
    relatedToolIds: ['image-resizer', 'image-compressor', 'color-palette'],
    privacyNote: 'Client-side processing: your original image stays on your local device.',
  },
  {
    id: 'color-palette',
    name: 'Color Palette Generator',
    category: 'Image Tools',
    summary: 'Generate harmonious color palettes, lock favored hues, inspect HEX/RGB values, and export clean CSS variables.',
    seoTitle: 'Color Palette Generator – Harmonious Palettes, HEX Codes & CSS Export',
    metaDescription: 'Generate harmonious color palettes online. Lock favorite colors, explore mood harmonies (Pastel, Vibrant, Cool, Warm), inspect HEX/RGB, and export CSS.',
    h1: 'Harmonious Color Palette Generator & CSS Exporter',
    explanation: 'Selecting coherent color schemes for web applications, brand identities, or presentation graphics requires harmonic color relationships. This generator creates mathematically balanced palettes on the HSL color wheel, lets you lock favorite tones, and provides one-click CSS exports.',
    howToUse: [
      'Click "Generate New Palette" or press the Spacebar on your keyboard.',
      'Click the Lock icon on any color swatch you wish to keep.',
      'Switch between harmony moods: Balanced, Vibrant, Pastel, Warm, Cool, or Monochrome.',
      'Copy individual HEX codes or click "Copy CSS Variables" for your stylesheet.',
    ],
    example: {
      title: 'Generating a warm corporate palette',
      input: 'Mood: Warm | Locked Primary: #1E3A8A (Navy Blue)',
      output: '5-Color Palette: #1E3A8A (Navy), #3B82F6 (Blue), #F59E0B (Amber), #FEF3C7 (Warm Cream), #F3F4F6 (Cool Gray)',
      explanation: 'Calculates complementary and analogous accents around the locked primary hue.',
    },
    usefulTips: [
      'Lock your core brand color first, then hit spacebar to generate complementary accents and neutral backgrounds.',
      'Export CSS variables directly into your `:root` block to quickly theme Tailwind or custom CSS stylesheets.',
      'Check text contrast on swatches to verify whether light or dark typography reads best against that tone.',
    ],
    faqs: [
      {
        question: 'Can I export palettes directly to code?',
        answer: 'Yes. You can copy ready-to-paste CSS custom properties (`--color-primary`, etc.), JSON arrays, or individual HEX codes.',
      },
      {
        question: 'Are the generated colors royalty-free for commercial use?',
        answer: 'Yes. All generated color palettes are 100% royalty-free for commercial client branding, marketing, print, and web applications.',
      },
      {
        question: 'Can I generate palettes using keyboard shortcuts?',
        answer: 'Yes. On desktop keyboards, pressing the Spacebar instantly generates a fresh palette while preserving your locked swatches.',
      },
    ],
    relatedToolIds: ['image-compressor', 'image-resizer', 'slug-generator'],
    privacyNote: 'Client-side processing: generated in browser memory with zero network requests.',
  },

  // ==========================================
  // CALCULATORS (8)
  // ==========================================
  {
    id: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'Calculators',
    summary: 'Solve all percentage problems: calculate X% of Y, find percentage increase/decrease, and determine value changes.',
    seoTitle: 'Percentage Calculator – What is X% of Y, Percentage Increase & Difference',
    metaDescription: 'Free online percentage calculator. Calculate X% of Y, find what percentage X is of Y, calculate percentage increase or decrease, with clear formulas.',
    h1: 'Multi-Mode Percentage Calculator with Formula Breakdown',
    explanation: 'Calculating retail discounts, investment returns, tax rates, or grade percentages can be confusing. This calculator provides dedicated problem solvers for every common percentage question with transparent mathematical steps.',
    howToUse: [
      'Select the calculation mode you need (e.g., "What is X% of Y?" or "Percentage Increase/Decrease").',
      'Enter your values into the designated input fields.',
      'View the calculated answer and formula breakdown instantly.',
      'Click "Copy Result" to save the answer to your clipboard.',
    ],
    example: {
      title: 'Calculating percentage increase in monthly savings',
      input: 'Initial Value: $500 | New Value: $650',
      output: '+30.00% Increase (Difference: +$150.00)',
      explanation: 'Formula: ((650 - 500) / 500) × 100 = 30%.',
    },
    usefulTips: [
      'Use the "What is X% of Y" mode to quickly compute store discounts and sales tax amounts.',
      'Use "Percentage Increase/Decrease" to evaluate salary raises, portfolio growth, or utility rate hikes.',
      'Supports positive numbers, decimals, and negative changes.',
    ],
    faqs: [
      {
        question: 'How do you calculate percentage increase?',
        answer: 'Subtract the old value from the new value, divide the difference by the original value, and multiply by 100: `((New - Old) / Old) * 100`.',
      },
      {
        question: 'What is the difference between a percentage change and percentage points?',
        answer: 'A change from 10% to 15% is an increase of 5 percentage points, but a 50% relative increase in the rate itself.',
      },
      {
        question: 'Can I enter decimal numbers?',
        answer: 'Yes. You can enter precise decimals such as 7.25% or $1,450.75.',
      },
    ],
    relatedToolIds: ['gst-tax-calculator', 'tip-calculator', 'loan-payment-calculator'],
    privacyNote: 'Client-side calculation: computed instantly on your device.',
  },
  {
    id: 'gst-tax-calculator',
    name: 'GST / Tax Calculator',
    category: 'Calculators',
    summary: 'Add or remove GST, VAT, and sales tax with custom rates, net/gross price breakdowns, and formula explanations.',
    seoTitle: 'GST & Tax Calculator – Add or Remove Tax & VAT with Custom Rates',
    metaDescription: 'Calculate GST, VAT, and Sales Tax online. Easily add tax to net amounts or remove tax from gross prices. Set any custom tax percentage with clear breakdowns.',
    h1: 'GST, VAT & Sales Tax Calculator (Add or Remove Tax)',
    explanation: 'Goods and Services Tax (GST) and Value Added Tax (VAT) rules differ widely across jurisdictions. This calculator supports both forward tax addition (exclusive to inclusive) and reverse tax extraction (inclusive to exclusive) with any custom tax percentage.',
    howToUse: [
      'Enter the base amount in your currency.',
      'Enter your local tax rate percentage (or click common presets like 5%, 10%, 15%, 18%, 20%).',
      'Select whether to "Add Tax" (Tax Exclusive) or "Remove Tax" (Tax Inclusive).',
      'Review the itemized breakdown showing Original Amount, Tax Amount, and Final Price.',
    ],
    example: {
      title: 'Removing 18% GST from a tax-inclusive invoice',
      input: 'Gross Amount: $1,180.00 | Tax Rate: 18% | Mode: Remove Tax',
      output: 'Net Pre-Tax Amount: $1,000.00 | Tax Amount: $180.00 | Total: $1,180.00',
      explanation: 'Pre-tax formula: Gross / (1 + (Rate / 100)) = $1,180 / 1.18 = $1,000.',
    },
    usefulTips: [
      'Tax rates vary substantially by country, state, and product category; always input your jurisdiction\'s exact statutory rate.',
      'When auditing receipts, use "Remove Tax" to verify that the vendor billed the correct statutory sales tax amount.',
      'Copy the itemized summary directly into invoices, accounting ledgers, or expense reports.',
    ],
    faqs: [
      {
        question: 'Why is removing tax different from simply subtracting the percentage?',
        answer: 'Because tax is calculated on the pre-tax base amount, not the final total. For example, adding 20% to $100 yields $120. But subtracting 20% from $120 gives $96 (not $100). The correct formula divides by 1.20.',
      },
      {
        question: 'Does this calculator use a hardcoded national tax rate?',
        answer: 'No. Tax rates vary by country and region. You can freely enter any rate or select from common global presets.',
      },
      {
        question: 'Can I use this for business invoices?',
        answer: 'Yes. It accurately calculates net, tax, and gross totals for invoicing and bookkeeping.',
      },
    ],
    relatedToolIds: ['percentage-calculator', 'tip-calculator', 'loan-payment-calculator'],
    privacyNote: 'Client-side calculation: your financial numbers remain completely private.',
  },
  {
    id: 'tip-calculator',
    name: 'Tip Calculator',
    category: 'Calculators',
    summary: 'Calculate restaurant tips, split bills among groups, round totals, and inspect per-person payment amounts.',
    seoTitle: 'Tip Calculator – Calculate Tips & Split Bills Easily Online',
    metaDescription: 'Free online tip calculator. Calculate total tip amounts, split the bill evenly among friends, round up totals, and calculate exact payment per person.',
    h1: 'Restaurant Tip Calculator & Group Bill Splitter',
    explanation: 'Splitting dinner bills or calculating appropriate service gratuities while traveling shouldn\'t involve awkward mental math. The Tip Calculator computes total tip amounts, final bill totals, and exact per-person costs with optional rounding.',
    howToUse: [
      'Enter the bill subtotal before tip.',
      'Select a tip percentage (presets: 10%, 15%, 18%, 20%, 25%, or custom).',
      'Enter the number of people splitting the bill.',
      'Optionally toggle "Round Up Total" to round to the nearest whole dollar.',
      'Inspect the tip amount, total bill, and individual share per person.',
    ],
    example: {
      title: 'Splitting an $84.00 dinner among 3 people at 18% tip',
      input: 'Bill: $84.00 | Tip: 18% | People: 3',
      output: 'Total Tip: $15.12 | Total Bill: $99.12 | Per Person: $33.04 ($28.00 bill + $5.04 tip)',
      explanation: 'Calculates individual shares with exact cent precision.',
    },
    usefulTips: [
      'Standard dining gratuity in North America typically ranges from 15% (standard service) to 20%+ (exceptional service).',
      'Toggle "Round Up" if you prefer paying cash or avoiding messy coin change.',
      'Check whether the restaurant has already added an automatic gratuity for large parties before tipping.',
    ],
    faqs: [
      {
        question: 'Should I calculate tip before or after sales tax?',
        answer: 'Etiquette experts generally recommend tipping on the pre-tax food and beverage subtotal, though tipping on the total is also common practice.',
      },
      {
        question: 'Can I split the bill among up to 50 people?',
        answer: 'Yes. Use the stepper or type any group size from 1 to 100 people.',
      },
      {
        question: 'Does the calculator support custom tip percentages?',
        answer: 'Yes. Enter any custom percentage in the custom percentage box.',
      },
    ],
    relatedToolIds: ['percentage-calculator', 'gst-tax-calculator', 'loan-payment-calculator'],
    privacyNote: 'Client-side processing: calculations run in browser memory.',
  },
  {
    id: 'loan-payment-calculator',
    name: 'Loan Payment Calculator',
    category: 'Calculators',
    summary: 'Estimate monthly loan payments, total interest costs, and full repayment amounts with amortization formulas.',
    seoTitle: 'Loan Payment Calculator – Estimate Monthly Payments & Total Interest',
    metaDescription: 'Calculate monthly loan payments, total interest, and total repayment amounts. Fast, educational personal loan calculator with amortization breakdown.',
    h1: 'Personal Loan Payment & Total Interest Calculator',
    explanation: 'Before taking out a personal loan, auto loan, or financing package, calculating your true repayment obligation is critical. This calculator uses standard fixed-rate amortization formulas to compute monthly payments, lifetime interest expense, and total cash outlay.',
    howToUse: [
      'Enter the total principal loan amount you wish to borrow.',
      'Input the annual interest rate (APR) offered by the lender.',
      'Select the loan term length in years or months (e.g., 3 years or 36 months).',
      'Review your estimated monthly payment, total interest paid, and total lifetime repayment.',
    ],
    example: {
      title: 'Calculating payments on a $10,000 personal loan',
      input: 'Loan Amount: $10,000 | Interest Rate: 9.5% APR | Term: 3 Years (36 Months)',
      output: 'Monthly Payment: $320.33 | Total Interest: $1,531.98 | Total Repayment: $11,531.98',
      explanation: 'Over 36 months, total borrowing cost is $1,531.98 above the original $10,000 principal.',
    },
    usefulTips: [
      'Extending your loan term lowers the monthly payment, but substantially increases total interest paid over the life of the loan.',
      'Check if your lender charges upfront origination fees, which are often deducted from your disbursed cash proceeds.',
      'Making extra principal payments each month accelerates debt payoff and saves significant interest expense.',
    ],
    faqs: [
      {
        question: 'What mathematical formula is used to calculate loan payments?',
        answer: 'The standard fixed-rate installment loan formula: `M = P * [r(1+r)^n] / [(1+r)^n - 1]`, where P is principal, r is monthly interest rate (APR/12), and n is total monthly payments.',
      },
      {
        question: 'Does this calculator include origination fees or late fees?',
        answer: 'This calculator computes principal and interest amortization. Lenders may add separate origination fees, document charges, or insurance premiums.',
      },
      {
        question: 'Is this calculation a guaranteed loan offer?',
        answer: 'No. This calculator provides an educational estimate. Actual loan terms, APR, and repayment schedules depend on lender underwriting and credit qualifications.',
      },
    ],
    relatedToolIds: ['percentage-calculator', 'gst-tax-calculator', 'tip-calculator'],
    privacyNote: 'Client-side calculation: no financial or personal information is collected.',
  },
  {
    id: 'age-calculator',
    name: 'Age Calculator',
    category: 'Calculators',
    summary: 'Calculate exact chronological age in years, months, and days, with next birthday countdown and total days lived.',
    seoTitle: 'Age Calculator – Exact Age in Years, Months, Days & Next Birthday',
    metaDescription: 'Free online age calculator. Find your exact age in years, months, and days, count down to your next birthday, and see total days, weeks, and hours lived.',
    h1: 'Chronological Age Calculator & Birthday Countdown',
    explanation: 'Calculating exact age between two calendar dates requires accounting for leap years, differing month lengths (28, 30, or 31 days), and daylight boundaries. This tool computes chronological age with calendar precision down to the day.',
    howToUse: [
      'Select your Date of Birth in the date picker.',
      'Optionally change the "Age as of" date (defaults to today\'s date).',
      'Click "Calculate Age" to view your exact age in Years, Months, and Days.',
      'Check the countdown to your upcoming birthday and lifetime statistics.',
    ],
    example: {
      title: 'Calculating age for someone born on July 15, 1995',
      input: 'Date of Birth: July 15, 1995 | Target Date: October 4, 2026',
      output: 'Age: 31 Years, 2 Months, 19 Days | Total Days Lived: 11,404 days | Next Birthday: 284 days',
      explanation: 'Accurately handles leap years and calendar month length discrepancies.',
    },
    usefulTips: [
      'Use this tool when completing official passport applications, visa forms, or school enrollment records that ask for exact years and months.',
      'You can calculate the age of events, historical milestones, or company founding dates by setting the birth date to that anniversary.',
      'The "Age as of date" feature lets you determine how old someone will be on a future milestone.',
    ],
    faqs: [
      {
        question: 'Does the calculator account for leap years?',
        answer: 'Yes. The algorithm evaluates every leap year in the intervening period, including February 29th dates.',
      },
      {
        question: 'How is the next birthday countdown calculated?',
        answer: 'It calculates the exact number of days remaining until your birth month and day recur in the current or upcoming calendar year.',
      },
      {
        question: 'Can I calculate age for historical dates?',
        answer: 'Yes. Any valid Gregorian calendar date can be selected.',
      },
    ],
    relatedToolIds: ['date-difference-calculator', 'timestamp-converter', 'random-number-generator'],
    privacyNote: 'Client-side processing: birth dates are never stored or transmitted.',
  },
  {
    id: 'date-difference-calculator',
    name: 'Date Difference Calculator',
    category: 'Calculators',
    summary: 'Calculate the duration between two calendar dates in days, weeks, months, years, and business/working days.',
    seoTitle: 'Date Difference Calculator – Days, Weeks & Business Days Between Dates',
    metaDescription: 'Calculate the difference between two dates online. Find total days, weeks, months, business days (excluding weekends), with include/exclude end date toggle.',
    h1: 'Date Difference & Business Days Duration Calculator',
    explanation: 'Planning project deadlines, contract timelines, leave entitlements, or countdowns requires knowing the exact span between dates. This calculator outputs calendar days, weeks, months, and working business days excluding weekends.',
    howToUse: [
      'Select your Start Date and End Date.',
      'Choose whether to "Include End Date (+1 day)" in the calculation.',
      'View the total days, breakdown in years/months/days, and total weeks.',
      'Check the Business Days count (Monday through Friday) excluding Saturdays and Sundays.',
    ],
    example: {
      title: 'Calculating working duration for a quarterly project',
      input: 'Start: January 5, 2026 | End: April 3, 2026 | Include End Date: Yes',
      output: 'Total Days: 89 days | Business Days: 65 working days | Weekend Days: 24 days',
      explanation: 'Separates working days from non-working weekend days for accurate project estimation.',
    },
    usefulTips: [
      'Check "Include End Date" if you are calculating hotel stays, rental periods, or full inclusive contract spans.',
      'Use the Business Days metric when planning delivery timelines, sprint milestones, or legal notice periods.',
      'Use the "Swap Dates" button to invert the range without retyping.',
    ],
    faqs: [
      {
        question: 'Are public holidays excluded from business days?',
        answer: 'This tool excludes Saturdays and Sundays as universal weekend days. Because national statutory holidays differ by country and state, specific regional holidays are not automatically deducted.',
      },
      {
        question: 'What happens if the start date is after the end date?',
        answer: 'The calculator automatically computes the absolute difference and indicates the chronological order of the selected dates.',
      },
      {
        question: 'Can I calculate spans over multiple years?',
        answer: 'Yes. Spans over decades or centuries are computed in milliseconds.',
      },
    ],
    relatedToolIds: ['age-calculator', 'timestamp-converter', 'percentage-calculator'],
    privacyNote: 'Client-side processing: dates are evaluated locally.',
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    category: 'Calculators',
    summary: 'Convert Unix epoch timestamps to human-readable UTC/Local dates and convert calendar dates back to Unix seconds and milliseconds.',
    seoTitle: 'Timestamp Converter – Unix Epoch to Readable Date & Time Online',
    metaDescription: 'Convert Unix timestamps (seconds & milliseconds) to readable UTC and local dates. Convert date/time back to Unix epoch with live ticking clock and timezone display.',
    h1: 'Unix Epoch Timestamp Converter & Date Utility',
    explanation: 'Unix timestamps represent the number of seconds elapsed since January 1, 1970 (UTC). Developers and database administrators frequently need to translate raw epoch integers into human-readable timestamps or generate Unix timestamps for API queries.',
    howToUse: [
      'To convert a timestamp: Paste a Unix timestamp (seconds or milliseconds) and click "Convert to Date".',
      'To convert a date: Select a calendar date and time and click "Convert to Timestamp".',
      'Observe the live ticking current Unix epoch clock.',
      'Copy dates in UTC, Local Time, ISO 8601, or RFC 2822 format.',
    ],
    example: {
      title: 'Converting a 10-digit Unix timestamp',
      input: 'Timestamp: 1767225600',
      output: 'UTC: Jan 1, 2026, 00:00:00 UTC | ISO 8601: 2026-01-01T00:00:00.000Z',
      explanation: 'Translates 10-digit integer into standardized global date formats.',
    },
    usefulTips: [
      '10-digit timestamps represent seconds (common in Python, PHP, MySQL), while 13-digit timestamps represent milliseconds (common in JavaScript `Date.now()`).',
      'The tool automatically detects whether an input timestamp is in seconds or milliseconds.',
      'Click the "Current Timestamp" button anytime to grab the current epoch time.',
    ],
    faqs: [
      {
        question: 'What is the Unix Epoch?',
        answer: 'The Unix Epoch is 00:00:00 UTC on January 1, 1970. It serves as the universal zero reference point for timekeeping in POSIX systems.',
      },
      {
        question: 'Does this tool display my local timezone?',
        answer: 'Yes. It clearly displays both universal UTC time and your device\'s local timezone with offset (e.g., GMT+05:00 or EST).',
      },
      {
        question: 'What is the Year 2038 problem?',
        answer: 'On January 19, 2038, 32-bit signed integers will overflow. Modern systems and this converter use 64-bit floating point representations, supporting dates far into the future.',
      },
    ],
    relatedToolIds: ['date-difference-calculator', 'age-calculator', 'base64-converter'],
    privacyNote: 'Client-side processing: conversions use local browser time libraries.',
  },
  {
    id: 'random-number-generator',
    name: 'Random Number Generator',
    category: 'Calculators',
    summary: 'Generate unbiased random numbers within custom ranges, generate unique sets without duplicates, or simulate dice rolls.',
    seoTitle: 'Random Number Generator – True Random Numbers & Range Picker',
    metaDescription: 'Generate random numbers online. Choose custom minimum and maximum ranges, generate single or multiple numbers, disallow duplicates, and sort results.',
    h1: 'Cryptographically Random Number & Range Generator',
    explanation: 'Whether conducting a raffle, picking lottery numbers, shuffling dataset samples, or simulating dice rolls, this generator uses cryptographically strong hardware entropy (`crypto.getRandomValues`) to ensure unbiased, non-predictable outcomes.',
    howToUse: [
      'Enter your Minimum and Maximum values (e.g., 1 to 100).',
      'Select how many random numbers you want to generate.',
      'Toggle "Allow Duplicates" on or off (turn off for raffles or unique lotto picks).',
      'Optionally choose sorting order: Unsorted, Ascending, or Descending.',
      'Click "Generate Numbers" and copy the resulting numbers.',
    ],
    example: {
      title: 'Drawing 5 unique raffle winners from 1 to 500',
      input: 'Min: 1 | Max: 500 | Quantity: 5 | Allow Duplicates: No | Sort: Ascending',
      output: '42, 117, 289, 344, 481',
      explanation: 'Produces a sorted set of 5 unique, unbiased random winners.',
    },
    usefulTips: [
      'Use the Dice Roll preset (1-6) or Coin Flip preset (1-2) for instant decision making.',
      'Disable duplicates when selecting raffle winners, lottery numbers, or team rosters.',
      'Copy the output as comma-separated values or a clean line-by-line list.',
    ],
    faqs: [
      {
        question: 'Are these numbers truly random?',
        answer: 'They are generated via `window.crypto.getRandomValues()`, which harvests entropy from your operating system and hardware noise, making them suitable for games, lotteries, and statistical sampling.',
      },
      {
        question: 'What happens if I request more unique numbers than the range allows?',
        answer: 'If you request 15 unique numbers from a range of 1 to 10, the tool alerts you that the range is smaller than the requested quantity, preventing infinite loops.',
      },
      {
        question: 'Can I generate negative random numbers?',
        answer: 'Yes. You can specify negative bounds, such as -100 to +100.',
      },
    ],
    relatedToolIds: ['password-generator', 'uuid-generator', 'percentage-calculator'],
    privacyNote: 'Client-side CSPRNG: outcomes generated locally on your processor.',
  },
];

export function getToolById(id: string): ToolMeta | undefined {
  // Check exact ID
  const exact = TOOLS_DATA.find((t) => t.id === id);
  if (exact) return exact;

  // Check legacy aliases
  const aliasMap: Record<string, ToolId> = {
    'text-sorter': 'text-cleaner',
    'find-replace': 'text-cleaner',
    'remove-line-breaks': 'text-cleaner',
    'duplicate-remover': 'text-cleaner',
    'whitespace-remover': 'text-cleaner',
    'line-counter': 'character-counter',
    'invisible-character-remover': 'text-cleaner',
    'punctuation-cleaner': 'text-cleaner',
    'number-extractor': 'text-cleaner',
    'quote-remover': 'text-cleaner',
    'prefix-suffix-cleaner': 'text-cleaner',
  };

  if (aliasMap[id]) {
    return TOOLS_DATA.find((t) => t.id === aliasMap[id]);
  }

  return undefined;
}
