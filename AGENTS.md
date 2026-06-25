# Agent Product Guidance

Before making any product, UX, interaction, prioritization or copy decision, read [`PRODUCT_MANIFESTO.md`](PRODUCT_MANIFESTO.md).

The manifesto is the canonical product reference for this repository. When implementation convenience, conventional SaaS patterns or existing UI conflict with it, prefer the manifesto unless the user explicitly directs otherwise.

Use `CLAUDE.md` for technical context and current implementation status.

## Autonomous evolution memory

Use `/reviews` as the persistent working memory for autonomous product-evolution cycles.

At the end of each cycle, record the implementation, evidence, remaining risks and next opportunities in `/reviews`.

Before starting the next cycle, reread every document in `/reviews`. Use that review to avoid repeating analysis, identify recurring patterns and select the highest-value remaining improvement.

Never prioritize a new cycle from memory alone when `/reviews` exists.
