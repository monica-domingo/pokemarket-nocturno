# ADR-001: Introduction to Architecture Decision Records (ADR)

## 🏗️ Context

As part of the development of `PokéMarket Nocturno`, I need to document key tehcnical decisions to ensure consistency
and maintainability.

## 💡 Decision

I will use **[ADR](https://adr.github.io/) (Architecture Decision Records)** to document significant technical choices.
These files will be
stored in the `/docs/` directory and follow the naming pattern `adr-<number>-<title>.md`.

## 🎯 Alternatives Considered

1. **Document in README**
    - ❌ Not scalable for long-term tracking of decisions.
2. **Use a Wiki**
    - ❌ Requires external tooling and maintenance.
3. **Keep a dedicated `docs/` directory** ✅
    - ✔️ Standard practice for ADRs.
    - ✔️ Allows easy version control.
    - ✔️ Accessible to all contributors.

## ✅ Outcome

All major architectural and technical decisions will be documented in ADRs to maintain clarity and track the rationale
behind choices.
