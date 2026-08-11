export type Step = {
  id: string;
  index: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: 'discovery' | 'strategy' | 'build' | 'launch';
};

export const steps: Step[] = [
{
  id: 'discovery',
  index: '01',
  title: 'Discovery & Business Assessment',
  shortTitle: 'Discovery',
  description:
  'We start by understanding your business, not your tech stack. We find out where you currently stand and where AI can genuinely remove friction.',
  icon: 'discovery'
},
{
  id: 'strategy',
  index: '02',
  title: 'Strategy & Roadmap',
  shortTitle: 'Strategy',
  description:
  'We map out exactly what should be built, in what order, and what it will take from your team to make it work.',
  icon: 'strategy'
},
{
  id: 'build',
  index: '03',
  title: 'Build & Governance',
  shortTitle: 'Build',
  description:
  'We design and build with data privacy, compliance, and security built in from day one — not bolted on afterward.',
  icon: 'build'
},
{
  id: 'launch',
  index: '04',
  title: 'Launch & Support',
  shortTitle: 'Launch',
  description:
  'We deploy, train your team, and stay on to make sure the system keeps delivering.',
  icon: 'launch'
}];