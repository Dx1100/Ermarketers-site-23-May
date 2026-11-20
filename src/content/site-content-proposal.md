# ER Marketers Additional Page Content Proposal

This file keeps the approved content direction outside the live code so the original files remain untouched.

## About Page

- SEO title:
  - About ER Marketers | Performance And AI Driven Marketing Agency
- Meta description:
  - Learn how ER Marketers helps brands grow through performance marketing, SEO, creative strategy, and measurable digital execution.
- Hero eyebrow:
  - OUR STORY
- Hero headline:
  - Built for Brands That Want Smarter Growth
- Hero intro:
  - ER Marketers was built to help ambitious businesses grow with sharper strategy, stronger execution, and measurable digital outcomes. We combine performance marketing, SEO, creative thinking, and data analysis to help brands scale with more confidence.
- Values:
  - Data-Led Decisions: We use evidence, testing, and tracking to guide growth decisions.
  - Clear Communication: Clients get visibility into performance, priorities, and next actions.
  - Commercial Focus: We care about revenue impact, lead quality, and profitability.
  - Continuous Improvement: We test, refine, and adapt to keep performance moving forward.

## Case Studies Page

- SEO title:
  - Case Studies | ER Marketers
- Meta description:
  - Explore real growth outcomes delivered by ER Marketers across eCommerce and Edtech campaigns.
- Hero headline:
  - Growth Outcomes Across Industries
- Hero subtitle:
  - See how strategic improvements in paid media, SEO, CRO, and lifecycle marketing translated into stronger business results.
- Categories:
  - All
  - E-Commerce
  - Edtech
- Case study cards:
  - Vantenstudio.com
    - Category: E-Commerce
    - Problem: High CPA on Meta Ads during festive seasons and low repeat purchase rate.
    - What we changed: Restructured account taxonomy, implemented dynamic creative optimization, and built specialized retention funnels.
    - Results:
      - Increase in ROAS: +320%
      - Reduction in CPA: -45%
      - YoY Revenue Growth: 2.8x
  - MG Concept
    - Category: Edtech
    - Problem: Needed stronger digital demand generation and better conversion into online course sales in Delhi.
    - What we changed: Improved campaign targeting, refreshed offer-led creatives, and optimized the lead-to-sale journey for higher intent conversions.
    - Results:
      - Increase in Online Course Sales: +40%
      - Better Lead Quality: Improved
      - Market Focus: Delhi

## Contact Page

- Keep hero section as-is
- Contact information card:
  - Heading: Contact Information
  - Location label: DelhiHQ
  - Address: Kh. No 123, Asola Extn, Delhi - 110074
  - Email label: Email Us
  - Email: ermarketersofficial@gmail.com
  - Call label: Call Us
  - Phone numbers:
    - 9310011952
    - 8799742772
  - Office hours label: Office Hours
  - Timing: Tue-Sunday 11AM - 7:30 PM
- Form/card note:
  - You mentioned changes in the form and card. The card content above is captured. The form fields themselves are still hardcoded in the React component and have not been changed yet.

## Implementation Notes

- Current JSON structure supports only Home, Services, Nav, and Footer.
- About, Case Studies, and Contact still live in page components, so these are content proposals until we move them into content files.
- Website Development was added in the new JSON using the existing `target` icon slot because the current type system only supports four icon keys.
