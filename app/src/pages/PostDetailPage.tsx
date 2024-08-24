/**
 * PostDetail page
 * 
 * See posts in details
 * 
 */
import React, { useEffect, useState } from "react";
import { PostsPreview as PostsPreviewType } from "../types";
import { search } from "../utils/searchAction";
import { useParams, useNavigate, useLocation, Link as RouterLink  } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { timeCalculator } from "../utils/timeCalulator";
import { Card, CardHeader, CardBody, CardFooter, HStack } from '@chakra-ui/react';
import Page from "../components/page";
import Aside from "../components/aside";
import PostFullView from "../components/postFullView";
import PostAComment from "../components/postAComment";
import CommentsView from "../components/commentsView";


import "../styles/common.css";


const PostDetailPage = () => {
  const [searchResult, setSearchResult] = useState<PostsPreviewType[] | string | null >(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const query = location.pathname.split('/')[2];

  return (
    <Page>
        <section className="blog-home">
          <PostFullView searchQuery={query}/>
          <CommentsView searchQuery={query}/>
          <PostAComment post_id={query}/>
        </section>
        <Aside />
    </Page>

  )
  
}

export default PostDetailPage;