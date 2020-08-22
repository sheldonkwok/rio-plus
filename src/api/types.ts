export interface RunsResponse {
  name: string;
  runs: Run[];
  summary: Summary;
}

export interface Run {
  id: number;
  level: number;
  passed: boolean;
}

export interface Summary {
  numCompleted: number;
  numPassed: number;
  numFailed: number;
}
