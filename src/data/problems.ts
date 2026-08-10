export type Problem = {
  id: string;
  index: string;
  title: string;
  description: string;
  symptom: string;
  signals: string[];
  fixLabel: string;
  fix: string;
  icon: "manual" | "data" | "inbox" | "onboarding" | "revenue";
};

export const problems: Problem[] = [
  {
    id: "manual-drag",
    index: "01",
    title: "Manual drag slowing efficiency",
    description:
      "Teams lose hours a day to repetitive, manual work — retyping information between systems, chasing approvals, updating spreadsheets by hand.",
    symptom:
      "My team spends half the day retyping the same data between systems and chasing approvals.",
    signals: ["Re-keyed twice", "Approval pending", "Manual update"],
    fixLabel: "Workflow & approval automation",
    fix: "Workflow and approval automation removes the repetitive manual steps, so work moves without waiting on people.",
    icon: "manual",
  },
  {
    id: "real-time-info",
    index: "02",
    title: "Loss of real-time information",
    description:
      "Decisions get made on outdated numbers because information is scattered across spreadsheets, WhatsApp threads, and someone’s memory — not in one place, and not up to date.",
    symptom:
      "Our numbers live in spreadsheets, WhatsApp threads and people’s heads. Nothing is current.",
    signals: ["Sheet v7_final", "WhatsApp thread", "Last synced: ?"],
    fixLabel: "Real-time BI dashboards",
    fix: "Real-time reporting and business intelligence dashboards centralise your data and surface it as it happens.",
    icon: "data",
  },
  {
    id: "missed-inquiries",
    index: "03",
    title: "Missed inquiries & slow replies",
    description:
      "Customer messages that arrive after hours, over the weekend, or during a busy period go unanswered for too long — and every unanswered message is a lost opportunity.",
    symptom:
      "Messages come in after hours and on weekends. By the time we reply, the lead is gone.",
    signals: ["Unread · 18h", "Weekend inbox", "Missed call"],
    fixLabel: "24/7 AI chat agents",
    fix: "24/7 AI chat agents respond instantly across every channel, and escalate to a human only when it’s genuinely needed.",
    icon: "inbox",
  },
  {
    id: "onboarding",
    index: "04",
    title: "Inconsistent onboarding & drop-off",
    description:
      "New clients, tenants, or staff are often left to figure things out themselves, with no repeatable process — leading to confusion, delays, and drop-off.",
    symptom:
      "Every new client gets onboarded differently, so half of them stall before they ever start.",
    signals: ["Step skipped", "No next step", "Dropped off"],
    fixLabel: "Automated onboarding flows",
    fix: "Automated onboarding flows deliver the right information and the right next step, the same way, every time.",
    icon: "onboarding",
  },
  {
    id: "revenue-visibility",
    index: "05",
    title: "No visibility into revenue",
    description:
      "Leadership finds out how the business is really performing weeks after the fact, once someone has had time to compile a report.",
    symptom:
      "I only find out how we actually performed weeks later, once someone compiles the report.",
    signals: ["Report: 3 wks late", "Unknown pipeline", "Manual compile"],
    fixLabel: "Automated performance tracking",
    fix: "Automated revenue and performance tracking shows what’s coming in, where, and when — as it happens.",
    icon: "revenue",
  },
];
