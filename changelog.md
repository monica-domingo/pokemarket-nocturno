# Changelog

All notable changes to this project will be documented in this file.

## **[Unreleased]**

### ✨ Features

- **feat(header):** Add `Header` component with Pokémarket branding and navigation. (#Feb 25, 2025)
- **feat(favorites):** Implement favorite management with a modal and compact cards. (#Feb 25, 2025)
    - Allow adding/removing items from the favorites list.
    - Introduced `CardCompact` component for better UI.
    - Enabled favorite management via both item click and modal actions.
    - Included a random `id` generator for items.
- **feat(search):** Enhance search functionality with multiple fields and filtering. (#Feb 24, 2025)
    - Added support for searching by `description`, `email`, and exact `price`.
    - Implemented combined search with pagination.
    - Introduced a dropdown for selecting search fields.
- **feat(ui):** Add new `ItemCard` component with basic tests. (#Feb 24, 2025)
- **feat(ui):** Basic item rendering with an initial API fetch. (#Feb 24, 2025)
- **feat(msw):** Initial `MSW` setup and basic mock implementation. (#Feb 22, 2025)

---

### 🔨 **Refactors & Improvements**

- **refactor(favorites):** Decouple favorites logic from `App.tsx`, create a provider and hook. (#Feb 25, 2025)
- **refactor(types):** Separate type definitions into a dedicated file. (#Feb 24, 2025)
- **refactor(core):** Optimize fetch logic, add intersection observer, and unify `ItemProps`. (#Feb 24, 2025)
- **refactor(core):** Separate logic into dedicated hooks and services with tests. (#Feb 24, 2025)
    - Moved `fetchItems` to `services/fetchItems.ts`.
    - Created `hooks/useFetchItems.ts`, `useAbortController.ts`, `useDebounce.ts`, and `useInfiniteScroll.ts`.

---

### 🧪 **Tests**

- **test(setup):** Update test environment and mock `IntersectionObserver`. (#Feb 24, 2025)
- **test(api):** Add tests for mock API handlers. (#Feb 22, 2025)
- **test(fetch):** Add basic test for API fetch in `ItemList`. (#Feb 24, 2025)

---

### 🛠 **Chores & Setup**

- **chore(ui):** Clean up styles, install `@radix-ui`, and setup frontend. (#Feb 24, 2025)

---

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/). 🚀