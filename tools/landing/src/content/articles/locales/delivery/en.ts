import type { DeliveryCopy } from '../../delivery.ts';
export const copy: DeliveryCopy = {
  title: 'Your project is specified. What will you finish this week?',
  description: 'Turn a software specification into one weekly commitment: choose a user outcome, protect capacity, review evidence, and make the next decision.',
  promoTitle: 'Define success. Then make room for it.',
  promoBody: 'SpecScore gives your project a definition of done. A weekly commitment gives you a reason to choose what happens next. Connect the two with a short evidence review.',
  readArticle: 'Choose your next finished outcome',
  explore: 'Explore CommittedMe',
  breadcrumb: 'Articles',
  relatedTitle: 'Make the outcome testable',
  relatedLink: 'Writing acceptance criteria that can be verified',
  intro: 'A specification can be complete while the project goes nowhere. The requirements are clear, the agent has a plan, and the backlog keeps growing. What is missing may be a smaller decision: which useful outcome will you actually finish this week, and what will you stop doing to make room for it? Here is a review you can run with a colleague, a mentor, or a notebook.',
  sections: [
    { title: 'Choose a user outcome, not a pile of tasks', paragraphs: [
      'Start with one acceptance criterion and turn it into a short demonstration. For a CSV import, “implement parsing” describes work. “A user imports a valid file, sees the records, and gets a useful error for an invalid row” describes something you can inspect. Keep the error path in the commitment: removing it to meet a date changes what you promised.',
      'SpecScore organizes requirements and acceptance criteria in files your team and agents can read. Use those references in the weekly note. The spec remains the definition of correct behavior; the note selects a manageable part of it. You do not need another copy of the specification or a new project-management system.'
    ] },
    { title: 'Budget for your actual calendar', paragraphs: [
      'Write down the focused work periods you really have, including review and integration. Two evenings are not five working days. Reserve time for testing the complete journey and handling one unexpected problem. If the outcome cannot fit, choose a smaller coherent journey before work starts.',
      'List dependencies you do not control. “Waiting for production access” needs an owner and a decision time. If access is still missing on Wednesday, decide whether a local demonstration is useful. Label that result honestly; a local demo does not establish production readiness. Do not quietly redefine success on Friday.'
    ] },
    { title: 'Give AI agents bounded work; keep the decision', paragraphs: [
      'An agent can generate several implementations while you are still deciding which problem matters. More completed subtasks can therefore leave the original goal untouched. Give each task a specific criterion, allowed scope, and evidence to return. Keep one human responsible for accepting the whole user journey.',
      'When a new idea appears, record it without automatically starting it. Ask what current commitment it would replace. A useful working limit is one outcome awaiting your final review at a time. Treat that as an experiment in focus, not a universal productivity rule; adjust it when the evidence says it is slowing useful work.'
    ] },
    { title: 'Review evidence before the story', paragraphs: [
      'At the review, open the actual artifact first: the running import, the failing-input test, or the published documentation. Walk the same sequence a user would. Then compare the result with the selected criterion. Commit counts, hours worked, and confident agent summaries are context, not acceptance evidence.',
      'Separate what is implemented, what was tested, and what a user can use in the intended environment. Ask your reviewer to find one way the result could fail. Share only the information they need: a synthetic example or a redacted demonstration is often enough. Accountability does not require sharing customer data, secrets, or a private repository.'
    ] },
    { title: 'A missed commitment needs a new decision', paragraphs: [
      'If the demonstration fails, write the smallest useful explanation: unknown dependency, excessive scope, interrupted capacity, or incorrect assumption. Avoid turning a missed estimate into a judgment about your character. Pick a concrete response: reduce the next slice, resolve the dependency, change the approach, or deliberately stop the project.',
      'Do not roll the same commitment forward unchanged by habit. Agree on the next observable result and review date. After several cycles, compare your estimates with what actually finished. The value of the record is better decisions, not a streak you have to protect.'
    ] },
  ],
  reviewTitle: 'Copy this five-line weekly review',
  reviewLines: [
    'Outcome: what can a user do by the review date?',
    'Evidence: which criterion and demonstration will prove it?',
    'Capacity: when will I build, test, and review it?',
    'Constraint: what am I postponing, and which dependency needs a decision?',
    'Review: who will look at the result, when, and what decision follows?'
  ],
  ctaTitle: 'Give your decisions a human review',
  ctaBody: 'Use this note with someone who will ask what happened and help you examine the next choice. CommittedMe focuses on human mentorship and accountability. Its page for developers and founders introduces that approach. Keep your specification in your repository and bring a goal you can discuss without exposing confidential work.',
  mentorBody: "Already teaching developers on YouTube, TikTok, Instagram, or a blog? Explaining tradeoffs and tests to another person can expose your own assumptions; their questions can help you keep learning while they make progress. If that kind of conversation appeals to you, read about becoming a mentor.",
  mentorLink: "Read about becoming a mentor",
  disclosure: 'CommittedMe is another product in our ecosystem. This article describes a review practice; it does not imply an integration with SpecScore.'
};
