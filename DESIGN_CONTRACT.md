# Design Contract

This template is config-driven. Follow these rules to keep it reusable.

## Typography
- Use only semantic typography classes from `src/styles/typography.css`.
- Block components must not use raw Tailwind font-size utilities (e.g. `text-3xl`).
- Eyebrows: `text-eyebrow`
- Headings: `text-heading-lg`, `text-heading-md`, `text-heading-sm`
- Body copy: `text-body`, `text-body-lg`, `text-body-sm`

## Color Tokens
- Use CSS variables and token classes from `src/styles/theme.css`.
- Do not introduce arbitrary Tailwind values or inline color styles.

## Spacing Discipline
- Prefer existing spacing patterns; avoid arbitrary spacing utilities.
- If new spacing is required, codify it in tokens before use.

## Copy Source of Truth
- All user-facing copy must live in `src/content/site.config.ts` or page definitions.
- Block components may render copy only via props.

## Schema Versioning
- Page definitions must include `version: CONTENT_SCHEMA_VERSION`.
- Update the version only when schema changes are intentional and documented.
