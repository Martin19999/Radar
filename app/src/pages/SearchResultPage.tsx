/**
 * Search Result Page.tsx
 * 
 * Show the search result from a user.
 * 
 */

import Page from "../components/page";
import { useAuth } from "../context/authContext";
import { UserInfo } from "../types";
import { search } from "../utils/searchAction";
import { formatDate } from "../utils/formatDate";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Link as RouterLink  } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Link, CloseButton, Modal, ModalOverlay, ModalContent, ModalCloseButton, ModalBody, Tooltip, useMediaQuery } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Stack } from '@chakra-ui/react'
import "../styles/common.css";
import "../styles/searchResult.css";
import UsersPreview from "../components/usersPreView";
import PostsPreview from "../components/postsPreView";
 
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultPage: React.FC = () => {
	const { currentUser, userDetails } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const tabNames = ['users', 'posts-by-keyword', 'comments-by-keyword'];
  const currentPath = location.pathname.split("/")[2];
  
  const tabIndex = tabNames.indexOf(currentPath!);
  const query = useQuery().get('query');

  const handleTabsChange = async(index: number) => {
    navigate(`/${location.pathname.split("/")[1]}/${tabNames[index]}?query=${query}`);
  }; 

	return (
		<Page>
			<div className='userinfo-container'>				
				<div className='more-userinfo-container'>
					<Tabs index={tabIndex} onChange={handleTabsChange} >
						<TabList>
							<Tab>Users</Tab>
							<Tab>Posts</Tab>
							<Tab>Comments</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								<UsersPreview searchQuery={query ? query : ''}/>
							</TabPanel>
							<TabPanel>
								<PostsPreview searchCondition = "by-keyword" searchQuery={query ? query : ''}/>
							</TabPanel>
							<TabPanel>
								<>
									<p>display user pfps in grid, same as following</p>
								</>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>        
			</div>
		</Page>
		
	)
  
}

export default SearchResultPage;