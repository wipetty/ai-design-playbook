# playwright-cli

Guide for using playwright-cli for browser automation and AI-driven workflows.

## What is playwright-cli?

`playwright-cli` is a command-line tool for browser automation. It's useful for:
- AI agents automating browser interactions
- Manual testing and debugging
- Quick browser automation scripts
- Exploring web apps interactively

## Quick Start

```bash
# Load authentication
playwright-cli state-load .auth/playwright-state.json

# Open the app (authenticated)
playwright-cli open https://localhost:5173

# Take snapshot to see elements
playwright-cli snapshot

# Click element e1 from snapshot
playwright-cli click e1

# Close when done
playwright-cli close
```

## Session Isolation

**IMPORTANT:** Always use session isolation to prevent conflicts, especially in parallel workflows like `/spec`.

```bash
# Set session ID (use PILOT_SESSION_ID in workflows)
PW_SESSION="${PILOT_SESSION_ID:-default}"

# All commands use -s flag
playwright-cli -s="$PW_SESSION" state-load .auth/playwright-state.json
playwright-cli -s="$PW_SESSION" open https://localhost:5173
playwright-cli -s="$PW_SESSION" snapshot
playwright-cli -s="$PW_SESSION" close
```

**Why session isolation?**
- Prevents parallel workflows from interfering with each other
- Each session gets its own isolated browser instance
- Required when using playwright-cli inside `/spec` or other concurrent operations

## Loading Authentication

Before opening the app, load the saved authentication state:

```bash
# Load auth state
playwright-cli -s="$PW_SESSION" state-load .auth/playwright-state.json

# Open app (now authenticated)
playwright-cli -s="$PW_SESSION" open https://localhost:5173

# Verify authentication
playwright-cli -s="$PW_SESSION" eval "window.adobeIMSAuthToken"
# Should return a token string
```

## Core Commands

### Navigation

```bash
# Open URL
playwright-cli open https://localhost:5173

# Go to different page
playwright-cli goto /about

# Go back
playwright-cli go-back

# Reload
playwright-cli reload

# Close browser
playwright-cli close
```

### Inspecting Elements

```bash
# Take snapshot (shows elements with refs e1, e2, etc.)
playwright-cli snapshot

# Screenshot
playwright-cli screenshot

# Screenshot specific element
playwright-cli screenshot e5

# Full page screenshot
playwright-cli screenshot --filename=fullpage

# Save as PDF
playwright-cli pdf --filename=page.pdf
```

### Interactions

Use element references from `snapshot`:

```bash
# Click element
playwright-cli click e1

# Double click
playwright-cli dblclick e2

# Fill text input
playwright-cli fill e3 "hello world"

# Type (append text)
playwright-cli type "more text"

# Press keys
playwright-cli press Enter
playwright-cli press Control+a

# Hover
playwright-cli hover e4

# Check/uncheck checkbox
playwright-cli check e5
playwright-cli uncheck e5

# Select dropdown
playwright-cli select e6 "option-value"
```

### JavaScript Evaluation

```bash
# Evaluate JavaScript
playwright-cli eval "document.title"

# Evaluate on element
playwright-cli eval "el => el.textContent" e5

# Check Adobe IMS auth
playwright-cli eval "window.adobeIMSAuthToken"

# Get IMS profile
playwright-cli eval "IMS.profileData"
```

## Working with Adobe IMS

### Verify Authentication

```bash
# Open app
playwright-cli -s="$PW_SESSION" open https://localhost:5173

# Check for auth token
playwright-cli -s="$PW_SESSION" eval "window.adobeIMSAuthToken"

# Should return token string like "eyJ..."
# If returns "undefined", authentication failed
```

### Get User Profile

```bash
# Get email
playwright-cli -s="$PW_SESSION" eval "IMS.profileData?.email"

# Get full profile
playwright-cli -s="$PW_SESSION" eval "JSON.stringify(IMS.profileData, null, 2)"
```

### Check IMS State

```bash
# Check if authenticated
playwright-cli -s="$PW_SESSION" eval "IMS.isAuthenticated"

# Get token
playwright-cli -s="$PW_SESSION" eval "IMS.token"

# Get API key
playwright-cli -s="$PW_SESSION" eval "IMS.apiKey"
```

## AI-Driven Workflow Example

When an AI agent needs to automate browser interaction:

```bash
#!/bin/bash

# Set session for isolation
PW_SESSION="${PILOT_SESSION_ID:-default}"

# Check if auth exists
if [ ! -f .auth/playwright-state.json ]; then
  echo "Auth missing - running setup"
  pnpm playwright:auth
fi

# Load auth state
playwright-cli -s="$PW_SESSION" state-load .auth/playwright-state.json

# Open app
playwright-cli -s="$PW_SESSION" open https://localhost:5173

# Wait a moment for page load
sleep 2

# Verify authentication
TOKEN=$(playwright-cli -s="$PW_SESSION" eval "window.adobeIMSAuthToken")

if [ -z "$TOKEN" ]; then
  echo "Authentication failed"
  playwright-cli -s="$PW_SESSION" close
  exit 1
fi

echo "Authenticated successfully"

# Take snapshot to see elements
playwright-cli -s="$PW_SESSION" snapshot

# Interact with UI (example)
playwright-cli -s="$PW_SESSION" click e5  # Click generate button
playwright-cli -s="$PW_SESSION" snapshot  # See result

# Clean up
playwright-cli -s="$PW_SESSION" close
```

