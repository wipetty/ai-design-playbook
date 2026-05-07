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
      image?: { src: string; alt: string; caption?: string };
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
        meta?: string;
        image?: {
          src: string;
          alt: string;
          position?:
            | "left"
            | "center"
            | "right"
            | "top"
            | "bottom"
            | "left top"
            | "left bottom"
            | "right top"
            | "right bottom";
        };
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
      items: {
        positive: boolean;
        title: string;
        text: string;
        image?: { src: string; alt: string };
        video?: { src: string; alt: string; poster?: string };
      }[];
    }
  | {
      kind: "steps";
      items: {
        title: string;
        text: string;
        image?: {
          src: string;
          alt: string;
          variant?: "thumbnail" | "logo";
        };
      }[];
    }
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
    }
  | {
      kind: "stageStack";
      caption?: string;
      attentionLabel?: string;
      stages: {
        number: string;
        name: string;
        verb: string;
      }[];
    }
  | {
      kind: "roomDiagram";
      caption?: string;
      center: string;
      chips: string[];
    }
  | {
      kind: "mirror";
      caption?: string;
      self?: string;
      center?: string;
      forwardLabel?: string;
      returnLabel?: string;
    }
  | {
      kind: "figureGrid";
      columns?: 2 | 3;
      caption?: string;
      framed?: boolean;
      items: {
        eyebrow?: string;
        caption: string;
        image?: { src: string; alt: string };
        video?: { src: string; alt: string; poster?: string };
      }[];
    }
  | {
      kind: "figure";
      image: { src: string; alt: string };
      eyebrow?: string;
      caption?: string;
    }
  | {
      kind: "video";
      src: string;
      poster?: string;
      alt: string;
      eyebrow?: string;
      caption?: string;
    }
  | {
      kind: "ratio";
      caption?: string;
      rows: {
        label?: string;
        left: { title: string; text?: string };
        operator: ">" | "<" | "=";
        right: { title: string; text?: string };
        tone?: "muted" | "active";
      }[];
    }
  | {
      kind: "variantDemo";
      eyebrow?: string;
      title?: string;
      task?: string;
      caption?: string;
      variants: {
        key: string;
        label: string;
        preview: "compact" | "cards" | "dense";
        note?: string;
      }[];
    }
  | {
      kind: "code";
      label?: string;
      language?: string;
      text: string;
    }
  | {
      kind: "anatomy";
      label?: string;
      lines: { text: string; mark?: number }[];
      notes: { mark: number; label: string; text: string }[];
      caption?: string;
    }
  | {
      kind: "balance";
      left: { label: string; text: string };
      right: { label: string; text: string };
      tilt?: "left" | "right" | "even";
      caption?: string;
    }
  | {
      kind: "bento";
      caption?: string;
      items: {
        size?: "hero" | "wide" | "tall" | "small";
        eyebrow?: string;
        title: string;
        text: string;
        icon?: IconName;
        accent?: boolean;
      }[];
    }
  | {
      kind: "loopOrbit";
      center?: string;
      caption?: string;
      stations: {
        number?: string;
        label: string;
        meta?: string;
      }[];
    }
  | {
      kind: "lensCompare";
      caption?: string;
      center?: string;
      left: { label: string; subtitle?: string; reveals: string[] };
      right: { label: string; subtitle?: string; reveals: string[] };
    }
  | {
      kind: "blindSpot";
      caption?: string;
      visible: { label: string; subtitle?: string; items: string[] };
      invisible: {
        label: string;
        subtitle?: string;
        items: {
          text: string;
          audience:
            | "keyboard"
            | "screenReader"
            | "lowVision"
            | "colorBlind"
            | "vestibular"
            | "cognitive";
        }[];
      };
    }
  | {
      kind: "driftMeter";
      caption?: string;
      zones: {
        weight: number;
        tone: "positive" | "warn" | "signal";
        eyebrow: string;
        title: string;
        text: string;
        hint?: string;
      }[];
    }
  | {
      kind: "signGrid";
      caption?: string;
      items: {
        diagram: "collapse" | "lag" | "break" | "dwarf";
        eyebrow: string;
        title: string;
        text: string;
      }[];
    }
  | {
      kind: "typeStack";
      caption?: string;
      ramps: {
        label: string;
        note?: string;
        range?: string;
        tiers: {
          tag: string;
          size: number;
          weight?: 400 | 500 | 600 | 700;
          sample: string;
          token?: string;
        }[];
      }[];
    }
  | {
      kind: "swatchSet";
      caption?: string;
      groups: {
        label: string;
        note?: string;
        swatches: {
          hex: string;
          role: string;
          usage: string;
          token?: string;
        }[];
      }[];
    }
  | {
      kind: "themeTokens";
      caption?: string;
      tokens: {
        name: string;
        role: string;
        light: string;
        dark: string;
        usage: string;
      }[];
    }
  | {
      kind: "themeLayers";
      caption?: string;
      layers: {
        slot: "pasteboard" | "base" | "layer-1" | "layer-2" | "elevated";
        name: string;
        role: string;
        light: string;
        dark: string;
        note?: string;
      }[];
    }
  | {
      kind: "colorRoles";
      caption?: string;
      roles: {
        name: string;
        purpose: string;
        strong: { token: string; light: string; dark: string };
        subtle: { token: string; light: string; dark: string };
      }[];
    }
  | {
      kind: "driftAudit";
      caption?: string;
      items: {
        index: string;
        title: string;
        drift: string;
        fix: string;
        note: string;
      }[];
    }
  | {
      kind: "weightMap";
      caption?: string;
      views: {
        label: string;
        note?: string;
        tiers: {
          header: "primary" | "secondary" | "tertiary" | "ambient";
          hero: "primary" | "secondary" | "tertiary" | "ambient";
          card1: "primary" | "secondary" | "tertiary" | "ambient";
          card2: "primary" | "secondary" | "tertiary" | "ambient";
          card3: "primary" | "secondary" | "tertiary" | "ambient";
          cta: "primary" | "secondary" | "tertiary" | "ambient";
        };
      }[];
    }
  | {
      kind: "spacingRhythm";
      caption?: string;
      layouts: {
        label: string;
        note?: string;
        elements: {
          type: "heading" | "body" | "button" | "card" | "section";
          label: string;
        }[];
        gaps: number[];
        tokens?: string[];
      }[];
    }
  | {
      kind: "motionTrace";
      caption?: string;
      tracks: {
        label: string;
        note?: string;
        timing: string;
        pattern: "linear" | "spring" | "soft" | "snap";
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
                    text: "The infrastructure is in place at Adobe. Protopack, Spectrum, the Firefly Platform repo, the MCP servers that wire agents into the real codebase. Cross-functional AI pods like the Image Frontier Team — small groups of designers, engineers, and PMs working tightly together with AI as a shared tool — are already shipping features this way: designers shaping the build, engineers landing the change, all moving on the same loop. It's not theoretical.",
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
                text: "Designers who learn this in the next year will spend the rest of their careers having a hand in more of what ships, faster, with more direct ownership over the build than any previous generation of designers had.",
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
        readTime: "7 min",
        sections: [
          {
            heading: "There is no single starting line",
            blocks: [
              {
                kind: "paragraph",
                text: "Some designers reading this have been writing prompts for two years and contributing production code through Claude Code for the last six months. Some haven't opened a chat window outside of asking for a recipe. Most are somewhere in between, and most also feel slightly behind whoever they last talked to about it.",
              },
              {
                kind: "paragraph",
                text: "That feeling is almost always wrong.",
              },
              {
                kind: "pullquote",
                text: "The field is younger than the social anxiety around it suggests, and the people who seem furthest ahead are usually behind someone else.",
              },
              {
                kind: "paragraph",
                text: "The useful question isn't how far along am I. It's what am I currently learning to do with the model. Three things tend to come in sequence, but they overlap, and you can be early on one while being late on another.",
              },
            ],
          },
          {
            heading: "Stage one: AI as a faster version of what you already do",
            blocks: [
              {
                kind: "paragraph",
                text: "You hand the model a task you already know how to do, and you let it do that task for you. Rewrite this paragraph. Summarize this user interview. Generate three subject lines. Make this list less wordy. The work doesn't change shape — you're producing the same kinds of artifacts you produced before — it just takes less time and less of your finite attention.",
              },
              {
                kind: "paragraph",
                text: "This stage gets dismissed too easily. People talk about it like it's the kiddie pool, something to graduate out of. But the gains here are real, they compound, and they free up cognitive room for the stages that come next. A designer who saves twenty minutes on every research synthesis has another twenty minutes to think about the actual product, and that's not a small thing.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "Cue to push into stage two",
                text: "You stop discovering new tasks to delegate. You've found your handful, you reach for the model reflexively, and the productivity curve flattens out.",
              },
            ],
          },
          {
            heading: "Stage two: AI as a thinking partner",
            blocks: [
              {
                kind: "paragraph",
                text: "This is the shift from \"the model does the task\" to \"the model and I figure out the task together.\" You stop asking it to summarize the interview and start asking what patterns it noticed across the last five — and then arguing with what it says. You stop asking for three subject lines and start asking it to challenge the brief itself. You bring the model in earlier, when the answer isn't obvious yet, the way you'd use a quick conversation with a thoughtful colleague: not to get the answer, but to get unstuck.",
              },
              {
                kind: "mirror",
                self: "You",
                center: "Model",
                forwardLabel: "thought",
                returnLabel: "reflection",
                caption:
                  "The exchange tightens with each turn — half-formed ideas go out, sharper ones come back, and you keep going until the shape of the answer is one you both built.",
              },
              {
                kind: "pullquote",
                text: "Stop performing decisiveness in your prompts. Start using the model as a mirror for the parts of your thinking that haven't fully formed.",
              },
              {
                kind: "paragraph",
                text: "The mental adjustment here is harder than it sounds. Designers are trained to walk into rooms with conviction. Showing up to a model in a state of genuine uncertainty — \"I don't know how to think about this yet, help me\" — feels off-script. The designers who break through this stage are the ones who let go of the performance.",
              },
              {
                kind: "wink",
                text: "Vibe coding starts to matter here — not as a milestone, but because it's a collaboration mode. If you've never used AI as a thinking partner, vibe coding will feel chaotic. If you have, it'll feel like a natural extension of how you already work.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "Cue to push into stage three",
                text: "A static Figma frame stops carrying the concept. The idea is an interaction, a feel, a flow you can't pin to a rectangle. The only way to share it is to build it — and for that to work without re-explaining everything, the model needs your design system, components, and conventions already in the room.",
              },
            ],
          },
          {
            heading: "Stage three: AI as a system you shape",
            blocks: [
              {
                kind: "paragraph",
                text: "At some point you notice that the quality of your collaborations with the model depends less on how you prompt and more on what's in the room with you. The model is only as useful as the context it's working inside — the design system docs you've fed it, the conventions you've written down, the components it can see, the canonical examples it can reach for.",
              },
              {
                kind: "paragraph",
                text: "The work shifts from talking to the model to building the conditions in which the model can do good work without much talking at all. You start writing CLAUDE.md files. You connect MCP servers to your design system and to Figma. You build small skills that encode the things you find yourself explaining over and over. You think about context the way an engineer thinks about caches: what survives across sessions, what goes stale, what you trust the model to reach for unprompted.",
              },
              {
                kind: "roomDiagram",
                center: "Model",
                chips: [
                  "Design system",
                  "Components",
                  "MCP servers",
                  "Figma file",
                  "CLAUDE.md",
                  "Conventions",
                  "Voice",
                  "Audience",
                  "Accessibility floor",
                  "Past prompts",
                  "Skills",
                ],
                caption:
                  "What's in the room with the model determines what you can do without re-explaining yourself. Stage three is the work of stocking that room.",
              },
              {
                kind: "pullquote",
                text: "Less you using AI. More you and AI as a system.",
              },
              {
                kind: "paragraph",
                text: "The boundary between your skill and the model's gets harder to draw, which is uncomfortable until you accept that it doesn't matter. What matters is what the system can produce together that neither could produce alone.",
              },
            ],
          },
          {
            heading: "These stages stack",
            blocks: [
              {
                kind: "paragraph",
                text: "You don't graduate from stage one. You keep delegating; you just do it on autopilot while the more interesting work happens elsewhere. You don't leave collaboration behind when you start shaping the environment either — the environment exists to make collaboration cheaper, not to replace it. A designer working at full strength is doing all three at once: handing off the rote tasks, sparring with the model on the hard ones, and continuously sharpening the context the model operates in.",
              },
              {
                kind: "stageStack",
                attentionLabel: "Where your attention is",
                stages: [
                  {
                    number: "Stage 01",
                    name: "Faster pencil",
                    verb: "Delegate the tasks you already know how to do.",
                  },
                  {
                    number: "Stage 02",
                    name: "Thinking partner",
                    verb: "Spar with the model on the parts you haven't figured out.",
                  },
                  {
                    number: "Stage 03",
                    name: "System you shape",
                    verb: "Build the conditions the model works inside.",
                  },
                ],
                caption:
                  "Stages don't replace each other. A designer at stage three is still doing one and two; they just happen on autopilot, and attention has moved to the layer above.",
              },
              {
                kind: "paragraph",
                text: "What changes is where your attention goes. Early on, you're paying attention to the prompts. Later, to the conversation. Eventually, to everything around the conversation — the docs, the components, the examples, the rules, the team workflow the model is participating in.",
              },
              {
                kind: "pullquote",
                text: "The prompt itself becomes almost incidental.",
              },
            ],
          },
          {
            heading: "What actually compounds",
            blocks: [
              {
                kind: "paragraph",
                text: "The habits that pay off are quiet ones. They don't make for good demos and they don't show up in screenshots, which is part of why they get under-invested in.",
              },
              {
                kind: "checklist",
                items: [
                  {
                    positive: true,
                    title: "A growing library of prompts and plans tied to real projects",
                    text: "Not generic templates — the actual messy ones that worked, kept somewhere you can find them again.",
                  },
                  {
                    positive: true,
                    title: "An environment you can rebuild in under an hour",
                    text: "Cursor or Claude Code installed, MCPs connected, repo access working, the small frictions already solved.",
                  },
                  {
                    positive: true,
                    title: "Living context for your work",
                    text: "Your design system, audience, and constraints written in the model's idiom, updated when things change, pasted in at the start of every serious session.",
                  },
                  {
                    positive: true,
                    title: "A review rhythm that catches drift",
                    text: "A standing habit for noticing when AI-generated output has wandered from your design system, your voice, or your accessibility floor — and the discipline to push back when it has.",
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "None of these are exciting. All of them are the actual difference, six months in, between a designer whose AI practice has compounded and a designer whose practice is still where it was when they started.",
              },
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
      "Get the machine ready and the codebase in front of you. Pick the editor, work inside a real repo, see what Adobe gives you, and put rules and skills in their right place.",
    chapters: [
      {
        id: "setting-up-your-environment",
        number: 4,
        title: "What you need in front of you",
        summary:
          "The setup that makes vibe coding usable: tooling, repo access, the branch-and-PR loop, and the rhythm that ties them together.",
        readTime: "8 min",
        sections: [
          {
            heading: "The whole setup, in one sentence",
            blocks: [
              {
                kind: "paragraph",
                text: "Vibe coding is the editor, the model in it, the codebase it can see, and the version-control loop you ship through. Get those four things right and most of the friction disappears. Get any of them wrong and the assistant starts to feel like a chatbot you happen to keep open while you do the real work somewhere else.",
              },
              {
                kind: "pullquote",
                text: "If you can't run the real product locally, you're not vibe coding — you're prompting.",
              },
              {
                kind: "paragraph",
                text: "A designer's setup doesn't need to look like an engineer's. It needs to give you the same loop: see the code, change it, run it, share it. Everything in this chapter is in service of that loop.",
              },
              {
                kind: "paragraph",
                text: "How much of the setup you actually need depends on the mode you're working in. The three modes from chapter 2 each ask for a different amount of this chapter.",
              },
              {
                kind: "table",
                columns: ["Mode", "What you need from this chapter"],
                rows: [
                  [
                    "Mode 1: New ideas",
                    "An editor with a model in it. A blank folder is the whole setup. Skip the rest until the idea wants a real product around it.",
                  ],
                  [
                    "Mode 2: Build in context",
                    "Editor, plus a real product repo cloned and running locally. The branch-and-PR loop is optional — you may demo without ever merging.",
                  ],
                  [
                    "Mode 3: Production",
                    "All of it. Editor, repo, branch-and-PR loop, and the daily rhythm. No exceptions.",
                  ],
                ],
              },
            ],
          },
          {
            heading: "Pick one editor and stay in it for a month",
            blocks: [
              {
                kind: "paragraph",
                text: "[Cursor](https://cursor.com) and [Claude Code](https://www.anthropic.com/claude-code) are both strong starting points. They differ in feel, but the difference is smaller than the difference between using either of them well and bouncing between them weekly. Pick one. Configure it once. Use it daily. If you go with Cursor, chcek out [Cursor shortcuts guide](https://design.dev/guides/cursor-shortcuts) is worth twenty minutes early on — most of the friction designers hit with Cursor disappears once the keyboard becomes muscle memory.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "code",
                    eyebrow: "Cursor",
                    title: "An editor with a model inside it",
                    text: "Closer to a traditional IDE. Good when you want to see the code, edit by hand, and call the assistant when you need it.",
                    image: {
                      src: "/images/editor-cursor.png",
                      alt: "Cursor wordmark and logo set against a dark code editor backdrop with snippets of TypeScript visible behind it.",
                    },
                  },
                  {
                    icon: "chat",
                    eyebrow: "Claude Code",
                    title: "A model with the editor underneath",
                    text: "Closer to a chat that can act. Good when you want to describe what should change and let the model carry more of the work.",
                    image: {
                      src: "/images/editor-claude-code.png",
                      alt: "Claude Code terminal welcome screen with the Claude Code wordmark in orange ASCII art on a dark background, showing the research preview greeting.",
                    },
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "Cue to switch",
                text: "You've used the same editor daily for a month and you can name a specific thing it stops you from doing. Not a hunch — a thing. That's a real signal. Anything before that is noise.",
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "figma",
                title: "Don't forget the Figma MCP",
                text: "The Figma MCP is the connector that lets the model in your editor see your Figma frames as more than screenshots. With it installed, you can paste a Figma link into a prompt and the model can read the layers, components, and tokens directly. Without it, you're describing your design in words — which works, but throws away most of what Figma is for. Chapter 6 covers MCPs in detail.",
              },
            ],
          },
          {
            heading: "Live inside a real repo, not a sandbox",
            blocks: [
              {
                kind: "paragraph",
                text: "The biggest jump in usefulness happens the day you stop pasting snippets into a blank file and start working inside the actual product's repo. The assistant suddenly knows your components, your conventions, your API clients, your design tokens — because they're right there.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "x",
                    eyebrow: "Sandbox",
                    title: "Fast to start, nothing to reference",
                    text: "The model has nothing to look at except what you paste in, so anything that needs to match the real product has to be reinvented every session.",
                    meta: "e.g. a brand-new Protopack scaffold, or a one-off Vite app you spun up to try an idea.",
                  },
                  {
                    icon: "check",
                    eyebrow: "Real repo",
                    title: "Higher upfront cost, real payback",
                    text: "Pays back the first time the model finds a component you forgot existed and uses it correctly without being told.",
                    meta: "e.g. the codebase your research, prototyping, or product team is already shipping out of.",
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "Get cloned. Get it running locally. Get the dev server up. Until you've done that, you're working in demo mode. Once you've done it, the gap between your prototype and what could ship narrows from a week to an afternoon.",
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "arrow",
                title: "Prototyping path? There's a shorter route",
                text: "If most of your work is prototyping rather than landing changes inside a production codebase, Protopack is a faster on-ramp than a full repo clone. It handles the local environment, gives you Spectrum-aligned templates, and makes hosting easy. Chapter 5 walks through it; [#adpt-protopack](https://adobe.enterprise.slack.com/archives/C08QHHYC5SR) is where the day-to-day questions get answered. Skim the next section and come back to it the day your work starts crossing into a real product repo.",
              },
            ],
          },
          {
            heading: "Get the codebase on your machine",
            blocks: [
              {
                kind: "paragraph",
                text: "This is the step designers stall on most often, because it crosses into engineering territory and the docs are written for engineers. The actual work is small. Three things have to be in place, in order.",
              },
              {
                kind: "steps",
                items: [
                  {
                    title: "Ask for repo access",
                    text: "Find an engineer or tech lead on the team and ask them to add you to the GitHub repo. They'll need your GitHub username; you'll need a corp account linked to GitHub. The first time, this can take a day or two — start the ask before you actually need it.",
                    image: {
                      src: "/images/codebase-repo.png",
                      alt: "GitHub Enterprise view of the Adobe-Firefly/firefly-platform repository, showing the main branch, file list, branches and tags counts, and the About panel.",
                    },
                  },
                  {
                    title: "Clone the repo",
                    text: "From the Cursor welcome screen, paste the GitHub URL and pick a folder. From a terminal, it's git clone followed by the URL. Either way, you end up with the whole codebase as a local folder you can open in the editor.",
                    image: {
                      src: "/images/codebase-clone.png",
                      alt: "GitHub Code dropdown open, showing the HTTPS clone URL for the firefly-platform repository alongside SSH and GitHub CLI tabs.",
                    },
                  },
                  {
                    title: "Read the setup doc",
                    text: "Almost every repo has a README.md or guidelines.md at the root. Open it first. It tells you which package manager to use, which command starts the dev server, and any environment variables you need. Following that doc is the difference between a working environment and an hour of debugging install errors.",
                    image: {
                      src: "/images/codebase-readme.png",
                      alt: "Rendered Firefly Platform README on GitHub, showing the package description, Demo link, and a numbered Consumer Setup section with npm and pnpm install commands.",
                    },
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "A useful first prompt",
                text: "Once the repo is cloned, paste this into the model: \u201cRead the guidelines doc and walk me through the setup commands one at a time, explaining what each does.\u201d That turns a dense engineering reference into a guided walkthrough you can actually follow, and it teaches you the shape of the project at the same time.",
              },
              {
                kind: "wink",
                text: "If the dev server runs and the page loads on localhost, you're past the hardest part. Everything after this is iteration.",
              },
            ],
          },
          {
            heading: "The branch-and-PR loop",
            blocks: [
              {
                kind: "paragraph",
                text: "Engineers work inside a loop they don't have to think about anymore: branch, change, commit, push, PR, review, merge. You want that loop too — not because the ceremony matters, but because it's how work becomes shareable. A branch is a sandbox with a paper trail. A PR is a way to show your thinking, not just your output.",
              },
              {
                kind: "steps",
                items: [
                  {
                    title: "Branch off main",
                    text: "Name it after the thing you're trying — not the file you're touching. Future-you wants to remember what the branch was for, not which folder it lived in.",
                    image: {
                      src: "/images/loop-branches.png",
                      alt: "Cursor branch picker listing recent feature branches like annotationpf-fix-v1, precision-flux-v3, and new-annotation-tool-bar-v3.",
                    },
                  },
                  {
                    title: "Work in small commits",
                    text: "Save state often, with messages a teammate could read. Vibe coding generates a lot of code fast; small commits give you a way back when the model wanders.",
                    image: {
                      src: "/images/loop-figma-context.png",
                      alt: "Cursor chat panel with a prompt asking to add a sub-menu to the Select tool, referencing a Figma URL, with the assistant responding using the figma-implement-design skill.",
                    },
                  },
                  {
                    title: "Open a draft PR early",
                    text: "Even when nothing works yet. The PR is the channel — it's where screenshots live, where the conversation happens, and where you start exposing intent.",
                    image: {
                      src: "/images/loop-running.png",
                      alt: "Cursor with the Firefly Image Editor running on localhost in the right pane and a chat with the assistant in the left pane.",
                    },
                  },
                  {
                    title: "Push for review when the bar fits the mode",
                    text: "Match the review intensity to the mode you're in. A mode-one prototype gets a quick look. A mode-three change gets the full review pass.",
                    image: {
                      src: "/images/loop-repo.png",
                      alt: "GitHub Enterprise view of the Adobe-Firefly/firefly-platform repository, showing the main branch, file list, and the pull requests tab with hundreds of open PRs.",
                    },
                  },
                ],
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "compass",
                title: "Out of scope: AI code review",
                text: "Tools like [Bugbot](https://cursor.com/bugbot), [CodeRabbit](https://www.coderabbit.ai/), and the review bots wired into Adobe repos can read a PR and flag issues before a human ever opens it. They're worth using, but the setup and the judgment around them sit in engineering territory. The fastest way in is to ask an engineering friend to walk you through what their team uses on a real PR of yours.",
              },
              {
                kind: "wink",
                text: "If you've never opened a PR, the first one is the hard one. Every PR after that is just the same five buttons.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "target",
                title: "First time? Pair with someone",
                text: "If branches, commits, and PRs are new to you, don't try to set this up alone. Grab thirty minutes with an engineer or a designer on a prototyping team and walk through it together once. You'll watch them do it, do the next one yourself, and after that the loop is yours.",
              },
            ],
          },
          {
            heading: "Vocabulary, briefly",
            blocks: [
              {
                kind: "paragraph",
                text: "If any of these terms are new, here's the short version. Skip the ones you already know. If you want a longer walkthrough, [Atlassian's Git tutorials](https://www.atlassian.com/git/tutorials/what-is-version-control) are the most designer-friendly primer on the open web.",
              },
              {
                kind: "table",
                columns: ["Term", "What it means"],
                rows: [
                  [
                    "main",
                    "The shared default branch your team ships from. Treat it as read-only.",
                  ],
                  [
                    "branch",
                    "Your own copy of the work, taken off main. Safe to break things in.",
                  ],
                  [
                    "commit",
                    "A saved point in time for your changes, with a short message describing what changed.",
                  ],
                  [
                    "push",
                    "Send your local commits up to the shared remote, like GitHub.",
                  ],
                  [
                    "pull",
                    "Bring down changes from the remote into your local branch.",
                  ],
                  [
                    "PR (pull request)",
                    "A proposal to merge your branch into main, with the conversation around it attached.",
                  ],
                ],
              },
              {
                kind: "wink",
                text: "Push sends your work outward. Pull brings the team's work back in. Forget which is which? You're sending or receiving — that's the whole rule.",
              },
            ],
          },
          {
            heading: "The rhythm that ties it together",
            blocks: [
              {
                kind: "paragraph",
                text: "A working session has a shape. You don't have to follow it exactly, but you should recognize it. Skipping the start makes the middle feel chaotic. Skipping the end makes tomorrow's start expensive.",
              },
              {
                kind: "table",
                columns: ["When", "What you do", "Why"],
                rows: [
                  [
                    "Start of a session",
                    "Pull main, branch, paste in your context primer, name the mode.",
                    "The model resets between sessions. You don't. Re-ground both of you on purpose.",
                  ],
                  [
                    "Inside the session",
                    "Commit early, commit often, run it after every meaningful change.",
                    "Saved state is the only honest signal of progress. Untested code is a guess.",
                  ],
                  [
                    "End of a session",
                    "Push, write a one-line PR description, drop a screenshot, leave a TODO for next time.",
                    "Tomorrow-you is a different person with no memory. Leave them a map.",
                  ],
                ],
              },
              {
                kind: "wink",
                text: "Before you push, look at the diff. If you can't explain in one sentence what changed and why, the PR isn't ready. It's the same discipline as reviewing your own Figma file before you share it.",
              },
              {
                kind: "pullquote",
                text: "The setup isn't done when it works once. It's done when you can rebuild it in under an hour.",
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "compass",
                title: "What this chapter doesn't cover",
                text: "Prompting practices, MCPs, skills, and rules live in chapter 6. The Adobe-specific tooling — Protopack, Spectrum, the Adobe MCPs, license access — is chapter 5. How a pod actually works once setup is done is chapter 15. Setup is the part you do once per project and mostly forget about. The rest of the playbook is what you do every day.",
              },
            ],
          },
        ],
      },
      {
        id: "ai-tooling-at-adobe",
        number: 5,
        title: "The Adobe AI landscape",
        summary:
          "What Adobe gives you and how to get to it: the tools, the access process, and the community where the actual help lives.",
        readTime: "6 min",
        sections: [
          {
            heading: "Start from what's already in the building",
            blocks: [
              {
                kind: "paragraph",
                text: "Adobe gives you a lot before you install anything from the outside. The Firefly Platform, Spectrum, Protopack, and a growing internal MCP landscape are all designed to make your assistant smarter about Adobe-shaped work — and to keep what you ship consistent with everything else shipping at the company. The canonical map of what's available lives on the [AI at Adobe Design wiki](https://wiki.corp.adobe.com/display/AdobeDesign/AI+at+Adobe+Design); the company-wide [AI guidelines](https://inside.corp.adobe.com/adobe-and-generative-ai/ai-guidelines.html) sit alongside it.",
              },
              {
                kind: "figure",
                image: {
                  src: "/images/ai-at-adobe-design-wiki.png",
                  alt: "AI at Adobe Design wiki landing page, showing the program mission, page contacts, quick links to AI tools, and a Slack invite to #ai-ad-experimenters.",
                },
                eyebrow: "AI at Adobe Design",
                caption:
                  "The program hub: mission, quick links, contacts, and the channel where the day-to-day conversation happens.",
              },
              {
                kind: "pullquote",
                text: "The platform already knows your design system, your auth, and your services. Use it before you build it.",
              },
              {
                kind: "paragraph",
                text: "External tools are useful and you'll reach for them. But starting with the internal platform means a working prototype on day one, not on day five.",
              },
            ],
          },
          {
            heading: "What you actually have",
            blocks: [
              {
                kind: "paragraph",
                text: "The Adobe stack you'll touch as a designer breaks into four shapes: the everyday editors (chapter 4 covered those), a prototyping environment, the production codebases you cross into when work goes real, and the model context layer that ties everything to the rest of the company. Treat the cards below as a map, not a checklist — install only what the work in front of you actually needs.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "wand",
                    eyebrow: "Firefly Platform",
                    title: "Image, video, and creative model APIs",
                    text: "Generate, edit, upscale, and composite — callable from a prototype with the same auth you already use. The fastest way to put a real model in a real flow.",
                  },
                  {
                    icon: "layers",
                    eyebrow: "Protopack",
                    title: "Built for designers who don't want to think about npm",
                    text: "The Adobe Design Technology team's answer to \"how do I prototype without spending a day on environment setup.\" Local dev environment, Spectrum-wired templates, and a hosting service so you can share what you've built. The right starting point for new ideas and build-in-context work.",
                  },
                  {
                    icon: "ruler",
                    eyebrow: "Spectrum (S2)",
                    title: "The Adobe design system",
                    text: "React Spectrum components for production UI, plus tokens, motion, and a11y patterns the assistant can pin to. You're not editing Spectrum, you're using it — which is what stops AI-generated UI from drifting away from the rest of Adobe.",
                  },
                  {
                    icon: "compass",
                    eyebrow: "Adobe MCPs",
                    title: "Context the assistant can reach for",
                    text: "Servers that let the model read services, designs, and internal docs without you pasting them in. The Figma MCP is the one most designers install first — it lets the model see your frames as more than screenshots. The canonical list lives on the [AI at Adobe Design wiki](https://wiki.corp.adobe.com/display/AdobeDesign/AI+at+Adobe+Design) and changes faster than this page can.",
                  },
                ],
              },
            ],
          },
          {
            heading: "How to get to it",
            blocks: [
              {
                kind: "paragraph",
                text: "Most of the access is gated behind a few standard requests and a couple of Slack channels. None of it is hard. The trick is doing all of it once, up front, instead of stumbling into each step the day you need it.",
              },
              {
                kind: "steps",
                items: [
                  {
                    title: "Get IMS and repo access",
                    text: "Request access to the product repos you'll actually work in, plus IMS and the dev tooling baseline. This usually means a self-serve request and an approval from your manager.",
                  },
                  {
                    title: "Install Protopack and the templates",
                    text: "Install the Protopack plugin for Claude Code or Cursor. It pulls in the skills, agents, and templates the rest of the company is already using.",
                    image: {
                      src: "/images/logo-protopack.png",
                      alt: "Protopack app icon.",
                      variant: "logo",
                    },
                  },
                  {
                    title: "Wire the MCPs you'll actually use",
                    text: "Figma MCP, the relevant service MCPs, anything tied to the product you ship. Skip the rest. A wired-in MCP you don't use is a tax on every session.",
                  },
                  {
                    title: "Join the channels where help happens",
                    text: "There's no central docs site that beats a Slack channel of people doing the same thing today. The starter set: [#ad-ai-collective](https://adobe.enterprise.slack.com/archives/C04MKDW961Z) for AI design across disciplines, [#ai-coding-assistant-users](https://adobe.enterprise.slack.com/archives/C06MW635SD8) for Cursor and Claude Code questions, [#adpt-protopack](https://adobe.enterprise.slack.com/archives/C08QHHYC5SR) for Protopack, and [#external-ai-coding-cursor](https://adobe.enterprise.slack.com/archives/C07UL8NPFNK) for Cursor-specific chat. Lurk first, then ask.",
                    image: {
                      src: "/images/logo-slack.svg",
                      alt: "Slack logo mark.",
                      variant: "logo",
                    },
                  },
                ],
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "compass",
                title: "Use approved tools, watch what you paste",
                text: "Adobe maintains a list of approved AI tools — the obvious ones (ChatGPT Enterprise, Microsoft 365 Copilot, GitHub Copilot, Adobe's own products) plus a separate set of field-analysis licenses for tools being evaluated against Adobe offerings. Field-analysis tools have extra restrictions; the most important is no Adobe internal data. Read the [AI guidelines](https://inside.corp.adobe.com/adobe-and-generative-ai/ai-guidelines.html) once before you start, and check which list a tool is on before you use it for anything sensitive.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "Cue to ask for help",
                text: "You've spent more than 30 minutes on the same setup error. Stop tweaking, post the error in the right channel, and keep going on something else. Someone almost always answers within the hour, and the answer is almost never written down anywhere yet.",
              },
            ],
          },
          {
            heading: "Where the actual help lives",
            blocks: [
              {
                kind: "paragraph",
                text: "Adobe is large. Documentation is uneven. The fastest unblock is almost never a wiki page — it's a person who shipped the same thing yesterday. Knowing where those people gather is half the job.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "chat",
                    eyebrow: "Slack",
                    title: "The working channels",
                    text: "[#ad-ai-collective](https://adobe.enterprise.slack.com/archives/C04MKDW961Z) for AI design across disciplines, [#ai-coding-assistant-users](https://adobe.enterprise.slack.com/archives/C06MW635SD8) for Cursor and Claude Code, [#adpt-protopack](https://adobe.enterprise.slack.com/archives/C08QHHYC5SR) for Protopack, and [#external-ai-coding-cursor](https://adobe.enterprise.slack.com/archives/C07UL8NPFNK) for Cursor's own team. Join all four before you need them.",
                  },
                  {
                    icon: "layers",
                    eyebrow: "Use Case Library",
                    title: "The running record of what AD has built",
                    text: "Figma plugins, internal demo apps, MCP servers, prototypes, content tools — the actual range of what colleagues have shipped is faster than any framework for understanding what's possible. Most entries name the designer who built them; reaching out is one of the highest-return investments you can make early on.",
                  },
                  {
                    icon: "spark",
                    eyebrow: "Ambassador & Spotlight",
                    title: "The formal version of community",
                    text: "Ambassadors get early access to new tools and a monthly forum to share what they're learning. Spotlight sessions are recorded and archived on SharePoint, and watching a designer walk through their actual workflow tells you things no how-to guide will.",
                  },
                  {
                    icon: "target",
                    eyebrow: "AI pods",
                    title: "Cross-functional groups already shipping",
                    text: "Teams like the Image Frontier Team mix designers, engineers, and PMs around a real product surface, with AI as a shared tool. Watching how they work compresses months of guessing.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "The single biggest accelerator at Adobe is sitting next to someone who's a few weeks ahead of you. Find that person — in person or in Slack — and the rest of the playbook gets faster.",
              },
            ],
          },
          {
            heading: "Don't reinvent what's already there",
            blocks: [
              {
                kind: "paragraph",
                text: "If you find yourself building login, restyling a button, or hand-rolling a service client, stop. The platform almost certainly already has it. Using the platform piece isn't just faster — it's how your work stays consistent with everything else shipping at the company.",
              },
              {
                kind: "checklist",
                items: [
                  {
                    positive: true,
                    title: "Use Spectrum components instead of building UI from scratch",
                    text: "React Spectrum gives you production-ready buttons, fields, dialogs, and tables that already match the rest of Adobe.",
                  },
                  {
                    positive: true,
                    title: "Use Protopack for IMS auth and the Adobe services kit",
                    text: "One template covers login, tokens, and a wired-in services SDK. No bespoke auth code in your prototype.",
                  },
                  {
                    positive: true,
                    title: "Use Adobe3P for any LLM call (OpenAI, Gemini, Claude)",
                    text: "Same interface, unified auth, no separate API keys. Skips a compliance conversation later.",
                  },
                  {
                    positive: true,
                    title: "Use the Firefly Platform for image and video generation",
                    text: "If a model exists internally, use it. External APIs are a fallback, not a default.",
                  },
                ],
              },
              {
                kind: "pullquote",
                text: "Custom auth is a tax. Custom buttons are a tax. The platform exists so you can spend your attention elsewhere.",
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "compass",
                title: "What this chapter doesn't cover",
                text: "Step-by-step setup for any single tool — each one has its own canonical doc, and reproducing them here would mean maintaining them in two places, badly. The full inventory of approved AI tools — it changes too fast and Inside Adobe is the source of truth. Discipline-specific workflows — the wiki has dedicated pages for Product Design, Prototyping, Content Strategy, and User Research. Start there if you're trying to figure out how AI fits your specific role.",
              },
            ],
          },
        ],
      },
      {
        id: "extending-your-ai",
        number: 6,
        title: "Extending your AI: MCPs, skills, and rules",
        summary:
          "What MCPs, skills, and rules each do, when to reach for which, and how CLAUDE.md or AGENTS.md hold them together.",
        readTime: "4 min",
        sections: [
          {
            heading: "Three knobs, three jobs",
            blocks: [
              {
                kind: "paragraph",
                text: "MCPs, skills, and rules all extend what the assistant can do, and they all look similar from the outside. They do very different work. Once you know which is which, you stop installing the wrong thing every time something doesn't behave the way you wanted.",
              },
              {
                kind: "table",
                columns: ["Knob", "What it adds", "When you reach for it", "Where it lives"],
                rows: [
                  [
                    "MCP",
                    "Capability — a thing the model can now read or do.",
                    "When the model is missing access to information or an action.",
                    "Configured per editor, often per project.",
                  ],
                  [
                    "Skill",
                    "Procedure — a packaged way of doing a recurring task.",
                    "When you've explained the same multi-step task more than twice.",
                    "Files in your repo, invoked by name in a session.",
                  ],
                  [
                    "Rule",
                    "Policy — standing instructions that apply to every session.",
                    "When something must always be true, regardless of the prompt.",
                    "CLAUDE.md or AGENTS.md at the repo root.",
                  ],
                ],
              },
            ],
          },
          {
            heading: "MCPs add capability",
            blocks: [
              {
                kind: "paragraph",
                text: "An MCP is a server that gives the assistant a new ability — to read your Figma file, query a service, browse the web, run a build, look something up in a private system. Without one, the model is guessing about your world. With the right ones wired in, it's working from primary sources.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "figma",
                    eyebrow: "Figma MCP",
                    title: "Read the design directly",
                    text: "Frames, variables, components, and metadata. Stops the model from interpreting screenshots and lets it work from the source of truth.",
                  },
                  {
                    icon: "ruler",
                    eyebrow: "Spectrum MCPs",
                    title: "Reach into the system",
                    text: "`@react-spectrum/mcp` is the official S2 server — components, props, examples. `@adobe/spectrum-design-data-mcp` exposes tokens and component anatomy. `@adobe/s2-docs-mcp` exposes usage and accessibility. Wired alongside Figma, the model stops inventing close-but-wrong UI and starts using what's already approved.",
                  },
                  {
                    icon: "wand",
                    eyebrow: "Service MCP",
                    title: "Call the platform",
                    text: "Invoke Firefly, Adobe3P, internal APIs without you pasting in clients or tokens. Turns a prototype into something that actually does work.",
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "Cue to install one",
                text: "You've explained the same external system in three sessions in a row, and the model still gets it wrong. The right move isn't a longer prompt — it's an MCP that lets the model read it directly.",
              },
            ],
          },
          {
            heading: "Skills add procedure",
            blocks: [
              {
                kind: "paragraph",
                text: "A skill is a packaged way of doing a task you do often. A design review. An accessibility check. A handoff readiness pass. The skill captures the steps, the prompts, the order, and the criteria, so the next time you need that work done you call it by name instead of remembering. Anthropic's [skills best-practices guide](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices.md) goes deep on the format if you want the long version.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "ruler",
                    eyebrow: "Design review",
                    title: "Critique against the system",
                    text: "Compare the build to Spectrum, your tokens, and your voice. Surface the drift, not just the missing pieces.",
                  },
                  {
                    icon: "check",
                    eyebrow: "Accessibility check",
                    title: "Floor before merge",
                    text: "Contrast, focus, semantics, motion. Run it before you open the PR, not after the QA pass.",
                  },
                  {
                    icon: "loop",
                    eyebrow: "Handoff pass",
                    title: "Make the work portable",
                    text: "Write the README, capture the prompts that worked, snapshot the screens, list the open questions. Future-team-you will be grateful.",
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "Concretely, a skill is a small markdown file the assistant loads on demand. Front matter names it and tells the model when to use it; the body is the procedure. Two examples a designer might write in a week:",
              },
              {
                kind: "code",
                label: ".claude/skills/design-review.md",
                language: "markdown",
                text: `---
name: design-review
description: Review the running build against Spectrum, tokens, and the brief. Use before opening a non-draft PR.
---

1. Read the linked brief or PRD section in the PR description.
2. Walk every interactive element. Flag any non-Spectrum component as a BLOCKER.
3. Diff tokens against the design system: color, spacing, type scale, motion.
4. Open the running app on localhost and compare each screen to the Figma frame.
5. Post findings as PR comments tagged BLOCKER, MAJOR, MINOR, or NIT.
`,
              },
              {
                kind: "code",
                label: ".claude/skills/a11y-floor.md",
                language: "markdown",
                text: `---
name: a11y-floor
description: Run the accessibility floor before pushing for review. Use any time UI changes ship.
---

1. Tab through the change with a keyboard only. Note any focus traps or invisible focus states.
2. Check color contrast on text and icons against WCAG AA.
3. Verify semantic roles for interactive elements (button vs div, link vs button).
4. Confirm motion respects prefers-reduced-motion.
5. Summarize what passed, what failed, and what needs follow-up.
`,
              },
              {
                kind: "wink",
                text: "These live in your repo at .claude/skills/ or .cursor/skills/, and Cursor offers [slash commands](https://cursor.com/docs/context/commands) for the lighter version of the same idea. Once they're committed, anyone on the team can call them by name.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "Cue to write one",
                text: "You've walked the same review checklist on three different PRs, or expanded the happy path into empty, loading, and error states by hand on two features in a row. The work is repetitive enough that you'd hand it to a junior designer if you had one. That's a skill.",
              },
              {
                kind: "pullquote",
                text: "A skill is a thing you stopped explaining.",
              },
            ],
          },
          {
            heading: "Rules add policy",
            blocks: [
              {
                kind: "paragraph",
                text: "A rule is a standing instruction. Every session inherits it, whether you remember to mention it or not. Rules are how a project's conventions stop being a Slack thread and start being something the assistant just follows. Cursor's [rules documentation](https://cursor.com/docs/rules) walks through the four flavors — always-applied, file-scoped, agent-selected, and manual — if you want to know exactly which kind of rule fires when.",
              },
              {
                kind: "checklist",
                items: [
                  {
                    positive: true,
                    title: "Pin to your design system",
                    text: "\"Use Spectrum S2 components for all interactive UI. Don't introduce raw HTML buttons or inputs.\"",
                  },
                  {
                    positive: true,
                    title: "Lock the voice",
                    text: "\"Sentence case for all UI copy. No exclamation points. No emoji.\"",
                  },
                  {
                    positive: true,
                    title: "Set the auth contract",
                    text: "\"All Adobe API calls use the IMS token from the useIMS hook. Never hardcode keys.\"",
                  },
                  {
                    positive: true,
                    title: "Name the verification you expect",
                    text: "\"After substantive edits, run the linter and the build. Fix anything that breaks before reporting done.\"",
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "Cue to write one",
                text: "You've corrected the same drift in three sessions in a row — a hex value where a token should be, a div styled as a button, an exclamation point in copy, a custom card when Spectrum already has one. The right move isn't a sharper prompt or a longer review. It's a rule that says it once, in the place every session reads.",
              },
              {
                kind: "wink",
                text: "Preferences don't belong in rules. If only one person wants it that way, it's a preference. Put it in a skill or in a session prompt.",
              },
            ],
          },
          {
            heading: "CLAUDE.md, AGENTS.md, and the 150-line budget",
            blocks: [
              {
                kind: "paragraph",
                text: "CLAUDE.md and AGENTS.md are the always-on brief at the root of your repo. Every session reads them first. That makes them powerful — and expensive. Every line is paid for on every turn, and a bloated file hurts more than it helps. Anthropic's [Claude Code best practices](https://docs.anthropic.com/en/docs/claude-code/best-practices) is the clearest primer on how teams structure these files in real repos.",
              },
              {
                kind: "paragraph",
                text: "A practical budget is around 150 lines for the things that must always be true. Spend it carefully. Move everything else into skills (for procedures) or context that gets pasted in only when relevant (for one-off work).",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "target",
                title: "What earns a line in the budget",
                text: "Audience and voice. Design system pointers. Names of installed MCPs. The four or five rules the team has actually agreed to. Anything that should fail loudly if violated. Everything else can wait for a session that needs it.",
              },
              {
                kind: "pullquote",
                text: "Every line is read on every turn. Spend the budget on what must always be true.",
              },
              {
                kind: "paragraph",
                text: "The case sharpens in production. With codebase constraints and feature patterns named in the rules file, AI-generated changes match the architecture by default and PRs arrive close to ready. Review is still necessary, but it's spent on judgment instead of the same drift conversation every time.",
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "compass",
                title: "Production mode: rules earn back the time",
                text: "In new ideas and build-in-context, sparse rules are fine — drift is cheap. In production, drift compounds. The 150-line budget is the cheapest insurance against it.",
                image: {
                  src: "/images/guidelines-md-example.png",
                  alt: "Excerpt from a CLAUDE.md file in the firefly-platform repo, showing branch creation commands, local dev setup, and the typical contribution workflow.",
                  caption:
                    "CLAUDE.md (firefly-platform) — real rules look mundane: branch, run, check.",
                },
              },
            ],
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
      "The day-to-day craft of vibe coding as a designer: how you prompt, how you plan and explore, and how design moves into and out of the build.",
    chapters: [
      {
        id: "prompting-best-practices",
        number: 7,
        title: "Prompting best practices",
        summary:
          "Specificity, pointers, constraints, showing the pattern. The per-message craft of getting useful output, with examples tuned to UI work rather than backend code.",
        readTime: "9 min",
        sections: [
          {
            heading: "The per-message craft",
            blocks: [
              {
                kind: "paragraph",
                text: "Most prompting advice was written for backend work. Build me a function. Write me a query. Add a field to this struct. UI prompts are different. The output is visual, the constraints live in design tokens and components, and the difference between useful and slop is mostly invisible until the page renders. The rules below are tuned for that.",
              },
              {
                kind: "paragraph",
                text: "If you want the foundational version of this material, [Anthropic's Prompting 101 talk](https://www.youtube.com/watch?v=ysPbXH0LpIE) is a forty-minute primer on the anatomy of a strong prompt, and [OpenAI's prompting guidance](https://developers.openai.com/api/docs/guides/prompt-guidance) covers the same ground in writing. The chapter below is what's left when you've read those and sat down to make a card component.",
              },
              {
                kind: "flow",
                label: "How a useful UI prompt is built",
                steps: [
                  { title: "Specify", meta: "What and why" },
                  { title: "Point", meta: "References" },
                  { title: "Constrain", meta: "Rails" },
                  { title: "Show", meta: "The pattern" },
                  { title: "Iterate", meta: "Sharpen, don't patch" },
                ],
              },
              {
                kind: "pullquote",
                text: "A vague prompt asks for help. A good prompt sets the goal, the audience, the format, and the constraints.",
              },
            ],
          },
          {
            heading: "Be specific the way a brief is specific",
            blocks: [
              {
                kind: "paragraph",
                text: "The model is fast and literal. Treat it like a teammate who joined yesterday and reads only what you put in front of them. The same level of specificity you'd give a freelance designer for a Tuesday turnaround is the level the model can actually use.",
              },
              {
                kind: "compareFlow",
                before: {
                  label: "Vague",
                  steps: ["Make me a card component for products."],
                },
                after: {
                  label: "Specific",
                  steps: [
                    "Generate a Spectrum 2 product card. 16 px padding, 8 px corner radius, 4:3 image at the top, two-line title in spectrum-body-m, price in spectrum-detail-l, a primary Add to cart button at the bottom. Match the spacing rhythm of src/components/ProductCard.tsx and use design tokens, not hex values.",
                  ],
                },
              },
              {
                kind: "paragraph",
                text: "The first prompt gets you a generic Material card with off-brand spacing. The second gets you something close enough to ship after a small polish round. The difference is one minute of writing. Specificity is not the same as adjectives. \"A clean, modern, beautiful card\" doesn't narrow the search space at all — it just sounds like it does. The constraints that distinguish your card from the other ninety-nine valid ones are what move the work.",
              },
              {
                kind: "wink",
                text: "Test for whether you've been specific enough: imagine the model returns something that satisfies every word of your prompt and is still wrong. What was missing? That's what should have been on the page.",
              },
            ],
          },
          {
            heading: "Slice the work, don't dump it",
            blocks: [
              {
                kind: "paragraph",
                text: "Big asks produce big mistakes. \"Build me a settings page\" hands the model six decisions at once and rolls them into a single, hard-to-debug commit. The same work split into four prompts — the layout, then the form, then the validation, then the empty and error states — gives you four chances to course-correct and four small commits you can actually read. The model also gets sharper as the slice gets narrower: fewer things to balance, fewer ways to drift. Cursor's [agent best-practices guide](https://cursor.com/blog/agent-best-practices) makes the same case for engineering work, and most of it transfers cleanly to designers driving the build.",
              },
              {
                kind: "compareFlow",
                before: {
                  label: "One huge prompt",
                  steps: [
                    "Build the entire settings page",
                    "Receive 600 lines",
                    "Find three things wrong",
                    "Patch in place",
                    "Hope the patches don't conflict",
                  ],
                },
                after: {
                  label: "Sliced into four",
                  steps: [
                    "Lay out the page shell",
                    "Add the profile form",
                    "Wire the validation",
                    "Handle empty and error states",
                    "Review each slice before the next",
                  ],
                },
              },
              {
                kind: "wink",
                text: "If you can't describe the slice in one sentence, it's still too big.",
              },
            ],
          },
          {
            heading: "Point at things, don't describe them",
            blocks: [
              {
                kind: "paragraph",
                text: "Designers, more than most professionals, already know how to communicate by reference. You don't describe a typeface to another designer — you say Söhne, or Inter, or \"the one we used on the marketing page.\" Pointers are denser than descriptions, more accurate, and infinitely cheaper to write. Models respond to pointers the same way.",
              },
              {
                kind: "paragraph",
                text: "When you can, point. Pointers are higher bandwidth than adjectives, and they reduce the room for the model to invent. Most designers underuse them because pasting a link feels lazy. It's the opposite of lazy. It's the highest-leverage thing you can do in a prompt.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "figma",
                    eyebrow: "Visual",
                    title: "Figma frames and screenshots",
                    text: "A frame URL through the Figma MCP carries layers and tokens. A screenshot carries layout and feel. Both beat a paragraph of style language.",
                  },
                  {
                    icon: "code",
                    eyebrow: "Structural",
                    title: "File paths and component names",
                    text: "Quote the file you want the new code to look like. The model is excellent at matching what it can see and bad at inventing what it can't.",
                  },
                  {
                    icon: "target",
                    eyebrow: "Behavioral",
                    title: "Existing patterns in the product",
                    text: "Point at the form, the empty state, or the toast that already ships. New work should look like the product, not like the model's training set.",
                  },
                ],
              },
            ],
          },
          {
            heading: "Constraints, then examples, then ask",
            blocks: [
              {
                kind: "paragraph",
                text: "A reliable shape for UI prompts: state the constraints up front, show one or two examples of the pattern you want, then ask for the work. Models drift toward generic output when there are no rails. Constraints are how you give them rails without writing the answer for them.",
              },
              {
                kind: "roomDiagram",
                center: "Ask",
                chips: [
                  "Constraints",
                  "Pointers",
                  "Examples",
                  "Reference files",
                  "Voice",
                  "Audience",
                  "Anti-patterns",
                  "Tokens",
                  "Acceptance",
                ],
                caption:
                  "A strong prompt is a single ask surrounded by the things that narrow how it can be answered. The ask is the smallest part of the prompt.",
              },
              {
                kind: "anatomy",
                label: "Prompt template",
                lines: [
                  { text: "Constraints:", mark: 1 },
                  { text: "- Use Spectrum 2 components from @react-spectrum/s2." },
                  { text: "- Use design tokens for color, type, and spacing. No hex values." },
                  { text: "- Match the file structure of src/components/ProductCard.tsx." },
                  { text: "- Keyboard accessible: tab, shift-tab, enter, space all work." },
                  { text: "" },
                  { text: "Example to match:", mark: 2 },
                  { text: "@src/components/ProductCard.tsx" },
                  { text: "@src/components/CartItem.tsx" },
                  { text: "" },
                  { text: "Ask:", mark: 3 },
                  { text: "Create a SubscriptionCard component with a title, plan name," },
                  { text: "monthly price, three feature bullets, and a primary Subscribe button." },
                  { text: "Lay it out the way ProductCard does." },
                ],
                notes: [
                  {
                    mark: 1,
                    label: "Constraints",
                    text: "What's not allowed. The part that rules out the failure modes you've already seen.",
                  },
                  {
                    mark: 2,
                    label: "Pointers, not descriptions",
                    text: "Reference real files in your repo. Denser than any paragraph of style language and dramatically more accurate.",
                  },
                  {
                    mark: 3,
                    label: "The ask",
                    text: "The smallest part of the prompt. Phrased as a piece of work, not a request for help.",
                  },
                ],
                caption:
                  "A strong prompt is mostly the rails. The ask itself is short — it's just the thing the model wouldn't have figured out on its own.",
              },
              {
                kind: "wink",
                text: "If the model ignores a constraint, the constraint was buried. Move it up.",
              },
            ],
          },
          {
            heading: "Show the pattern you want",
            blocks: [
              {
                kind: "paragraph",
                text: "Most UI prompts are easier to answer with one example than with three paragraphs of description. If you want a card that matches the rest of the product, paste the existing card. If you want a form that follows the team's convention, point at the form down the hall. The model is excellent at matching a pattern it can see and bad at inventing one from a description.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "wand",
                title: "One example beats a paragraph",
                text: "Before you write a fourth sentence describing the look you want, stop and find one screen, one component, or one block of code that already has it. Paste that instead.",
              },
              {
                kind: "paragraph",
                text: "A small discipline that pays off later: when you find a prompt that works, save the example with the prompt. The example is half the prompt's value. A library of prompts without the examples that anchored them is a library of generic prompts.",
              },
            ],
          },
          {
            heading: "When the output is wrong",
            blocks: [
              {
                kind: "paragraph",
                text: "This is the part of prompting that gets the least attention and matters most. Most prompts don't work the first time. The discipline isn't writing the perfect prompt up front — it's what you do with the imperfect first output. Three responses, in order of how often you should reach for them.",
              },
              {
                kind: "steps",
                items: [
                  {
                    title: "Edit the prompt, not the conversation",
                    text: "When the first response misses, the temptation is to follow up with \"actually, make the button blue and move it right.\" That works in the short term and rots the conversation in the medium term — the model is now juggling your original prompt, the bad output, and your correction, and its sense of what you wanted gets fuzzier with each turn. When you can, start fresh with a sharper version of the prompt that absorbs what you learned from the first attempt.",
                  },
                  {
                    title: "Ask the model what it understood",
                    text: "When you can't tell why an output is wrong, \"summarize back what you think I asked for\" is a one-message diagnostic. The summary will reveal which part of your prompt was ambiguous, and you can fix that part specifically. More useful than guessing at which sentence misfired.",
                  },
                  {
                    title: "Push back when you disagree",
                    text: "Models can be wrong, and they will defer to you confidently when you push, even when their original answer was correct. The skill is telling \"this is wrong and I need to redirect\" from \"this is right and I'm uncomfortable with it for unrelated reasons.\" Mistaking the second for the first slowly trains the model to abandon correct answers, which is a slow-motion failure that's hard to spot.",
                  },
                ],
              },
              {
                kind: "balance",
                tilt: "even",
                left: {
                  label: "The model is wrong",
                  text: "Push back when you can name what was missing or off — the constraint it ignored, the file it invented, the pattern it skipped.",
                },
                right: {
                  label: "You are uncertain",
                  text: "Yield when your unease isn't backed by anything concrete. The discomfort might just be unfamiliarity with a correct answer.",
                },
                caption:
                  "Confusing the two slowly trains the model to abandon answers it had right. The hard part is knowing which pan should be heavier.",
              },
            ],
          },
          {
            heading: "A few prompts worth keeping around",
            blocks: [
              {
                kind: "paragraph",
                text: "Most prompts are disposable — the artifact of one task, useful for ten minutes, never needed again. A small fraction are reusable, and the skill is recognizing which is which while you're writing them. A prompt earns a place in the library when it encodes a pattern you'll hit again, when it carries judgment you don't want to re-derive, or when it's long enough that rewriting it from memory would lose something.",
              },
              {
                kind: "paragraph",
                text: "Three prompts that earn their keep across projects. Save them as snippets, slash commands, or skills. The point is not the exact wording. It's having the prompt ready when you need it instead of writing it from scratch every time.",
              },
              {
                kind: "bento",
                items: [
                  {
                    size: "hero",
                    accent: true,
                    icon: "spark",
                    eyebrow: "What earns a place",
                    title: "Patterns, not one-offs",
                    text: "A prompt belongs in your library when it encodes a pattern you'll hit again, carries judgment you don't want to re-derive, or is long enough that rewriting from memory would lose something.",
                  },
                  {
                    size: "small",
                    icon: "compass",
                    eyebrow: "Orient",
                    title: "Walk me through this file",
                    text: "Summary, exports, and the three places to touch to change behavior.",
                  },
                  {
                    size: "small",
                    icon: "ruler",
                    eyebrow: "Audit",
                    title: "Check this screen",
                    text: "Compare to Spectrum tokens. Flag every off-token color or non-system control.",
                  },
                  {
                    size: "wide",
                    icon: "check",
                    eyebrow: "Verify",
                    title: "What did you actually change?",
                    text: "List every file modified, the intent of each change, and the parts of the spec you skipped or interpreted.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "Don't let the impulse to organize everything turn your prompt library into a graveyard of one-off requests. The disposable ones don't belong there.",
              },
            ],
          },
          {
            heading: "Run agents in parallel",
            blocks: [
              {
                kind: "paragraph",
                text: "Once the slices are small enough that they don't depend on each other, you stop running them in sequence. Cursor and Claude Code both let you spin up more than one agent at a time — a subagent for a side question, a worktree for a parallel build, a cloud agent grinding on something autonomously while you keep working on the main thread. The per-message craft from earlier in this chapter still applies. What changes is that you're now briefing a session, not a turn. There's no follow-up message coming, so the brief has to stand on its own.",
              },
              {
                kind: "bento",
                items: [
                  {
                    size: "hero",
                    accent: true,
                    icon: "loop",
                    eyebrow: "Parallel builds",
                    title: "Three variations at the same time",
                    text: "Three worktrees, three branches, three takes on the same screen — running concurrently instead of in series. Merge the switcher in last. This is the infrastructure for the variation pattern in chapter 8: instead of building A, then B, then C in sequence, you brief three agents on the same problem and compare what comes back in the same hour.",
                  },
                  {
                    size: "small",
                    icon: "compass",
                    eyebrow: "Subagents",
                    title: "Delegate the side quest",
                    text: "Hand the \"audit which tokens this screen actually uses\" task to a fresh session. A clean summary comes back. Your main thread stays sharp.",
                  },
                  {
                    size: "small",
                    icon: "check",
                    eyebrow: "Reviewer agents",
                    title: "A second pass on the diff",
                    text: "Spawn an agent to read the change as a critic — token drift, voice slips, missed accessibility, Spectrum violations. It reads the diff, not the conversation.",
                  },
                  {
                    size: "wide",
                    icon: "spark",
                    eyebrow: "Background and cloud agents",
                    title: "Hand off, walk away",
                    text: "Long-running autonomous work. Convert every custom button to a Spectrum component. Review the last twenty PRs for copy issues. The unit of work shifts from a prompt to a brief that runs while you do something else.",
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "wand",
                title: "How this looks today",
                text: "In Cursor, parallel chats, background agents, and cloud agents in their own worktrees. In Claude Code, the Task tool spawns a subagent inline, and git worktrees give you parallel branches to run agents against. The product names will shift; the patterns won't. Anthropic's [multi-agent research post](https://www.anthropic.com/engineering/built-multi-agent-research-system) and Cursor's [background agents docs](https://cursor.com/docs/background-agent) are the clearest current references.",
              },
              {
                kind: "wink",
                text: "The hardest part isn't running three agents — it's writing a brief sharp enough that one of them doesn't need a second message. If you can't, the slice is still too big to parallelize.",
              },
            ],
          },
          {
            heading: "Two anti-patterns worth naming",
            blocks: [
              {
                kind: "checklist",
                items: [
                  {
                    positive: false,
                    title: "The kitchen-sink prompt",
                    text: "Five paragraphs of vibes, four constraints, no pointer to anything that exists. The model averages all of it into something nobody asked for.",
                  },
                  {
                    positive: false,
                    title: "The polite single sentence",
                    text: "\"Could you please make this nicer?\" The model has no rails and obliges by smoothing your work into something more generic.",
                  },
                  {
                    positive: true,
                    title: "The brief that points and constrains",
                    text: "One sentence of intent, one or two pointers, three constraints, then the ask. Repeat as needed.",
                  },
                ],
              },
            ],
          },
          {
            heading: "No magic words",
            blocks: [
              {
                kind: "paragraph",
                text: "There's no phrase you can append to a prompt that consistently makes the output better. \"Think step by step.\" \"You are an expert designer.\" \"Take a deep breath.\" These helped briefly with older models and have largely been trained out. The skill is in the substance of what you wrote, not in the incantation around it.",
              },
              {
                kind: "paragraph",
                text: "Prompting also isn't a static skill. Models change every few months, and the things that worked well last year sometimes work less well now, and vice versa. The principles in this chapter — evidence over commands, pointers over descriptions, constraints over instructions, examples over abstractions — have held across model generations. The specific phrasings haven't.",
              },
              {
                kind: "pullquote",
                text: "Hold the principles tightly and the techniques loosely.",
              },
            ],
          },
        ],
      },
      {
        id: "planning-and-exploring-options",
        number: 8,
        title: "Planning and exploring options",
        summary:
          "Touring unfamiliar codebases and design systems, sparring on decisions, reading product data, generating alternatives, and turning all of it into a plan you can execute. The work that determines whether the build succeeds.",
        readTime: "8 min",
        sections: [
          {
            heading: "The work that determines whether the build succeeds",
            blocks: [
              {
                kind: "paragraph",
                text: "By the time the assistant is writing files, most of the important decisions have already been made. What you're building, why, for whom, and against what constraints. The chapter below is the work that earns the build — framing the problem, reading the data, widening the option space with people and the model, preserving the alternatives in a switcher you can demo, and writing it all down as a plan you can hand to the model on turn one.",
              },
            ],
          },
          {
            heading: "Describe the problem, not the solution",
            blocks: [
              {
                kind: "paragraph",
                text: "The most expensive habit in vibe coding is describing the solution you already had in mind. \"Build a dropdown for filtering dates.\" The model builds the dropdown. The dropdown works. Three weeks later the team realizes a dropdown was the wrong primitive — most users wanted a quick toggle between last 7 and last 30 days. The dropdown was just the first solution that occurred to the designer.",
              },
              {
                kind: "compareFlow",
                before: {
                  label: "Solution-first",
                  steps: [
                    "Build a dropdown for date filtering",
                    "Receive a working dropdown",
                    "Ship it",
                    "Realize a dropdown was the wrong primitive",
                  ],
                },
                after: {
                  label: "Problem-first",
                  steps: [
                    "Users filter a table by date. Most want last 7 or 30 days; some need custom ranges.",
                    "Ask for three approaches with tradeoffs",
                    "Compare them, combine the strongest parts",
                    "Ask the model to argue against the result",
                  ],
                },
              },
              {
                kind: "wink",
                text: "If you can describe the solution before you've described the problem, the prompt is already too narrow.",
              },
            ],
          },
          {
            heading: "Analyst for product data and feedback",
            blocks: [
              {
                kind: "paragraph",
                text: "Before you can describe the problem well, you need to know what the product is actually doing. The model can read product data, user feedback, and qualitative notes faster than you can scroll through them. Treat the output as a hypothesis you can chase, not a finding you can quote.",
              },
              {
                kind: "checklist",
                items: [
                  {
                    positive: true,
                    title: "Research transcripts",
                    text: "Paste the raw transcript, ask for themes, then ask for the strongest counter-evidence inside the same transcript.",
                  },
                  {
                    positive: true,
                    title: "Live analytics dashboards",
                    text: "Point the model at the dashboard or query — Tableau, Amplitude, an internal funnel report — and ask which steps are leaking, which cohorts behave unlike the rest, and which numbers contradict the story you've been telling.",
                  },
                  {
                    positive: true,
                    title: "Backlogs and bug lists",
                    text: "Ask for the patterns underneath the tickets. Three bugs that share a root cause are more useful than thirty filed separately.",
                  },
                  {
                    positive: false,
                    title: "Anything you'd quote in a review",
                    text: "The model is plausible, not authoritative. If a number ends up on a slide, it should come from the source, not the summary.",
                  },
                ],
              },
              {
                kind: "figure",
                image: {
                  src: "/images/analytics-funnel-benchmark.png",
                  alt: "Funnel benchmark table comparing toolbar clickers, generate rate, response rate, and task success rate across tools like remove, upscale, expand, fill, annotate, precision flow, remove background, and instruct.",
                },
                eyebrow: "Funnel benchmark, all logged-in users",
                caption:
                  "Connect Claude to the Firefly analytics warehouse and it can pull a funnel like this on demand — toolbar clickers, generate rates, response rates, task success — and read it as a designer would. Where is intent breaking down? Which tools have a discovery problem versus a quality problem? Which surfaces are quietly carrying the product? The model turns the dashboard into a running conversation about which features deserve the next round of design work.",
              },
            ],
          },
          {
            heading: "Figma is still where exploration starts",
            blocks: [
              {
                kind: "paragraph",
                text: "Once you know the problem worth solving, the next move is widening the option space. Vibe coding compresses the gap between an idea and a working prototype, but it doesn't replace the moment when you and another designer are pushing frames around a Figma file at the speed of thought. Figma is still the fastest tool for that — the place where six layouts can sit on the same artboard in twenty minutes, where a design jam produces three credible directions in an hour, where the conversation that happens around the file is part of the work.",
              },
              {
                kind: "paragraph",
                text: "The model is great at generating alternatives. It is not great at the kind of generative conversation a design jam produces — half-finished pointing, on-the-fly recombination, the moment a peer says \"what if we just removed the second step entirely.\" Use Figma for that. Bring the model in after you've left the room with a smaller set of options worth testing in code.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "figma",
                    eyebrow: "Solo exploration",
                    title: "Sketch fast, sketch wide",
                    text: "Half-formed frames, deliberate variations on the same artboard, the moves you'd never write down in a doc. The point isn't polish — it's giving your own thinking enough surface area to react to.",
                    image: {
                      src: "/images/figma-sketch-wide-empty-state.png",
                      alt: "Figma artboard showing nine variations of an Edit image empty state laid out side by side for fast comparison.",
                    },
                  },
                  {
                    icon: "loop",
                    eyebrow: "Design jam",
                    title: "Pull other designers in",
                    text: "Forty-five minutes, two or three peers, the file projected. The conversation produces directions you wouldn't reach alone — and rules out directions that look promising to one and obvious to another.",
                    image: {
                      src: "/images/figma-design-jam-explorations.png",
                      alt: "FigJam-style board labeled Explorations with a grid of Edit image empty state variations surrounded by sticky notes, reactions, and comments from peers.",
                    },
                  },
                  {
                    icon: "arrow",
                    eyebrow: "Then bring the model",
                    title: "Hand it your shortlist",
                    text: "Walk into the vibe-coding session with two or three options you've already pressure-tested. The model accelerates the work after that point; before it, you're better off with people and a Figma file.",
                    image: {
                      src: "/images/vibe-coding-shortlist.gif",
                      alt: "Animated vibe-coding session cycling through a shortlist of three Edit image empty state options inside a browser-based prototype.",
                    },
                  },
                ],
              },
            ],
          },
          {
            heading: "Generator for alternatives",
            blocks: [
              {
                kind: "paragraph",
                text: "Vague briefs benefit from breadth. Ask the model for ten directions for an empty state, six ways a transition could feel, four visual languages a feature could borrow from. Most of what comes back is unusable, and that is fine — the value is in the one or two threads that nudge your thinking sideways.",
              },
              {
                kind: "video",
                src: "/images/variation-dropdown.mp4",
                alt: "Prototype with a dropdown at the top of the canvas that switches between three different empty state variations side by side.",
                eyebrow: "Tip — keep every option live",
                caption:
                  "Ask the model to wire a small dropdown at the top of the prototype that switches between every variation it generated. Nothing gets thrown away, the team can compare them side by side in the same session, and the next round of feedback is about which direction to push — not which screenshot to revisit.",
              },
            ],
          },
          {
            heading: "The variation pattern",
            blocks: [
              {
                kind: "paragraph",
                text: "The vibe-coding move most designers don't know about, and the one that changes the most about what's possible during the build itself. Instead of building one version, evaluating, and either keeping or rebuilding — which silently throws away every earlier attempt — you build the variations into the prototype itself. A small selector at the top toggles between every version you've explored. Nothing gets thrown away. Stakeholders see five options in one session instead of three options spread across three meetings.",
              },
              {
                kind: "bento",
                items: [
                  {
                    size: "hero",
                    accent: true,
                    icon: "loop",
                    eyebrow: "The pattern",
                    title: "One prototype, every version",
                    text: "Build the variations into the prototype itself. A small switcher at the top toggles between every direction you've tried, in the same running build. Stakeholders see five options in one session instead of three options spread across three meetings.",
                  },
                  {
                    size: "wide",
                    icon: "code",
                    eyebrow: "How to wire it",
                    title: "Dropdown, segmented, or query param",
                    text: "Ten lines of code. Read a `variant` value from a control or the URL, render the matching component. The model can scaffold the switcher in one turn.",
                  },
                  {
                    icon: "spark",
                    eyebrow: "What it costs",
                    title: "An hour, once",
                    text: "Pays for itself the first time someone asks \"can we see the other one again.\"",
                  },
                  {
                    icon: "check",
                    eyebrow: "What you save",
                    title: "The meetings",
                    text: "Side-by-side comparison in the same session beats three rounds of \"and here's the other version.\"",
                  },
                ],
              },
              {
                kind: "variantDemo",
                eyebrow: "Try it — same prototype, three directions",
                task: "Browse the team's recent work",
                caption:
                  "The switcher at the top swaps between every direction you tried. Stakeholders compare them in the same session, in the same prototype — instead of clicking through three Figma files or three meetings.",
                variants: [
                  {
                    key: "a",
                    label: "Variation A — Compact",
                    preview: "compact",
                    note: "Density-first. Shows the most rows on screen; trades discoverability for scan speed. Good when users come back daily and already know what they're looking for.",
                  },
                  {
                    key: "b",
                    label: "Variation B — Cards",
                    preview: "cards",
                    note: "Visual-first. Surfaces thumbnails and metadata up front; trades density for browseability. Good for first-time users and weekly check-ins.",
                  },
                  {
                    key: "c",
                    label: "Variation C — Dense table",
                    preview: "dense",
                    note: "Power-user-flavored. Adds sortable columns and inline metadata; trades whitespace for control. Reveals what the other two hide.",
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "Name the variations",
                text: "\"A, B, C\" is fine for early sketches. \"Compact, Spacious, Dense\" or \"Modal, Inline, Drawer\" is better for review. Names become the vocabulary the team uses to give feedback, and good names produce sharper feedback than anonymous ones.",
              },
              {
                kind: "wink",
                text: "When you pick a winner, don't delete the others. Move them to a /variations folder. Six months later they're some of the most valuable artifacts in the file.",
              },
            ],
          },
          {
            heading: "Plan first, build second",
            blocks: [
              {
                kind: "paragraph",
                text: "On any prototype bigger than a single screen, resist asking the model to start building on turn one. The flows that hold up almost always start with a written plan — the design intent, the surfaces involved, the variations you want to compare. Plan Mode in modern editors is built for exactly this: a read-only conversation that produces an agreed approach before anyone touches a frame.",
              },
              {
                kind: "compareFlow",
                before: {
                  label: "Build first",
                  steps: [
                    "Ask the model to build on turn one",
                    "Push back on what shows up",
                    "Push back on the pushback",
                    "Realize the flow was wrong",
                    "Start the prototype over",
                  ],
                },
                after: {
                  label: "Plan first",
                  steps: [
                    "Tour the surface in Plan Mode",
                    "Write the seven-section plan",
                    "Get one round of design feedback",
                    "Hand the plan to the model",
                    "Build the prototype once",
                  ],
                },
              },
              {
                kind: "paragraph",
                text: "Plan Mode pays off in three compounding ways, each of which alone would justify the habit.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "spark",
                    eyebrow: "Cheap to change",
                    title: "Decisions before pixels",
                    text: "Reading a thirty-line plan and editing two lines takes ninety seconds. Discovering those same two decisions were wrong after the model has built five screens takes an hour of cleanup.",
                  },
                  {
                    icon: "check",
                    eyebrow: "Caught early",
                    title: "PMs and engineers can react",
                    text: "A short plan is something a partner can read on Slack in two minutes and respond to. Half-built screens demand a meeting. Plan review surfaces missing edge cases, brand constraints, and feasibility concerns while the fix is still copy-and-paste.",
                  },
                  {
                    icon: "target",
                    eyebrow: "Less rework",
                    title: "Iteration stays in the cheap phase",
                    text: "Words are free to rewrite; built screens aren't. Planning first means the loops you spend rebuilding the same flow turn into loops sharpening the words that describe it.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "Don't plan everything. A copy tweak or a color swap doesn't need a plan. The threshold: if the model gets the approach wrong, will I lose more than fifteen minutes redoing it?",
              },
              {
                kind: "figureGrid",
                columns: 2,
                caption:
                  "A real plan from this site. Before any animation code was written, Plan Mode produced a menu of options grouped by surface (route, element, brand) with a one-line cost note next to each. Only after the team picked the three worth trying did the model expand the chosen options into the implementation on the right.",
                items: [
                  {
                    eyebrow: "Step 1 — Plan in plain text",
                    caption:
                      "Six animation directions across three surfaces, each tagged with cost and intent. Choosing happens here, in plain language, before any keyframe is written.",
                    image: {
                      src: "/images/plan-mode-animation-options.png",
                      alt: "Plan Mode document listing six animation options grouped under Route-level transitions, Element-level moments, and Brand or editorial moments, with cost annotations like low cost or medium cost beside each.",
                    },
                  },
                  {
                    eyebrow: "Step 2 — Build the chosen options",
                    caption:
                      "The same plan expanded into concrete files, edits, and CSS keyframes — but only for the directions that survived the conversation in step one.",
                    image: {
                      src: "/images/plan-mode-animation-implementation.png",
                      alt: "Implementation section of the same plan describing the View Transitions API crossfade, listing the files to edit and showing the new CSS with view-transition-old, view-transition-new, and keyframe definitions.",
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "documenting-design-and-handing-it-off",
        number: 9,
        title: "Documenting design and handing it off",
        summary:
          "Handoff isn't a single act anymore. It's a network of small handoffs — to the model, to content, to QE, to engineering, and to the next designer — each with its own audience and its own artifact.",
        readTime: "13 min",
        sections: [
          {
            heading: "Handoff isn't a single act anymore",
            blocks: [
              {
                kind: "paragraph",
                text: "Handoff used to be a specific event in the product cycle. The designer finished the Figma file, added redlines and specs, sent the file to engineering with a Slack message. Engineering built it. The designer reviewed the build. The handoff was complete.",
              },
              {
                kind: "paragraph",
                text: "That model assumed two things that are no longer true. It assumed engineering was the only downstream consumer of design work. And it assumed the designer's job ended where the code began.",
              },
              {
                kind: "paragraph",
                text: "Vibe coding breaks both assumptions. The designer is now writing some of the code. The downstream consumers now include the AI itself, the QE team running test plans against the build, the content team writing the copy that lives inside the components, the next designer who inherits the surface, and yes, still engineering — but engineering as a partner in production work, not as the recipient of a thrown-over-the-wall artifact.",
              },
              {
                kind: "paragraph",
                text: "Handoff isn't a single act anymore. It's a set of relationships, and each one needs its own artifact. This chapter walks through what each looks like.",
              },
              {
                kind: "flow",
                label: "The five handoffs in vibe coding",
                steps: [
                  { title: "To the AI", meta: "Going in" },
                  { title: "To content", meta: "During the build" },
                  { title: "To engineering", meta: "Coming out" },
                  { title: "To QE", meta: "Coming out" },
                  { title: "To the next designer", meta: "After" },
                ],
              },
            ],
          },
          {
            heading: "Process artifacts over end experiences",
            blocks: [
              {
                kind: "paragraph",
                text: "Look at where the hours actually go in a typical release cycle. The designer spends weeks translating intent into hundreds of Figma frames — flows, states, edge cases, redlines, specs, a prototype that simulates the experience without being one. Each frame is a translation step. Each step loses fidelity. By the time engineering interprets the file and the build comes back for review, the designer is comparing it against a document that already drifted from the design that already drifted from the original intent.",
              },
              {
                kind: "figure",
                image: {
                  src: "/images/figma-documentation-frames.png",
                  alt: "A zoomed-out view of a Figma file densely packed with grouped sections — 1A scope, 1A spec, Context, Generative upscale, Generative remove, Generative fill, Remove background, 3P Model modal, Auto AI picker, Generative Expand — each containing dozens of tiny frames laid out in rows.",
                },
                eyebrow: "One feature, hundreds of frames",
                caption:
                  "A typical Figma file documenting a single feature release. Every box is a frame. Every grouped section is a state, an edge case, a sub-flow, or a spec view of the same screen. None of it is the experience — all of it is a translation of an experience that doesn't exist yet.",
              },
              {
                kind: "paragraph",
                text: "We do this because the traditional design process taught us to. The artifacts were the only available stand-in for an experience that didn't exist yet — and for years, they earned their reputation. But the side effect, and it's a brutal one, is that we learned to value the artifacts above the experience they were trying to describe.",
              },
              {
                kind: "pullquote",
                text: "Process artifacts > end experiences. That's what the old playbook taught. What's actually good for users is the inverse.",
              },
              {
                kind: "ratio",
                caption:
                  "The flip is the whole game. The artifacts existed to bridge a gap that no longer exists — the team can hold the experience itself, day one. When the artifact outweighs the experience, the team gets fluent at producing documentation and forgets what the documentation was for.",
                rows: [
                  {
                    label: "What the old playbook taught",
                    tone: "muted",
                    left: {
                      title: "Process artifacts",
                      text: "Hundreds of frames, redlines, specs that drift from implementation, sequential handoffs.",
                    },
                    operator: ">",
                    right: {
                      title: "End experience",
                      text: "The thing the user actually touches — interaction, motion, copy in context.",
                    },
                  },
                  {
                    label: "What's actually good for users",
                    tone: "active",
                    left: {
                      title: "Process artifacts",
                      text: "Smaller, fewer, produced as a byproduct of the build itself rather than as a translation of it.",
                    },
                    operator: "<",
                    right: {
                      title: "End experience",
                      text: "The build is available from day one. Aligning around the experience replaces aligning around the spec.",
                    },
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "Vibe coding inverts the equation. The build is available from day one. There's no need to simulate the experience in a mock when you can hold the experience itself. The two-week spec collapses into a twenty-minute reference frame — not because the design got worse, but because the spec was always a stand-in for the experience, and the experience is now there to react to directly.",
              },
              {
                kind: "wink",
                text: "If you're spending more hours documenting than you spent designing, you're optimizing for the wrong thing. The artifacts exist to serve the experience. When they start to compete with it, the process is failing.",
              },
            ],
          },
          {
            heading: "What this chapter is actually about",
            blocks: [
              {
                kind: "paragraph",
                text: "Most documentation writing fails because it tries to be comprehensive. The author imagines every possible reader and tries to serve all of them with one document. The result is a document that serves none of them well, takes weeks to produce, and is out of date the day it's published.",
              },
              {
                kind: "pullquote",
                text: "Documentation is a series of small artifacts, each addressed to a specific reader, produced at the moment that reader needs it.",
              },
              {
                kind: "paragraph",
                text: "You don't write one master document. You write a screenshot for QE, a Figma frame for the next designer, a copy doc for the content team, and a plan for engineering — each one shaped by who's reading it and what they need to do with it.",
              },
              {
                kind: "paragraph",
                text: "This sounds like more work. In practice, it's less, because each artifact is small and most of them are produced as a byproduct of the work itself rather than as a separate documentation pass at the end.",
              },
            ],
          },
          {
            heading: "Going in: the handoff to the AI",
            blocks: [
              {
                kind: "paragraph",
                text: "The first handoff happens before any code gets written, and it's the easiest one to overlook — there's no person on the other end. Most of what matters was already covered earlier in the playbook: the rules and design-system context the editor reads on every prompt, the Figma frame you point at, the plan you wrote in plain text. The handoff to the AI is the moment all of that prep work pays off. If the build comes back close enough that you spend the first round refining instead of redirecting, the handoff was complete. If you spend the first round redirecting, something on the list above was missing.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "spark",
                title: "Two versions of the same frame",
                text: "One discipline worth naming specifically to this handoff: keep an intent frame — structurally correct, visually rough, the version you point the model at — and a target frame — fully polished, the version you compare the build against once it exists. Often they're the same file at different fidelities, or even the same frame on two different days; the point isn't two artifacts, it's keeping the two roles separate so the model isn't asked to match polish you're still figuring out.",
              },
            ],
          },
          {
            heading: "During the build: the handoff to content",
            blocks: [
              {
                kind: "paragraph",
                text: "Halfway through a build, you realize the placeholder content is doing more work than you expected. The empty state copy needs language that matches the product's voice. The button label has to fit a specific tone. The sample images in a creative tool are deciding what the feature looks like to every reviewer who opens the prototype. The lorem ipsum and the stock photo that worked in Figma are suddenly the things every stakeholder reacts to in review.",
              },
              {
                kind: "paragraph",
                text: "\"Content\" here is shorthand for two distinct disciplines that ship side by side. They share a goal — get real material into the build before the build hardens around the placeholder — but they're different partners, different conversations, and different timing. Collapsing them into one \"content review\" at the end is the mistake.",
              },
              {
                kind: "paragraph",
                text: "The instinct is to wait until the build is done and then send the screens over for a copy pass and an asset swap. The cost shows up at the end, when there's no time left to absorb it. Tooltip wording, secondary CTAs, the second sentence of an empty state, the alt text on the hero image, the placeholder asset that's still in the build because nobody got the swap done — these don't make the launch checklist, so they ship as-is. Each one becomes a small piece of design debt that lives in the product, hard to find, hard to track, and quietly contradicting the voice and the visual the team thought they shipped.",
              },
              {
                kind: "paragraph",
                text: "The better pattern is to bring both in during the build, when the structure is still soft — but as two separate conversations with the right material for each.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "chat",
                title: "Content strategy — bringing Marisa in early",
              text: "The signal to loop Marisa in isn't \"the build is done\" — it's the moment the Figma frame is ready for review, well before the build settles. She comments on the source-of-truth frame on her own time, leaving content recommendations. The build is still being shaped while those threads land, so the decisions get folded in as the prototype evolves rather than retrofitted at the end. None of it would have surfaced in a static copy doc weeks later.",
                image: {
                  src: "/images/marisa-content-comment.png",
                  alt: "Edit image empty state in Figma showing three sample image cards (Restyle an image, Precision flow beta, and a clothing render). A comment from Marisa Williams is open on the canvas suggesting five candidate microcopy options for the Precision flow card, ranging from \"Edit images using sliders for granular control\" to \"Edit your images with sliders.\"",
                  caption: "Marisa's comment thread on the source-of-truth Figma frame — five candidate microcopy options for the same card, side by side, so the conversation lands on the design reference rather than scattered across the prototype.",
                },
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "figma",
                title: "Content materials — looping the asset team in early",
                text: "Sample images and illustrations decide what the feature looks like to every reviewer who opens the prototype, so the asset team needs lead time. One thread, specific ask: the slot, the audience, the placeholders you used, three real options to swap in. Sent the week the build starts, not the week before launch.",
              },
              {
                kind: "paragraph",
                text: "The artifact, for both partners, is two things in the same message: the interactive build, where they can see how copy wraps and how an image sits in the slot, and the matching Figma frame, where they can comment directly on the surface. The build shows behavior; the frame holds the conversation. The constraints that apply to each — character limits and voice notes for strategy, image ratios and brand notes for materials — go in the message itself, not in a separate brief.",
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "loop",
                title: "Preserve the decision conversation",
                text: "Resolve the Figma comment thread with the decision in plain language — \"changed the CTA from Get started to Try a brush because Get started was already overloaded on the surface,\" \"swapped the photographic hero for an illustration to widen the audience read.\" The thread stays attached to the frame it's about, so the why lives on the surface itself. Future you, future Marisa, the asset team, and the next designer who picks this up all benefit from the reasoning, not just the final string.",
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "chat",
                title: "Content is a peer discipline, not a service function",
                text: "Both halves of content are peer disciplines. The handoff that works is the one that shows the work-in-progress and asks for collaboration, not the one that arrives with the copy already written or the imagery already chosen and asks for approval.",
              },
            ],
          },
          {
            heading: "Coming out: the handoff back to engineering",
            blocks: [
              {
                kind: "paragraph",
                text: "Engineering still owns the production implementation — reviewing the approach, hardening the edge cases, deciding what to keep, refactor, or rewrite. The handoff isn't shipping code; it's making that review fast and informed. Three things do most of the work.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "compass",
                    eyebrow: "Align on what's built",
                    title: "Walk through the running build",
                    text: "Click through the flow, name what's load-bearing and what's placeholder, and call out what you deliberately punted on. Engineering needs the same picture you have in your head before they review the code that produced it.",
                  },
                  {
                    icon: "code",
                    eyebrow: "The PR",
                    title: "A description that explains why",
                    text: "What the code does and why this approach over alternatives — not just here is some code I wrote. Link the branch, a recording, and the stack of related PRs split by concern. A good description cuts review time in half.",
                    image: {
                      src: "/images/pr-handoff-slack-message.png",
                      alt: "Slack message handing off a feature build to engineering. The message links the branch and a recording, then lists multiple PRs (Adding the empty state, Adding the cropping/aspect ratio, Color updates and dark mode fixes) and two PR mini items (Add plus icon to button, Fix cancel button color), each with review-status emoji.",
                      position: "left top",
                    },
                  },
                  {
                    icon: "spark",
                    eyebrow: "Design documentation",
                    title: "Capture what code can't show",
                    text: "A short screen recording — motion timing, hover states, the empty-to-loaded transition. Drop it in the PR, pin it on the frame. The recording is the spec for the things specs always miss.",
                    image: {
                      src: "/images/design-documentation-recording.png",
                      alt: "Poster frame from a 56-second screen recording of the running prototype, showing four image cards arranged in a row on a dark canvas with the surrounding browser chrome visible.",
                    },
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "loop",
                title: "The special case: an AI pod",
                text: "Inside a tight design-and-engineering pod — pairing on the build, reviewing each other's commits as they land — this handoff stops looking like one. The artifacts above still exist, but as a record of work the team already shares, not a transmission across a gap. Nothing should come as a surprise.",
              },
            ],
          },
          {
            heading: "Coming out: the handoff to QE",
            blocks: [
              {
                kind: "paragraph",
                text: "Once engineering has the implementation, QE picks up the test plan. This handoff has changed the most in vibe-coding contexts, because the build itself is a moving target — there's no fixed feature spec to write test cases against, because the feature was figured out during the build.",
              },
              {
                kind: "paragraph",
                text: "The artifact that works best here is a combination of two things: a flow video and an annotated screenshot set.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "loop",
                    eyebrow: "Motion",
                    title: "Flow video — two to five minutes",
                    text: "Walk through the feature, narrating what's happening. Hit every state, demonstrate every interaction, deliberately produce every error you can. As you record, narrate the intent alongside the action — \"I'm clicking submit with an empty form because we need to verify the validation appears, and focus should move to the first invalid field.\" That narration turns a demo into a test plan input.",
                    image: {
                      src: "/images/design-documentation-recording.png",
                      alt: "Poster frame from a 56-second screen recording of the running prototype, used as the QE flow video — four image cards arranged on a dark canvas inside the browser chrome, with playback controls visible in the corner.",
                    },
                  },
                  {
                    icon: "layers",
                    eyebrow: "Static",
                    title: "Annotated screenshots and the source-of-truth frames",
                    text: "Two layers, side by side. Screenshots of the build for every state — empty, loading, error, success, disabled, hover, focused — annotated step-by-step with what triggered each shot and what to verify in it. And a link to the source-of-truth Figma frames so that if a state changes after the screenshots are grabbed, QE has somewhere to check the current intent. The video shows the flow; the screenshots show the inventory; the frames stay current.",
                    image: {
                      src: "/images/qe-screenshot-inventory.png",
                      alt: "A Figma board organizing the QE handoff: rows labeled Empty state, Create new canvas, Use sample cards, Edit row, Mobile web, Original design frames, and Light and dark mode, each containing a sequence of annotated build screenshots. The Original design frames row carries comment markers from Marisa.",
                      position: "left",
                    },
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "target",
                title: "Design becomes the first line of defense",
                text: "When the designer ships a working build, QE isn't the first set of eyes that's seen the experience end-to-end — you are. Every empty state was triggered, every loading transition was watched, every error path was deliberately produced before the recording was cut. That changes the QE conversation from \"is this what was designed?\" to \"under what conditions does this break?\" QE moves earlier into the lifecycle and deeper into the edges, because the obvious checks are already covered. Treat the recording and the screenshot set as proof you've already passed the experience review, not as instructions for a fresh one.",
              },
            ],
          },
          {
            heading: "After: the handoff to the next designer",
            blocks: [
              {
                kind: "paragraph",
                text: "The most underweighted handoff in vibe coding, and the one that compounds the most over time, is the one to the designer who comes back to this work next. That designer might be you in three months, having forgotten everything. It might be a teammate who's never seen the surface before. It might be a new hire onboarding into the codebase.",
              },
              {
                kind: "paragraph",
                text: "The artifact that serves all three is the Figma file itself — kept current, organized into key frames the next person can scan. After the build ships, update the file to match what's actually in production: the colors that got tweaked, the spacing that got adjusted, the variants that got added during implementation.",
              },
              {
                kind: "figure",
                image: {
                  src: "/images/next-designer-keyframes.png",
                  alt: "Figma board for the next designer: two rows of key frames. The first row is labeled Original design frames — a Blank Canvas cover frame followed by Edit image empty state, Edit image empty state with the prompt focused, and a People with no access state. The second row is labeled Light/dark mode and shows the same surface in both treatments alongside a closer view of the prompt area.",
                },
                caption: "Kept in Figma so the parts stay reusable: the next designer can pull a component, lift a color token, or trace why a state was treated the way it was — without reverse-engineering anything from production code.",
              },
            ],
          },
          {
            heading: "What ties all of this together",
            blocks: [
              {
                kind: "paragraph",
                text: "Five handoffs, five artifacts. Not every project needs all five. A throwaway prototype might only need the first one. A small production fix might skip the QE flow video. A solo exploration might not have a content team to hand off to at all. The skill is matching the documentation to the audience that actually exists.",
              },
              {
                kind: "pullquote",
                text: "The build is not the deliverable. The build plus the artifacts that surround it is the deliverable.",
              },
              {
                kind: "paragraph",
                text: "A vibe-coded feature shipped without screenshots, without an updated Figma file, without a decision log, without a copy review — that feature is not actually finished. It's running. That's a different thing.",
              },
              {
                kind: "paragraph",
                text: "Most of these artifacts are produced as a byproduct of doing the work well, not as a separate documentation pass. The model can help with most of them — generating screenshots, drafting decision logs, organizing variations — but the judgment about which artifacts matter for this project is yours.",
              },
            ],
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
      "The design eye applied to what the model built. Once the build is running, this is the work that decides whether it's any good — visual fidelity, motion and content, accessibility, and the loop back to Figma.",
    chapters: [
      {
        id: "from-figma-to-working-ui",
        number: 11,
        title: "From Figma to working UI and back",
        summary:
          "The design-to-code loop has four moments — starting, mid-build, review, and after shipping — each with a different right answer. Underneath the workflow is the harder craft of reading what Figma and code each tell you about the design.",
        readTime: "10 min",
        sections: [
          {
            heading: "The wrong question",
            blocks: [
              {
                kind: "paragraph",
                text: "Every vibe-coded project starts with a question, and it's the wrong one. *Should I design this in Figma first, or just go straight to code?* It assumes the choice is binary and one-time. In practice the choice is plural and continuous — you'll move between Figma and code many times in any non-trivial project, and each round-trip serves a different purpose.",
              },
              {
                kind: "pullquote",
                text: "Figma and code aren't substitutes. They're different views of the same design — each better at exposing different parts of it.",
              },
              {
                kind: "paragraph",
                text: "This chapter is about the loop. Four moments, four reasons to make the trip. And underneath the workflow, the craft question that runs through all of them: what is each surface telling you about the design that the other one can't?",
              },
            ],
          },
          {
            heading: "Two surfaces, two kinds of feedback",
            blocks: [
              {
                kind: "paragraph",
                text: "The two tools don't just *do* different things. They *reveal* different things. Figma surfaces composition problems — when type sizes don't have a clear hierarchy, when spacing rhythm is off, when visual weight is unbalanced. Code surfaces behavioral problems — when an interaction feels cheap, when a layout doesn't accommodate the real range of content, when a transition is a fraction of a second too slow to feel responsive.",
              },
              {
                kind: "lensCompare",
                center: "The design",
                left: {
                  label: "Figma",
                  subtitle: "Static surface",
                  reveals: [
                    "Hierarchy",
                    "Spacing rhythm",
                    "Alignment",
                    "Color relationships",
                    "Parallel options",
                  ],
                },
                right: {
                  label: "Code",
                  subtitle: "Live surface",
                  reveals: [
                    "Interaction quality",
                    "Real-data layout",
                    "Motion timing",
                    "State transitions",
                    "Flow at speed",
                  ],
                },
                caption:
                  "A design only ever evaluated in one surface has only been half-evaluated. Almost every real project has both kinds of problems in it.",
              },
              {
                kind: "wink",
                text: "The question isn't *which tool*. It's *which tool, for which part, when — and what is each one teaching me that the other can't?*",
              },
            ],
          },
          {
            heading: "Four moments in the loop",
            blocks: [
              {
                kind: "loopOrbit",
                center: "The design",
                caption:
                  "The four moments tend to happen in order, but not strictly — late-stage projects loop back to early-stage moves, and that's fine. Each moment has a different right answer, and a craft question attached.",
                stations: [
                  {
                    number: "01",
                    label: "Starting",
                    meta: "Where to think",
                  },
                  {
                    number: "02",
                    label: "Mid-build",
                    meta: "When the design evolves",
                  },
                  {
                    number: "03",
                    label: "Review",
                    meta: "Which artifact to share",
                  },
                  {
                    number: "04",
                    label: "After shipping",
                    meta: "Reconciling the file",
                  },
                ],
              },
            ],
          },
          {
            heading: "Moment one — should you start in Figma at all?",
            blocks: [
              {
                kind: "paragraph",
                text: "The default for most designers is to start in Figma. It's the tool you know, the tool where exploration is cheapest. For most projects that default is correct. But the craft question underneath is sharper than the workflow one: *what kind of design problem am I solving — a composition problem, or a behavior problem?*",
              },
              {
                kind: "pullquote",
                text: "Composition problems live in Figma. Behavior problems live in code.",
              },
              {
                kind: "checklist",
                items: [
                  {
                    positive: true,
                    title: "Start in Figma when you don't yet know what you're making",
                    text: "Shape exploration belongs in Figma — code adds friction at the exact moment exploration needs to be frictionless.",
                    image: {
                      src: "/images/figma-firefly-edit-exploration.png",
                      alt: "Figma frame of an early Firefly Edit exploration — a dark canvas with a generated landscape and a floating *Describe the specific change needed here* popup, surrounded by alternate placements of the prompt input and tool stack.",
                    },
                  },
                  {
                    positive: false,
                    title: "Skip Figma when the design only makes sense in motion",
                    text: "Scroll-driven animation, gesture interactions, state machines with conditional transitions — these don't compress to static frames.",
                    video: {
                      src: "/images/motion-only-makes-sense-in-motion.mp4",
                      alt: "Screen recording of Dakota's board view — a dark gallery grid of AI-generated images and short looping videos sitting side by side, with the user scrolling as videos play in place.",
                    },
                  },
                  {
                    positive: false,
                    title: "Skip Figma when the design is a function of real data",
                    text: "A list whose density depends on what comes back. A dashboard shaped by the actual numbers. Placeholder data hides the design problem.",
                  },
                  {
                    positive: false,
                    title: "Skip Figma when you're extending an existing surface",
                    text: "A new state on a shipping component, a tweak to a flow in production. The cheapest place to design is inside the running product.",
                  },
                  {
                    positive: true,
                    title: "Start in Figma when sign-off is required before any of it is built",
                    text: "Code is harder to review at that fidelity, harder to revise from feedback, and signals a commitment that's expensive to back out of.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "The mistake isn't starting in Figma when you should. It's *staying* in Figma after Figma has stopped being useful — which is what the next moment is about.",
              },
            ],
          },
          {
            heading: "Moment two — when to go back to Figma during the build",
            blocks: [
              {
                kind: "paragraph",
                text: "The build is partway done. You're looking at it, and you can see what's wrong — the hierarchy isn't quite right, the layout doesn't accommodate long content, a state surfaces you didn't think of when you started. The question is whether to fix it in code, or go back to Figma, redesign, and update the code.",
              },
              {
                kind: "pullquote",
                text: "Is the build telling me something Figma couldn't?",
              },
              {
                kind: "paragraph",
                text: "The most underweighted moment in vibe coding is the moment you look at the build and feel that something is off. The reflex is to treat it as an implementation problem and push the build closer to the file. Sometimes that's right. But sometimes the build is right and the file was wrong — and the discomfort is the build telling you that the design as drawn doesn't survive contact with reality.",
              },
              {
                kind: "signGrid",
                items: [
                  {
                    diagram: "collapse",
                    eyebrow: "Real content",
                    title: "The layout collapses at the extremes",
                    text: "The Figma version had ideal-length copy. The build has the actual range — and the rhythm breaks at one end of it.",
                  },
                  {
                    diagram: "lag",
                    eyebrow: "In motion",
                    title: "What felt fine in your head feels slow",
                    text: "The Figma file couldn't have shown this. The build can. Trust the feeling — it's design feedback, not implementation friction.",
                  },
                  {
                    diagram: "break",
                    eyebrow: "In sequence",
                    title: "States break the flow",
                    text: "Each state looks reasonable in isolation. Click through three in a row and one of them is wrong.",
                  },
                  {
                    diagram: "dwarf",
                    eyebrow: "Real data",
                    title: "Hierarchy the placeholder hid",
                    text: "Headings that read as primary in Figma are dwarfed by the actual content beside them once it's there.",
                  },
                ],
              },
              {
                kind: "compareFlow",
                before: {
                  label: "Fix it in code",
                  steps: [
                    "Local visual tweaks — spacing, color, type",
                    "Behavioral changes — states, transitions, interactions",
                    "Anything cheaper to see than to draw",
                  ],
                },
                after: {
                  label: "Go back to Figma",
                  steps: [
                    "Structural changes that ripple through components",
                    "Information architecture, page-level reorganization",
                    "When you've lost track of what the design is supposed to be",
                  ],
                },
              },
            ],
          },
          {
            heading: "Moment three — which artifact for which question?",
            blocks: [
              {
                kind: "paragraph",
                text: "Most reviews go badly because the artifact and the question don't match. A polished build invites detail feedback when you wanted direction feedback. A Figma file invites direction feedback when you wanted experience feedback. The craft is matching the artifact to the question — and being explicit about both when you walk into the room.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "bolt",
                    eyebrow: "Experience",
                    title: "Show the build",
                    text: "When you want feedback at the level of *I clicked submit and it took too long.* Working prototypes produce grounded, specific feedback that frames can't.",
                  },
                  {
                    icon: "compass",
                    eyebrow: "Direction",
                    title: "Show Figma",
                    text: "When the experience doesn't exist yet and you want feedback on shape, approach, vibe. A working prototype shown too early invites detail feedback for a stage that hasn't earned it.",
                  },
                  {
                    icon: "loop",
                    eyebrow: "Decision",
                    title: "Show both",
                    text: "Frames anchor the intent; the prototype shows where the build is now. The gap between them is where the conversation lives — the highest-quality review available.",
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "chat",
                title: "Frame the artifact when you share it",
                text: "*\"This is a build for review, not a build that's near shipping — we expect to throw most of this away based on what you tell us.\"* Saying this out loud calibrates the room. The build is more impressive than the file, and stakeholders will treat a working prototype as more committed-to than it is unless you tell them otherwise.",
              },
              {
                kind: "wink",
                text: "Some questions don't need an artifact at all. The vibe-coded reflex is to build something to ask a question. Sometimes the right move is to ask the question first.",
              },
            ],
          },
          {
            heading: "Moment four — reconciling Figma after the build ships",
            blocks: [
              {
                kind: "paragraph",
                text: "The feature shipped. Spacing adjusted. Variants got added. The Figma file no longer matches what users see. The craft question for each change is the same: *did the build improve the design, or dilute it?*",
              },
              {
                kind: "driftMeter",
                caption:
                  "Most drift is the build teaching you something — read it that way before you reconcile.",
                zones: [
                  {
                    weight: 65,
                    tone: "positive",
                    hint: "Most",
                    eyebrow: "Most drift",
                    title: "Improvement",
                    text: "The build taught you something the file couldn't. Update Figma — the new version is canonical.",
                  },
                  {
                    weight: 25,
                    tone: "warn",
                    hint: "Some",
                    eyebrow: "Some drift",
                    title: "Dilution",
                    text: "Constraints hit, time ran short. Capture what shipped *and* what you'd come back to with more time.",
                  },
                  {
                    weight: 10,
                    tone: "signal",
                    hint: "Rare",
                    eyebrow: "Rare drift",
                    title: "A wrong original",
                    text: "The build improved on intentions the file expressed badly. Update the underlying pattern, not just the screen.",
                  },
                ],
              },
              {
                kind: "pathway",
                items: [
                  {
                    number: "01",
                    title: "Screenshot what shipped",
                    description:
                      "Capture every state before opening Figma. These reference shots ship to QE and the next designer too.",
                  },
                  {
                    number: "02",
                    title: "Update components, not screens",
                    description:
                      "Change the button once and let it propagate. Updating screens directly breeds inconsistency between instances.",
                  },
                  {
                    number: "03",
                    title: "Add the variants the build revealed",
                    description:
                      "Empty states, errors, the edge cases you didn't know you needed. The file deserves to know about them now.",
                  },
                  {
                    number: "04",
                    title: "Note what changed and why",
                    description:
                      "One short comment at the top — *empty state added, header tightened from real content* — tells the next person what they're looking at.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "Don't keep Figma synced *during* the build. You'll redo the same update two hours later. Reconcile at the end, when the answers have stabilized.",
              },
            ],
          },
          {
            heading: "Where the variations go",
            blocks: [
              {
                kind: "paragraph",
                text: "Most variations you produced during the build don't belong in the canonical Figma file. They were exploration, not the design. But they're worth keeping somewhere — they're some of the most valuable artifacts the project produced.",
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "layers",
                title: "An /explorations file for the rest",
                text: "Keep abandoned variations in a separate Figma file or page. Light annotation on each — *this version was rejected because the extra column made the table unreadable on smaller viewports* — turns each one from a dead end into institutional knowledge for the next designer who picks up the surface. Pairs with the variation pattern in Chapter 8 and the next-designer handoff in Chapter 9.",
              },
            ],
          },
          {
            heading: "What this chapter is really arguing",
            blocks: [
              {
                kind: "pullquote",
                text: "The trip between Figma and code is not workflow overhead. It's where the design gets better.",
              },
              {
                kind: "paragraph",
                text: "Figma reveals composition. Code reveals behavior. The four moments — starting, mid-build, review, shipping — each ask a different question of the loop, and each rewards different judgment. The instinct most designers need to fight isn't *use Figma less* or *use Figma more.* It's *stop treating the choice as one-time.* The next chapter, on visual fidelity, picks up where this one ends — once you have a build to evaluate, what specifically are you looking at, and how do you tell when the model has drifted from the design.",
              },
            ],
          },
        ],
      },
      {
        id: "visual-design-fidelity",
        number: 12,
        title: "Visual design fidelity",
        summary:
          "AI lands every build in the *almost right* zone by default. The gap shows up in five places — spacing, typography, color, hierarchy, and motion — and closing it means anchoring the model in a design system: Spectrum tokens, the alias tier, and one Provider that handles light and dark.",
        readTime: "18 min",
        sections: [
          {
            heading: "The hum of wrongness",
            blocks: [
              {
                kind: "paragraph",
                text: "There's a moment in every vibe-coded build where the model produces something that's almost right. Nothing is broken. A stakeholder would say it looked fine. But you can feel something off — a low hum of wrongness you can't immediately point to.",
              },
              {
                kind: "pullquote",
                text: "The gap between *almost right* and *right* is where most of design lives — and AI output lands in the *almost* zone by default.",
              },
              {
                kind: "paragraph",
                text: "This chapter is about that hum. Naming what's wrong, training your eye on the dimension, and pushing the build toward the standard.",
              },
            ],
          },
          {
            heading: "The five things you're actually looking at",
            blocks: [
              {
                kind: "paragraph",
                text: "When a build looks off but the designer can't say why, the wrongness is almost always in one of five places. Each fails differently. Each wants a different kind of attention. Train your eye to check them in sequence and the diagnosis gets dramatically faster.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "ruler",
                    eyebrow: "Dimension 01",
                    title: "Spacing",
                    text: "What holds a layout together. AI distributes air uniformly — every element gets the same polite breathing room, and nothing claims the space it actually needs.",
                    image: {
                      src: "/images/visual-fidelity-spacing-bars.png",
                      alt: "Vertical chromatic bars of varying widths set against a dark background, separated by deliberate gaps — light columns of blue, magenta, and silver tracing the rhythm of a layout grid.",
                      position: "center",
                    },
                  },
                  {
                    icon: "layers",
                    eyebrow: "Dimension 02",
                    title: "Typography",
                    text: "What tells the user what to read first. AI compresses the ramp — heading 18, body 16, caption 14 — so the hierarchy reads as 'present' rather than 'pointing.'",
                    image: {
                      src: "/images/visual-fidelity-typography-glitch.png",
                      alt: "The word TYPOGRAPHY rendered in tall vertical letters with a fractured chromatic-aberration glitch effect — blue, magenta, and silver bands cutting through each character.",
                      position: "center",
                    },
                  },
                  {
                    icon: "spark",
                    eyebrow: "Dimension 03",
                    title: "Color",
                    text: "What carries brand and signals state. AI defaults to generic palettes and applies color aesthetically rather than meaningfully. Nothing earns its hue.",
                    image: {
                      src: "/images/visual-fidelity-color-spectrum.png",
                      alt: "Vertical streaks of refracted light forming a full prismatic spectrum — blue, magenta, green, gold, and white — across a dark surface, a palette caught mid-shimmer.",
                      position: "center",
                    },
                  },
                  {
                    icon: "target",
                    eyebrow: "Dimension 04",
                    title: "Hierarchy",
                    text: "Spacing, type, and color combined. AI produces output where every level is technically present but compressed — primary and secondary read as siblings, not parent and child.",
                    image: {
                      src: "/images/visual-fidelity-hierarchy-orb.png",
                      alt: "A bright central orb of light flanked by softer chromatic columns of blue, magenta, and silver — one element claiming the eye, the rest receding to support it.",
                      position: "center",
                    },
                  },
                  {
                    icon: "wand",
                    eyebrow: "Dimension 05",
                    title: "Motion",
                    text: "What makes the design feel like the product. AI defaults to generic 300-millisecond fades. The right motion has a trigger, a property, a duration, an easing, and a feeling — and matches the product's voice.",
                    image: {
                      src: "/images/visual-fidelity-motion-blur.png",
                      alt: "Diagonal streaks of motion blur with chromatic light trails — blue, magenta, and white — across a dark surface, capturing the feel of designed motion.",
                      position: "center",
                    },
                  },
                ],
              },
              {
                kind: "wink",
                text: "Five failure modes, by design. Your job is to put the edges back.",
              },
            ],
          },
          {
            heading: "Spacing",
            blocks: [
              {
                kind: "paragraph",
                text: "AI tends toward uniform, polite, slightly-too-much-everywhere distribution. Cards in a grid get the same gap as section breaks. Everything sits on the same rhythm, and the layout flattens — because nothing is allowed to be *closer* than something else.",
              },
              {
                kind: "spacingRhythm",
                caption:
                  "Same elements, two compositions. The raw column sits on a single hard-coded value. The token column reaches for the everyday S2 sizes — `size-100`, `size-200`, `size-300`, `size-400`, `size-600` — and the rhythm appears for free.",
                layouts: [
                  {
                    label: "AI default",
                    note: "Every gap on the same rhythm, hard-coded.",
                    elements: [
                      { type: "heading", label: "Heading" },
                      { type: "body", label: "Body" },
                      { type: "card", label: "Card" },
                      { type: "card", label: "Card" },
                      { type: "button", label: "Action" },
                      { type: "section", label: "Next section" },
                    ],
                    gaps: [16, 16, 16, 16, 16],
                  },
                  {
                    label: "S2 tokens",
                    note: "Tight inside groups. Loose between them.",
                    elements: [
                      { type: "heading", label: "Heading" },
                      { type: "body", label: "Body" },
                      { type: "card", label: "Card" },
                      { type: "card", label: "Card" },
                      { type: "button", label: "Action" },
                      { type: "section", label: "Next section" },
                    ],
                    gaps: [8, 24, 16, 32, 48],
                    tokens: [
                      "size-100",
                      "size-300",
                      "size-200",
                      "size-400",
                      "size-600",
                    ],
                  },
                ],
              },
              {
                kind: "pullquote",
                text: "The fix isn't about absolute numbers. It's about *relationships between numbers* — which spacings should be tighter, which should be looser, and which middle-ground ones stay where they are.",
              },
              {
                kind: "paragraph",
                text: "The full ramp — every `size-*` token, the t-shirt-sized layout sizes that scale with density, and the rules for when to reach for which — lives in the [S2 spacing reference](https://s2.spectrum.corp.adobe.com/page/spacing/). Point the model at it the same way you point it at the colors page: a single canonical source for the names, so the assistant stops inventing pixel values and starts reaching for tokens that already exist.",
              },
            ],
          },
          {
            heading: "Typography",
            blocks: [
              {
                kind: "paragraph",
                text: "The most common typography failure: type sizes too close together. Heading 18, body 16, caption 14 — three sizes inside four pixels of each other. The hierarchy is technically present and visually invisible. The user's eye can't find the entry point because nothing is meaningfully larger than anything else.",
              },
              {
                kind: "typeStack",
                caption:
                  "Same body size; very different hierarchy. Compressed ramps read as *there is a hierarchy here.* Open ramps, anchored in S2 type tokens, read as *this is what matters.*",
                ramps: [
                  {
                    label: "Compressed",
                    note: "What AI tends to produce — three sizes inside a four-pixel range, no token references.",
                    range: "Range: 14 → 18px",
                    tiers: [
                      { tag: "Heading", size: 18, weight: 600, sample: "Quarterly review" },
                      { tag: "Body", size: 16, weight: 400, sample: "Quarterly review" },
                      { tag: "Caption", size: 14, weight: 400, sample: "Quarterly review" },
                    ],
                  },
                  {
                    label: "S2 ramp",
                    note: "What the design wants — sizes named, hierarchy obvious, the eye lands.",
                    range: "Range: 12 → 32px",
                    tiers: [
                      { tag: "Heading", size: 32, weight: 700, sample: "Quarterly review", token: "font-size-800" },
                      { tag: "Body", size: 16, weight: 400, sample: "Quarterly review", token: "font-size-200" },
                      { tag: "Caption", size: 12, weight: 500, sample: "Quarterly review", token: "font-size-75" },
                    ],
                  },
                ],
              },
            ],
          },
          {
            heading: "Color",
            blocks: [
              {
                kind: "paragraph",
                text: "Color fidelity has two layers. The brand layer — using the right colors — and the meaning layer — using each color for the right purpose. AI fails generically at the brand layer: the blues, grays, and accent reds it produces are statistically average, which means they don't look like anyone's brand in particular. The meaning layer fails more interestingly.",
              },
              {
                kind: "swatchSet",
                caption:
                  "AI applies color for visual interest. A UI applies color to communicate. The fix is the alias tier — every color reserved for a job, every job named.",
                groups: [
                  {
                    label: "Aesthetic",
                    note: "How AI tends to apply color — raw hex, same hue, different jobs.",
                    swatches: [
                      { hex: "#2563eb", role: "Primary buttons", usage: "Brand blue, applied because it looks right." },
                      { hex: "#2563eb", role: "Secondary actions", usage: "Same blue, slightly different opacity." },
                      { hex: "#2563eb", role: "Highlighted card", usage: "Same blue, used as accent decoration." },
                      { hex: "#2563eb", role: "Section header", usage: "Same blue, again, for visual interest." },
                    ],
                  },
                  {
                    label: "Semantic — S2 aliases",
                    note: "What the design wants — every color named, every name a job.",
                    swatches: [
                      { hex: "#3b63fb", role: "Primary action", usage: "Buttons, focused states, brand moments.", token: "accent-color-900" },
                      { hex: "#3b63fb", role: "Information", usage: "Neutral status, info banners, helpful hints.", token: "informative-color-900" },
                      { hex: "#d73220", role: "Destructive", usage: "Errors, deletion, irreversible actions.", token: "negative-color-900" },
                      { hex: "#c24e00", role: "Warning", usage: "Cautions and reversible problems.", token: "notice-color-900" },
                      { hex: "#05834e", role: "Success", usage: "Confirmation states and positive results.", token: "positive-color-900" },
                      { hex: "#292929", role: "Body text", usage: "Default foreground, paragraphs, labels.", token: "neutral-content-color-default" },
                    ],
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "S2 organizes color into six *roles*, each a small family of paired tokens. The strong tier (`-color-900`) is the saturated voice; the subtle background tier is the same role at low intensity. They're designed to be used together — strong text on subtle background — and both swap between schemes automatically.",
              },
              {
                kind: "colorRoles",
                caption:
                  "Six roles, two tiers each, light and dark values. Reach for the role token, not the underlying palette — `negative-color-900`, never `red-900`.",
                roles: [
                  {
                    name: "Accent",
                    purpose: "Brand · primary action",
                    strong: { token: "accent-color-900", light: "#3b63fb", dark: "#5681ff" },
                    subtle: { token: "accent-subtle-background-color-default", light: "#e5f0fe", dark: "#0c2175" },
                  },
                  {
                    name: "Informative",
                    purpose: "Information · neutral status",
                    strong: { token: "informative-color-900", light: "#3b63fb", dark: "#5681ff" },
                    subtle: { token: "informative-subtle-background-color-default", light: "#e5f0fe", dark: "#0c2175" },
                  },
                  {
                    name: "Negative",
                    purpose: "Errors · destructive action",
                    strong: { token: "negative-color-900", light: "#d73220", dark: "#fc432e" },
                    subtle: { token: "negative-subtle-background-color-default", light: "#ffebe8", dark: "#571107" },
                  },
                  {
                    name: "Notice",
                    purpose: "Warnings · reversible cautions",
                    strong: { token: "notice-color-900", light: "#c24e00", dark: "#e06400" },
                    subtle: { token: "notice-subtle-background-color-default", light: "#ffeccf", dark: "#501b00" },
                  },
                  {
                    name: "Positive",
                    purpose: "Success · confirmations",
                    strong: { token: "positive-color-900", light: "#05834e", dark: "#099d59" },
                    subtle: { token: "positive-subtle-background-color-default", light: "#d7f7e1", dark: "#003326" },
                  },
                  {
                    name: "Neutral",
                    purpose: "Default text · UI surfaces",
                    strong: { token: "neutral-content-color-default", light: "#292929", dark: "#dbdbdb" },
                    subtle: { token: "neutral-subtle-background-color-default", light: "#e9e9e9", dark: "#393939" },
                  },
                ],
              },
            ],
          },
          {
            heading: "Light, dark, and the layer system",
            blocks: [
              {
                kind: "paragraph",
                text: "Spectrum 2's color system doesn't think in pages. It thinks in *layers*. The pasteboard is the frame outside the document. The base is the page itself. `layer-1` is a section or a well sitting on the page. `layer-2` is a card cluster sitting on `layer-1`. The elevated layer is the modal floating over everything. Each layer has a token. Each token resolves to a different value depending on the theme.",
              },
              {
                kind: "pullquote",
                text: "The model doesn't need to know what each layer *is*. It needs to know which layer the thing it's drawing belongs to.",
              },
              {
                kind: "themeLayers",
                caption:
                  "Same composition, same five tokens, both schemes. As a surface rises in dark mode, it gets *lighter* — the inverse of light mode. The Provider does the swap.",
                layers: [
                  {
                    slot: "pasteboard",
                    name: "background-pasteboard-color",
                    role: "Outer frame",
                    light: "#e9e9e9",
                    dark: "#111111",
                    note: "The area outside the document. Gives the page a visible boundary in light mode; recedes into the deepest gray in dark.",
                  },
                  {
                    slot: "base",
                    name: "background-base-color",
                    role: "Page canvas",
                    light: "#ffffff",
                    dark: "#111111",
                    note: "The page itself. Anchors every other surface above it.",
                  },
                  {
                    slot: "layer-1",
                    name: "background-layer-1-color",
                    role: "Section · well",
                    light: "#f8f8f8",
                    dark: "#1b1b1b",
                    note: "Sidebars, wells, anything that wants to sit visibly above the base without claiming much elevation.",
                  },
                  {
                    slot: "layer-2",
                    name: "background-layer-2-color",
                    role: "Card · panel",
                    light: "#ffffff",
                    dark: "#222222",
                    note: "Card surfaces sitting on a section. Lifts in dark mode by going lighter — opposite of how light mode would do it.",
                  },
                  {
                    slot: "elevated",
                    name: "background-elevated-color",
                    role: "Modal · popover · dialog",
                    light: "#ffffff",
                    dark: "#222222",
                    note: "Anything that floats over the document with a shadow. Same value as layer-2 — shadow does the elevation work.",
                  },
                ],
              },
            ],
          },
          {
            heading: "Hierarchy",
            blocks: [
              {
                kind: "paragraph",
                text: "Hierarchy is the integration of spacing, typography, and color. It's also the dimension that goes wrong most often, because it's an emergent property of the others — you can fix all three individually and still have a hierarchy that doesn't read.",
              },
              {
                kind: "weightMap",
                caption:
                  "Same wireframe, different weight distribution. The competing-primaries page has every element shouting. The hierarchy page lets one element claim the eye, and the rest support it.",
                views: [
                  {
                    label: "Competing primaries",
                    note: "Every element claims the eye. Nothing wins.",
                    tiers: {
                      header: "primary",
                      hero: "primary",
                      card1: "primary",
                      card2: "primary",
                      card3: "primary",
                      cta: "primary",
                    },
                  },
                  {
                    label: "Clear hierarchy",
                    note: "One primary, ranked support. The eye lands.",
                    tiers: {
                      header: "ambient",
                      hero: "primary",
                      card1: "secondary",
                      card2: "secondary",
                      card3: "tertiary",
                      cta: "secondary",
                    },
                  },
                ],
              },
            ],
          },
          {
            heading: "Motion",
            blocks: [
              {
                kind: "paragraph",
                text: "Motion is the dimension static frames can't show — and the one where the gap between *almost right* and *right* is widest. A layout that looks fine on paper can feel cheap, slow, or twitchy in motion, and you only learn which when the build runs.",
              },
              {
                kind: "paragraph",
                text: "Models are bad at guessing motion intent and good at executing motion that's described well. Tell the assistant the trigger, the property, the duration, the easing, and the feeling. Skip any of those and you get the AI default: a 300-millisecond linear fade no real product would ship.",
              },
              {
                kind: "motionTrace",
                caption:
                  "Same start and end. Same total distance. The default cruises through; the crafted curve hits its mark, holds for a beat, and returns. The difference reads as *responsiveness* even though no one could explain why.",
                tracks: [
                  {
                    label: "AI default",
                    timing: "300ms · linear",
                    note: "Generic fade. No anticipation, no settle. Reads as flat.",
                    pattern: "linear",
                  },
                  {
                    label: "Designed",
                    timing: "260ms · spring",
                    note: "Anticipation, overshoot, brief dwell. Reads as tactile.",
                    pattern: "spring",
                  },
                ],
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "wand",
                title: "Describe motion the way a director would",
                text: "Trigger — what user action starts it. Property — what is animating, in concrete terms. Duration and easing — the timing and the curve. Feeling — snappy, calm, playful, mechanical. A prompt that names all four produces idiomatic motion. A prompt that names none gets the average.",
              },
              {
                kind: "paragraph",
                text: "The vocabulary that works is more specific than designers tend to use. *Add a smooth transition* is too vague. *Make it bounce* is too literal. The middle register — describing the *intent* of the motion — produces the best results. Four patterns that consistently land:",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "spark",
                    eyebrow: "01 · Curve",
                    title: "Feel-language tied to a reference",
                    text: "*An easing curve that feels confident — quick to start, smooth to settle. Similar to `ease-out-quart` in Framer Motion.* The reference anchors the model; the feel-language gives it the goal.",
                  },
                  {
                    icon: "ruler",
                    eyebrow: "02 · Duration",
                    title: "Specify timings explicitly",
                    text: "*100ms for hover, 200ms for state change, 350ms for view transitions.* Numbers are unambiguous. Don't leave them to the model to pick — it averages toward 300ms and stops thinking.",
                  },
                  {
                    icon: "compass",
                    eyebrow: "03 · Restraint",
                    title: "Name what's moving and what's not",
                    text: "*On hover, the background color changes but nothing translates or scales — the button stays in place.* Restraint specified positively is more reliable than restraint specified by exclusion.",
                  },
                  {
                    icon: "layers",
                    eyebrow: "04 · Reference",
                    title: "Point at an existing pattern",
                    text: "*Use the same transition style as the Card component in the codebase.* Most products don't have a formal motion system, but most have de facto patterns the model can pick up from existing components.",
                  },
                ],
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "compass",
                title: "Use the system's vocabulary when there is one",
                text: "If you're working in a system with its own motion vocabulary — Spectrum has motion tokens; your product may have its own — reach for those first. The principle is the same: reference an established vocabulary rather than describing motion from scratch. Framer Motion is the fallback, not the default.",
              },
              {
                kind: "wink",
                text: "Motion is craft language by default — the same words a designer would use out loud are the words the model needs to build it.",
              },
            ],
          },
          {
            heading: "The design system as the canonical reference",
            blocks: [
              {
                kind: "paragraph",
                text: "Eye-training is half the work. Pointing the model at the right reference is the other.",
              },
              {
                kind: "pullquote",
                text: "The design system is the canonical reference, not the model's training data.",
              },
              {
                kind: "paragraph",
                text: "`@react-spectrum/mcp` is the front door. Alongside it, `spectrum-design-data-mcp` exposes the token graph and `s2-docs-mcp` covers usage. Wire all three with the Figma MCP and the system becomes the path of least resistance.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "wand",
                    eyebrow: "01 · MCP server",
                    title: "Live answers, on demand",
                    text: "`@react-spectrum/mcp` answers component, prop, and accessibility queries in the working session.",
                  },
                  {
                    icon: "spark",
                    eyebrow: "02 · Agent Skill",
                    title: "Knowledge it can load",
                    text: "`npx skills add https://react-spectrum.adobe.com` installs Spectrum as a skill the model pulls in when relevant.",
                  },
                  {
                    icon: "compass",
                    eyebrow: "03 · Markdown + llms.txt",
                    title: "The docs as text",
                    text: "Every React Spectrum page exposes a `.md` URL, and `llms.txt` lists them all. Best for offline work or one-shot prompts.",
                  },
                ],
              },
              {
                kind: "pathway",
                items: [
                  {
                    number: "01",
                    title: "Reference components by name",
                    description:
                      "*Use the Button component, accent variant* resolves to a real import. *Add a brand-blue button* invites the model to invent.",
                  },
                  {
                    number: "02",
                    title: "Reference tokens, never hex",
                    description:
                      "*`size-200` between cards*, *`accent-color-900` for the primary action* are queries the data MCP can answer. *Some space*, *a dark gray* are guesses.",
                  },
                  {
                    number: "03",
                    title: "Show, don't just tell",
                    description:
                      "When a component is hard to describe, paste a screenshot or a Figma frame. The Figma MCP reads layers and variables directly.",
                  },
                ],
              },
            ],
          },
          {
            heading: "Reading the build for system drift",
            blocks: [
              {
                kind: "paragraph",
                text: "Four smoke tests, run on any AI-generated component, surface most fidelity issues in under a minute. Each one looks for a specific drift pattern in the code itself — what to search for, and what should be there instead.",
              },
              {
                kind: "driftAudit",
                caption:
                  "Drift on the left, fix on the right. The number of times each pattern appears is a rough proxy for how lost the model was on this component.",
                items: [
                  {
                    index: "01",
                    title: "UNSAFE_style overrides",
                    drift: '<View UNSAFE_style={{ padding: 8, marginTop: 12 }}>',
                    fix: '<View padding="size-100" marginTop="size-200">',
                    note: "Every inline override is a place the model didn't know the Spectrum way. The count scales with how lost it was.",
                  },
                  {
                    index: "02",
                    title: "Raw hex in component code",
                    drift: 'color: #1a1a1a;\nbackground: #e1e1e1;',
                    fix: 'color: var(--spectrum-neutral-content-color-default);\nbackground: var(--spectrum-background-layer-2-color);',
                    note: "A lone hex is the alias tier the model didn't reach for. Swapping to the alias fixes both light and dark in one move.",
                  },
                  {
                    index: "03",
                    title: "S1 import labelled as S2",
                    drift: 'import { Provider, defaultTheme } from "@adobe/react-spectrum";',
                    fix: 'import { Provider } from "@react-spectrum/s2";',
                    note: "A comment saying *Spectrum 2* sitting over an S1 import is the most common silent failure. The s2-docs-mcp exists to prevent this.",
                  },
                  {
                    index: "04",
                    title: "HTML where a Spectrum component exists",
                    drift: '<div className="btn btn-primary" onClick={save}>\n  Save\n</div>',
                    fix: '<Button variant="accent" onPress={save}>\n  Save\n</Button>',
                    note: "Output that looks correct in the preview can be rebuilt entirely in raw HTML underneath. The test fails the moment you open the file.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "If you're running these checks every time, the chapter has already done its job. The skill is in noticing the drift before it ships.",
              },
            ],
          },
          {
            heading: "How to give the model fidelity feedback",
            blocks: [
              {
                kind: "paragraph",
                text: "When the build comes back and the fidelity is off, the temptation is to fix it yourself. Open the file, adjust the values, re-run. This works for one-off fixes. It doesn't work as a practice — the model never learns what you wanted, and the next build has the same issues as the last one. The better pattern is to give the model fidelity feedback in language it can apply forward.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "compass",
                    eyebrow: "Habit 01",
                    title: "Name the dimension",
                    text: "Not *this looks off* but *the spacing rhythm is too uniform — tighter inside cards, looser between.* The dimension tells the model what to attend to.",
                  },
                  {
                    icon: "figma",
                    eyebrow: "Habit 02",
                    title: "Reference the standard",
                    text: "Not *make the heading bigger* but *use `heading-l`, not `heading-m`.* The reference points to a decision already made.",
                  },
                  {
                    icon: "wand",
                    eyebrow: "Habit 03",
                    title: "Explain the principle",
                    text: "Not *don't use red for primary* but *red is reserved for destructive; primary uses `accent-color-900`.* The principle generalizes; the correction doesn't.",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "accessibility-as-a-prompt-time-concern",
        number: 13,
        title: "Accessibility as a prompt-time concern",
        summary:
          "Accessibility is the deferral that costs the most. Pull it into the prompt, the rules, the Figma frame, and the partnership cadence — so the floor is higher before any human reviews the build.",
        readTime: "9 min",
        sections: [
          {
            heading: "The deferral that costs the most",
            blocks: [
              {
                kind: "paragraph",
                text: "Accessibility is the design dimension that costs the most when it gets pushed to the end. Spacing fixed late is awkward but fixable. Motion fixed late is fixed badly. Accessibility fixed late is, in many cases, *not actually fixed* — it's spot-fixed where automated scanners notice gaps, and left untouched everywhere else.",
              },
              {
                kind: "pullquote",
                text: "The result is a build that passes a check and fails a user.",
              },
              {
                kind: "paragraph",
                text: "This chapter is about pulling accessibility forward, so that the version the model produces is closer to right by default, and the manual work that remains is the work that was always going to require human judgment.",
              },
              {
                kind: "paragraph",
                text: "A current snapshot from the [DACE accessibility dashboard](https://dace-capstone-03dff.entapp.adproto.com/#), Adobe's central tracker for open accessibility issues:",
              },
              {
                kind: "stats",
                items: [
                  {
                    value: "16,485",
                    label: "Total issues tracked",
                    meta: "Across products, surfaces, and severities.",
                  },
                  {
                    value: "7,342",
                    label: "Still open",
                    meta: "Roughly 45% of everything ever logged.",
                  },
                  {
                    value: "35%",
                    label: "Fixed",
                    meta: "3,340 more were closed without a fix.",
                  },
                  {
                    value: "544 days",
                    label: "Average age of an open issue",
                    meta: "Time to fix, when fixed, averages 289 days.",
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "The shape of the backlog matters as much as the size. The top four categories — accessible names, keyboard and focus, color and contrast, semantics — account for the bulk of the open issues, and *every one of them is a category a model can be prompted to handle on the first pass*. The chart below shows where the work is.",
              },
              {
                kind: "table",
                columns: ["Category", "Issues", "Where it shows up"],
                rows: [
                  ["Accessible names & descriptions", "~5,500", "Missing or unhelpful labels on inputs, buttons, icons, and images."],
                  ["Keyboard & focus", "~3,000", "Elements unreachable by Tab, focus order that doesn't match visual order, missing focus rings."],
                  ["Color & contrast", "~2,200", "Text or interactive elements below the WCAG threshold against their background."],
                  ["Semantics", "~1,800", "Divs and spans where headings, lists, landmarks, or buttons belong."],
                  ["Navigation & structure", "~1,000", "Missing landmarks, broken heading hierarchy, no skip links."],
                  ["Reflow & zoom", "~900", "Layouts that break or hide content at 200% zoom or narrow viewports."],
                ],
              },
              {
                kind: "wink",
                text: "Most of the categories above are exactly what *prompt-time accessibility* prevents. The numbers are the chapter's argument in chart form: the deferral compounds, and the compounded debt is paid by users.",
              },
            ],
          },
          {
            heading: "Why accessibility breaks differently",
            blocks: [
              {
                kind: "paragraph",
                text: "Visual fidelity, when it goes wrong, looks wrong. The designer who looks at the build can usually see the failure, even if they can't always articulate it.",
              },
              {
                kind: "paragraph",
                text: "Accessibility, when it goes wrong, is mostly invisible to the person who built it. A focus state that doesn't render is missing for everyone except keyboard users. A heading hierarchy that's flat to screen readers reads correctly to sighted users. A contrast failure looks fine to someone whose vision is in the median.",
              },
              {
                kind: "blindSpot",
                visible: {
                  label: "Visible to you",
                  subtitle: "What the eye catches",
                  items: [
                    "Spacing that's off",
                    "Typography that's flat",
                    "Color that doesn't carry",
                    "Hierarchy that competes",
                  ],
                },
                invisible: {
                  label: "Invisible to you",
                  subtitle: "What your user can't reach",
                  items: [
                    { text: "Missing focus states", audience: "keyboard" },
                    { text: "Heading hierarchy flattened", audience: "screenReader" },
                    { text: "Contrast below threshold", audience: "lowVision" },
                    { text: "Inputs without labels", audience: "screenReader" },
                    { text: "Motion that triggers nausea", audience: "vestibular" },
                    { text: "State signalled by color alone", audience: "colorBlind" },
                  ],
                },
              },
              {
                kind: "wink",
                text: "Training your eye to see what your eye doesn't see by default is the harder craft. It's learnable through three things: knowing the criteria, building tools that check what you can't see, and partnering with people whose lived experience surfaces what you'd miss.",
              },
            ],
          },
          {
            heading: "The 70% gap",
            blocks: [
              {
                kind: "paragraph",
                text: "There's a useful framing from Matthew Stephens's work on accessibility skills, worth naming explicitly because it shapes how you should think about tooling. Automated scanners — [Lighthouse](https://developer.chrome.com/docs/lighthouse/accessibility/), [axe](https://www.deque.com/axe/), [WAVE](https://wave.webaim.org/) — can programmatically test about a third of [WCAG success criteria](https://www.w3.org/WAI/WCAG22/quickref/). They check the things with a clear yes/no answer. The rest depends on judgment.",
              },
              {
                kind: "stats",
                items: [
                  {
                    value: "30%",
                    label: "What scanners can verify",
                    meta: "Alt text present. Contrast above threshold. Heading structure technically valid.",
                  },
                  {
                    value: "70%",
                    label: "What requires judgment",
                    meta: "Is the alt text actually useful? Does the focus order make sense as a sequence? Does the error message help a user recover?",
                  },
                ],
              },
              {
                kind: "pullquote",
                text: "Treat accessibility as a scanner pass at the end, and you've covered the easy 30% and missed the hard 70%.",
              },
              {
                kind: "paragraph",
                text: "This is also why automated tooling alone won't close the gap, no matter how good it gets. The skills your team is building, and the skills referenced in Stephens's repository, work because they bring *judgment* into the loop — they're trained to ask the questions a scanner can't ask, and to surface the issues that require human review to actually fix.",
              },
            ],
          },
          {
            heading: "Accessibility at prompt time",
            blocks: [
              {
                kind: "paragraph",
                text: "The model knows how to write accessible code — focus management, ARIA, semantic HTML, contrast, all of it. It just won't reach for any of that unless you ask. Two moves fix that: write your floor into the rules file once, and name the accessibility you want in every prompt.",
              },
              {
                kind: "pullquote",
                text: "The model isn't being lazy. It's being literal. Tell it what you want, get what you asked for.",
              },
              {
                kind: "code",
                label: "CLAUDE.md — accessibility floor (drop-in)",
                language: "markdown",
                text: `## Accessibility floor (non-negotiable)

- All interactive elements need visible focus states
  (3:1 contrast min, 2px outline min).
- Reach for semantic HTML before ARIA: button, a, input, label,
  nav, main, header, footer, h1–h6.
- Never use <div onClick>. Never use placeholder as a label.
- Color is never the only signal for state — pair with icon or text.
- Modals trap focus, restore focus on close, dismiss with Escape.
- Forms have explicit labels; errors tied with aria-describedby.
- Touch targets at least 44×44 CSS pixels.
- Respect prefers-reduced-motion: skip non-essential animation.`,
              },
              {
                kind: "compareFlow",
                before: {
                  label: "Vague prompt → average output",
                  steps: [
                    "*Build a settings dialog with a save button*",
                    "Styled div, no focus trap",
                    "No Escape handler, no return focus on close",
                    "Save is a div with onClick",
                    "You catch it in review. Or worse, you don't.",
                  ],
                },
                after: {
                  label: "Specific prompt → tight output",
                  steps: [
                    "*…trap focus, dismiss with Escape, restore focus on close. Use semantic <dialog> and <button>.*",
                    "Real <dialog> element",
                    "Focus trap and Escape wired up",
                    "Save is a <button>, focus returns on close",
                    "Nothing to catch in review.",
                  ],
                },
              },
            ],
          },
          {
            heading: "Start in Stark, before you build anything",
            blocks: [
              {
                kind: "paragraph",
                text: "The cheapest accessibility move available to a vibe-coding designer happens before any code exists. Open the frame in Figma. Run [Stark](https://www.getstark.co/). Fix what it surfaces. Annotate what it asks you to annotate. Then — and only then — point the model at the frame.",
              },
              {
                kind: "pullquote",
                text: "Two minutes in Stark up front saves more than two minutes of fix work later. And the build is better.",
              },
              {
                kind: "paragraph",
                text: "Stark, rolled out across Adobe Design in late 2024 by the [Product Equity team](https://wiki.corp.adobe.com/pages/viewpage.action?spaceKey=AdobeDesign&title=Product+Equity+Team#9baffee3-9e0d-42eb-867a-0a75e660d677-2779257533), moves some of the 30% checkable layer into Figma — contrast, color blindness simulation, alt text, focus order, landmarks. The rollout matters because it makes accessibility a *design-phase* concern rather than an implementation cleanup. If you don't yet have access, [request a Stark seat through the intake form](https://forms.office.com/pages/responsepage.aspx?id=Wht7-jR7h0OUrtLBeN7O4dmDQYKiErBHjt6uDfzwzZpUNDg5NkhMTkMwWFlZQzQ0M0s5RTdRVU5STyQlQCN0PWcu&route=shorturl).",
              },
              {
                kind: "flow",
                label: "The Stark-first workflow",
                steps: [
                  {
                    title: "Frame the design",
                    meta: "Lay out the screen or component you're about to build. Real labels, real states, real ranges — not lorem.",
                  },
                  {
                    title: "Run Stark",
                    meta: "Contrast scan, color blindness simulation, alt text audit. Fix the failures in the file, not in the build.",
                  },
                  {
                    title: "Annotate semantic intent",
                    meta: "Number focus order, label landmarks (header, main, nav, footer), tag interactive elements, mark decorative imagery.",
                  },
                  {
                    title: "Point the model at the frame",
                    meta: "Through the Figma MCP. The annotations travel with the frame — the model reads them and honors them in the build.",
                  },
                ],
              },
              {
                kind: "figure",
                eyebrow: "Stark in a Firefly frame",
                image: {
                  src: "/images/stark-annotations-firefly.png",
                  alt: "A Firefly Generate screen in Figma with Stark annotations layered over it. The left panel lists landmarks — Header (FF Header), Section (FF Panel, aria-label Settings panel), Section (Container Bottom, aria-label Prompt tools), and Main (Content, aria-label Generation results) — alongside a general accessibility note: *Want all landmarks have an F6 key focus indicator*. Each landmark is numbered and outlined on the canvas.",
                },
                caption:
                  "What a Stark-annotated frame actually looks like. Numbered landmarks, named regions, ARIA labels, and a top-level accessibility note — all sitting in Figma, all readable by the model through the Figma MCP. Skip this and the model derives semantics from visual structure, which produces guesses that are close-but-wrong often enough to matter.",
              },
            ],
          },
          {
            heading: "The skills frontier",
            blocks: [
              {
                kind: "paragraph",
                text: "Every dimension of design has skills the model can be taught to handle. Visual fidelity has skills. Motion has skills. Content review has skills. Accessibility has skills, and the accessibility ones are some of the most useful being built right now — because the gap between *what an automated scanner catches* and *what an accessibility expert would catch* is exactly the gap that judgment-encoded skills are good at closing.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "loop",
                    eyebrow: "Inside Adobe",
                    title: "The active work",
                    text: "Your team and partners across corporate accessibility, legal, and product are actively building reusable Claude skills to review vibe-coded work — both the build itself and the Figma designs that fed into it. Legal contributes the regulatory framing, corporate accessibility contributes the WCAG and Adobe-specific standards, product contributes the workflow integration. Once mature, these become the canonical accessibility tooling for designer-led vibe coding at Adobe.",
                  },
                  {
                    icon: "layers",
                    eyebrow: "External reference",
                    title: "Matthew Stephens's 33 skills",
                    text: "A published suite covering accessibility audit, compliance, audience-specific lenses (older users, kids, DEI), ethics, test planning, screen reader scripting, and design-to-engineering handoff. Framed as a *small accessibility agency* — specialists, audience advocates, and an orchestrator that routes work across them. Worth reading even if you don't adopt the specific skills. Repo at [github.com/matthewlarn/claude-skills](https://github.com/matthewlarn/claude-skills).",
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "What does one of these skills actually look like? Two excerpts from Stephens's [audit suite](https://github.com/matthewlarn/claude-skills/tree/master/accessibility-skills-complete/audit) make the shape concrete. Each `.skill` file opens with a YAML descriptor — name, trigger language, related skills — and then a structured prompt that gives the model both expertise and a method to follow.",
              },
              {
                kind: "code",
                label: "full-accessibility-audit.skill — orchestrator",
                language: "yaml",
                text: `---
name: full-accessibility-audit
description: "Perform a complete, multi-dimensional accessibility audit
  by orchestrating all audit-category skills into a single unified report.
  Trigger on phrases like 'full accessibility audit', 'complete audit',
  'audit everything', 'comprehensive accessibility review'..."
category: audit
related-skills:
  - accessibility-audit       # design layer
  - accessibility-code        # code layer
  - contrast-checker
  - keyboard-focus-auditor
  - accessibility-copy
  - alt-text-generator
  - accessible-forms
  - accessible-tables
  - motion-auditor
  - cognitive-accessibility
  - mobile-touch-auditor
  - wcag-compliance-auditor
---

# Full Accessibility Audit

You are the audit director. Your job is to run a complete accessibility
assessment by systematically applying every relevant audit dimension to
the input provided, then synthesizing findings into a single prioritized
report with a clear path to remediation, grounded in business impact.

## Step 1: Triage the Input
- Design (Figma, mockup) → design-heavy audit
- Code (HTML, JSX, Vue) → code-heavy audit
- Live URL → comprehensive audit, all modules
- Copy / content only → content audit
- Description (text only) → limited scope, note gaps upfront`,
              },
              {
                kind: "paragraph",
                text: "The orchestrator routes work to a dozen specialists. Here's one of them — the copy auditor — opening with its frontmatter and the first principle it argues for.",
              },
              {
                kind: "code",
                label: "accessibility-copy.skill — specialist",
                language: "yaml",
                text: `---
name: accessibility-copy
description: Write or audit accessible content — alt text, ARIA labels,
  error messages, button labels, link text, form instructions, tooltips,
  notifications, empty states, and plain language copy. Trigger on
  phrases like "alt text", "accessible label", "screen reader",
  "plain language", "error message"...
category: audit
related-skills: cognitive-accessibility, alt-text-generator, accessible-forms
---

# Accessibility Copy Skill

You write and audit content that works for everyone — screen reader users,
people with cognitive disabilities, non-native speakers, users with
dyslexia, and anyone skimming under pressure.

## Core Philosophy
1. Meaning survives modality — content must work without color, without
   images, without audio, without fine motor precision.
2. Context is everything — the same image needs different alt text
   depending on its purpose and surrounding content.
3. Plain language is not dumbing down — it is respect for the reader's
   time and cognitive load.
4. Labels are user interfaces — every label, button, and error message
   is a UX decision.
5. Copy is inclusive by default — write for the widest possible audience
   from the first draft.

## Reading Level Audit
Plain language means Grade 8–9 reading level per WCAG AAA 3.1.5.
Measure with multiple formulas (Flesch-Kincaid, SMOG, Gunning Fog) —
if scores diverge, rewrite for consistency.

Example:
  Original: "Users are prohibited from utilizing non-conforming
            authentication mechanisms..."  (Grade 12+)
  Rewrite:  "Use the correct password. You won't be able to sign in
             if your password is wrong."  (Grade 5)`,
              },
              {
                kind: "pullquote",
                text: "Building good accessibility skills costs time. Shipping inaccessible products costs users.",
              },
              {
                kind: "paragraph",
                text: "Stephens is explicit about the limit: skills do not replace real assistive technology testing, do not replace research with disabled users, and do not replace the leadership decisions required to prioritize accessibility work. They lower the floor — they make the *baseline* of every prototype higher before it reaches a human reviewer. They don't raise the ceiling.",
              },
            ],
          },
          {
            heading: "What skills can do, and what they can't",
            blocks: [
              {
                kind: "paragraph",
                text: "Drawing the line is part of the chapter's argument. Skills are good at the work that compresses to rules, patterns, and structured judgments. They're not good at the work that requires being a person.",
              },
              {
                kind: "checklist",
                items: [
                  {
                    positive: true,
                    title: "Check against criteria that compress to rules",
                    text: "Contrast ratios, semantic HTML correctness, ARIA validity, touch target sizes, motion thresholds. The 30% — done thoroughly, every time.",
                  },
                  {
                    positive: true,
                    title: "Generate annotation content a designer would write by hand",
                    text: "Focus order, landmarks, alt text drafts, screen reader scripts. The work that's mechanical when you know the answer and slow when you don't.",
                  },
                  {
                    positive: true,
                    title: "Pattern-match against known failure modes",
                    text: "Color-as-only-signal, placeholder-as-label, click-handlers-on-non-interactive-elements. The mistakes that have a shape.",
                  },
                  {
                    positive: true,
                    title: "Produce structured remediation reports",
                    text: "Severity, WCAG references, effort estimates. The artifact that lets a team prioritize the work.",
                  },
                  {
                    positive: false,
                    title: "Decide whether the product is *accessible enough*",
                    text: "That's a judgment call that lives with the design lead, the accessibility partner, and (for products with regulatory exposure) legal.",
                  },
                  {
                    positive: false,
                    title: "Replace assistive technology testing with real users",
                    text: "A skill can write a screen reader test script. It cannot tell you what a blind user actually experiences when they use your product.",
                  },
                  {
                    positive: false,
                    title: "Substitute for the cross-functional cadence",
                    text: "Directional review, bluelines, experience audit. The partnership model is the practice. Skills support it; they don't replace it.",
                  },
                ],
              },
            ],
          },
          {
            heading: "A practical sequence",
            blocks: [
              {
                kind: "paragraph",
                text: "Pulling everything in this chapter together, here's the cadence that works in practice. Not every step every time — but most of these, most projects.",
              },
              {
                kind: "flow",
                label: "From rules to audit",
                steps: [
                  {
                    title: "Before the build",
                    meta: "Encode the accessibility floor in your rules and CLAUDE.md. Reference the bluelines toolkit. For new or complex surfaces, do the directional review with your accessibility partner first.",
                  },
                  {
                    title: "In Figma, before the model sees it",
                    meta: "Run Stark. Fix contrast, add focus order annotations, label landmarks. The model uses what's there.",
                  },
                  {
                    title: "During the build",
                    meta: "Prompt for accessibility explicitly — part of the original ask, not a follow-up pass. Use the skills your team is building, or the publicly available ones, to surface what the model wouldn't catch.",
                  },
                  {
                    title: "Mid-build",
                    meta: "When the structural shape is set, produce bluelines and review them with your accessibility partner before engineering handoff. Bluelines are the artifact that makes the partnership concrete.",
                  },
                  {
                    title: "After shipping",
                    meta: "Schedule an experience audit with your accessibility partner. The screenshots and flow videos from QE handoff (Chapter 9) are inputs. What the audit surfaces becomes the input to the next iteration.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "None of these steps is the whole answer. All of them, together, are how accessibility gets done well in vibe-coded work — respecting the 70% that automated tooling can't reach, and using the model's leverage on the 30% it can.",
              },
            ],
          },
          {
            heading: "The partners around production-grade work",
            blocks: [
              {
                kind: "paragraph",
                text: "A vibe-coded prototype is yours. A vibe-coded *product* belongs to the team. The moment your work is on a path to production — code real users will load, in a flow legal might review, against standards corp accessibility maintains — you stop being the only person responsible for whether the experience holds up. Production-grade vibe coding is a *cross-functional* practice, and accessibility is the dimension where that's most obvious.",
              },
              {
                kind: "pullquote",
                text: "The build is yours to make. The quality of what ships is the team's to keep.",
              },
              {
                kind: "paragraph",
                text: "Five other functions need to be in the loop, each with a different angle on experience, code, and build quality. None of them are sign-off gates. All of them are cheaper to involve early than late.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "compass",
                    eyebrow: "PM",
                    title: "Scope, sequencing, customer impact",
                    text: "Owns the customer problem and the prioritization call. Decides which accessibility issues block ship and which ride a fast-follow. Make sure they see the *cost-of-deferral* numbers, not just the work-to-fix numbers.",
                  },
                  {
                    icon: "code",
                    eyebrow: "Engineering",
                    title: "Architecture and merge readiness",
                    text: "Reviews the code you generated for architecture, dependency risk, and how it fits the wider system. Owns the semantic foundations — focus management, ARIA at the framework level — that no prompt can fully cover from the outside.",
                  },
                  {
                    icon: "check",
                    eyebrow: "QE",
                    title: "Build quality and assistive tech",
                    text: "Runs the keyboard-only path, the screen reader pass, the real-device coverage your laptop can't fake. Catches the issues that would otherwise show up in next quarter's DACE backlog.",
                  },
                  {
                    icon: "ruler",
                    eyebrow: "Legal",
                    title: "Regulatory exposure",
                    text: "ADA, the EU Accessibility Act, Section 508 — different products carry different exposure. Legal tells you which surfaces need formal sign-off and which standards apply, before you've shipped past the point where it's cheap to fix.",
                  },
                  {
                    icon: "spark",
                    eyebrow: "Product Equity team",
                    title: "Design-phase equity standards",
                    text: "The team behind the Stark rollout and the org-wide accessibility floor. They set the bar designers are expected to clear before code, and they own the tooling that makes the bar checkable in Figma.",
                  },
                  {
                    icon: "layers",
                    eyebrow: "Corporate Accessibility",
                    title: "Standards, audits, training",
                    text: "The people who keep WCAG current, run formal audits, validate with assistive tech, and train teams on what *good* looks like. The escalation path when the answer isn't in the dashboard or the wiki.",
                  },
                ],
              },
              {
                kind: "paragraph",
                text: "The cadence that holds across all six is the same — bring people in before the decisions are locked, not after — and it has three checkpoints.",
              },
              {
                kind: "pathway",
                items: [
                  {
                    number: "01",
                    title: "Directional review, early",
                    description:
                      "PM on scope and risk, accessibility partner on which directions are feasible to make accessible, legal on regulatory exposure if the surface is in scope. Fifteen minutes here keeps you from building something the team later has to walk back.",
                  },
                  {
                    number: "02",
                    title: "Bluelines, code review, test plan, mid-build",
                    description:
                      "Accessibility partner reviews bluelines (focus order, ARIA, landmarks, keyboard behavior). Engineering reviews architecture and code quality. QE drafts the test plan, including the assistive-tech path. The three reviews stack — none of them is the others' job.",
                  },
                  {
                    number: "03",
                    title: "Audit and bug bash, after shipping",
                    description:
                      "Accessibility audit from a partner. QE bug bash on real devices with real assistive tech. Legal sign-off if the surface needed it. The screenshots and flow videos from your QE handoff (Chapter 9) are inputs for all three.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "If you don't know who any of these people are for your product, that's the first task. *Find your partners before you need them* is the cheapest accessibility investment available.",
              },
            ],
          },
          {
            heading: "What this chapter has been arguing",
            blocks: [
              {
                kind: "pullquote",
                text: "Accessibility is the dimension of design that fails most invisibly to the person who built it.",
              },
              {
                kind: "paragraph",
                text: "Treating it as a cleanup pass — running a scanner at the end, fixing what shows up — covers about 30% of what matters and misses the rest. The work this chapter is arguing for is the work of pulling accessibility into the prompt, into the rules, into the Figma frame, and into the partnership cadence with the people whose job it is to make products accessible.",
              },
              {
                kind: "cards",
                columns: 2,
                items: [
                  {
                    icon: "ruler",
                    eyebrow: "The floor",
                    title: "What tooling raises",
                    text: "Rules in your CLAUDE.md. Stark annotations on the frame. Skills that encode judgment. Every prototype starts at a higher baseline than the previous era's designer-only review with a scanner at the end.",
                  },
                  {
                    icon: "spark",
                    eyebrow: "The ceiling",
                    title: "What partnership and lived experience raise",
                    text: "Accessibility partners who know your product. Disabled users whose feedback shapes what you build. The cadence — directional, bluelines, audit — that catches what tooling can't. No amount of automation replaces either.",
                  },
                ],
              },
              {
                kind: "wink",
                text: "Tooling raises the floor. Partnership and lived experience raise the ceiling. Both, together, are how accessibility gets done.",
              },
              {
                kind: "paragraph",
                text: "Part 5 picks up from here, with the shipping discipline that makes accessibility — and all the other craft work the previous chapters have argued for — actually land in production rather than getting lost in the gap between the build and the release.",
              },
            ],
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
        number: 14,
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
            body: "If your name is on the PR, the code is yours — even when the PR is going to engineering for review and merge. Read every change before you push it. Run it. Test the unhappy paths. Ask the assistant to explain anything you don't understand, then verify the explanation. The shortcut to AI-assisted work you can stand behind is refusing to send anything into review that you can't explain.",
          },
        ],
      },
      {
        id: "working-as-a-team",
        number: 15,
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
