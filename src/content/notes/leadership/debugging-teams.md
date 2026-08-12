---
title: "Debugging Teams: Humility, Respect, and Trust"
description: Notes on Fitzpatrick & Collins-Sussman's "Debugging Teams" — the HRT model, why a mission statement matters, communication as an engineering discipline, and the cost of ignoring low performers.
category: leadership
tags:
  ["leadership", "team-culture", "communication", "book-notes", "management"]
date: 2026-08-12
---

"Debugging Teams" by Brian W. Fitzpatrick and Ben Collins-Sussman treats team dysfunction the same way we treat a production incident: find the root cause, not just the symptom. Most of what looks like a technical disagreement, a missed deadline, or a "personality clash" traces back to a smaller set of underlying failures. A few ideas from the book that stuck with me:

## The Three Pillars: Humility, Respect, Trust

The book's central model (HRT) is that healthy teams are built on three traits:

- **Humility** — you are not the center of the universe, and you are open to being wrong. Your code, your design, your opinion is not sacred just because it's yours.
- **Respect** — you genuinely care about the people you work with, and it shows in how you treat their time, their ideas, and their mistakes.
- **Trust** — you believe your teammates are competent and will do the right thing, so you don't feel the need to double-check or route around them.

The useful part isn't the acronym, it's using it as a diagnostic. When a team is dysfunctional, one of these three is almost always the thing that broke first. An engineer who won't take feedback is missing humility. A team that talks over its quietest member is missing respect. A manager who reviews every line before it ships is signaling a lack of trust. Naming which pillar cracked makes the problem concrete instead of "we just don't work well together."

## The Mission Statement

Teams without a shared, explicit answer to "why do we exist" default to optimizing for whatever is loudest that week. Everyone believes they're pulling in the same direction right up until a prioritization call reveals they weren't.

A mission statement doesn't need to be inspirational marketing copy. It needs to be short enough to remember and specific enough to actually rule things out — a good one should make it obvious when a project _doesn't_ belong on the roadmap, not just when it does. If it can't be used to say no to something, it isn't doing its job.

## Communication as Part of Engineering

The book's framing that stuck with me most: communication isn't a soft skill layered on top of the "real" engineering work, it _is_ engineering work. A brilliant design that never gets explained clearly enough to be reviewed, adopted, or maintained by anyone else has the same practical value as code that was never merged.

Treating communication as an engineering discipline means applying the same rigor to it that we apply to code:

- Default to writing things down and sharing them broadly instead of resolving context in DMs or hallway conversations.
- Over-communicate state and intent early, the same way you'd rather get a code review on a rough draft than after three weeks of silent work.
- Recognize that a misunderstanding between two engineers is a bug, and it deserves the same "find the actual root cause" treatment as a production issue instead of being chalked up to personality.

## The Antipattern of Ignoring Low Performers

The one that's hardest to hear: tolerating a low performer isn't neutral, it's an active decision with a cost, and that cost is paid by the rest of the team. Avoiding the uncomfortable conversation feels like the safe choice, but everyone else on the team notices the gap in output or quality, notices that it isn't being addressed, and quietly recalibrates what "acceptable" means.

That's where this loops back to HRT: silently tolerating underperformance is a failure of respect toward everyone else who's holding the bar, and it erodes trust in leadership's judgment. The fix isn't a dramatic confrontation — it's direct, timely, respectful feedback given early, before resentment has time to build on either side.

## Takeaway

None of these four ideas are really independent. A team without a mission statement can't give clear feedback because there's no shared bar to measure against. A team that treats communication as optional will fail at delivering that feedback even when it knows it needs to. And all of it rests on humility, respect, and trust being intact in the first place. Worth re-reading whenever a team feels "off" and it's not obvious why.

Sometimes we let go of values due to bursts of energy, it's important to stop and breathe.

## Reference

- [Debugging Teams: Better Communication and Collaboration for Career Success](https://book.debuggingteams.com/) — Brian W. Fitzpatrick and Ben Collins-Sussman
