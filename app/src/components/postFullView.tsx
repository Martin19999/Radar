/**
 * PostFullView component
 * 
 * See posts in details
 * 
 */
import React, { useEffect, useState } from "react";
import { PostsPreview as PostsPreviewType } from "../types";
import { search } from "../utils/searchAction";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { timeCalculator } from "../utils/timeCalulator";
import { Card, CardBody, HStack } from '@chakra-ui/react';

import "../styles/common.css";

interface searchConditionType{
  searchQuery: string;
}

const PostFullView: React.FC<searchConditionType> = ({searchQuery}) => {
  const [searchResult, setSearchResult] = useState<PostsPreviewType[] | string | null >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setSearchResult(await search<PostsPreviewType>({searchType: 'posts-by-id', inputQuery: searchQuery}));
    }
    fetchData();
  },[]);

  return (
    searchResult === null || searchResult === undefined 
    ? <p>Post deleted...</p>
    : typeof searchResult === 'string' 
      ? <p>Error: {searchResult}</p>  // Render error message
      : 
        // Render search results if searchResult is of type PostsPreview  
        searchResult.map((post, index) => (
          <Card key={index}
                variant="outline">    
              <CardBody>     
                <HStack>
                  <img src={post.photo_url} className="mini-profile-pic" onClick={() => navigate(`/userdetail/${post.uid}/posts`)}/>
                  <p onClick={() => navigate(`/userdetail/${post.uid}/posts`)}>{post.display_name}</p>
                  <p>&#x2022; {timeCalculator(post.created_at.toString())}</p>
                </HStack>
                <strong><h1 className="post-preview-title">{post.title}</h1></strong>
                <p className="">{post.content.content}</p>                
              </CardBody>
          </Card>
        ))
    
  );
}

export default PostFullView;