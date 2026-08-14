---
title: "Weightlifting Diary"
description: A mobile-first workout tracker I'm building for my wife and anyone else who struggles to log sets, weights, and reps without already knowing exercise names.
category: projects
tags:
  ["side-project", "laravel", "inertia", "react", "digital-ocean", "fitness-tech"]
date: 2026-08-14
---

## The Problem

My wife lifts, but tracking her workouts is a constant friction point. She doesn't know the "official" names for most exercises, so every logging app that starts with a search box assumes knowledge she doesn't have yet. On top of that, she's told me repeatedly how tedious it is to just jot down what she did, at what weight, for how many sets and reps, mid-workout, between sets, out of breath.

Most fitness trackers are built for people who already speak the vocabulary. I want to build one for people who don't, starting with her as the first user, but designed generally enough that it holds up for anyone with the same problem.

## Core Idea

At its core this is an exercise tracking app: sets, weights, reps, logged with as little friction as possible. Everything else exists to make that first step, "what exercise am I even doing," as easy as the logging itself.

## Planned Features

1. **Set/weight/rep tracking as the primary function.** This is the base the rest of the app is built on.
2. **Traditional gym exercises first**, with the data model left open to other trackable activity types (anything reducible to sets, weight, and reps) so it's not a rewrite to expand scope later.
3. **Helpful search as the flagship feature**, three ways in depending on what the user already knows:
   - Search by exercise name, for people who already know it.
   - Search by image, to identify an exercise/machine from a photo.
   - Search by description, typed or spoken (speech-to-text), for people who can describe the movement but not name it.
4. **Mobile-first, web-based.** No app store gatekeeping, works from a phone browser mid-workout.
5. **Email login.** Low-friction auth, no separate password manager needed for a workout app.
6. **Org support.** Gyms or exercise groups can group members, share lifts, and route feedback to a designated "trainer" role within the org.
7. **English and Korean language support** from the start, not bolted on later.

## Tech Stack

- **Backend/App:** Laravel + Inertia with React on the frontend, one codebase instead of maintaining a separate API and SPA.
- **Hosting:** Digital Ocean, chosen specifically for cost control while this is an unproven side project.

## Open Questions

- How the image and speech/description search actually resolve to an exercise: likely an LLM or vision model call on top of a curated exercise database rather than training anything custom, at least for v1.
- How org/trainer feedback should work without turning into a full messaging system, given the point is glanceable feedback on a specific lift, not a chat app.
- i18n strategy for Laravel + Inertia + React to keep English/Korean in sync without duplicating content by hand.

This note is the starting point. I'll follow up with build notes as the architecture and the search feature take shape.
