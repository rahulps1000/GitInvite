export interface IToken {
  user_id: number;
  repo_id: number;
  hash: string;
  created_on: Date;
  expiry: number;
}
