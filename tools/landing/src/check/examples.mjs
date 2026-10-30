// Short fixtures shaped like the public conventions, not copies of upstream repos.

export const examples = [
  {
    id: 'prd',
    files: [{
      path: 'docs/prd.md',
      text: `# Product requirements document: Notifications

## Problem

People miss important account events.

## Goals

- Tell the account owner when a sign-in happens from a new device.

## Requirements

- The system should send notifications appropriately.
- Notifications should be fast, intuitive, and robust.
- It should be easy to use.

## Out of scope

Marketing mail is a different product.
`,
    }],
  },
  {
    id: 'openspec',
    files: [
      {
        path: 'openspec/changes/add-theme/proposal.md',
        text: `## Why

The app is hard to read at night.

## What Changes

- Add a theme toggle that persists the choice.

## Impact

- Settings screen and the CSS variables.

## Non-Goals

- Custom theme colors beyond light and dark.
`,
      },
      {
        path: 'openspec/changes/add-theme/specs/theme/spec.md',
        text: `## ADDED Requirements

### Requirement: Theme selection
The app SHALL let users switch between light and dark themes.

#### Scenario: User toggles dark mode
- **WHEN** the user clicks the theme toggle
- **THEN** the app switches to dark mode and persists the choice

#### Scenario: Empty preference
- **WHEN** the user has not chosen a theme
- **THEN** the app follows the operating system preference
`,
      },
    ],
  },
  {
    id: 'openspec-bad',
    files: [{
      path: 'openspec/changes/add-theme/specs/theme/spec.md',
      text: `## ADDED Requirements

### Requirement: Theme selection
The app should look nice.

Users can probably switch themes.
`,
    }],
  },
  {
    id: 'spec-kit',
    files: [{
      path: 'specs/001-notifications/spec.md',
      text: `# Feature Specification: Sign-in alerts

**Feature Branch**: \`001-notifications\`

**Status**: Draft

## User Scenarios & Testing

### User Story 1 - New device alert (Priority: P1)

**Acceptance Scenarios**:

1. **Given** an account with a known device, **When** someone signs in from a new device, **Then** the owner receives an email within 2 minutes

### Edge Cases

- What happens when the email provider returns a timeout?

## Requirements

### Functional Requirements

- **FR-001**: System MUST email the account owner when a sign-in comes from a device that has not been seen before
- **FR-002**: System MUST remember the dismissal for [NEEDS CLARIFICATION: how long?]

## Success Criteria

### Measurable Outcomes

- **SC-001**: 95% of alert emails are accepted by the provider in under 2 minutes
`,
    }],
  },
  {
    id: 'kiro',
    files: [{
      path: 'requirements.md',
      text: `# Sign-in alerts

WHEN a user signs in from a device the account has not seen
THE SYSTEM SHALL email the account owner within 2 minutes

WHEN the email provider times out
THE SYSTEM SHALL retry twice and then show the failure on the security page
`,
    }],
  },
  {
    id: 'bmad',
    files: [{
      path: '_bmad-output/prd-sign-in-alerts.md',
      text: `# prd-sign-in-alerts

## What should be true

The account owner receives an email within 2 minutes of a sign-in from a new device.

## What must not change

Existing password reset mail keeps its current template.

## Out of scope

Push notifications on mobile.
`,
    }],
  },
  {
    id: 'task-master',
    files: [
      {
        path: '.taskmaster/docs/prd.txt',
        text: `Sign-in alerts

Email the account owner when a new device signs in. Do it quickly and make it intuitive.
`,
      },
      {
        path: '.taskmaster/tasks/tasks.json',
        text: `{
  "master": {
    "tasks": [
      {
        "id": 1,
        "title": "Record known devices",
        "description": "Store a hash of the device on each successful sign-in.",
        "status": "pending",
        "dependencies": [],
        "priority": "high",
        "details": "Write the hash after the session is created.",
        "testStrategy": "Signing in twice from the same fixture device creates one row."
      },
      {
        "id": 2,
        "title": "Send the alert",
        "description": "Email the owner.",
        "status": "pending",
        "dependencies": [1],
        "priority": "high",
        "details": "Call the mailer.",
        "testStrategy": ""
      }
    ]
  }
}
`,
      },
    ],
  },
  {
    id: 'ears',
    files: [{
      path: 'requirements.txt',
      text: `WHEN a user submits the form with an empty email
THE SYSTEM SHALL show "Email is required" beside the email field

IF the user is signed in
THEN THE SYSTEM SHALL hide the registration form

WHILE the export is running
THE SYSTEM SHALL disable the export button
`,
    }],
  },
  {
    id: 'rfc',
    files: [{
      path: 'rfc-alerts.md',
      text: `# Request for Comments: 1

## Abstract

This note describes how a sign-in from a new device notifies the account owner.

## Motivation

Account owners currently hear about new devices only if they look at the audit log.

## Specification

The service sends one email per new device. The mail includes the time and the country.
`,
    }],
  },
  {
    id: 'user-stories',
    files: [{
      path: 'stories.md',
      text: `# Stories

As a account owner, I want an email when a new device signs in, so that I can revoke it.
As a auditor, I want the alert stored for 90 days, so that I can review it.
As a user, I want the screen to be intuitive.
`,
    }],
  },
  {
    id: 'markdown',
    files: [{
      path: 'notes.md',
      text: `# Meeting notes

We talked about alerts. Someone should look into it later.
`,
    }],
  },
  {
    id: 'specscore',
    files: [{
      path: 'spec/features/sign-in-alerts/README.md',
      text: `---
format: https://specscore.md/feature-specification
status: draft
---

# Feature: Sign-in alerts

**Status:** draft
**Source Ideas:** —

## Summary

Email the account owner when a new device signs in.

## Problem

Owners do not notice new devices unless they open the audit log.

## Acceptance Criteria

### AC: new-device-mail

Given an account with one known device,
When a session starts from a different device,
Then the owner is emailed within 2 minutes.

## Open Questions

None at this time.

*This document follows the https://specscore.md/feature-specification*
`,
    }],
  },
  {
    id: 'specscore-bad',
    files: [{
      path: 'pasted.md',
      text: `# Feature: Checkout

**Status:** draft

## Summary

Checkout should be fast and intuitive.

## Acceptance Criteria

### AC: bad id

The user should have a good experience.
`,
    }],
  },
];

export function exampleById(id) {
  return examples.find((item) => item.id === id) || null;
}
