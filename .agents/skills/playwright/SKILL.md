---
name: playwright
description: Playwright testing and browser automation for Adobe IMS authenticated apps. Use when users need help with authentication, writing tests, or browser automation.
---

# Playwright

Use this skill when users need help with:
- Setting up or troubleshooting Adobe IMS authentication for Playwright
- Writing Playwright tests for this project
- Using playwright-cli for browser automation
- Running and debugging tests

## Overview

This project uses Playwright for testing with Adobe IMS authentication. The authentication system has two tiers:
1. **Automatic extraction** from Chrome browser (if already logged in)
2. **Manual fallback** (opens browser for one-time login)

## Quick Commands

```bash
# Set up authentication (smart - tries extraction first)
pnpm playwright:auth

# Run tests
pnpm playwright:test

# Clean auth and re-authenticate
pnpm playwright:clean && pnpm playwright:auth
```

## Topics

### Authentication
See [auth.md](auth.md) for:
- Setting up authentication
- Troubleshooting auth issues
- Understanding the two-tier system
- Verifying authentication works

### Writing Tests
See [testing.md](testing.md) for:
- How to write tests for this project
- Adobe IMS authentication patterns in tests
- Test examples and patterns
- Running and debugging tests

### playwright-cli
See [cli.md](cli.md) for:
- Using playwright-cli for browser automation
- Session isolation
- Loading authentication state
- Integration with AI workflows

## When to Use This Skill

Use this skill when:
- User mentions "playwright", "tests", "testing", or "browser automation"
- User reports authentication issues with Playwright
- User wants to write or run tests
- User needs browser automation in workflows
- Authentication state is missing or expired

## Not This Skill

For other topics, use:
- **adtech-services** - Adobe API integration (Firefly, Photoshop, etc.)
- **react-spectrum-s2** - UI components and design system
