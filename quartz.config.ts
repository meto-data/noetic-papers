import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
// ----- Theme Palettes (choose one light and one dark by setting the selectors below) -----
const PALETTES = {
  light: {
    // Default (current)
    default: {
      light: "#F9FAFB",
      lightgray: "#E5E7EB",
      gray: "#9CA3AF",
      darkgray: "#374151",
      dark: "#111827",
      secondary: "#2563EB",
      tertiary: "#7C3AED",
      highlight: "rgba(37, 99, 235, 0.12)",
      textHighlight: "#fde68a80",
    },
    // Serene Sky: cool, crisp, high-contrast links
    sereneSky: {
      light: "#FAFAFA",
      lightgray: "#EAEAEA",
      gray: "#9AA4B2",
      darkgray: "#334155",
      dark: "#111827",
      secondary: "#0EA5E9",
      tertiary: "#14B8A6",
      highlight: "rgba(14, 165, 233, 0.12)",
      textHighlight: "#a7f3d080",
    },
    // Warm Sand: warm paper-like background, subtle contrast
    warmSand: {
      light: "#FFFBF5",
      lightgray: "#E7E5E4",
      gray: "#A8A29E",
      darkgray: "#44403C",
      dark: "#1C1917",
      secondary: "#D97706",
      tertiary: "#EA580C",
      highlight: "rgba(234, 88, 12, 0.10)",
      textHighlight: "#fde68a80",
    },
    // Warm Teal: same warm base with teal/emerald accents
    warmTeal: {
      light: "#FFFBF5",
      lightgray: "#E7E5E4",
      gray: "#A8A29E",
      darkgray: "#44403C",
      dark: "#1C1917",
      secondary: "#0D9488",
      tertiary: "#10B981",
      highlight: "rgba(13, 148, 136, 0.12)",
      textHighlight: "#a7f3d080",
    },
    // Warm Plum: same warm base with violet/mauve accents
    warmPlum: {
      light: "#FFFBF5",
      lightgray: "#E7E5E4",
      gray: "#A8A29E",
      darkgray: "#44403C",
      dark: "#1C1917",
      secondary: "#7C3AED",
      tertiary: "#8B5CF6",
      highlight: "rgba(124, 58, 237, 0.12)",
      textHighlight: "#d8b4fe80",
    },
    // Warm Slate: same warm base with soft blue/slate accents
    warmSlate: {
      light: "#FFFBF5",
      lightgray: "#E7E5E4",
      gray: "#A8A29E",
      darkgray: "#44403C",
      dark: "#1C1917",
      secondary: "#3B82F6",
      tertiary: "#60A5FA",
      highlight: "rgba(59, 130, 246, 0.12)",
      textHighlight: "#bfdbfe80",
    },
  },
  dark: {
    // Default (current)
    default: {
      light: "#0f172a",
      lightgray: "#334155",
      gray: "#64748B",
      darkgray: "#E5E7EB",
      dark: "#F8FAFC",
      secondary: "#3B82F6",
      tertiary: "#A78BFA",
      highlight: "rgba(59, 130, 246, 0.18)",
      textHighlight: "#f59e0b66",
    },
    // Midnight Blue: deep navy background, cyan accents
    midnightBlue: {
      light: "#0B1220",
      lightgray: "#1F2937",
      gray: "#64748B",
      darkgray: "#E5E7EB",
      dark: "#F8FAFC",
      secondary: "#38BDF8",
      tertiary: "#22D3EE",
      highlight: "rgba(56, 189, 248, 0.20)",
      textHighlight: "#06b6d466",
    },
    // Graphite: neutral grays with violet accent
    graphite: {
      light: "#0F0F10",
      lightgray: "#2A2A2E",
      gray: "#70707A",
      darkgray: "#E6E6E7",
      dark: "#F2F2F2",
      secondary: "#8B5CF6",
      tertiary: "#F472B6",
      highlight: "rgba(139, 92, 246, 0.20)",
      textHighlight: "#f472b666",
    },
  },
} as const

// Select your palettes by setting exactly one option to true in each group
// Light options: default | sereneSky | warmSand | warmTeal | warmPlum | warmSlate
const SELECT_LIGHT = {
  default: false,
  sereneSky: false,
  warmSand: false,
  warmTeal: false,
  warmPlum: false,
  warmSlate: true,
} as const

// Dark options: default | midnightBlue | graphite
const SELECT_DARK = {
  default: false,
  midnightBlue: true,
  graphite: false,
} as const

const lightMode = SELECT_LIGHT.sereneSky
  ? PALETTES.light.sereneSky
  : SELECT_LIGHT.warmSand
    ? PALETTES.light.warmSand
    : SELECT_LIGHT.warmTeal
      ? PALETTES.light.warmTeal
      : SELECT_LIGHT.warmPlum
        ? PALETTES.light.warmPlum
        : SELECT_LIGHT.warmSlate
          ? PALETTES.light.warmSlate
          : PALETTES.light.default

const darkMode = SELECT_DARK.midnightBlue
  ? PALETTES.dark.midnightBlue
  : SELECT_DARK.graphite
    ? PALETTES.dark.graphite
    : PALETTES.dark.default

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Noetic Logos",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: 'google',
      tagId: 'G-W727BKLZVN',
    },
    locale: "tr-TR",
    baseUrl: "/",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: { name: "Inter", weights: [700, 800], includeItalic: false },
        header: { name: "Inter", weights: [500, 700], includeItalic: false },
        body: { name: "Inter", weights: [400, 600], includeItalic: true },
        code: { name: "JetBrains Mono", weights: [400, 600], includeItalic: false },
      },
      colors: {
        lightMode,
        darkMode,
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "filesystem"],
      }),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
