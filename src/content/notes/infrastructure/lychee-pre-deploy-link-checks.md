---
title: Fixing Lychee False Positives in a Pre-Deploy Link Check
description: Why a pre-deploy lychee link check against a static build fails on root-relative and self-referential absolute links, and how `--root-dir` and `--remap` fix it
category: infrastructure
tags: ["lychee", "github-actions", "ci", "static-site", "astro", "deployment"]
date: 2026-08-12
---

## Problem Overview

I added a broken-link check to the deploy workflow ([lycheeverse/lychee-action](https://github.com/lycheeverse/lychee-action)) that scans the built `dist/` directory before syncing to S3. This is a cost-effective step to prevent deploying broken files into S3. The first run failed with errors, all false positives, coming from two distinct causes.

## Issue 1: Root-Relative Links Not Resolved

### Problem

Every internal link in the built HTML is root-relative (`/backend/`, `/favicon.svg`, `/_astro/BaseLayout.DUR-jIlw.css`, etc.), which is normal for a static site. Lychee reported all of them as unresolvable:

```
[ERROR] error: (at 11:1467) | Cannot resolve root-relative link '/backend/': To resolve root-relative links in local files, provide a root dir
```

When checking local files, lychee has no way to know what "root" a leading `/` refers to — without a hint, it can't tell whether `/backend/` means the filesystem root or the site root.

### Solution

Pass `--root-dir` pointing at the build output directory, so lychee resolves root-relative links against `dist/` instead of the filesystem root:

```yaml
args: --no-progress --root-dir dist dist
```

## Issue 2: Self-Referential Absolute URLs 403 Before Deploy

### Problem

After fixing Issue 1, a second class of errors appeared — this time on absolute URLs pointing at the live production domain:

```
Errors in dist/robots.txt
[403] https://code.jeromes.dev/sitemap-index.xml | Rejected status code: 403 Forbidden

Errors in dist/sitemap-index.xml
[403] https://code.jeromes.dev/sitemap-0.xml | Rejected status code: 403 Forbidden
```

The build emits absolute self-referential URLs in several places — canonical tags, sitemap `<loc>` entries, and the `Sitemap:` line in `robots.txt` — all derived from `SITE_URL` via Astro's `site` config. Since this check runs **before** the S3 sync, those paths don't exist on the live site yet. S3 buckets without public `ListBucket` return `403 Forbidden` rather than `404 Not Found` for a missing key, which is what lychee was actually seeing.

### Solution

Excluding the production domain from checks would have hidden real broken internal links, since nearly every self-referential URL in the build uses that domain. Instead, `--remap` rewrites any URL that starts with the production domain to the local build directory, so it's checked as a local file instead of fetched live:

```yaml
args: >-
  --no-progress --root-dir dist
  --remap "${{ vars.SITE_URL }} file://${{ github.workspace }}/dist"
  dist
```

This keeps real external links (docs, third-party sites) checked over the network, while self-referential links resolve against the build that's about to be deployed — the only version of the site that check can actually validate.

## Verification Checklist

- Root-relative links (`/path/`) resolve via `--root-dir`
- Self-referential absolute URLs (`SITE_URL`-prefixed) resolve via `--remap`, not a live fetch
- Genuine external links are still checked over the network
- The broken-link check runs before AWS credentials are configured, so a real failure blocks the S3 sync

## Related Documentation

- [lychee CLI documentation](https://lychee.cli.rs/)
- [lycheeverse/lychee-action](https://github.com/lycheeverse/lychee-action)
