/**
 * UsersPreview component
 * 
 * See users in a set of "cards"
 * 
 */
import React, { useEffect, useState } from "react";
import { UserInfo } from "../types";
import { search } from "../utils/searchAction";
import { useParams, useNavigate, useLocation, Link as RouterLink  } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { timeCalculator } from "../utils/timeCalulator";
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react';
import { formatDate } from "../utils/formatDate";

import "../styles/common.css";

interface searchConditionType{
  searchQuery: string;
}

const UsersPreview: React.FC<searchConditionType> = ({searchQuery}) => {
  const [searchResult, setSearchResult] = useState<UserInfo[] | string | null >(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setSearchResult(await search<UserInfo>({searchType: 'users', inputQuery: searchQuery}));
    }
    fetchData();
  },[searchQuery]);
  
  return (
    searchResult === null || searchResult === undefined ? 
      <p>No results found or still loading...</p>
     : typeof searchResult === 'string' ? 
      <p>Error: {searchResult}</p>  // Render error message
     : 
        // Render search results if searchResult is of type UserInfo
      
        searchResult.map((user, index) => (
          <Card key={index}
                onClick={()=>navigate(`/userdetail/${user.uid}/posts`, {state: {userinfo: user}})}
                variant='outline'>
            <img src={user.photo_url} className='pfp-in-cards'/>
            <Stack>
              <CardBody>
                <strong><h2>{user.display_name}</h2></strong>
                <p>Member since: {formatDate(user.created_at.toString())}</p>
              </CardBody>
            </Stack>
            
          </Card>
        ))
    
  );
}

export default UsersPreview;