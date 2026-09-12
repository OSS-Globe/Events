# Contributing to OSS Events

First off, thank you for considering contributing to OSS Events! It's people like you that make this directory a useful resource for the global open-source community.

There are many ways to contribute, from adding missing events to fixing bugs or improving the website's UI. This document provides guidelines and instructions for contributing.

*(If you like what we're building, please consider giving the repository a star ⭐! It helps our community grow.)*

## Table of Contents
- [How to Add an Event](#how-to-add-an-event)
- [Local Development Setup](#local-development-setup)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Getting Help](#getting-help)

---

## How to Add an Event

The core of this project is the event data. We do not use a backend database; instead, all events are stored in a single JSON file.

### 1. Locate the Data File
All event data lives in `data/events.json`.

### 2. Event Schema
To add a new event, append a new JSON object to the array in `data/events.json`. Please ensure you follow this exact structure:

```json
{
  "id": "unique-event-slug-2027",
  "name": "Event Name",
  "description": "A short, accurate description of the event.",
  "placeholderDescription": false,
  "type": "conference", 
  "startDate": "YYYY-MM-DD",
  "endDate": "YYYY-MM-DD",
  "location": {
    "city": "City Name",
    "country": "Country Name",
    "lat": 0.0000,
    "lng": 0.0000
  },
  "online": false,
  "hybrid": true,
  "officialWebsite": "https://example.com",
  "registrationLink": "https://example.com/register",
  "organizer": "Organizer Name",
  "tags": ["open-source", "javascript"],
  "cfp": {
    "status": "closed"
  },
  "lastUpdated": "YYYY-MM-DD"
}
```

*Note: For fully online events, you can set `country`, `lat`, and `lng` to `null`.*

---

## Local Development Setup

If you want to preview your added events on the 3D globe, or if you want to contribute code to the Next.js website, you will need to run the project locally.

### Prerequisites
- Node.js (v18.17 or higher)
- npm, pnpm, or yarn
- Git

### Steps
1. **Fork the repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/events.git
   cd events
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser.

---

## Submitting a Pull Request

Once you have added an event or made code changes, you are ready to submit a Pull Request (PR).

1. **Create a new branch** for your changes:
   ```bash
   git checkout -b add-my-awesome-event
   ```
2. **Commit your changes**:
   ```bash
   git commit -m "Add [Event Name] to directory"
   ```
3. **Push to your fork**:
   ```bash
   git push origin add-my-awesome-event
   ```
4. **Open a Pull Request** against the `main` branch of the `OSS-Globe/events` repository.
5. Provide a clear title and description for your PR. If your PR resolves an open issue, link to it (e.g., `Fixes #12`).

A maintainer will review your PR as soon as possible. They may ask for minor changes or clarifications before merging.

---

## Getting Help

If you are stuck or need help with your contribution, please feel free to open an Issue asking for guidance, or ask a question directly in your Pull Request. We are happy to help beginners!

Thank you for contributing!
