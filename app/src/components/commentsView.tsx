/**
 * CommentsView component
 * 
 * See comments in "cards"
 * 
 */
import React, { useEffect, useState } from "react";
import { CommentsPreview } from "../types";
import { search } from "../utils/searchAction";
import { useParams, useNavigate, useLocation, Link as RouterLink  } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { timeCalculator } from "../utils/timeCalulator";
import { Card, CardHeader, CardBody, CardFooter, HStack, Stack } from '@chakra-ui/react';
import Page from "../components/page";

import "../styles/postDetail.css";
import "../styles/common.css";

interface searchConditionType{
  searchQuery: string;
}

const CommentsView: React.FC<searchConditionType> = ({searchQuery}) => {
  const [searchResult, setSearchResult] = useState<CommentsPreview[] | string | null >(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const fetchData = async () => {
      setSearchResult(await search<CommentsPreview>({searchType: 'comments-by-post', inputQuery: searchQuery}));
    }
    fetchData();
  },[]);

  return (
    searchResult === null || searchResult === undefined 
    ? <p>None...</p>
    : typeof searchResult === 'string' 
      ? <p>Error: {searchResult}</p>  // Render error message
      : 
        // Render search results if searchResult is of type PostsPreview  
        searchResult.map((comment, index) => (
          <Card key={index}
                variant="outline"> 
              <Stack>
                <CardBody>     
                  <HStack>
                    <img src={comment.photo_url} className="mini-profile-pic" onClick={() => navigate(`/userdetail/${comment.uid}/posts`)}/>
                    <p onClick={() => navigate(`/userdetail/${comment.uid}/posts`)}>{comment.display_name}</p>
                    <p>&#x2022; {timeCalculator(comment.created_at.toString())}</p>
                  </HStack>
                    <p className="comment-view">{comment.content.content}</p>                              
                </CardBody>
              </Stack>   
              
          </Card>
        ))
    
  );
}

export default CommentsView;