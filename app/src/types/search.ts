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

// export interface SearchResults {
//   rowCount: number;
//   rows: UserInfo[];
// }

interface PostContent {
  type: string;
  content: string;
}

export interface PostsPreview {
  uid: string; 
  display_name: string;
  photo_url: string;
  title: string;
  content: PostContent;
  created_at: Date;
  post_id: string;
}


export interface CommentsPreview {
  uid: string; 
  display_name: string;
  photo_url: string;
  content: PostContent;
  created_at: Date;
  post_id: string;
}