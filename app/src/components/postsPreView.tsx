/**
 * PostsPreview component
 * 
 * See posts in a set of "cards"
 * 
 */
import React, { useEffect, useState } from "react";
import { PostsPreview as PostsPreviewType } from "../types";
import { search } from "../utils/searchAction";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { timeCalculator } from "../utils/timeCalulator";
import { Card, CardBody, HStack } from '@chakra-ui/react';

import "../styles/common.css";

interface searchConditionType{
  searchCondition: string;
  searchQuery: string;
}

const PostsPreview: React.FC<searchConditionType> = ({searchCondition, searchQuery}) => {
  const [searchResult, setSearchResult] = useState<PostsPreviewType[] | string | null >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setSearchResult(await search<PostsPreviewType>({searchType: 'posts'+'-'+searchCondition, inputQuery: searchQuery}));
    }
    fetchData();
  },[searchQuery]);
  
  return (
    (searchResult === null || searchResult === undefined) ? (
      <p>No results found or still loading...</p>
    ) : typeof searchResult === 'string' ? (
      <p>Error: {searchResult}</p>  // Render error message
    ) : (
        // Render search results if searchResult is of type PostsPreview
      
        searchResult.map((post, index) => (
          <Card key={index}
                variant='outline'>    
              <CardBody>
              {searchCondition !== 'by-user' ?
                  (<HStack>
                  <img src={post.photo_url} className="mini-profile-pic" onClick={() => navigate(`/userdetail/${post.uid}/posts`)}/>
                  <p onClick={() => navigate(`/userdetail/${post.uid}/posts`)}>{post.display_name}</p>
                  <p>&#x2022; {timeCalculator(post.created_at.toString())}</p>
                  </HStack>)
                :  null}
                
                <div onClick={() => navigate(`/post/${post.post_id}`)}>
                  <HStack>
                    <strong><h1 className="post-preview-title">{post.title}</h1></strong>
                    {searchCondition === 'by-user' ?
                    <p>&#x2022; {timeCalculator(post.created_at.toString())}</p> 
                    : null}
                  </HStack>
                  
                  
                  <p className="post-preview-content">{post.content.content}</p>
                </div>
                
              </CardBody>
          </Card>
        ))
    )
  );
}

export default PostsPreview;