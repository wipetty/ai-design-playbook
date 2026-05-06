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
  body?: string;
  bullets?: string[];
  blocks?: SectionBlock[];
}

export type IconName =
  | "spark"
  | "bolt"
  | "code"
  | "chat"
  | "gauge"
  | "check"
  | "x"
  | "arrow"
  | "layers"
  | "loop"
  | "compass"
  | "figma"
  | "wand"
  | "target"
  | "ruler";

export type SectionBlock =
  | { kind: "paragraph"; text: string }
  | {
      kind: "callout";
      tone?: "accent" | "neutral";
      icon?: IconName;
      title?: string;
      text: string;
    }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "pullquote"; text: string }
  | {
      kind: "cards";
      columns?: 2 | 3;
      items: {
        icon?: IconName;
        eyebrow?: string;
        title: string;
        text: string;
        image?: { src: string; alt: string };
      }[];
    }
  | {
      kind: "flow";
      label?: string;
      steps: { title: string; meta?: string }[];
    }
  | {
      kind: "compareFlow";
      before: { label: string; steps: string[] };
      after: { label: string; steps: string[] };
    }
  | { kind: "wink"; text: string }
  | {
      kind: "checklist";
      items: { positive: boolean; title: string; text: string }[];
    }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | {
      kind: "stats";
      items: { value: string; label: string; meta?: string }[];
    }
  | { kind: "table"; columns: string[]; rows: string[][] }
  | {
      kind: "pathway";
      items: { number: string; title: string; description: string }[];
    }
  | {
      kind: "slope";
      caption?: string;
      modes: {
        label: string;
        title: string;
        context: number;
        dependencies: number;
      }[];
    };

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
      "Why this matters now, what mode you're working in, and how the adoption curve actually plays out. Set the mental model before you touch a tool.",
    chapters: [
      {
        id: "why-designers-should-vibe-code",
        number: 1,
        title: "Why designers should vibe code",
        summary:
          "How AI compresses the gap between Figma and ship — and why this is the moment to widen the kind of designer you can be.",
        readTime: "5 min",
        sections: [
          {
            heading: "The old handoff is dissolving",
            blocks: [
              {
                kind: "paragraph",
                text: "For fifteen years, the job was to design a picture of an interface and hand it to engineering, who built the real thing. The handoff was always lossy. Spacing drifted. States got missed. We invented design systems and QA passes to close the gap, and the gap stayed open, because a Figma file and a working build are different materials.",
              },
              {
                kind: "pullquote",
                text: "A Figma file and a working build are different materials.",
              },
              {
                kind: "paragraph",
                text: "That's changing. Cursor, Claude Code, Codex, Windsurf, v0, Lovable, and a growing list of vibe-coding tools let you describe an interface and get working code back. You run it. You feel it. You change it. The medium of design is becoming the medium of the product.",
              },
              {
                kind: "compareFlow",
                before: {
                  label: "The old loop",
                  steps: [
                    "Figma file",
                    "Spec & handoff",
                    "Engineering build",
                    "QA & polish",
                    "Ship, eventually",
                  ],
                },
                after: {
                  label: "The new loop",
                  steps: [
                    "Experiment",
                    "Define and build",
                    "Review",
                    "Share and improve",
                    "Ship",
                  ],
                },
              },
              {
                kind: "wink",
                text: "Ok, the old loop was rarely this neat. But it was lossy enough that we built whole departments around closing the gap.",
              },
            ],
          },
          {
            heading: "What vibe coding actually is",
            blocks: [
              {
                kind: "paragraph",
                text: "Andrej Karpathy named the practice in early 2025: describe what you want, let the model build it, react, ask for the next change. The diff is incidental. The artifact is what you feel when you use what came out the other side.",
              },
              {
                kind: "quote",
                text: "The diff is incidental. The artifact is what you feel when you use what came out the other side.",
                attribution: "Andrej Karpathy, early 2025",
              },
              {
                kind: "paragraph",
                text: "For an engineer, this is offloading boilerplate. For a designer, it's something bigger. The bottleneck has never been typing speed. It's been the translation tax between what you imagined, what you could draw, and what eventually shipped. Vibe coding removes most of that tax.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "code",
                    eyebrow: "For an engineer",
                    title: "Same job, less typing",
                    text: "Architecture, debugging, performance, and production code still belong to them. AI compresses the keystrokes, not the responsibility.",
                  },
                  {
                    icon: "spark",
                    eyebrow: "For a designer",
                    title: "A new material to design in",
                    text: "Code stops being someone else's department. The thing on the screen, the one users actually feel, is now yours to shape directly — not negotiate for.",
                  },
                ],
              },
            ],
          },
          {
            heading: "Three things change for the craft",
            blocks: [
              {
                kind: "steps",
                items: [
                  {
                    title: "The design becomes the product, not a picture of it.",
                    text: "You stop arguing about whether a transition feels sluggish and just check.",
                  },
                  {
                    title: "The conversation with engineering shifts.",
                    text: "You're working in the same medium now. The feedback gets sharper because you're both looking at the same thing.",
                  },
                  {
                    title: "The bar for what's worth trying drops.",
                    text: "When a new direction costs ten minutes instead of three days, you try more of them. The work gets better because you get to be more creative.",
                  },
                ],
              },
            ],
          },
          {
            heading: "What this isn't",
            blocks: [
              {
                kind: "paragraph",
                text: "Vibe coding doesn't replace research, problem framing, or knowing your user. It changes implementation, not planning. It also doesn't replace engineering — owning a feature is not the same as owning a production system, and the next chapter is about respecting that line. And it doesn't make taste optional. When everyone can produce a functional UI in an afternoon, the differentiator stops being whether it got built and becomes whether it's any good.",
              },
              {
                kind: "checklist",
                items: [
                  {
                    positive: false,
                    title: "Replaces research",
                    text: "Knowing your user is still the work.",
                  },
                  {
                    positive: false,
                    title: "Replaces engineering",
                    text: "Owning a feature is not the same as owning a production system.",
                  },
                  {
                    positive: false,
                    title: "Makes taste optional",
                    text: "When everyone can ship a UI, taste becomes the differentiator.",
                  },
                  {
                    positive: true,
                    title: "Changes implementation",
                    text: "Faster, more direct, and yours to own from sketch to shipped.",
                  },
                ],
              },
            ],
          },
          {
            heading: "Why now",
            blocks: [
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "bolt",
                    eyebrow: "The tools",
                    title: "The tooling is finally good enough",
                    text: "A year ago, this was technically possible but practically painful. The current generation of models and editors is a different category of tool. The friction that made this a hobby for engineers has lifted.",
                    image: {
                      src: "/images/claude-code.png",
                      alt: "Claude Code terminal welcome screen with the Claude Code wordmark in orange ASCII art on a dark background.",
                    },
                  },
                  {
                    icon: "layers",
                    eyebrow: "Adobe",
                    title: "The infrastructure is in place",
                    text: "Protopack, Spectrum, the Firefly Platform repo, and the MCP servers that wire agents into the real codebase. The Image Frontier Team is already shipping features into production this way. It's not theoretical.",
                    image: {
                      src: "/images/protopack-community.png",
                      alt: "Protopack community page showing a grid of starter projects from Adobe teams.",
                    },
                  },
                ],
              },
            ],
          },
          {
            heading: "Why you",
            blocks: [
              {
                kind: "pullquote",
                text: "Designers who learn this in the next year will spend the rest of their careers shipping more, faster, with more direct ownership than any previous generation of designers had.",
              },
              {
                kind: "paragraph",
                text: "The ones who wait will spend the same years explaining Figma files to people who moved on. The rest of this playbook is the practical version of that argument.",
              },
              {
                kind: "pathway",
                items: [
                  {
                    number: "01",
                    title: "Foundations",
                    description: "Set your mental model.",
                  },
                  {
                    number: "02",
                    title: "Setup & tooling",
                    description: "Get the machine ready to run.",
                  },
                  {
                    number: "03",
                    title: "Working with AI",
                    description: "Learn the conversation.",
                  },
                  {
                    number: "04",
                    title: "The craft",
                    description: "Apply it to real design work.",
                  },
                  {
                    number: "05",
                    title: "Shipping & team",
                    description: "What happens once it leaves your screen.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "knowing-which-mode-youre-in",
        number: 2,
        title: "Knowing which mode you're in",
        summary:
          "The three-mode model of AI-assisted work, and the slope from prototype to production where most projects quietly drift off-rails.",
        readTime: "8 min",
        sections: [
          {
            heading: "The mistake at the start of every project",
            blocks: [
              {
                kind: "paragraph",
                text: "Most pain in AI-assisted design comes from one mistake. You start a session thinking you're prototyping. Three days later, the prototype has stakeholder buy-in and a launch date. The code was never written for production, but production is where it's heading. Now you're patching, apologizing, and explaining why the thing that worked on your laptop falls over in front of real users.",
              },
              {
                kind: "pullquote",
                text: "The mode determines the bar, the bar determines the discipline, and the discipline determines whether your work survives contact with real users.",
              },
              {
                kind: "paragraph",
                text: "The fix is upstream. Before you open the editor, decide which mode you're in. The mode is the cheapest decision you'll make all week, and it's the one most teams skip.",
              },
            ],
          },
          {
            heading: "The three modes",
            blocks: [
              {
                kind: "paragraph",
                text: "Learning from the Image Frontier Team and the Firefly new-feature explorations, three modes have been adapted for designers. Each mode has its own audience, its own bar, and its own definition of done.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "compass",
                    eyebrow: "Mode 01",
                    title: "New ideas",
                    text: "Exploring a concept, building a proof of concept, turning research into something tangible. Audience is you and maybe one collaborator. The output is throwaway by design — a sketch in code.",
                  },
                  {
                    icon: "layers",
                    eyebrow: "Mode 02",
                    title: "Build in context",
                    text: "Testing how a feature might feel inside the actual app. Validating an interaction with research participants, running an A/B, or showing leadership a real flow. Real enough to learn from. Not real enough to ship.",
                  },
                  {
                    icon: "gauge",
                    eyebrow: "Mode 03",
                    title: "Production build",
                    text: "Shipping. Audience is everyone, including users you'll never meet and adversaries who want to break it. Has to hold up under load, scrutiny, and time. The full stack, the full review, the full discipline.",
                  },
                ],
              },
              {
                kind: "slope",
                caption:
                  "Both the context the model needs to hold and the dependencies it has to honor climb sharply as you move from a sketch to a shipped build.",
                modes: [
                  {
                    label: "Mode 01",
                    title: "New ideas",
                    context: 0.18,
                    dependencies: 0.08,
                  },
                  {
                    label: "Mode 02",
                    title: "Build in context",
                    context: 0.55,
                    dependencies: 0.42,
                  },
                  {
                    label: "Mode 03",
                    title: "Production build",
                    context: 0.95,
                    dependencies: 0.92,
                  },
                ],
              },
              {
                kind: "wink",
                text: "These aren't a hierarchy. None is better than the others. Using the rules of one mode while doing the work of another is where most teams get hurt.",
              },
            ],
          },
          {
            heading: "The slope between them",
            blocks: [
              {
                kind: "paragraph",
                text: "The line between modes is not a wall. It's a slope. A new-idea prototype with one user (you) sits firmly on the left. The day a teammate asks \"can I show this to my manager,\" it's slid rightward. The day a stakeholder asks \"when can we ship this,\" you've crossed into production territory whether you meant to or not.",
              },
              {
                kind: "table",
                columns: ["What changes", "Mode 01", "Mode 02", "Mode 03"],
                rows: [
                  [
                    "Audience",
                    "Just you, maybe a collaborator.",
                    "Your team, research participants, leadership.",
                    "Real users, paying customers, and hostile actors.",
                  ],
                  [
                    "Accuracy",
                    "Close enough. Ideas over precision.",
                    "Plausible numbers and real-feeling content.",
                    "Real data and content, validated end to end.",
                  ],
                  [
                    "Design details",
                    "Skip them if they slow you.",
                    "Defaults are fine. Hand-tuned for the moments that matter most.",
                    "Tokenized color, accessibility-aware, reduced-motion safe.",
                  ],
                  [
                    "Documentation",
                    "Exists in your head and the codebase.",
                    "A short recording so a teammate can see it.",
                    "Recordings, screenshots, READMEs, and decision records future teammates can read.",
                  ],
                  [
                    "Stability",
                    "Restart it if it breaks. No one cares.",
                    "Should hold up through a demo or a research session.",
                    "Retries, error recovery, and an on-call rotation.",
                  ],
                  [
                    "Purpose",
                    "Test whether the idea has legs.",
                    "Validate, present, and get feedback.",
                    "Ship, and keep shipping it.",
                  ],
                ],
              },
              {
                kind: "pullquote",
                text: "You cross the slope knowing you crossed it, or you cross it by accident. The first is a decision. The second is a regret.",
              },
            ],
          },
          {
            heading: "How to tell which mode you're in",
            blocks: [
              {
                kind: "paragraph",
                text: "A short test, in order. Run through it before you open the editor, and again any time the work changes hands.",
              },
              {
                kind: "steps",
                items: [
                  {
                    title: "Who sees this?",
                    text: "If it's you and a teammate, mode one or two. If it's a real user or a paying customer, mode three.",
                  },
                  {
                    title: "What happens if it breaks?",
                    text: "If you shrug and rebuild, mode one. If someone gets paged, mode three.",
                  },
                  {
                    title: "Will the code survive past this week?",
                    text: "If no, mode one. If maybe, mode two. If yes, mode three.",
                  },
                  {
                    title: "Is anyone other than you depending on it?",
                    text: "The moment a human collaborator or a paying user shows up, the rules change. Don't wait until they tell you.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "If you can't answer these clearly, you're probably already drifting between modes. Stop and decide.",
              },
            ],
          },
          {
            heading: "The drift problem",
            blocks: [
              {
                kind: "paragraph",
                text: "Most of the trouble designers get into with AI is mode drift. You start in mode one because you wanted to test an idea fast. The idea works. Somebody important sees it. The conversation shifts from \"would this be a good direction\" to \"when can we ship this.\" Suddenly the work is in mode three, but it was built like mode one, and now you're patching a foundation that wasn't designed to hold the weight.",
              },
              {
                kind: "pullquote",
                text: "Now you're patching a foundation that wasn't designed to hold the weight.",
              },
              {
                kind: "paragraph",
                text: "The fix isn't to build everything like it's mode three from the start. That's the other failure — the designer who never explores anything because every prototype gets engineered to the standard of a release. Both failures look like discipline. Neither one is.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "arrow",
                    eyebrow: "Failure one",
                    title: "Drift right without re-grounding",
                    text: "A mode one sketch quietly becomes the mode three plan. The bar never moves with it, so the cracks show up at launch.",
                  },
                  {
                    icon: "ruler",
                    eyebrow: "Failure two",
                    title: "Frozen on the right",
                    text: "Every exploration is built to release standard. Nothing gets tried, because nothing is ever cheap enough to throw away.",
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "The fix is to notice when the mode changes and act accordingly. Sometimes that means rebuilding what you have. Sometimes it means renegotiating the timeline. Almost always, it means a real conversation with engineering before the work goes any further.",
              },
            ],
          },
          {
            heading: "Name it before you start. Name it again when it changes",
            blocks: [
              {
                kind: "paragraph",
                text: "Engineers have infrastructure that tells them what mode they're in. Branches, environments, review gates. Designers don't get those signals automatically, so the signal has to come from you.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "code",
                    eyebrow: "For engineers",
                    title: "The tooling tells them",
                    text: "Branch names, environment variables, deploy targets, and CI checks all signal which mode the work is in. The handoffs are loud.",
                  },
                  {
                    icon: "figma",
                    eyebrow: "For designers",
                    title: "The signal has to come from you",
                    text: "A Figma file looks the same whether it's a sketch or a final spec. A vibe-coded prototype looks the same whether it's for you or for ten thousand users. Name the mode out loud, every time.",
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "A few things to keep in mind, then. Treat each one as a small ritual: cheap to do, easy to skip, expensive to forget.",
              },
              {
                kind: "steps",
                items: [
                  {
                    title: "Before you start a session",
                    text: "Decide which mode you're in, and tell whoever else needs to know.",
                  },
                  {
                    title: "When you share the work",
                    text: "Lead with what it is — \"this is a one-day exploration,\" or \"a research stimulus,\" or \"a candidate build of the feature.\"",
                  },
                  {
                    title: "When the mode changes",
                    text: "Say so out loud, and adjust the bar before continuing. Rebuild, renegotiate, or invite engineering in.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "This sounds like overhead. It costs maybe ten seconds. The pain it prevents is the kind that ruins a sprint.",
              },
            ],
          },
          {
            heading: "What this playbook covers",
            blocks: [
              {
                kind: "paragraph",
                text: "Most of Parts 2, 3, and 4 are mode-agnostic. Setup, prompting, and the design-to-code loop look the same whether you're building a weekend prototype or a feature for production. Part 5 is where mode matters most.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "target",
                title: "Read the rest with the modes in mind",
                text: "Take what serves the mode you're in. Leave the rest until the work crosses the slope. The chapters on slop and team handoffs assume mode three; the rest are tools you can pick up at any tier.",
              },
            ],
          },
        ],
      },
      {
        id: "ai-adoption-journey",
        number: 3,
        title: "The AI adoption journey",
        summary:
          "Where most designers start, where they grow into, and which habits compound over months instead of days.",
        readTime: "2 min",
        sections: [
          {
            heading: "Stage one: AI as a faster pencil",
            body: "Most designers begin by using AI to do things they already do, only faster. Drafting copy, generating reference imagery, summarizing research notes. This stage is real work and worth doing well, but it is not where the leverage lives. If you stop here, AI is a productivity boost, not a craft change.",
          },
          {
            heading: "Stage two: AI as a build partner",
            body: "The next stage starts when you let AI build the thing instead of just describe it. You move from generating mockups to generating components. From writing prompts to running plans. From sending screenshots to opening pull requests. The work feels less like writing a brief and more like pairing with a fast, literal collaborator who needs clear context.",
          },
          {
            heading: "What actually compounds",
            body: "A few habits get more valuable the longer you keep them, and they are not the ones most people brag about. The compounding habits are quiet and boring, and that is exactly why they win.",
            bullets: [
              "A growing library of prompts, plans, and rules tied to your real projects.",
              "A clean development environment you can rebuild on a new machine in under an hour.",
              "A taxonomy of your design system, audience, and constraints that you paste into context.",
              "A review rhythm that catches AI slop before it ships.",
            ],
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
      "Get the machine ready. Pick the editor, wire up the right MCPs, learn what Adobe gives you out of the box, and put rules and skills in their right place.",
    chapters: [
      {
        id: "setting-up-your-environment",
        number: 4,
        title: "Setting up your environment",
        summary:
          "A designer-friendly setup with Cursor or Claude Code, Figma MCP, and the repo access that makes the rest of the playbook possible.",
        readTime: "2 min",
        sections: [
          {
            heading: "Pick one editor and stay there for a month",
            body: "Cursor and Claude Code are both strong starting points. Pick one and use it daily for a month before you compare. Switching tools every week looks like exploration and feels like progress, but it resets your muscle memory and your context every time. Stability beats novelty here.",
          },
          {
            heading: "The minimum designer-friendly setup",
            body: "You do not need to look like an engineer to work like one. A small, predictable setup is enough to do real work and easy to rebuild when something breaks.",
            bullets: [
              "An editor with an AI assistant, configured to use a model you trust.",
              "Access to the repo for the product you actually work on, including a way to run it locally.",
              "Figma MCP wired in so the assistant can read the file you're designing against.",
              "A terminal you are not afraid of, even if you only use five commands.",
            ],
          },
          {
            heading: "Get unstuck without an engineer in the room",
            body: "Most setup problems are network, permissions, or missing dependencies, in that order. Read the error, paste it into the assistant, and ask for the most likely cause. You will be right enough of the time that the loop tightens fast. Save the team's time for the rare problem the assistant cannot diagnose for you.",
          },
        ],
      },
      {
        id: "ai-tooling-at-adobe",
        number: 5,
        title: "AI tooling at Adobe",
        summary:
          "What Adobe ships internally that you can build on: Firefly Platform, Protopack, Spectrum, and the broader MCP landscape.",
        readTime: "2 min",
        sections: [
          {
            heading: "Start from the platform you already have",
            body: "Adobe gives you a lot before you install anything. Firefly Platform, Spectrum, Protopack, and a growing internal MCP landscape are all designed to make your assistant smarter about Adobe-shaped work. Reach for these first. External tools are useful, but the internal platform already understands your design system, your auth, and your services.",
          },
          {
            heading: "What each piece is for",
            body: "A short map of the tools you'll hear about most, so you know which one to reach for when.",
            bullets: [
              "Firefly Platform: image, video, and creative model APIs you can call from a prototype.",
              "Protopack: a base template that wires IMS auth, Spectrum, and Adobe services together.",
              "Spectrum (S2): the design system, with React Spectrum components for production UI.",
              "Adobe MCPs: server-side context that lets your assistant read services, designs, and internal docs.",
            ],
          },
          {
            heading: "Don't reinvent the auth, the tokens, or the buttons",
            body: "If you find yourself building login, restyling a button, or hand-rolling a service client, stop. The platform almost certainly already has it, and using the platform piece keeps your work consistent with everything else shipping at the company. You are not just saving time. You are reducing the visual and behavioral drift that makes Adobe products feel like they came from different companies.",
          },
        ],
      },
      {
        id: "extending-your-ai",
        number: 6,
        title: "Extending your AI: MCPs, skills, and rules",
        summary:
          "What MCPs, skills, and rules each do, when to reach for which, and how the CLAUDE.md or AGENTS.md patterns hold them together.",
        readTime: "2 min",
        sections: [
          {
            heading: "Three knobs, three jobs",
            body: "MCPs, skills, and rules look similar from the outside and do very different work. Once you know which is which, you stop reaching for the wrong one.",
            bullets: [
              "MCPs add capability: the assistant can now read Figma, query a service, or browse the web.",
              "Skills add procedure: a packaged way of doing a recurring task, like a design review or an a11y check.",
              "Rules add policy: standing instructions that apply to every session in this project.",
            ],
          },
          {
            heading: "Designer-relevant examples",
            body: "Concrete picks that earn their keep on real design work. Install the ones that match the work you actually do this quarter, not the ones that sound impressive in a demo.",
            bullets: [
              "Figma MCP: read frames, variables, and component metadata directly.",
              "Design-review skill: run a structured critique against your design system.",
              "Accessibility-check skill: surface contrast, focus, and semantics issues before review.",
              "Spectrum rules: pin the assistant to S2 components and sentence-case copy.",
            ],
          },
          {
            heading: "The 150-line budget for design context",
            body: "Your CLAUDE.md or AGENTS.md is the always-on brief for every session. It is also expensive: every line is read on every turn, and a bloated file hurts more than it helps. A practical budget is around 150 lines for the things that must always be true. Spend it on audience, voice, design system pointers, the names of your MCPs, and the rules the team has actually agreed to. Move everything else into skills and on-demand context.",
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
      "The conversation itself. Prompting, planning, learning from your codebase, and managing context so the assistant stays useful past the first turn.",
    chapters: [
      {
        id: "prompting-best-practices",
        number: 7,
        title: "Prompting best practices",
        summary:
          "Specificity, pointers, constraints, and showing the pattern, with examples tuned to UI work.",
        readTime: "2 min",
        sections: [
          {
            heading: "Be specific the way a brief is specific",
            body: "A vague prompt asks for help. A good prompt sets the goal, the audience, the format, and the constraints. The model is fast and literal. Treat it like a teammate who joined yesterday and reads only what you put in front of them.",
          },
          {
            heading: "Point at things, don't describe them",
            body: "When you can, point. Paste a link to a Figma frame, attach a screenshot, name the component, or quote the file path. Pointers are higher bandwidth than adjectives, and they reduce the room for the model to invent.",
            bullets: [
              "Use file paths and component names instead of paraphrasing them.",
              "Attach a screenshot for visual targets, not a paragraph of style language.",
              "Quote the existing pattern when you want a new feature to match it.",
            ],
          },
          {
            heading: "Constraints, then examples, then ask",
            body: "A reliable shape for UI prompts: state the constraints up front, show one or two examples of the pattern you want, then ask for the work. Models drift toward generic output when there are no rails. Constraints are how you give them rails without writing the answer for them.",
          },
        ],
      },
      {
        id: "planning-before-you-build",
        number: 8,
        title: "Planning before you build",
        summary:
          "Plan Mode, the seven-section plan, socializing with engineering, and the sparring-partner habit.",
        readTime: "2 min",
        sections: [
          {
            heading: "Plan first, build second",
            body: "It is tempting to ask the assistant to start writing code on turn one. The work that gets shipped almost always starts with a plan instead. Plan Mode in modern editors is built for exactly this: a read-only conversation that produces an agreed approach before anyone touches the file system.",
          },
          {
            heading: "The seven-section plan",
            body: "A repeatable plan shape that holds up across small features and bigger refactors. Skip a section if it is genuinely not relevant, but skip on purpose, not by accident.",
            bullets: [
              "Goal: what success looks like in one sentence.",
              "Context: the files, components, and constraints that matter.",
              "Approach: the path you intend to take, in plain language.",
              "Trade-offs: what you considered and rejected and why.",
              "Risks: what could go wrong and how you'll catch it.",
              "Steps: the ordered changes the assistant will make.",
              "Verification: how you'll know the work is done.",
            ],
          },
          {
            heading: "Socialize the plan, then build",
            body: "Send the plan to your engineer, your PM, or a peer designer before you build. Five minutes of feedback on a plan saves a day of feedback on a half-finished implementation. Treat the assistant as a sparring partner during this stage: ask it for the case against your plan, the missing edge cases, and the simplest version that would still be useful. The plan you ship is rarely the plan you started with, and that is the point.",
          },
        ],
      },
      {
        id: "learning-and-documenting-design",
        number: 9,
        title: "Learning & documenting design with AI",
        summary:
          "Three layered questions for any unfamiliar surface, plus generating component docs, accessibility audits, and design-system explainers on demand.",
        readTime: "2 min",
        sections: [
          {
            heading: "Three layered questions for any surface",
            body: "When you land on an unfamiliar component, file, or feature, ask three questions in order. Each one builds on the last and produces an answer you can actually use, instead of a wall of summary.",
            bullets: [
              "What is this, in one paragraph, for someone who has never seen it?",
              "How is it used elsewhere in the product, with concrete examples?",
              "What would I have to change to add a new variant or fix a known issue?",
            ],
          },
          {
            heading: "Generate the docs you wish existed",
            body: "Most design systems are under-documented in the places that matter most: edge cases, accessibility behavior, and the reasoning behind decisions. Use the assistant to draft the missing pieces from the actual code and design files, then edit. A draft you correct in ten minutes is faster than a blank page you fill in an hour.",
          },
          {
            heading: "Audits on demand",
            body: "Treat audits as a question, not a project. Ask for an accessibility pass on a single component before you ask for one on the whole app. Ask for a Spectrum-conformance check on the screen you just changed. Small, frequent audits beat the once-a-year heroic sweep, and they are cheap enough to run as part of normal work.",
          },
        ],
      },
      {
        id: "context-that-travels-with-you",
        number: 10,
        title: "Context that travels with you",
        summary:
          "Taxonomy files, design token references, what survives across sessions, and when to start fresh.",
        readTime: "2 min",
        sections: [
          {
            heading: "Some context belongs in the project, not the prompt",
            body: "A short set of files in your repo can do more for output quality than any clever prompt. Audience descriptions, voice guidance, design token references, and naming conventions belong in version-controlled files the assistant can read. They survive across sessions, across teammates, and across model upgrades.",
            bullets: [
              "A taxonomy file: who uses this, what they call things, what they care about.",
              "A token reference: the colors, type, spacing, and motion variables you actually ship.",
              "A patterns file: the handful of layouts and interactions your product reuses.",
            ],
          },
          {
            heading: "Context rot and the 70 percent rule",
            body: "Long sessions get worse, not better. Earlier turns crowd out later ones, the assistant starts repeating itself, and small mistakes compound. A working rule of thumb: when you feel like you're roughly 70 percent through the useful life of a conversation, stop and start fresh with a clean plan and only the context that still matters. A new chat is almost always cheaper than rescuing a tired one.",
          },
          {
            heading: "Start fresh, but don't start over",
            body: "Starting fresh does not mean throwing the work away. It means writing a short handoff to yourself: the goal, the decisions made so far, the open questions, and the relevant files. Paste that into a new session and you keep the progress without dragging the rot. Done well, this is one of the most underrated skills in AI-assisted work.",
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
      "Applied design work. Taking a Figma frame to working UI, holding the visual line, getting motion and content right, and treating accessibility as a prompt-time concern.",
    chapters: [
      {
        id: "from-figma-to-working-ui",
        number: 11,
        title: "From Figma to working UI",
        summary:
          "The design-to-code loop in practice: when to design first, when to skip Figma, and how to choose between screenshot, frame, and spec as input.",
        readTime: "2 min",
        sections: [
          {
            heading: "The design-to-code loop",
            body: "The loop is shorter than it used to be: sketch or design, generate, run, react, and revise. Each pass narrows the gap between the picture in your head and the thing on the screen. The skill is staying in the loop instead of bouncing between disconnected tools.",
          },
          {
            heading: "When to design first, when to skip Figma",
            body: "Figma still earns its keep when you are aligning with stakeholders, exploring visual direction, or capturing decisions for the team. It is often the wrong tool when you are exploring a single interaction or trying to feel an actual flow. Some work goes from sketch to prototype faster without the round trip through frames.",
            bullets: [
              "Design in Figma when alignment, hand-off, or systems thinking is the goal.",
              "Skip to code when interaction, motion, or feel is the goal.",
              "Use both when the project crosses from exploration into shipping.",
            ],
          },
          {
            heading: "Screenshot vs. frame vs. spec",
            body: "Three common ways to feed a design into the assistant, each with a different cost and outcome. Pick deliberately: a sloppy screenshot can buy you a great first pass, and a perfect spec is sometimes overkill for an exploration.",
            bullets: [
              "Screenshot: fastest, lowest fidelity, useful for vibe and rough layout.",
              "Frame via Figma MCP: structured, names and tokens preserved, best for systems-aware output.",
              "Written spec: best when the design does not exist yet, or when constraints matter more than visuals.",
            ],
          },
        ],
      },
      {
        id: "visual-design-fidelity",
        number: 12,
        title: "Visual design fidelity",
        summary:
          "Holding the line on spacing, type, color, and hierarchy, with Spectrum as the canonical reference and a checklist for AI's visual tells.",
        readTime: "2 min",
        sections: [
          {
            heading: "Tokens, not magic numbers",
            body: "AI-generated UI loves to invent values. A 13-pixel padding here, a 17-pixel radius there, a color two clicks off Spectrum blue. Force the assistant to use your tokens by name. The output looks consistent on the first pass instead of needing a polish round to undo the drift.",
          },
          {
            heading: "Spectrum as the canonical reference",
            body: "Inside Adobe, Spectrum is the answer to most visual questions. When the assistant proposes a custom button, picker, or modal, redirect it to the Spectrum equivalent before you accept the change. The team conversation gets shorter when everyone is pointing at the same source of truth.",
          },
          {
            heading: "AI's visual tells",
            body: "There is a recognizable look to under-edited AI UI. Once you can name it, you can fix it on the first review pass.",
            bullets: [
              "Sloppy hierarchy: too many sizes, weights, and colors fighting for the same level.",
              "Generic illustration and stock-feeling iconography.",
              "Off-brand spacing rhythm, especially in cards and lists.",
              "Plausible-looking but slightly wrong contrast on secondary text.",
              "Buttons that almost match the system but use the wrong corner radius or shadow.",
            ],
          },
        ],
      },
      {
        id: "motion-interaction-real-content",
        number: 13,
        title: "Motion, interaction, and real content",
        summary:
          "Prototyping animation and state transitions, libraries worth knowing, how to describe motion in prompts, and replacing lorem ipsum with realistic data.",
        readTime: "2 min",
        sections: [
          {
            heading: "Describe motion the way a director would",
            body: "Models are bad at guessing motion intent and good at executing motion that is described well. Tell the assistant the trigger, the property, the duration, the easing, and the feeling. Motion is one of the few places where a paragraph of language outperforms a screenshot.",
            bullets: [
              "Trigger: what user action starts it.",
              "Property: what is animating, in concrete terms.",
              "Duration and easing: the timing and the curve.",
              "Feeling: snappy, calm, playful, mechanical.",
            ],
          },
          {
            heading: "A short list of libraries worth knowing",
            body: "You do not need to memorize every animation library, but a small mental shortlist makes prompts more productive. Name the library you want and the assistant produces idiomatic code instead of invented APIs.",
            bullets: [
              "Framer Motion or Motion for React component animation.",
              "CSS transitions and view transitions for the smallest, fastest cases.",
              "Lottie when you need a designed motion asset, not a coded one.",
            ],
          },
          {
            heading: "Real content beats lorem ipsum",
            body: "A prototype with realistic data exposes problems a prototype with placeholder text hides. Long names break layouts. Empty states feel different from full ones. Numbers with commas look different from numbers without. Ask the assistant to populate the prototype with data that looks like the real thing, and you will catch design issues that lorem ipsum politely covers up.",
          },
        ],
      },
      {
        id: "accessibility-as-you-build",
        number: 14,
        title: "Accessibility as you build",
        summary:
          "Keyboard nav, focus, semantic markup, contrast, and screen readers, treated as a prompt-time concern instead of a post-launch audit.",
        readTime: "2 min",
        sections: [
          {
            heading: "Accessibility belongs in the prompt",
            body: "Accessibility regressions are the easiest AI mistake to ship and the hardest to catch in design review. The fix is to put accessibility into the brief from the start, not to schedule a sweep at the end. A short accessibility paragraph in your prompt or rules file pays for itself the first time it prevents a redo.",
          },
          {
            heading: "The keyboard, focus, and semantics test",
            body: "Three checks you can run on any AI-generated UI in under a minute, before you decide it is ready for review.",
            bullets: [
              "Keyboard: can you reach and operate every interactive element with Tab, Shift+Tab, Enter, and Space?",
              "Focus: is the focus ring visible and is the order sensible?",
              "Semantics: are headings, landmarks, labels, and roles real, not styled divs pretending to be controls?",
            ],
          },
          {
            heading: "Contrast and screen readers, in real conditions",
            body: "Contrast checkers and screen-reader walk-throughs catch the issues that automated linters miss. Use VoiceOver, NVDA, or your platform of choice on a real device, not just an emulated one. The first time you hear an AI-generated form read aloud as a bag of unlabeled inputs, you stop skipping this step.",
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
      "What happens once the work leaves your file. Owning the quality, avoiding AI slop, and working as a team on shared, AI-assisted craft.",
    chapters: [
      {
        id: "quality-and-ownership",
        number: 15,
        title: "Quality and ownership: avoiding AI slop",
        summary:
          "What slop looks like in design output, using Git as version history, and reviewing AI-generated code with the BLOCKER, MAJOR, MINOR, NIT habit.",
        readTime: "2 min",
        sections: [
          {
            heading: "What AI slop looks like in design",
            body: "Slop is what happens when generation outpaces review. In design output, it has a recognizable shape, and once you can name it, you can refuse to ship it.",
            bullets: [
              "Drift: small unexplained deviations from the design system that compound across screens.",
              "Generic styling: layouts that could be from any product, none of them yours.",
              "Accessibility regressions: missing labels, broken focus, low contrast, fake controls.",
              "Plausible nonsense: copy and microcopy that reads well but means nothing.",
            ],
          },
          {
            heading: "Git is your design history",
            body: "Version control is not just for engineers. It is the most honest record of what your assistant changed, and it is the cheapest way to undo a bad turn. Commit early and often, in small, descriptive chunks. A clean Git history doubles as your design log and your safety net.",
          },
          {
            heading: "BLOCKER, MAJOR, MINOR, NIT",
            body: "A simple severity scale that keeps reviews honest and fast. Tag every comment so the author knows what to fix now, what to fix soon, and what to ignore until next time.",
            bullets: [
              "BLOCKER: ship-stoppers. Wrong, unsafe, or broken. Must fix.",
              "MAJOR: real problems that should be fixed before merge.",
              "MINOR: worth fixing, but not worth blocking on.",
              "NIT: preference. Author's call.",
            ],
          },
          {
            heading: "Own code you didn't type",
            body: "If your name is on the PR, the code is yours. Read every change before you accept it. Run it. Test the unhappy paths. Ask the assistant to explain anything you don't understand, then verify the explanation. The shortcut to shipping AI-assisted work that you can stand behind is refusing to ship anything you can't explain.",
          },
        ],
      },
      {
        id: "working-as-a-team",
        number: 16,
        title: "Working as a team",
        summary:
          "The AI pod rhythm, the design-build-review loop from the IFT playbook, cross-functional coordination, and automating the repetitive parts of your own process.",
        readTime: "3 min",
        sections: [
          {
            heading: "The AI pod rhythm",
            body: "AI-assisted teams move differently than the ones that came before them. The unit of work is smaller, the loops are tighter, and review happens in hours instead of days. A pod of one designer, one engineer, and one PM, all using the same tools, ships work faster than a much larger team using one tool each.",
          },
          {
            heading: "The design, build, review loop",
            body: "Borrowed from the IFT playbook and refined in practice: every change runs through a short, named loop. The loop has three stages, each with a clear owner and a clear artifact, so nothing falls through the cracks.",
            bullets: [
              "Design: a brief, a frame, or a plan. Owned by design, reviewed by engineering and PM.",
              "Build: a working change, behind a flag if needed. Owned by whoever is in the editor.",
              "Review: a structured pass against the original brief. Owned by the team, surfaced in writing.",
            ],
          },
          {
            heading: "Cross-functional coordination",
            body: "AI does not change the need for content, engineering, and PM to be in the room. It changes what they do there. Content shapes voice and edits generated copy. Engineering reviews architecture and risk, not syntax. PM keeps the work tied to the customer problem. When everyone uses the same tools, the meetings get shorter and the artifacts get sharper.",
          },
          {
            heading: "Bug bashes and decision logs",
            body: "Two team practices that work especially well in AI-assisted projects. They are cheap to start and surprisingly hard to sustain, so name an owner for each.",
            bullets: [
              "Bug bash: a scheduled hour where the team uses the prototype as adversarial users.",
              "Decision log: a running record of choices made and rejected, so future-you remembers why.",
            ],
          },
          {
            heading: "Automate the repetitive parts of your own process",
            body: "The meta-skill of AI-assisted design is noticing the work you do over and over and turning it into a prompt, a skill, or a rule. The first time you write a release note by hand, fine. The third time, write a skill that drafts it. Designers who treat their own process as a system improve faster than the ones who treat every project as new.",
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
