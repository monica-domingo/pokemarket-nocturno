# ADR-002: Choosing Bun, Vite, TypeScript, and React for the Project

## 🏗️ Context

For the development of the **PokéMarket Nocturno** SPA, I needed to select a **modern, fast, and scalable** tech stack
that ensures:

- **High performance**
- **Scalability**
- **Strong ecosystem support**

## 💡 Decision

I have chosen **Bun, Vite, TypeScript, and React** as the core technologies for tihs project.

### 📦 **Why Bun?**

Bun was selected as the **package manager and runtime** due to:

- ⚡ **Blazing-fast performance** compared to npm/yarn/pnpm.
- 🏗️ **Integrated runtime, test runner, and bundler**.
- 🏎️ **Native support for TypeScript** without extra configuration.
- 🛠️ **Minimal dependencies** and improved DX.

👉 _Alternative considered:_ **npm/yarn/pnpm**  
❌ These are widely used but lack the speed and built-in runtime capabilities of Bun.

---

### 🚀 **Why Vite?**

Vite was chosen as the **frontend build tool** because:

- 🌐 **Fast hot module replacement (HMR)** speeds up development.
- 🏗️ **Optimized bundling with Rollup** ensures efficient builds.
- 🏎️ **Native ES Modules (ESM) support** improves performance.
- 🔧 **Seamless integration with React and TypeScript**.

👉 _Alternative considered:_ **Webpack**  
❌ Slower build times and requires more configuration.

---

### 🛠️ **Why TypeScript?**

TypeScript was selected over JavaScript because:

- 🔍 **Static typing** reduces runtime errors.
- 🛠️ **Improved developer experience** with better IntelliSense and autocomplete.
- 🔄 **Seamless integration with React and modern frameworks**.

👉 _Alternative considered:_ **JavaScript (ES6+)**  
❌ While simpler, JavaScript lacks static analysis, leading to potential runtime errors.

---

### ⚛️ **Why React?**

React was chosen for building the user interface due to:

- ⚛️ **Component-based architecture** enabling modular and reusable UI.
- 🏎️ **Virtual DOM for high performance rendering**.
- 🌍 **Large community & ecosystem** with extensive support.

👉 _Alternative considered:_ **Angular**  
❌ Angular is powerful but has a steeper learning curve and heavier setup for small-to-medium applications.

---

## 🎯 Alternatives Considered

| Technology             | Selected? | Reasons                                      |
|------------------------|-----------|----------------------------------------------|
| **Package Manager**    |           |                                              |
| Bun                    | ✅ Yes     | Faster execution, built-in runtime & testing |
| npm/yarn/pnpm          | ❌ No      | Slower, lacks runtime capabilities           |
| **Build Tool**         |           |                                              |
| Vite                   | ✅ Yes     | Faster builds, optimized bundling, great DX  |
| Webpack                | ❌ No      | Slower, requires more configuration          |
| **Language**           |           |                                              |
| TypeScript             | ✅ Yes     | Type safety, better DX, maintainability      |
| JavaScript (ES6+)      | ❌ No      | Lack of type safety, harder to scale         |
| **Frontend Framework** |           |                                              |
| React                  | ✅ Yes     | Popular, component-based, performant         |
| Angular                | ❌ No      | Steeper learning curve, overkill for SPA     |

---

## ✅ Outcome

- The project will use **Bun, Vite, TypeScript, and React** as its core stack.
- All team members will develop using **Bun as the package manager**.
- TypeScript will be enforced to ensure code quality and maintainability.

### 📜 Status: **Accepted**

This decision is final unless future performance or project needs require reconsideration.
