---
{
  title: "Reporting Sites with Astro & DuckDB",
  description: "DuckDB bases reporting sites with Astro & Github Actions",
  pub_date: "2022-11-10T06:58:26.406Z",
  slug: "actions-etl-duckdb-astro"
}
---

Here's an interesting architecture for a reporting site.

1. Incremental ETL script that updates a local [DuckDB][1] file
2. A static [Astro][2] site where templates can directly leverage DuckDB's rich
   analytical queries
3. The built site is published to Cloudflare Pages (or similar)

The steps above run on a schedule in github actions. The DB file is cached and
restored on every run (but can be rebuilt if lost).

[1]: https://duckdb.org/why_duckdb
[2]: https://astro.build/
