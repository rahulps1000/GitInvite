export type Repos = Array<IRepo>;

export interface IRepo {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  url: string;
  homepage: string | null;
  archived: boolean;
  disabled: boolean;
}
