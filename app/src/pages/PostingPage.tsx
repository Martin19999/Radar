/**
 * PostingPage.tsx
 * 
 * Posting page.
 * 
 */

import Page from "../components/page";
import { useState } from "react";
import { Textarea, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useAuth } from "../context/authContext";
import { useEasyToast } from "../components/toast";
import { makePosts } from "../utils/makePosts";
import DOMPurify from 'dompurify';
import { useNavigate } from "react-router-dom";

import "../styles/common.css";
import "../styles/posting.css";

const PostingPage = () => {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showErrorNonFirebase } = useEasyToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const isFormValid = () => {
    if ((title?.replace(/^\s+|\s+$/g, "") ?? "").length > 0 && (content?.replace(/^\s+|\s+$/g, "") ?? "").length > 0) {
      if (((DOMPurify.sanitize(title!.replace(/^\s+|\s+$/g, ""))) ?? "".length > 0) 
        && ((DOMPurify.sanitize(content!.replace(/^\s+|\s+$/g, ""))) ?? "".length > 0)) {
        return true
      }
    }
    return false;
  };

  async function post () {
    setIsSubmitting(true);

    let post_id: string | null = '';

    try {
      post_id = await makePosts({
        title: title,
        content: content,
      }, 
        currentUser!.uid)
    } catch (error) {
      showErrorNonFirebase((error as Error).message);
    } finally {
      navigate(`/post/${post_id}`);
      setIsSubmitting(false);
      showSuccess('Post submitted!');
    }   
  }

  return(
		<Page>
      <div className='posting-container'>
        <h1>Create a post</h1>
        <form>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input value={title} 
                    onChange={ (e)=>{setTitle(e.target.value)}} 
                    maxLength={200}
                    data-cy=''/>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Content</FormLabel>
            <Textarea value={content} 
                    onChange={ (e)=>{setContent(e.target.value)}} 
                    maxLength={10000}
                    id='posting-textarea'
                    data-cy=''/>
          </FormControl>
          <Button onClick={()=>post()} 
                  isDisabled={!isFormValid() || isSubmitting || !currentUser } 
                  isLoading={isSubmitting} 
                  variant='smallFormSubmitButton'
                  data-cy='s-submit'>
             Submit
          </Button>
        </form>
      </div>
    </Page>
    )
}

export default PostingPage;