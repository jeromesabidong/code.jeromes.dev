---
title: Debugging AWS OIDC Configuration for GitHub Actions Deployments
description: Common configuration issues when setting up OIDC authentication for GitHub Actions to deploy to AWS, including CloudFront and OIDC provider setup
category: infrastructure
tags:
  [
    "oidc",
    "github-actions",
    "aws",
    "cloudfront",
    "deployment",
    "authentication",
  ]
date: 2026-08-10
---

## Problem Overview

When configuring OIDC authentication for GitHub Actions to deploy to AWS, there are a few critical configuration steps that are easy to miss. This post covers two key issues I encountered while setting up deployments.

## Issue 1: CloudFront Missing Default Root Object

### Problem

The deployment workflow succeeded but the access to the CloudFront distribution was failing with an `AccessDenied` error.

### Solution

If your setup is hosted in S3 and accessible only via cloudfront, ensure your CloudFront distribution has a **default root object** configured (ie. `index.html`). Without this, requests to the root path (e.g., `/`) will fail as directory exposure is automatically marked an unauthorized request.

**Steps to fix:**

1.  Go to your CloudFront distribution in AWS Console
2.  Click on the distribution settings
3.  In the **General** tab, scroll down to find **Default root object**
4.  Set it to your index file (typically `index.html`)
5.  Save the changes

This is essential for single-page applications and static sites served through CloudFront.

## Issue 2: AWS OIDC Provider URL Configuration

### Problem

The OIDC provider configuration in AWS IAM was not accepting the token from GitHub Actions, or the trust relationship was failing.

### Solution

The AWS OIDC provider URL must be retrieved from the **GitHub Actions details** in your repository or organization settings, not guessed or constructed manually.

**Steps to configure correctly:**

1. Go to GitHub organization/repository Settings → Code security and analysis
2. Look for OIDC token provider configuration or GitHub Actions settings
3. Find the exact **Provider URL** (typically `https://token.actions.githubusercontent.com`)
4. In AWS IAM Console, go to Identity Providers
5. Create a new provider with:
   - **Provider type:** OpenID Connect
   - **Provider URL:** Use the exact URL from GitHub (not a guess)
   - **Audience:** `sts.amazonaws.com`
6. Use this provider when creating an IAM role that GitHub Actions can assume

The key is using the **exact URL from GitHub's configuration**, as this is what GitHub's OIDC server expects.

## Verification Checklist

- [ ] CloudFront distribution has a default root object set
- [ ] AWS OIDC provider URL matches GitHub's official provider URL
- [ ] IAM role has a trust relationship with the correct OIDC provider
- [ ] IAM role has the necessary permissions for your deployment actions
- [ ] GitHub Actions workflow uses the correct role ARN

## Related Documentation

- [GitHub Actions: About security hardening with OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)
- [AWS IAM: Using OpenID Connect identity providers](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_oidc.html)
