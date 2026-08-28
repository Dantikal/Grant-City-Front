# PDF fonts

Used only by the client-side presentation generator (`shared/lib/pdf-generator.tsx`).
`@react-pdf/renderer`'s built-in Helvetica has no Cyrillic or CJK glyphs, so these are
registered at render time — the browser fetches them only when someone actually
downloads a generated presentation, never on page load.

| File | Covers | Licence |
| --- | --- | --- |
| `DejaVuSans.ttf`, `DejaVuSans-Bold.ttf` | Latin + Cyrillic (incl. Kyrgyz ң ө ү) | Bitstream Vera / Public domain |
| `DroidSansFallbackFull.ttf` | CJK (Chinese) | Apache 2.0 |

Uploaded presentation files bypass this entirely.
