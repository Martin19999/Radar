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
import { useState } from 'react';


import "../styles/common.css";
import React from 'react';

const PostDetailPage = () => {
  const location = useLocation();
  const query = location.pathname.split('/')[2];

  const [commentAdded, setCommentAdded] = useState(false);

  const handleCommentAdded = () => {
    setCommentAdded(prev => !prev); 
  };

  return (
    <Page>
        <section className="blog-home">
          <PostFullView searchQuery={query}/>
          <CommentsView searchType="by-post" searchQuery={query} refresh={commentAdded}/>
          <PostAComment post_id={query} onCommentAdded={handleCommentAdded}/>
        </section>
        <Aside />
    </Page>
  ) 
}

export default PostDetailPage;


