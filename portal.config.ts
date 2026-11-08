/**
 * Antipolo City Transparency Portal.
 *
 * Antipolo's two legislative districts are built by the Rizal 1st District
 * Engineering Office, which also serves Rizal's 1st District (Tier B): its
 * figures are shown whole, never split. The place name brings in every line in
 * the four programs whose title names Antipolo, and the enacted budgets
 * (2020–2026) whose program names name it.
 */
import { defineConfig } from './src/config';
import { exclusions } from './exclusions';

export default defineConfig({
  id: 'antipolo-city',
  kind: 'city',
  name: 'Antipolo City',
  shortName: 'Antipolo',
  // Who runs this portal. Put your own name or organisation here.
  operator: { name: 'Antipolo citizens, on BetterGov.ph data' },
  buildYourOwnStrip: false,
  scope: {
    offices: ['Rizal 1st District Engineering Office'],
    places: [{ label: 'Antipolo', region: 'IV-A' }],
    districts: ['leg:antipolo-city:1st', 'leg:antipolo-city:2nd'],
    exclude: exclusions,
  },
  reporting: { enabled: false },
});
