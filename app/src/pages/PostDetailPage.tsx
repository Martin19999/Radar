/**
 * PostDetail page
 * 
 * See posts in details
 * 
 */

import { useLocation } from 'react-router-dom';
import Page from "../components/page";
import Aside from "../components/aside";
import PostFullView from "../components/postFullView";
import PostAComment from "../components/postAComment";
import CommentsView from "../components/commentsView";

import "../styles/common.css";

const PostDetailPage = () => {
  const location = useLocation();
  const query = location.pathname.split('/')[2];

  return (
    <Page>
        <section className="blog-home">
          <PostFullView searchQuery={query}/>
          <CommentsView searchType="by-post" searchQuery={query}/>
          <PostAComment post_id={query}/>
        </section>
        <Aside />
    </Page>
  ) 
}

export default PostDetailPage;