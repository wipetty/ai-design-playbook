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
      items: {
        eyebrow?: string;
        caption: string;
        image: { src: string; alt: string };
      }[];
    }
  | {
      kind: "figure";
      image: { src: string; alt: string };
      eyebrow?: string;
      caption?: string;
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
                    eyebrow: "Spectrum / design-system MCP",
                    title: "Reach into the system",
                    text: "Look up tokens, components, and patterns by name. The assistant stops inventing close-but-wrong UI and starts using what's already approved.",
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
        readTime: "7 min",
        sections: [
          {
            heading: "The work that determines whether the build succeeds",
            blocks: [
              {
                kind: "paragraph",
                text: "By the time the assistant is writing files, most of the important decisions have already been made. What you're building, why, for whom, and against what constraints. The chapter below is the work that earns the build — touring the surface you'll change, sparring on what to change it to, reading the data and the alternatives, then writing it all down as a plan you can hand to the model on turn one.",
              },
              {
                kind: "flow",
                label: "How the time before the build actually breaks down",
                steps: [
                  { title: "Tour", meta: "Read the surface" },
                  { title: "Spar", meta: "Pressure-test the call" },
                  { title: "Read", meta: "Data and feedback" },
                  { title: "Generate", meta: "Alternatives" },
                  { title: "Plan", meta: "Write it down" },
                ],
              },
              {
                kind: "wink",
                text: "Skip these and the build is faster on day one and slower every day after.",
              },
            ],
          },
          {
            heading: "Tour guide for unfamiliar surfaces",
            blocks: [
              {
                kind: "paragraph",
                text: "Most design work starts on a surface you didn't build. An unfamiliar repo, a design system you've inherited, a feature owned by another team. The model is the fastest tour guide ever invented for this. Ask the same three questions in order and you have a working map in minutes instead of an afternoon.",
              },
              {
                kind: "steps",
                items: [
                  {
                    title: "What is this, in one paragraph?",
                    text: "Aimed at a teammate who has never seen the file or feature. Forces the model to compress, which surfaces what it actually understands and what it has been guessing.",
                  },
                  {
                    title: "How is it used elsewhere?",
                    text: "Concrete examples, with file paths. This is where invented-API answers fall apart — if the model can't point at a real call site, you've found the part of its summary you should not trust.",
                  },
                  {
                    title: "What would I change to add a variant or fix a bug?",
                    text: "Forces the tour to land on the place you actually need. The answer is the shortlist of files you'll spend the rest of the project in.",
                  },
                ],
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "compass",
                title: "Verify the parts that matter",
                text: "The tour is a starting map, not a finished one. Click through to the files the model references before you commit to its mental model. The wrong map costs more than no map.",
              },
            ],
          },
          {
            heading: "Sparring partner for decisions",
            blocks: [
              {
                kind: "paragraph",
                text: "Design choices are usually clearer when somebody pushes back on them. The model is a tireless, opinionated sparring partner that doesn't tire of the third version of a question. The trick is asking it to take a position, not asking it what to do.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "x",
                    eyebrow: "Opposition",
                    title: "Make the case against",
                    text: "\"Argue against this approach. What's the weakest assumption? What breaks first under load?\" Useful when you're falling in love with your own idea.",
                  },
                  {
                    icon: "ruler",
                    eyebrow: "Conservative",
                    title: "The smallest version",
                    text: "\"What's the version that does half of this and ships in a week?\" Surfaces the cheapest experiment hiding inside the ambitious one.",
                  },
                  {
                    icon: "spark",
                    eyebrow: "Bold",
                    title: "The version with no constraints",
                    text: "\"If we threw out the existing system, what's the version we'd actually want?\" Useful for naming what you're trading away to fit reality.",
                  },
                ],
              },
              {
                kind: "pullquote",
                text: "The point isn't to outsource the choice. It's to surface the trade-offs you'd otherwise miss.",
              },
            ],
          },
          {
            heading: "Analyst for product data and feedback",
            blocks: [
              {
                kind: "paragraph",
                text: "When the question is what the work is doing — not what it should look like — the model can read product data, user feedback, and qualitative notes faster than you can scroll through them. Treat the output as a hypothesis you can chase, not a finding you can quote.",
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
                    title: "Usage breakdowns",
                    text: "Drop in the CSV or table. Ask for the surprises — the rows that don't fit the pattern you expected.",
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
                kind: "callout",
                tone: "accent",
                icon: "wand",
                title: "Ask for variety, not quality",
                text: "When you want the model to spread, tell it to spread. \"Give me ten that disagree with each other\" works better than \"give me your best three.\" Pick the threads worth pulling once you can see the field.",
              },
            ],
          },
          {
            heading: "Plan first, build second",
            blocks: [
              {
                kind: "paragraph",
                text: "On any task bigger than a single message, resist asking the assistant to start writing code on turn one. The work that gets shipped almost always starts with a plan instead. Plan Mode in modern editors is built for exactly this: a read-only conversation that produces an agreed approach before anyone touches the file system.",
              },
              {
                kind: "compareFlow",
                before: {
                  label: "Build first",
                  steps: [
                    "Ask for code on turn one",
                    "Patch what comes back",
                    "Patch the patches",
                    "Realize the structure was wrong",
                    "Start over",
                  ],
                },
                after: {
                  label: "Plan first",
                  steps: [
                    "Tour and explore in Plan Mode",
                    "Write the seven-section plan",
                    "Get one round of feedback",
                    "Hand the plan to the model",
                    "Build once",
                  ],
                },
              },
            ],
          },
          {
            heading: "The seven-section plan",
            blocks: [
              {
                kind: "paragraph",
                text: "A repeatable plan shape that holds up across small features and bigger refactors. Skip a section if it is genuinely not relevant, but skip on purpose, not by accident.",
              },
              {
                kind: "code",
                label: "Plan template",
                language: "markdown",
                text: "## Goal\nWhat success looks like in one sentence.\n\n## Context\nFiles, components, tokens, and constraints that matter.\n\n## Approach\nThe path you intend to take, in plain language.\n\n## Trade-offs\nWhat you considered and rejected, and why.\n\n## Risks\nWhat could go wrong and how you'll catch it.\n\n## Steps\nThe ordered changes the assistant will make.\n\n## Verification\nHow you'll know the work is done.",
              },
              {
                kind: "wink",
                text: "If the plan fits in a tweet, it isn't a plan. If it fits in a deck, it's the wrong shape. A page of plain text is the right size.",
              },
            ],
          },
          {
            heading: "Socialize the plan, then build",
            blocks: [
              {
                kind: "paragraph",
                text: "Send the plan to your engineer, your PM, or a peer designer before you build. Five minutes of feedback on a plan saves a day of feedback on a half-finished implementation. The plan you ship is rarely the plan you started with, and that is the point.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "loop",
                title: "The plan is the design document now",
                text: "In AI-assisted work, the plan does the job a Figma cover page or a project brief used to do. It's the artifact that tells the team what's coming, what was considered, and what to push back on. Treat it like one.",
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
          "Handoff isn't a single act anymore. Figma frames going in, screenshots and video coming out, copy along the way, QE test plans, engineering handoff, and the source-of-truth file the next designer inherits.",
        readTime: "6 min",
        sections: [
          {
            heading: "Handoff isn't a single act anymore",
            blocks: [
              {
                kind: "paragraph",
                text: "The old version of handoff was a single moment: redlines, a deck, a meeting, a Jira ticket. Vibe coding spreads it across the project. Inputs land at the start, artifacts collect in the middle, test plans and engineering handoffs arrive at the end, and a source-of-truth file outlasts all of it. Each handoff is a smaller, lower-ceremony exchange than the old monolithic one — and the cumulative effect is sharper.",
              },
              {
                kind: "flow",
                label: "Artifacts across the lifecycle",
                steps: [
                  { title: "Figma frames", meta: "Going in" },
                  { title: "Screenshots and video", meta: "From the running build" },
                  { title: "Real copy", meta: "As you go" },
                  { title: "QE test plan", meta: "Before review" },
                  { title: "Engineering handoff", meta: "Toward production" },
                  { title: "Source-of-truth file", meta: "For the next designer" },
                ],
              },
            ],
          },
          {
            heading: "Figma frames going in",
            blocks: [
              {
                kind: "paragraph",
                text: "Even when you're driving the build, Figma still earns its keep at the front end. A frame the model can read — through the Figma MCP or as an attached image — narrows what gets generated and gives the rest of the team something to react to. Treat the input frame as a contract: it's the most precise version of the intent you'll have on day one, and the version everyone agreed on before code existed.",
              },
              {
                kind: "checklist",
                items: [
                  {
                    positive: true,
                    title: "Name layers and components",
                    text: "The MCP can read names. Generic names give you generic output.",
                  },
                  {
                    positive: true,
                    title: "Use design tokens, not styles",
                    text: "A frame that references tokens generates code that references tokens. A frame full of one-off colors generates one-off colors.",
                  },
                  {
                    positive: false,
                    title: "A pixel-perfect mock of every state",
                    text: "You don't need it. One frame for the happy path, plus a list of edge cases in the description, beats a forty-frame file you'll never update.",
                  },
                ],
              },
            ],
          },
          {
            heading: "Screenshots and video coming out",
            blocks: [
              {
                kind: "paragraph",
                text: "Once the prototype runs, the artifacts that travel are no longer Figma frames. They're screenshots of real states, short screen recordings of flows, and the occasional clip of the interaction the team keeps asking about. Capture them as you go, name them clearly, and keep them in a place the team can find. They are the design review materials for AI-assisted work.",
              },
              {
                kind: "cards",
                columns: 3,
                items: [
                  {
                    icon: "layers",
                    eyebrow: "Static",
                    title: "Screenshots of real states",
                    text: "Empty, loading, error, and dense. The four states AI-generated UIs almost always break on, and the four most worth pinning to a thread.",
                  },
                  {
                    icon: "loop",
                    eyebrow: "Motion",
                    title: "Short screen recordings",
                    text: "Twenty seconds, captioned in the filename. Long enough to show the flow. Short enough that someone will actually watch it.",
                  },
                  {
                    icon: "spark",
                    eyebrow: "The hero clip",
                    title: "The interaction in question",
                    text: "The one moment the team keeps asking about. Clip it once, share it everywhere, and stop re-recording it.",
                  },
                ],
              },
            ],
          },
          {
            heading: "Copy and content along the way",
            blocks: [
              {
                kind: "paragraph",
                text: "Real copy, not lorem ipsum, belongs in the prototype as soon as you have it. Draft microcopy with the model and edit by hand. Pull in real product names, real labels, real error states. Content surfaces design problems that placeholder text politely covers up, and the cost of getting it right early is much smaller than fixing it in QE.",
              },
              {
                kind: "callout",
                tone: "neutral",
                icon: "chat",
                title: "The model drafts, you decide",
                text: "Treat AI-drafted microcopy the way a content designer treats a first pass: useful starting material, not the answer. The voice is yours. The model only knows the average of its training set.",
              },
            ],
          },
          {
            heading: "QE test plans",
            blocks: [
              {
                kind: "paragraph",
                text: "AI-assisted features are easy to ship and easy to break. Hand QE a test plan that names the unhappy paths the model is likely to fumble. The model can draft the plan with you. Your job is to insist on the cases your prototype hides.",
              },
              {
                kind: "checklist",
                items: [
                  {
                    positive: true,
                    title: "The empty state",
                    text: "What does the screen look like before there's any data? AI-generated UI is built around the populated case.",
                  },
                  {
                    positive: true,
                    title: "The long input",
                    text: "A 200-character title, a 500-row list, a name with non-Latin characters. Layouts that work for short, neat data fall apart on real data.",
                  },
                  {
                    positive: true,
                    title: "The slow network",
                    text: "Loading states, optimistic updates, retry behavior. Easy to fake on localhost, hard to fake in production.",
                  },
                  {
                    positive: true,
                    title: "The keyboard and screen reader path",
                    text: "Tab through every interactive element. Listen to the screen reader read the page. The two cheapest accessibility checks, and the two most often skipped.",
                  },
                  {
                    positive: true,
                    title: "The path that fails",
                    text: "What happens when validation fails, the API errors, or the server returns nothing? AI loves the happy path; QE shouldn't.",
                  },
                ],
              },
            ],
          },
          {
            heading: "Engineering handoff",
            blocks: [
              {
                kind: "paragraph",
                text: "When the work crosses from your prototype to production, engineering needs more than the URL. The handoff is short when the build is short, but it should never be zero. Five short paragraphs in the PR description outperform a thirty-minute walkthrough almost every time.",
              },
              {
                kind: "steps",
                items: [
                  {
                    title: "The plan you started with",
                    text: "Paste the seven-section plan from chapter 8. Engineering needs to see what was decided before the code was written.",
                  },
                  {
                    title: "What you actually built",
                    text: "A short delta from the plan. What changed, what got cut, what got added. Honesty here saves an argument later.",
                  },
                  {
                    title: "Components to keep or rewrite",
                    text: "Mark which prototype components are production-ready and which are scaffolding. A list, not a tour.",
                  },
                  {
                    title: "Open questions",
                    text: "Anything you didn't resolve. Naming an open question is not failure; pretending one doesn't exist is.",
                  },
                  {
                    title: "How to run it",
                    text: "The dev server command, the env vars, the seed data. The fewer assumptions in the handoff, the fewer Slack pings later.",
                  },
                ],
              },
            ],
          },
          {
            heading: "The source-of-truth file the next designer inherits",
            blocks: [
              {
                kind: "paragraph",
                text: "Every project should leave behind one file that explains what it is and how to keep working on it. Not a deck. A short, version-controlled document that names the goal, the audience, the decisions, the components, and the things that would have helped you on day one. Write it for the next designer — which might be future you — and the project's second life is much cheaper than the first.",
              },
              {
                kind: "code",
                label: "PROJECT.md template",
                language: "markdown",
                text: "# What this is\nOne paragraph: the product, the audience, the goal.\n\n# How to run it\nClone, install, the dev command, the env vars.\n\n# Components and patterns\nThe components worth knowing about, with file paths.\n\n# Decisions worth remembering\nWhat we tried, what we picked, and why.\n\n# Open questions\nWhat we didn't resolve and where it would matter.\n\n# Where the artifacts live\nFigma file, screenshots folder, recordings, plan, PRs.",
              },
              {
                kind: "callout",
                tone: "accent",
                icon: "target",
                title: "The artifact that outlasts you",
                text: "Decks get lost. Slack threads age out. Figma files drift. A markdown file in the repo travels with the code, opens in any editor, and renders on every PR review. Make this the thing the team can rely on.",
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
      "Applied design work. Taking a Figma frame to working UI, holding the visual line, getting motion and content right, and treating accessibility as a prompt-time concern.",
    chapters: [
      {
        id: "from-figma-to-working-ui",
        number: 10,
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
        number: 11,
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
        number: 12,
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
        number: 13,
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
