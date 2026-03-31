---
name: adtech-services
description: Discover and integrate @adtech service packages in Protopack projects. Use when users ask to list available services, use Adobe APIs (Firefly, Photoshop, Lightroom, etc.), or configure authentication.
---

# AdTech Services

Use this skill when a user asks about available Adobe services or needs help integrating @adtech packages.

**Note**: These are internal Adobe packages without public documentation. Discover available methods by inspecting the package source and TypeScript types directly.

## Package overview

The primary package is `@adtech/protopack-services-all`, which provides a unified `apis` object for accessing Adobe services. You may need to install the package if it's not already installed.

```typescript
import { apis } from '@adtech/protopack-services-all';
```

## Available services

Known services in the package (inspect the package for the full, up-to-date listing):

| Service | Description |
|---------|-------------|
| `apis.firefly` | Firefly API (image generation, upscaling, expand, fill) |
| `apis.ps` | Photoshop API (actions, smart objects, layer operations) |
| `apis.lightroom` | Lightroom API (presets, auto-tone, masking) |
| `apis.digitalImaging` | Digital imaging services |
| `apis.adobe3p` | Third-party Adobe services (includes LLM access) |

## LLM Models via Adobe3P

**⚠️ IMPORTANT: Do NOT use direct SDKs for OpenAI, Gemini, or Claude**

When users ask for OpenAI, Google Gemini, or Claude (Anthropic) LLM functionality, use the `@adtech/protopack-services-adobe3p` package instead of their individual SDKs.

### Available LLM Models

The adobe3p service provides access to multiple LLM providers:

| Model Provider | Access Via | DO NOT Install |
|----------------|------------|----------------|
| OpenAI (GPT-4, GPT-3.5, etc.) | `@adtech/protopack-services-adobe3p` | ❌ `openai` |
| Google Gemini | `@adtech/protopack-services-adobe3p` | ❌ `@google/generative-ai` |
| Claude (Anthropic) | `@adtech/protopack-services-adobe3p` | ❌ `@anthropic-ai/sdk` |

### Usage Pattern

```typescript
import { generateLLM, createTextMessage } from '@adtech/protopack-services-adobe3p';
import { useIMS } from '../contexts/useIMS';

function ChatComponent() {
  const ims = useIMS();

  const askQuestion = async (question: string, model: string = 'gpt-4') => {
    const messages = [
      createTextMessage("user", question)
    ];

    const options = {
      model: model, // 'gpt-4', 'gpt-3.5-turbo', 'gemini-pro', 'claude-3-opus', etc.
      temperature: 0.7,
      max_tokens: 1000
    };

    const result = await generateLLM(messages, ims.token, ims.apiKey, options);
    const response = result.choices[0].message.content[0].text;

    return response;
  };
}
```

### Framework-Agnostic Usage

For Lit or vanilla JavaScript, import IMS directly:

```typescript
import { IMS } from './utils/IMS';
import { generateLLM, createTextMessage } from '@adtech/protopack-services-adobe3p';

// Wait for IMS to be ready
await IMS.ready;

// Make API call
const messages = [createTextMessage("user", "Tell me about Adobe Firefly")];
const result = await generateLLM(messages, IMS.token, IMS.apiKey, { model: 'gpt-4' });
const response = result.choices[0].message.content[0].text;
```

### Why Use Adobe3P Instead of Direct SDKs?

1. **Unified authentication** - Uses IMS credentials (already configured)
2. **Adobe compliance** - Follows Adobe security and data policies
3. **No additional API keys** - No need for separate OpenAI/Anthropic/Google API keys
4. **Consistent interface** - Same API pattern for all LLM providers

### When Users Ask For:

| User Request | Correct Response |
|--------------|------------------|
| "Use OpenAI" | Use `generateLLM` with `model: 'gpt-4'` from adobe3p |
| "Use Gemini" | Use `generateLLM` with `model: 'gemini-pro'` from adobe3p |
| "Use Claude" | Use `generateLLM` with `model: 'claude-3-opus'` from adobe3p |
| "Install openai package" | **STOP** - Explain adobe3p provides OpenAI access |

## Workflow

### 1) Discovering services

When a user asks what services are available:
1. Check the project's `node_modules/@adtech/protopack-services-all` for the actual exports
2. Inspect the package's type definitions or source to list available APIs
3. Report which services are available and their methods

### 2) Using services

Guide users to import and use the appropriate package:

```typescript
// Example: LLM chat (OpenAI via adobe3p)
import { generateLLM, createTextMessage } from '@adtech/protopack-services-adobe3p';

const messages = [createTextMessage("user", "Explain Firefly API")];
const result = await generateLLM(messages, token, apiKey, { model: 'gpt-4' });
const response = result.choices[0].message.content[0].text;

// Example: Firefly image generation
import { generateV4 } from '@adtech/protopack-services-firefly';

const result = await generateV4('A sunset over mountains', token, apiKey);
const imageUrl = result.outputs[0].image.presignedUrl;

// Example: Using the unified apis object
import { apis } from '@adtech/protopack-services-all';

const psResult = await apis.ps.applyActions({
  // ... options
});
```

### 3) Adding new services

If a service doesn't exist in `@adtech/protopack-services-all`:
1. Check if other `@adtech/*` packages provide the needed functionality
2. If not available in any @adtech package, inform the user

## Authentication

For all Adobe API calls, credentials come from IMS (not separate environment variables):

```typescript
import { useIMS } from '../contexts/useIMS';

const ims = useIMS();
const token = ims.tokenData?.token;      // Bearer token for Authorization header
const apiKey = ims.adobeid.client_id;    // x-api-key header
```

The @adtech services typically handle auth internally when IMS is configured in the project.

**Important**: Do not introduce service-specific API key environment variables when IMS is available.