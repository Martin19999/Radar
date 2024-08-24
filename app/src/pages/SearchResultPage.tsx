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
 


const SearchResultPage: React.FC = () => {
	const { currentUser, userDetails } = useAuth();
  const [searchResult, setSearchResult] = useState<UserInfo[] | string | null >(null);

  const { uid } = useParams();

  const navigate = useNavigate();
  const location = useLocation();
  const tabNames = ['users', 'posts', 'comments'];
  const tabIndex = tabNames.indexOf(location.pathname.split("/").pop()!) || 0;
  const handleTabsChange = async(index: number) => {
    navigate(`/${location.pathname.split("/")[1]}/${tabNames[index]}`);
    const result = await search({searchType: 'users', inputQuery: location.state.input});
    console.log(result);
  }; 

  useEffect(() => {
    const fetchData = async () => {
      setSearchResult(await search<UserInfo>({searchType: 'users', inputQuery: location.state.input}));
    }
    if(location.state) fetchData();
  },[location.state?.input]);

	return (
		<Page>
			<div className='userinfo-container'>
				{/* <Link as={RouterLink} onClick={() => navigate(-1)}><CloseButton variant='userinfoCloseButton'/></Link> */}
				
				<div className='more-userinfo-container'>
					<Tabs index={tabIndex} onChange={handleTabsChange} >
						<TabList>
							<Tab>Users</Tab>
							<Tab>Posts</Tab>
							<Tab>Comments</Tab>
						</TabList>

						<TabPanels>
							<TabPanel>
								<>
                  
                  {(searchResult === null || searchResult === undefined) ? (
                    <p>No results found or still loading...</p>
                  ) : typeof searchResult === 'string' ? (
                    <p>Error: {searchResult}</p>  // Render error message
                  ) : (
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
                  )}
                  
								</>
							</TabPanel>
							<TabPanel>
								<>
									<p>display user pfps in grid, same as followers</p>
								</>
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