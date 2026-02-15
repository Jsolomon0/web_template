import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    files: ["src/components/blocks/**/*.{ts,tsx}"],
    plugins: {
      "template-discipline": {
        rules: {
          "no-raw-typography": {
            meta: {
              type: "problem",
              docs: {
                description:
                  "Disallow raw Tailwind font-size utilities in block components.",
              },
              schema: [],
              messages: {
                forbidden:
                  "Use semantic typography classes (e.g. text-heading-md) instead of raw font-size utilities.",
              },
            },
            create(context) {
              const disallowed = /\btext-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl)\b/;

              const checkString = (value, node) => {
                if (disallowed.test(value)) {
                  context.report({ node, messageId: "forbidden" });
                }
              };

              return {
                JSXAttribute(node) {
                  if (node.name?.name !== "className" || !node.value) return;

                  if (node.value.type === "Literal" && typeof node.value.value === "string") {
                    checkString(node.value.value, node);
                  }

                  if (node.value.type === "JSXExpressionContainer") {
                    const expr = node.value.expression;
                    if (expr.type === "Literal" && typeof expr.value === "string") {
                      checkString(expr.value, node);
                    }
                    if (expr.type === "TemplateLiteral") {
                      const raw = expr.quasis.map((q) => q.value.raw).join(" ");
                      checkString(raw, node);
                    }
                  }
                },
              };
            },
          },
        },
      },
    },
    rules: {
      "template-discipline/no-raw-typography": "error",
    },
  },
]);

export default eslintConfig;
