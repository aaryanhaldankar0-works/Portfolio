/**
 * BHARAT MOBILITY POD — Field Notebook (Workshop · Zone 01)
 * ---------------------------------------------------------------------------
 * The research archive. Every entry below comes from the project's existing
 * field research (see bharat-mobility.workshop.js). Nothing is invented.
 *
 * HOW TO GROW THIS NOTEBOOK
 *  - Add an object to `entries`. That's it — the wall lays itself out.
 *  - `section` decides which part of the wall it is pinned to.
 *  - Add `src` to any photo / map / video / document to pin the real file.
 *    Entries without `src` stay pinned as an empty frame with your caption,
 *    so you can see what still needs to be scanned or uploaded.
 *
 * Entry types:
 *  photo          { caption, src?, alt?, note? }
 *  note           { title?, text }                    — observation card
 *  questionnaire  { title, date?, questions: [] }     — notebook page
 *  journey        { title, steps: [{ label, friction }] }
 *  map            { caption, src?, note? }
 *  video          { caption, src?, poster?, note? }
 *  document       { caption, href, note? }
 */

const fieldNotebook = {
  intro: 'Pinned as it was collected — walking Tier 2 & 3 streets, standing at tracker ranks, asking people how they get around.',

  sections: [
    { id: 'terrain', label: 'Terrain' },
    { id: 'photography', label: 'Photography' },
    { id: 'journey-maps', label: 'Journey Maps' },
    { id: 'interviews', label: 'Interviews' },
    { id: 'questionnaires', label: 'Questionnaires' },
    { id: 'observations', label: 'Observations' },
    { id: 'maps', label: 'Maps' },
    { id: 'videos', label: 'Videos' },
  ],

  entries: [
    /* ---- Terrain ------------------------------------------------------- */
    {
      section: 'terrain',
      type: 'photo',
      caption: 'Village roads',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.35 AM (2).jpeg',
      note: 'Unpaved connectors, variable grades, unbanked turns.',
    },
    {
      section: 'terrain',
      type: 'photo',
      caption: 'Urban roads',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.35 AM (3).jpeg',
      note: 'Shared multi-speed corridors — two-wheelers, pedestrians, arterial traffic.',
    },
    {
      section: 'terrain',
      type: 'photo',
      caption: 'Commercial roads',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.35 AM (4).jpeg',
      note: 'Curb encroachment, informal pickup stops, heavy pedestrian cross-flow.',
    },
    {
      section: 'terrain',
      type: 'photo',
      caption: 'Narrow lanes',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.36 AM (3).jpeg',
      note: 'Under 4 m. City buses physically cannot enter or turn.',
    },

    /* ---- Photography ---------------------------------------------------- */
    {
      section: 'photography',
      type: 'photo',
      caption: 'The living city',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.35 AM.jpeg',
      note: 'First day out of the studio observing street rhythms.',
    },
    {
      section: 'photography',
      type: 'photo',
      caption: 'Narrow-road transit reality',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.36 AM (2).jpeg',
      note: 'Where buses can’t go, shared vehicles and two-wheelers take over.',
    },
    {
      section: 'photography',
      type: 'photo',
      caption: 'Shared Transit Corridor',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.36 AM (1).jpeg',
      note: 'High-frequency roadside boarding and traffic mixing.',
    },
    {
      section: 'photography',
      type: 'photo',
      caption: 'Market Junction Dynamics',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.36 AM (4).jpeg',
      note: 'Informal halts and pedestrian crowd interaction.',
    },
    {
      section: 'photography',
      type: 'photo',
      caption: 'District Periphery Flow',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.36 AM (5).jpeg',
      note: 'Variable surface paving transitioning into rural connectors.',
    },
    {
      section: 'photography',
      type: 'photo',
      caption: 'Street Cross-Section Observation',
      src: 'assets/Project_1/Photos/Terrain/WhatsApp Image 2026-03-02 at 12.30.36 AM.jpeg',
      note: 'Analyzing lane widths, curb gutter clearances, and sidewalk absence.',
    },

    /* ---- Journey maps --------------------------------------------------- */
    {
      section: 'journey-maps',
      type: 'journey',
      title: 'A typical commute',
      steps: [
        { label: 'Walk', friction: 'No footpath, weather' },
        { label: 'Tracker', friction: '10–15 min wait, cramped' },
        { label: 'Bus', friction: 'Transfer, delays' },
        { label: 'Walk', friction: 'Market crossings, fatigue' },
        { label: 'Destination', friction: 'Arrive tired' },
      ],
    },

    /* ---- Interviews ----------------------------------------------------- */
    {
      section: 'interviews',
      type: 'photo',
      caption: 'Commuter Field Observation 01',
      src: 'assets/Project_1/Photos/user/Screenshot 2026-10-14 132635.png',
      note: 'On-site user interaction and transit stop documentation.',
    },
    {
      section: 'interviews',
      type: 'photo',
      caption: 'Commuter Field Observation 02',
      src: 'assets/Project_1/Photos/user/Screenshot 2026-10-14 132655.png',
      note: 'Evaluating curbside dwell time and passenger boarding behavior.',
    },
    {
      section: 'interviews',
      type: 'photo',
      caption: 'Commuter Field Observation 03',
      src: 'assets/Project_1/Photos/user/Screenshot 2026-10-14 132705.png',
      note: 'Observing luggage placement and ingress threshold navigation.',
    },
    { section: 'interviews', type: 'note', title: 'Bus stands · tracker ranks · market junctions', text: 'People plan their whole day around how often a vehicle comes — not how far they’re going.' },
    { section: 'interviews', type: 'note', text: 'A 5 km trip often means two vehicle changes and long waits on the roadside.' },
    { section: 'interviews', type: 'note', text: 'Cash at every transfer. Nobody knows what the trip will cost.' },

    /* ---- Questionnaires ------------------------------------------------- */
    {
      section: 'questionnaires',
      type: 'questionnaire',
      title: 'Commuter inquiry',
      date: 'On-site · Semester 01',
      questions: [
        'How do you travel to work?',
        'How do you buy groceries?',
        'How do you watch movies?',
        'How do you travel for leisure?',
        'How do you reach the city centre?',
      ],
    },
    { section: 'questionnaires', type: 'document', caption: 'Bharat Mobility — research info', href: 'assets/Project_1/Case Study/Bharat_mobility_info.pdf' },

    /* ---- Observations --------------------------------------------------- */
    { section: 'observations', type: 'note', title: '10–15 min', text: 'Dead time at every junction. No schedule.' },
    { section: 'observations', type: 'note', title: 'Driver income', text: 'Drivers won’t leave until every seat is full — early riders wait.' },
    { section: 'observations', type: 'note', title: 'Discomfort', text: 'Waiting on dusty roadsides or inside stationary, unventilated cabins.' },
    { section: 'observations', type: 'note', title: 'Occupancy', text: 'Either parked half-empty or overloaded. Nothing in between.' },
    { section: 'observations', type: 'note', title: 'Comfort', text: 'Noise, high steps, knees colliding, nowhere for bags.' },
    { section: 'observations', type: 'note', title: 'The insight', text: 'The vehicle wasn’t the problem. The journey was.' },

    /* ---- Maps / Videos — pin real files here as they're scanned -------- */
  ],
};

export default fieldNotebook;
