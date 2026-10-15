export interface BrokerOSFeature {
  name: string;
  category: string;
  description: string;
  verified: boolean;
}

export const brokerosFeatures: BrokerOSFeature[] = [
  // ─── VERIFIED (RENDER ONLY THESE) ───
  {
    name: 'Deal flow with stage tracking',
    category: 'Deals',
    description: 'RFQ to QCR to Policy to Commission deal flow with stage tracking.',
    verified: true,
  },
  {
    name: 'Multi-carrier quote comparison',
    category: 'Deals',
    description: 'Compare carrier quotes side by side in a structured Quote Comparison Report.',
    verified: true,
  },
  {
    name: 'Clients',
    category: 'Directory',
    description: 'Every client, with their policies and claims attached.',
    verified: true,
  },
  {
    name: 'Policies',
    category: 'Deals',
    description: 'Each policy links back to the RFQ and quote that produced it.',
    verified: true,
  },
  {
    name: 'Renewals',
    category: 'Deals',
    description: 'Built from your policy records, so the list builds itself.',
    verified: true,
  },
  {
    name: 'Claims',
    category: 'Deals',
    description: 'Reported, tracked and linked to the policy they belong to.',
    verified: true,
  },
  {
    name: 'Commissions',
    category: 'Finance',
    description: 'Tracked per policy and kept separate from premium.',
    verified: true,
  },
  {
    name: 'Insurers',
    category: 'Directory',
    description: 'Which insurers write what, and how strong the relationship is. Used to suggest who to approach.',
    verified: true,
  },
  {
    name: 'Documents',
    category: 'Workspace',
    description: 'A library of everything uploaded or generated.',
    verified: true,
  },
  {
    name: 'Document generation',
    category: 'Documents',
    description: 'Seven documents generated as PDFs from existing records: RFQ, QCR, Placement Slip, Placement Letter, Risk Cover Letter, Policy Cover Letter, Policy Cover Page.',
    verified: true,
  },
  {
    name: 'Deal calendar',
    category: 'Workspace',
    description: 'RFQ deadlines, quote expiries and renewals on one calendar.',
    verified: true,
  },
  {
    name: 'Search',
    category: 'Workspace',
    description: 'One search box across clients, policies, quotes and claims.',
    verified: true,
  },
  {
    name: 'Export',
    category: 'Workspace',
    description: 'Take your data out as CSV, or as a full organization export.',
    verified: true,
  },
  {
    name: 'Team and access',
    category: 'Organization',
    description: "Each organization's data is its own. Employees sign in with codes issued by an admin, and roles decide who can see and change what.",
    verified: true,
  },
  {
    name: 'WhatsApp sharing',
    category: 'Communication',
    description: 'Share generated documents and policy details directly via WhatsApp.',
    verified: true,
  },
  {
    name: 'Internal comments',
    category: 'Collaboration',
    description: 'Add internal notes with @mentions on any deal or policy.',
    verified: true,
  },

  // ─── UNVERIFIED (MUST NEVER RENDER) ───
  {
    name: 'Email sending',
    category: 'Communication',
    description: 'Direct outbound email dispatch from workspace.',
    verified: false,
  },
  {
    name: 'Automated renewal reminders',
    category: 'Renewals',
    description: 'Automated scheduled notification dispatch.',
    verified: false,
  },
  {
    name: 'Expiring client share links',
    category: 'Documents',
    description: 'Public temporary links with self-destruction.',
    verified: false,
  },
  {
    name: 'Audit log',
    category: 'Organization',
    description: 'Centralized administrative event audit ledger.',
    verified: false,
  },
  {
    name: 'Payments and installments',
    category: 'Finance',
    description: 'Payment gateway collection and installment automation.',
    verified: false,
  },
  {
    name: 'Deeper claims management',
    category: 'Claims',
    description: 'Multi-party surveyor adjustor portal.',
    verified: false,
  },
  {
    name: 'Endorsements',
    category: 'Deals',
    description: 'Endorsement version tracking.',
    verified: false,
  },
  {
    name: 'Co-insurance',
    category: 'Deals',
    description: 'Multi-insurer risk sharing schedules.',
    verified: false,
  },
  {
    name: 'Cross-sell',
    category: 'Deals',
    description: 'Automated cross-sell policy recommendations.',
    verified: false,
  },
  {
    name: 'Renewal lineage',
    category: 'Renewals',
    description: 'Multi-year policy chain visualization.',
    verified: false,
  },
  {
    name: 'Document version history',
    category: 'Documents',
    description: 'Binary diff and revision tree.',
    verified: false,
  },
  {
    name: 'Insurer response-time tracking',
    category: 'Directory',
    description: 'Carrier SLA metrics.',
    verified: false,
  },
  {
    name: 'Birthday reminders',
    category: 'Workspace',
    description: 'Client relationship date reminders.',
    verified: false,
  },
  {
    name: 'Guided tour',
    category: 'Workspace',
    description: 'Onboarding walkthrough.',
    verified: false,
  },
];
