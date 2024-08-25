import { search } from "./searchAction"
export async function getNumofPosts(uid: string): Promise<number> {
  const result = await search<{ count: string }>({searchType: 'posts-quantity-by-user', inputQuery:uid});
  if (result.length > 0) return parseInt(result[0].count, 10);
  else return 0;
}