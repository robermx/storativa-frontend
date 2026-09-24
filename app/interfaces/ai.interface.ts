export type InitialPanoramaStatus =
  | 'not_requested'
  | 'generating'
  | 'ready'
  | 'failed';

export interface PanoramaSection {
  summary: string;
  points: string[];
}

export interface InitialPanoramaContent {
  temporalContext: PanoramaSection;
  characterCompass: PanoramaSection;
  narrativeCore: PanoramaSection;
  writingQuestions: string[];
}

export interface InitialPanoramaResponse {
  status: InitialPanoramaStatus;
  content?: InitialPanoramaContent;
  generatedAt?: string;
}
