export interface Chapter {
  id: string;
  number: number;
  title: string;
  summary: string;
  readTime: string;
  sections: ChapterSection[];
}

export interface ChapterSection {
  heading: string;
  body: string;
  bullets?: string[];
}

export interface Part {
  id: string;
  number: number;
  title: string;
  description: string;
  chapters: Chapter[];
}

export const playbook: Part[] = [
  {
    id: "foundations",
    number: 1,
    title: "Foundations",
    description:
      "Build a working mental model of AI before you touch a tool. These chapters cover what AI is, what it isn't, and how to think about it as a design material.",
    chapters: [
      {
        id: "why-ai-for-designers",
        number: 1,
        title: "Why AI for designers",
        summary:
          "How AI is changing the shape of design work and why this is a craft moment, not a replacement moment.",
        readTime: "8 min",
        sections: [
          {
            heading: "The shift in your job description",
            body: "AI compresses the distance between an idea and a working artifact. Wireframes, copy, layouts, and prototypes that used to take days can now arrive in minutes. That changes what a designer is paid for. The valuable work moves up the stack: framing problems, judging quality, shaping intent, and editing.",
          },
          {
            heading: "What stays the same",
            body: "Taste, judgment, empathy for the person on the other side of the screen, and the discipline to say no to a clever-but-wrong solution. AI is a faster pencil, not a better designer.",
            bullets: [
              "You still own the problem definition.",
              "You still own the standard of quality.",
              "You still own the relationship with the customer.",
            ],
          },
          {
            heading: "How to read this playbook",
            body: "Each part builds on the last. Foundations sets your mental model. Setup and tooling gets you running. Working with AI teaches the conversation. The craft applies it to real design work. Shipping covers what happens once it leaves your screen.",
          },
        ],
      },
      {
        id: "ai-fundamentals",
        number: 2,
        title: "AI fundamentals: models, prompts, and context",
        summary:
          "The minimum technical mental model a designer needs to make good decisions about AI tools.",
        readTime: "12 min",
        sections: [
          {
            heading: "Models, in one paragraph",
            body: "A model is a prediction engine trained on a large pile of examples. Given some input, it predicts the most likely next thing, whether that's a word, a pixel, or a layer in a Figma file. Different models are tuned for different tasks. You don't need to understand the math. You do need to understand what each model is good at.",
          },
          {
            heading: "Prompts are the brief",
            body: "A prompt is a brief written for a very fast, very literal collaborator with no memory of yesterday. The clearer the brief, the better the output. Vague prompts produce vague work, in design or anywhere else.",
          },
          {
            heading: "Context is the whole game",
            body: "Context includes the prompt, the conversation history, attached files, system instructions, and tool access. Most AI quality issues are context issues. Before you blame the model, check what it can actually see.",
            bullets: [
              "What did you tell it the goal was?",
              "What examples did you show?",
              "What constraints did you state?",
              "What did you not say that you assumed it knew?",
            ],
          },
        ],
      },
      {
        id: "mindset-and-ethics",
        number: 3,
        title: "Mindset and ethics",
        summary:
          "Working principles for using AI responsibly, including bias, attribution, and the question of when not to use it.",
        readTime: "10 min",
        sections: [
          {
            heading: "Default to disclosure",
            body: "If AI shaped the work in a meaningful way, say so. Internal teammates and external customers both deserve to know. Disclosure builds trust and keeps you honest about what you actually contributed.",
          },
          {
            heading: "Bias is a design problem",
            body: "Models reflect the data they were trained on. That data is not neutral. Treat every generated artifact as a draft that needs review for who it includes, who it excludes, and what it assumes about the user.",
          },
          {
            heading: "When not to use AI",
            body: "Not every problem benefits from generation. Sensitive content, original research, identity work, and high-stakes decisions deserve slow, deliberate human craft. Use AI where speed and exploration matter most, and protect the work that needs your full attention.",
          },
        ],
      },
    ],
  },
  {
    id: "setup-and-tooling",
    number: 2,
    title: "Setup & Tooling",
    description:
      "Get your environment in shape. Pick the right tools, wire them into your design system, and set yourself up so AI is one keystroke away, not a tab you forget about.",
    chapters: [
      {
        id: "choosing-your-tools",
        number: 4,
        title: "Choosing your AI tools",
        summary:
          "A practical framework for picking image, text, and code-generating tools without ending up with twelve subscriptions.",
        readTime: "9 min",
        sections: [
          {
            heading: "Start from the work, not the tool",
            body: "List the three or four tasks that take up most of your week. Pick one tool per task that does it well. Resist the urge to install everything you read about on launch day.",
          },
          {
            heading: "The four tool categories",
            body: "Most design AI falls into one of four buckets. Pick a default in each.",
            bullets: [
              "Conversation and writing: a general-purpose chat model.",
              "Image: a generation model with controllable inputs.",
              "Code and prototyping: a model with strong front-end output.",
              "In-product copilots: features inside Figma, your IDE, or your design system tools.",
            ],
          },
          {
            heading: "Evaluation in a week",
            body: "Run any new tool on a real, recent task you already finished by hand. Compare the output and the time spent. If it's not faster or better in a week, drop it.",
          },
        ],
      },
      {
        id: "design-environment",
        number: 5,
        title: "Configuring your design environment",
        summary:
          "Shortcuts, plugins, and habits that make AI feel native to your design tool instead of a separate detour.",
        readTime: "8 min",
        sections: [
          {
            heading: "Reduce the friction to one keystroke",
            body: "If using AI takes more than a few seconds to start, you'll skip it under deadline. Set up keyboard shortcuts, command palette entries, or pinned panels so the help is always one move away.",
          },
          {
            heading: "Local context files",
            body: "Keep a short text file next to your project with your audience, voice, constraints, and design tokens. Paste it into prompts when needed. This single habit raises output quality more than any specific model choice.",
          },
          {
            heading: "Version your prompts",
            body: "Treat strong prompts like reusable components. Save them, name them, and revise them. A team prompt library compounds in value over time.",
          },
        ],
      },
      {
        id: "design-system-integration",
        number: 6,
        title: "Connecting your design system",
        summary:
          "How to give AI tools access to your tokens, components, and patterns so generated work fits in instead of fighting your library.",
        readTime: "11 min",
        sections: [
          {
            heading: "Make your system legible",
            body: "AI works best with a system it can read. Documented tokens, named components, and pattern guidance give the model something to ground its output in. Undocumented tribal knowledge is invisible to it.",
          },
          {
            heading: "Code Connect and equivalents",
            body: "Where possible, link Figma components to their code counterparts so generated layouts produce real, system-compliant code. This closes the gap between mock and ship.",
          },
          {
            heading: "A short style brief",
            body: "Write one page that describes how your product looks, sounds, and behaves. Include it in prompts whenever brand consistency matters. It is the cheapest, highest-leverage artifact you can produce this quarter.",
          },
        ],
      },
    ],
  },
  {
    id: "working-with-ai",
    number: 3,
    title: "Working with AI",
    description:
      "The conversation itself. How to brief, iterate, and steer a model so the output gets closer to your intent with each turn.",
    chapters: [
      {
        id: "prompt-patterns",
        number: 7,
        title: "Prompt patterns for designers",
        summary:
          "Reusable structures for briefs that consistently produce useful design output.",
        readTime: "10 min",
        sections: [
          {
            heading: "The four-part brief",
            body: "Most strong prompts have the same shape. Use it until it becomes muscle memory.",
            bullets: [
              "Role: who the model is acting as.",
              "Goal: what success looks like.",
              "Constraints: brand, audience, format, length.",
              "Examples: one or two reference points.",
            ],
          },
          {
            heading: "Show, don't tell",
            body: "A single concrete example is worth more than a paragraph of adjectives. Paste in the kind of output you want, then ask for variations.",
          },
          {
            heading: "Ask for the work, not the answer",
            body: "Request three options, a critique, or a comparison instead of a single answer. The model is more useful as a sparring partner than as an oracle.",
          },
        ],
      },
      {
        id: "generating-ideas",
        number: 8,
        title: "Generating ideas and concepts",
        summary:
          "Using AI for divergent thinking without ending up with bland averages of the internet.",
        readTime: "9 min",
        sections: [
          {
            heading: "Quantity, then taste",
            body: "Ask for many options at once. Twenty mediocre directions are easier to react to than one polished suggestion. Your job is to recognize the live ones.",
          },
          {
            heading: "Push past the first answer",
            body: "Models often return the most generic version of an idea first. Ask for the strange version, the wrong version, or the version a specific designer would make. Constraint produces character.",
          },
          {
            heading: "Keep a kill file",
            body: "Save the directions you reject and why. Patterns emerge. Over time you learn what your real taste is, which is one of the most valuable side effects of working this way.",
          },
        ],
      },
      {
        id: "iterating-with-ai",
        number: 9,
        title: "Iterating with AI feedback",
        summary:
          "Turning the model into a useful critic so you stop relying only on it as a generator.",
        readTime: "8 min",
        sections: [
          {
            heading: "Critique the artifact, not the prompt",
            body: "Paste your work back in and ask for a structured critique against your goals. You'll catch issues faster than waiting for a review meeting.",
          },
          {
            heading: "Ask for the case against",
            body: "Request the strongest argument that your current direction is wrong. This breaks the agreement loop most chat tools fall into and surfaces the real risks.",
          },
          {
            heading: "Treat output as a draft, always",
            body: "Even when the result looks finished, polish it. The last 10 percent is where the work earns its keep, and it is the part the model is worst at.",
          },
        ],
      },
      {
        id: "multimodal-workflows",
        number: 10,
        title: "Multimodal workflows: images, text, code",
        summary:
          "Combining text, images, and code generation in one pipeline so each stage sets up the next.",
        readTime: "11 min",
        sections: [
          {
            heading: "Pick the right modality for each step",
            body: "Use words for intent and structure, images for tone and composition, and code for fidelity and behavior. Mixing too early creates noise.",
          },
          {
            heading: "Hand artifacts between models",
            body: "Generate a moodboard, then feed it into a layout prompt, then convert the layout to code. Each handoff narrows the design space and reduces ambiguity.",
          },
          {
            heading: "Keep a single source of truth",
            body: "Decide which artifact is canonical for each project: usually the Figma file or the code. Generated assets are inputs, not the record.",
          },
        ],
      },
    ],
  },
  {
    id: "the-craft",
    number: 4,
    title: "The Craft",
    description:
      "Applied chapters. How AI fits into the daily work of doing IA, visual design, content, and prototyping.",
    chapters: [
      {
        id: "information-architecture",
        number: 11,
        title: "Information architecture with AI",
        summary:
          "Using AI for sitemaps, navigation, and content modeling without offloading the thinking.",
        readTime: "10 min",
        sections: [
          {
            heading: "Start with the user task list",
            body: "Generate a long list of jobs the user is trying to do. Cluster them yourself. The clusters are your IA. AI is most useful for breadth here, not for the structure itself.",
          },
          {
            heading: "Stress test with edge cases",
            body: "Ask the model to invent users, scenarios, and edge cases that break your structure. Fix the ones that matter. Ignore the ones that don't.",
          },
          {
            heading: "Write the labels last",
            body: "Naming is where craft shows. Don't accept the first label the model proposes. Generate a dozen, then choose, then test with real users.",
          },
        ],
      },
      {
        id: "visual-design",
        number: 12,
        title: "Visual design and layout",
        summary:
          "Using image and code generation to explore visual direction without losing your point of view.",
        readTime: "11 min",
        sections: [
          {
            heading: "Direction before pixels",
            body: "Decide on mood, hierarchy, and density first, in words. Then generate. Skipping this step produces beautiful images of the wrong thing.",
          },
          {
            heading: "Use generation for variation, not invention",
            body: "Make one strong layout yourself, then use AI to explore variations on it. Pure generation tends toward the average of its training data.",
          },
          {
            heading: "Check the basics by hand",
            body: "Type ramps, spacing, contrast, and alignment still need a designer's eye. The model will happily produce a layout that is technically wrong in ways it can't see.",
          },
        ],
      },
      {
        id: "content-and-copy",
        number: 13,
        title: "Content and copy",
        summary:
          "Drafting UI copy, microcopy, and longer-form content with AI while keeping a coherent voice.",
        readTime: "9 min",
        sections: [
          {
            heading: "Voice charter, then drafts",
            body: "Write a short voice charter, paste it into every copy prompt, and ask for drafts. Without it, the model defaults to a polite, generic, slightly American business voice.",
          },
          {
            heading: "Edit ruthlessly",
            body: "Generated copy is almost always too long and too soft. Cut it in half, pick stronger verbs, and remove hedging. Your final draft should sound like a person, not a product.",
          },
          {
            heading: "Localization and accessibility",
            body: "Use the model to surface tone problems for different audiences and to flag jargon, idioms, or culture-specific references that won't travel.",
          },
        ],
      },
      {
        id: "prototyping-and-motion",
        number: 14,
        title: "Prototyping and motion",
        summary:
          "Using code generation to build interactive prototypes and motion studies fast.",
        readTime: "12 min",
        sections: [
          {
            heading: "Prototype to learn, not to ship",
            body: "Set a clear question for each prototype: a flow, a feeling, a measurable hypothesis. AI-built prototypes are most valuable when they let you answer that question hours after you ask it.",
          },
          {
            heading: "Code is the new low-fidelity",
            body: "Generated front-end code is now often faster than dragging frames around. Embrace it for early-stage exploration, even if the code never ships.",
          },
          {
            heading: "Motion as design, not decoration",
            body: "Use AI to scaffold transitions and easing curves, then refine them by hand. Motion is where polish lives, and the model rarely nails it on the first pass.",
          },
        ],
      },
    ],
  },
  {
    id: "shipping-and-team",
    number: 5,
    title: "Shipping & Team",
    description:
      "What happens once the work leaves your file. Reviewing AI-assisted work and collaborating with the rest of the team without losing trust.",
    chapters: [
      {
        id: "review-and-quality",
        number: 15,
        title: "Reviewing and quality control",
        summary:
          "How to keep quality high when generation is cheap and review is the new bottleneck.",
        readTime: "10 min",
        sections: [
          {
            heading: "Review is the new design",
            body: "When making things is fast, choosing what to keep becomes the work. Build review rituals that match the new pace: shorter, more frequent, with a clear bar.",
          },
          {
            heading: "A simple quality bar",
            body: "Every shipping artifact should pass three checks.",
            bullets: [
              "Does it solve the stated problem?",
              "Does it match our system and voice?",
              "Would I be proud to show it on stage?",
            ],
          },
          {
            heading: "Beware of the polish trap",
            body: "AI output looks finished before it is. Train your eye on substance over surface, especially when the surface is convincing.",
          },
        ],
      },
      {
        id: "collaborating-with-team",
        number: 16,
        title: "Collaborating with engineers and PMs",
        summary:
          "Sharing AI-assisted work with cross-functional partners so it builds trust instead of confusion.",
        readTime: "9 min",
        sections: [
          {
            heading: "Share the brief, not just the output",
            body: "Show your team the prompt, the iterations, and the choices you made. Process is the part that earns trust, especially when the artifact arrives suspiciously fast.",
          },
          {
            heading: "Make handoffs first-class",
            body: "Pair every shipped design with the prompts, references, and decisions behind it. Future-you and future-engineers will thank you.",
          },
          {
            heading: "Teach, don't gatekeep",
            body: "Bring your collaborators into the workflow. The team that learns AI together ships better work than the lone designer with a secret toolkit.",
          },
        ],
      },
    ],
  },
];

export function getChapter(partId: string, chapterId: string): {
  part: Part;
  chapter: Chapter;
  prev?: { partId: string; chapterId: string };
  next?: { partId: string; chapterId: string };
} | null {
  const flat: Array<{ partId: string; chapterId: string }> = [];
  for (const p of playbook) {
    for (const c of p.chapters) {
      flat.push({ partId: p.id, chapterId: c.id });
    }
  }
  const idx = flat.findIndex(
    (f) => f.partId === partId && f.chapterId === chapterId,
  );
  if (idx === -1) return null;
  const part = playbook.find((p) => p.id === partId)!;
  const chapter = part.chapters.find((c) => c.id === chapterId)!;
  return {
    part,
    chapter,
    prev: idx > 0 ? flat[idx - 1] : undefined,
    next: idx < flat.length - 1 ? flat[idx + 1] : undefined,
  };
}

export function getTotalChapters(): number {
  return playbook.reduce((sum, p) => sum + p.chapters.length, 0);
}
