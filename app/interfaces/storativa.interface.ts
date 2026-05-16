export interface IStorativa {
  userId: string;
  title: string;
  author: string;
  centralIdea: string;
  characters: Character[];
  contextType: number;
  storySize: number;
  timeToComplete: number;
  initialBasedDate: string;
  adaptedPeriods: AdaptedPeriod[];
  genderLabels: number[];
  content: string;
  status: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Character {
  type: number;
  name: string;
  physical: string;
  psychological: string;
  social: string;
  additional?: string;
}

export interface AdaptedPeriod {
  from: string;
  to: string;
  name: string;
  place: string;
}
