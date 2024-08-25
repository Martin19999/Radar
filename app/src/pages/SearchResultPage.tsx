/**
 * Search Result Page.tsx
 * 
 * Show the search result from a user.
 * 
 */

import Page from "../components/page";
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import UsersPreview from "../components/usersPreView";
import PostsPreview from "../components/postsPreView";
import CommentsView from "../components/commentsView";

import "../styles/common.css";
import "../styles/searchResult.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultPage: React.FC = () => {
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
                <CommentsView searchType="by-keyword" searchQuery={query ? query : ''}/>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>        
			</div>
		</Page>	
	)
}

export default SearchResultPage;