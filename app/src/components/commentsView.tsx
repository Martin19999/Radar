/**
 * CommentsView component
 * 
 * See comments in "cards"
 * 
 */
import React, { useEffect, useState } from "react";
import { CommentsPreview } from "../types";
import { search } from "../utils/searchAction";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { timeCalculator } from "../utils/timeCalulator";
import { Card, CardBody, CardFooter, HStack, Stack } from '@chakra-ui/react';
import  EmptyResult from "./emptyResult";

import "../styles/postDetail.css";
import "../styles/common.css";
import { formatDate, formatDateMore } from "../utils/formatDate";

interface searchConditionType{
  searchType: string;
  searchQuery: string;
  refresh: boolean;
}

const CommentsView: React.FC<searchConditionType> = ({searchType, searchQuery, refresh}) => {
  const [searchResult, setSearchResult] = useState<CommentsPreview[] | string | null >(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setSearchResult(await search<CommentsPreview>({searchType: 'comments-'+searchType, inputQuery: searchQuery}));
    }
    fetchData();
  },[searchQuery, refresh]);

  return (
    searchResult === null || searchResult === undefined 
    ? <p>Loading</p>
    : typeof searchResult === 'string' 
      ? <p>Error: {searchResult}</p>  // Render error message
      : 
        // searchResult.length === 0 ? <EmptyResult /> :
        searchResult.map((comment, index) => (
          <Card key={index}
                variant="outline"> 
              <Stack className="comment-posts-card-stack">
                <CardBody>     
                  <HStack>
                    <img src={comment.photo_url} className="mini-profile-pic" onClick={() => navigate(`/userdetail/${comment.uid}/posts`)}/>
                    <p onClick={() => navigate(`/userdetail/${comment.uid}/posts`)}>{comment.display_name}</p>
                    {searchType != "by-post" ? <p>&#x2022; {timeCalculator(comment.created_at.toString())}</p> : null}
                  </HStack>
                    {searchType === "by-post" ?
                      <>
                        <p className="comment-post-fullview">{comment.content.content}</p>
                        <p className="comments-posts-footer">#{index+2} &#x2022; {formatDateMore(comment.created_at.toString())}</p>
                      </> 
                     :
                      <p className="comment-preview"
                        onClick={() => navigate(`/post/${comment.post_id}`)}>
                          {comment.content.content}
                      </p>}
                </CardBody>
              </Stack>   
              
          </Card>
        ))
    
  );
}

export default CommentsView;