import {
  FullWidthImage,
  SplitLayout,
  EditorialTextBlock,
  ResearchGrid,
  SketchGallery,
  EngineeringSection,
  Timeline,
  QuoteBlock,
  LargeStatement,
  TransitionDivider,
  ComparisonModule,
  ImagePlaceholder,
  FutureSketchPlaceholder,
  FutureRenderPlaceholder,
  NotebookQuestions,
  JourneyMap,
  JourneyMotionGraphic,
  ModularSketchSystem,
  AIWorkflow,
  ArchitectureComparison,
  ModularApplications,
  FleetManagement,
  UnreservedTicketing,
  UnionIntegration,
  PhotoCollage,
  DesignQuestion,
  DesignDecision,
  ObservationDecisionList,
  LearnDecideBlock,
} from './components/index.js';

/**
 * Block registry — maps the `type` string used in project configs to a component.
 * Layouts are never hard-coded: a chapter is just an ordered list of blocks.
 */
export const BLOCKS = {
  fullWidthImage: FullWidthImage,
  split: SplitLayout,
  editorial: EditorialTextBlock,
  researchGrid: ResearchGrid,
  sketchGallery: SketchGallery,
  engineering: EngineeringSection,
  timeline: Timeline,
  quote: QuoteBlock,
  statement: LargeStatement,
  divider: TransitionDivider,
  comparison: ComparisonModule,
  image: ImagePlaceholder,
  sketch: FutureSketchPlaceholder,
  render: FutureRenderPlaceholder,
  notebook: NotebookQuestions,
  journeyMap: JourneyMap,
  journeyMotion: JourneyMotionGraphic,
  sketchSystem: ModularSketchSystem,
  aiWorkflow: AIWorkflow,
  architectureComparison: ArchitectureComparison,
  modularApplications: ModularApplications,
  fleetManagement: FleetManagement,
  unreservedTicketing: UnreservedTicketing,
  unionIntegration: UnionIntegration,
  collage: PhotoCollage,
  designQuestion: DesignQuestion,
  designDecision: DesignDecision,
  observationDecisions: ObservationDecisionList,
  learnDecide: LearnDecideBlock,
};



export function BlockRenderer({ block }) {
  const Component = BLOCKS[block?.type];
  if (!Component) {
    if (import.meta.env.DEV) console.warn(`[CaseStudy] Unknown block type: "${block?.type}"`);
    return null;
  }
  return <Component {...(block.props || {})} />;
}
