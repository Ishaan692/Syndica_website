export interface Founder {
  name: string;
  role: string;
  bio: string; // Empty string per prompt instructions. Component renders only if non-empty.
}

export const founders: Founder[] = [
  {
    name: 'Ishaan',
    role: 'CO-FOUNDER',
    // TODO: Add real bio when provided by founder. Do not invent details.
    bio: '',
  },
  {
    name: 'Vatsal',
    role: 'CO-FOUNDER',
    // TODO: Add real bio when provided by founder. Do not invent details.
    bio: '',
  },
];
