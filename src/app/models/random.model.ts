export interface RandomNumber {
  value: number;
  generator_user: string;
  created: string;
  updated: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
