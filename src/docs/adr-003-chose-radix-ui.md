# ADR-003: Choosing Radix UI for the Project

## Context

For the development of the **PokéMarket Nocturno** application, I needed a UI component library that meets the following
criteria:

- **Accessibility**: Ensuring compliance with WAI-ARIA guidelines for an inclusive user experience.
- **Lightweight & Performant**: Avoiding bloated dependencies that slow down the application.
- **Ease of Customization**: Providing a simple default theme while allowing modifications without requiring complex
  styling frameworks.
- **Seamless Integration**: Working out-of-the-box without enforcing Tailwind, Emotion, or other styling solutions.

## Decision

I chose **Radix UI** as the primary UI component library for this project.

### Why Radix UI?

Radix UI provides a **styled but minimal default theme**, making it an excellent choice for:

- **Pre-styled Components**: Unlike completely unstyled libraries, Radix UI includes a **basic theme** that looks
  visually similar to our intended design, reducing customization overhead.
- **Independent Styling**: It does **not** enforce Tailwind, Emotion, or other CSS-in-JS solutions, allowing full
  control over styling.
- **Lightweight [~16MB](https://pkg-size.dev/@radix-ui%2Fthemes)**: Maintains a relatively small footprint compared to
  more complex UI libraries.
- **Performance**: Optimized for fast rendering and minimal re-renders, avoiding common issues with more complex UI
  frameworks.
- **Ease of Implementation**: Components are well-documented and require minimal setup to integrate into our existing
  structure.

### Why Not Other Alternatives?

| Library               | Selected? | Reasons                                                                                                                                |
|-----------------------|-----------|----------------------------------------------------------------------------------------------------------------------------------------|
| **Radix UI**          | ✅ Yes     | Lightweight, pre-styled but highly customizable, does not force Tailwind/Emotion, good performance, minimal design adjustments needed. |
| **MUI (Material UI)** | ❌ No      | Heavyweight, enforces a strong design system that requires extensive customization.                                                    |
| **Chakra UI**         | ❌ No      | Requires Emotion for styling, increasing bundle size and complexity.                                                                   |
| **Headless UI**       | ❌ No      | Unstyled components require full design implementation, adding unnecessary complexity.                                                 |
| **React Aria**        | ❌ No      | Only provides accessibility hooks, requiring custom component implementation.                                                          |

## Outcome

- I will integrate **Radix UI** into the project.
- This ensures a **lightweight, performant, and accessible UI** without requiring additional styling frameworks.
- The default theme already aligns with our intended design, minimizing extra styling efforts.

## Next Steps

1. Integrate **Radix UI** into the project.
2. Apply minor theme adjustments where needed.
3. Ensure all developers are familiar with Radix UI’s structure and customization options.

---

### Status: **Accepted**

This decision stands unless future performance evaluations or project needs require reconsideration. 🚀  