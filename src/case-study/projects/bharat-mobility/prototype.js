/**
 * BHARAT MOBILITY POD — Prototype Room (Workshop · Zone 05)
 * ---------------------------------------------------------------------------
 * The centerpiece of the Workshop.
 * Places the 3D model of the vehicle in the center of an infinite studio space.
 * Supports rotation, exploded view, layer toggles (Material, Body, Frame, Package),
 * and future GLB / animated models.
 */

const prototypeData = {
  title: 'Bharat Mobility Pod · Prototype',
  tagline: 'Production-accurate 3D NURBS dataset in virtual studio space.',
  modelUrl: 'assets/Project_1/3D Models/Detailed Sharp V2 · Highest 3D model.glb',

  specs: {
    length: '3,600 mm',
    width: '1,380 mm',
    threshold: '< 320 mm',
    capacity: '6 Forward-Facing Occupants',
    architecture: 'Decoupled EV Flat-Bed Skateboard',
  },

  modes: [
    { id: 'material', label: 'Material View', desc: 'Full CMF material rendering with studio specular highlights and reflections.' },
    { id: 'body', label: 'Body View', desc: 'Exterior volume inspection highlighting shut lines, canopy arch, and beltline profile.' },
    { id: 'frame', label: 'Frame View', desc: 'X-ray translucent skin revealing internal spaceframe cage and tubular structural members.' },
    { id: 'package', label: 'Package View', desc: 'Human packaging envelope, floor datum height, and occupant egress volume.' },
    { id: 'exploded', label: 'Exploded View', desc: 'Subsystem separation: lifting canopy, offsetting body panels, and revealing rolling chassis.' },
  ],

  futureSupport: {
    note: 'Engineered to accept future GLB models, embedded skeletal rig animations, and kinematic door slide sequences.',
  },
};

export default prototypeData;
