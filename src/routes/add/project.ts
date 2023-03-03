export interface project {
  projectName: string;
  description: string;
  manager: string;
  devs: string[];
  github: string;
  customerFreq: number;
  budget: number;
  start: string;
  deadline: string;
  type: string;
  atRisk?: boolean;
  complete?: boolean;
}
