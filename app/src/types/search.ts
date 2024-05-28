export interface SearchRequest {
  searchType: string;
  inputQuery: string;
}

export interface UserInfo {
  uid: string,
  display_name: string;
  photo_url: string;
  created_at: Date;
}

export interface SearchResults {
  rowCount: number;
  rows: UserInfo[];
}