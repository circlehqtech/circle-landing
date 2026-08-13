export type QuestionOption = {
  label: string;
  score: number;
};

export type QuizQuestion = {
  id: number;
  num: string;
  question: string;
  options: QuestionOption[];
};

export const READINESS_QUESTIONS: QuizQuestion[] = [
  {
    id: 0,
    num: "Question 1 of 10",
    question: "How would you describe the current size of your business?",
    options: [
      { label: "Solo founder or freelancer, just me", score: 1 },
      { label: "Small team, 2 to 10 people", score: 2 },
      { label: "Growing business, 11 to 50 people", score: 3 },
      { label: "Established company, 50 or more people", score: 4 },
    ],
  },
  {
    id: 1,
    num: "Question 2 of 10",
    question: "How does your business currently handle customer enquiries?",
    options: [
      { label: "Manually, one person responding to messages and calls when they can", score: 1 },
      { label: "A small team handles it, but response is inconsistent", score: 2 },
      { label: "We have a structured process, though some things still fall through", score: 3 },
      { label: "We have systems in place including CRM, templates, and some automation", score: 4 },
    ],
  },
  {
    id: 2,
    num: "Question 3 of 10",
    question: "How well documented are your core business processes?",
    options: [
      { label: "Mostly in people's heads, we run on experience and habit", score: 1 },
      { label: "Partially documented, some things written down but most are not", score: 2 },
      { label: "Most key processes are documented, though not always followed consistently", score: 3 },
      { label: "We have clear SOPs that the team follows consistently", score: 4 },
    ],
  },
  {
    id: 3,
    num: "Question 4 of 10",
    question: "Which best describes your relationship with data in your business?",
    options: [
      { label: "We do not collect or track data in any structured way", score: 1 },
      { label: "We have some data in spreadsheets and reports but it is disorganised", score: 2 },
      { label: "We collect data on sales and customers fairly consistently", score: 3 },
      { label: "We have good data, review it regularly, and use it to make decisions", score: 4 },
    ],
  },
  {
    id: 4,
    num: "Question 5 of 10",
    question: "How repetitive are your highest-volume tasks?",
    options: [
      { label: "Most of our work is unique and creative, very little feels repetitive", score: 2 },
      { label: "Some things repeat, but a lot of our work changes day to day", score: 3 },
      { label: "We have clear repetitive tasks such as enquiries, follow-ups, and reminders", score: 4 },
      { label: "Most of our volume work follows the same pattern every single day", score: 4 },
    ],
  },
  {
    id: 5,
    num: "Question 6 of 10",
    question: "How comfortable is your team with learning and using new digital tools?",
    options: [
      { label: "Resistant, getting the team to adopt new tools is a real challenge", score: 1 },
      { label: "Mixed, some people adapt well while others take much longer", score: 2 },
      { label: "Generally open, most people adapt when given proper support", score: 3 },
      { label: "Eager, the team actively looks for better tools and ways of working", score: 4 },
    ],
  },
  {
    id: 6,
    num: "Question 7 of 10",
    question: "What is your biggest operational pain point right now?",
    options: [
      { label: "Responding to customers fast enough and following up consistently", score: 3 },
      { label: "Staff spending too much time on admin and repetitive tasks", score: 3 },
      { label: "Getting clear and timely information to make good business decisions", score: 3 },
      { label: "Honestly, we are still figuring out what the main problem is", score: 2 },
    ],
  },
  {
    id: 7,
    num: "Question 8 of 10",
    question: "Have you or your business used any AI tools, even casually?",
    options: [
      { label: "No, we have not tried any AI tools yet", score: 1 },
      { label: "I have experimented personally with ChatGPT or similar but not for business use", score: 2 },
      { label: "We use some AI tools occasionally for writing, research, and content", score: 3 },
      { label: "AI is already integrated into parts of how our business operates", score: 4 },
    ],
  },
  {
    id: 8,
    num: "Question 9 of 10",
    question: "If you invested in an AI system, who would manage it internally?",
    options: [
      { label: "Nobody, we do not have someone who could take this on right now", score: 1 },
      { label: "It would be added to someone already stretched, which is not ideal", score: 2 },
      { label: "There is someone who could champion this with the right support", score: 3 },
      { label: "We have someone with the capacity and interest to own this properly", score: 4 },
    ],
  },
  {
    id: 9,
    num: "Question 10 of 10",
    question: "What is your honest position on investing in AI for your business right now?",
    options: [
      { label: "Not a priority, I have more urgent things to sort out first", score: 1 },
      { label: "Curious but cautious, I want to understand it better before committing", score: 2 },
      { label: "Actively exploring, looking for the right solution and the right partner", score: 3 },
      { label: "Ready to move, I know I need this and I am looking for expert guidance now", score: 4 },
    ],
  },
];
