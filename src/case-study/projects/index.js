import bharatMobility from './bharat-mobility.js';
import ebsTech from './ebs-tech.js';

/**
 * Registry of projects that have a native web case study.
 * Add a new project by creating a config file and registering it here.
 */
const CASE_STUDIES = {
  [bharatMobility.id]: bharatMobility,
  [ebsTech.id]: ebsTech,
};

export function getCaseStudyConfig(id) {
  return CASE_STUDIES[id] || null;
}

export default CASE_STUDIES;

