export interface IStorativa {
  _id: string;
  userId: string;
  title: string;
  author: string;
  justification: string;
  characterType: number;
  contextType: number;
  storySize: number;
  timeToComplete: number;
  initialPeriodDate: number;
  finalPeriodDate: number;
  place: string;
  initialBasedDate: number;
  periodName: string;
  tags: string[];
  content: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}