## Advanced Features

### State Management

```bash
# Save current state
playwright-cli state-save my-state.json

# Load state
playwright-cli state-load my-state.json
```

### Cookies

```bash
# List cookies
playwright-cli cookie-list

# Get specific cookie
playwright-cli cookie-get cookieName

# Set cookie
playwright-cli cookie-set name value

# Delete cookie
playwright-cli cookie-delete name

# Clear all cookies
playwright-cli cookie-clear
```

### Local/Session Storage

```bash
# localStorage
playwright-cli localstorage-list
playwright-cli localstorage-get key
playwright-cli localstorage-set key value
playwright-cli localstorage-delete key
playwright-cli localstorage-clear

# sessionStorage (same API)
playwright-cli sessionstorage-list
```

### Network

```bash
# Show console logs
playwright-cli console

# Show network requests
playwright-cli network

# Mock network responses
playwright-cli route "**/*.jpg" --status=404
playwright-cli route "**/api/**" --body='{"mock":true}'

# List routes
playwright-cli route-list

# Remove route
playwright-cli unroute "**/*.jpg"
```

### Multiple Tabs

```bash
# List tabs
playwright-cli tab-list

# Open new tab
playwright-cli tab-new https://example.com

# Switch to tab
playwright-cli tab-select 0

# Close tab
playwright-cli tab-close 0
```

### Tracing and Video

```bash
# Start tracing
playwright-cli tracing-start

# Stop tracing (saves to file)
playwright-cli tracing-stop

# Start video recording
playwright-cli video-start

# Stop video
playwright-cli video-stop recording.webm
```

## Session Management

```bash
# List all sessions
playwright-cli list

# Close specific session
playwright-cli -s="my-session" close

# Close all sessions
playwright-cli close-all
```

## Common Patterns

### Testing a Feature

```bash
PW_SESSION="${PILOT_SESSION_ID:-default}"

# Setup
playwright-cli -s="$PW_SESSION" state-load .auth/playwright-state.json
playwright-cli -s="$PW_SESSION" open https://localhost:5173

# Test flow
playwright-cli -s="$PW_SESSION" snapshot
playwright-cli -s="$PW_SESSION" click e1  # Click button
playwright-cli -s="$PW_SESSION" fill e2 "test input"
playwright-cli -s="$PW_SESSION" click e3  # Submit

# Verify result
playwright-cli -s="$PW_SESSION" snapshot
playwright-cli -s="$PW_SESSION" screenshot --filename=result

# Cleanup
playwright-cli -s="$PW_SESSION" close
```

### Debugging Authentication

```bash
PW_SESSION="${PILOT_SESSION_ID:-default}"

# Open app
playwright-cli -s="$PW_SESSION" open https://localhost:5173

# Check auth in multiple ways
playwright-cli -s="$PW_SESSION" eval "window.adobeIMSAuthToken"
playwright-cli -s="$PW_SESSION" eval "Object.keys(localStorage).filter(k => k.includes('ims'))"
playwright-cli -s="$PW_SESSION" cookie-list | grep adobe

# Take screenshot
playwright-cli -s="$PW_SESSION" screenshot --filename=auth-debug

playwright-cli -s="$PW_SESSION" close
```

### Extracting Data

```bash
PW_SESSION="${PILOT_SESSION_ID:-default}"

playwright-cli -s="$PW_SESSION" state-load .auth/playwright-state.json
playwright-cli -s="$PW_SESSION" open https://localhost:5173

# Extract data from page
DATA=$(playwright-cli -s="$PW_SESSION" eval "document.querySelector('h1').textContent")
echo "Page heading: $DATA"

playwright-cli -s="$PW_SESSION" close
```

## Integration with /spec Workflows

When using playwright-cli in `/spec` or parallel workflows:

**ALWAYS use session isolation:**

```bash
# Inside a spec implementation
PW_SESSION="${PILOT_SESSION_ID:-default}"

# Resolve session once at start
echo "Using Playwright session: $PW_SESSION"

# All commands use this session
playwright-cli -s="$PW_SESSION" state-load .auth/playwright-state.json
playwright-cli -s="$PW_SESSION" open https://localhost:5173
# ... rest of commands
playwright-cli -s="$PW_SESSION" close
```

## Troubleshooting

### "No browser session found"

**Cause:** Session closed or never opened

**Fix:**
```bash
playwright-cli -s="$PW_SESSION" open https://localhost:5173
```

### Auth not working in playwright-cli

**Cause:** State file not loaded

**Fix:**
```bash
# Load state before opening
playwright-cli -s="$PW_SESSION" state-load .auth/playwright-state.json
playwright-cli -s="$PW_SESSION" open https://localhost:5173
```

### Element reference not found

**Cause:** Page changed since last snapshot

**Fix:**
```bash
# Take new snapshot
playwright-cli -s="$PW_SESSION" snapshot
# Use new element references
```

### "Permission denied" on state file

**Cause:** File doesn't exist or permissions issue

**Fix:**
```bash
# Re-create auth state
pnpm playwright:auth
```

## Tips

1. **Always use session isolation** with `-s` flag in workflows
2. **Load auth state** before opening the app
3. **Take snapshots** to get element references
4. **Use eval** to check authentication status
5. **Clean up** with `close` when done
6. **Use PILOT_SESSION_ID** in automated workflows for unique session names
