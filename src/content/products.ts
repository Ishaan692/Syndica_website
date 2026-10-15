export type ProductStatus = 'live' | 'dev' | 'planned' | 'research';

export type ProductLayerId = 'structure' | 'connect' | 'understand';

export interface Product {
  slug: string;
  name: string;
  status: ProductStatus;
  statusLabel: string;
  layer: ProductLayerId;
  layerNumber: string;
  layerName: string;
  tagline: string;
  oneLiner: string;
  description: string;
  howItConnects: string;
  hasPage: boolean;
}

export const products: Product[] = [
  {
    slug: 'brokeros',
    name: 'BrokerOS',
    status: 'live',
    statusLabel: 'LIVE · PILOT IN PROGRESS',
    layer: 'structure',
    layerNumber: '01',
    layerName: 'STRUCTURE',
    tagline: 'The workspace for a commercial insurance brokerage.',
    oneLiner: 'The workspace for a commercial insurance brokerage.',
    description:
      'The workspace for a commercial insurance brokerage. Manage clients, policies, RFQs, quotes, commissions and documents in one structured flow.',
    howItConnects:
      'Produces the canonical records of clients, policies, quotes and claims that feed ClientOS and the operational graph.',
    hasPage: true,
  },
  {
    slug: 'clientos',
    name: 'ClientOS',
    status: 'dev',
    statusLabel: 'IN DEVELOPMENT',
    layer: 'structure',
    layerNumber: '01',
    layerName: 'STRUCTURE',
    tagline: "The client's side of the same deal.",
    oneLiner: "The client's side of the same deal.",
    description:
      'A client-facing counterpart to BrokerOS. Policyholders view coverage, track renewals and share documents without emailing their broker for every update.',
    howItConnects:
      'Connects directly to the broker’s live policy records in BrokerOS, ensuring both sides see the same state.',
    hasPage: false,
  },
  {
    slug: 'atlas',
    name: 'Atlas',
    status: 'planned',
    statusLabel: 'PLANNED · 2026',
    layer: 'understand',
    layerNumber: '03',
    layerName: 'UNDERSTAND',
    tagline: 'Analysis on top of BrokerOS and ClientOS data.',
    oneLiner: 'Analysis on top of BrokerOS and ClientOS data.',
    description:
      'An analysis and recommendations layer built on structured BrokerOS and ClientOS records that trace back to a verifiable source.',
    howItConnects:
      'Draws clean records from BrokerOS and ClientOS to model portfolio health, renewal risk and carrier appetite.',
    hasPage: false,
  },
  {
    slug: 'fabric',
    name: 'Fabric',
    status: 'research',
    statusLabel: 'IN RESEARCH',
    layer: 'connect',
    layerNumber: '02',
    layerName: 'CONNECT',
    tagline: 'A shared model of how an organization works.',
    oneLiner: 'A shared model of how an organization works.',
    description:
      'Research into a shared, permissioned model of how an organization works: who owns what, what depends on what, and the context behind each decision.',
    howItConnects:
      'Explores connecting people, responsibilities, projects and decisions into a permissioned organizational graph.',
    hasPage: false,
  },
  {
    slug: 'vector',
    name: 'Vector',
    status: 'research',
    statusLabel: 'IN RESEARCH',
    layer: 'connect',
    layerNumber: '02',
    layerName: 'CONNECT',
    tagline: 'Context for AI models that is current, sourced and permission-safe.',
    oneLiner: 'Context for AI models that is current, sourced and permission-safe.',
    description:
      'Research into giving AI models small, current, sourced, permission-safe context for the specific task in front of them.',
    howItConnects:
      'Tests time-bounded context retrieval algorithms against real operational records.',
    hasPage: false,
  },
];
