/**
 * PostAComment component
 * 
 * A text input field + submit button
 * 
 */

import { useAuth } from '../context/authContext';
import React, { useState } from 'react';
import { HStack, Input, Button, Textarea, Stack } from '@chakra-ui/react';
import { useEasyToast } from './toast';
import DOMPurify from 'dompurify';
import { makeComments } from '../utils/makeComments';
import { useNavigate } from 'react-router-dom';


import "../styles/common.css";
import "../styles/aside.css";

interface PostACommentProps {
  post_id: string;
  onCommentAdded: () => void;
}

const PostAComment: React.FC<PostACommentProps> = ({post_id, onCommentAdded}) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showErrorNonFirebase } = useEasyToast();
  const { currentUser } = useAuth();
  const navigate = useNavigate();


  const isFormValid = () => {
    if ((comment?.replace(/^\s+|\s+$/g, "") ?? "").length > 0 ) {
      if ((DOMPurify.sanitize(comment!.replace(/^\s+|\s+$/g, ""))) ?? "".length > 0) {
        return true;
      }
    }
    return false;
  };

  async function post () {
    setIsSubmitting(true);
    try {
      await makeComments(comment, currentUser!.uid, post_id);
      onCommentAdded();
    } catch (error) {
      showErrorNonFirebase((error as Error).message);
    } finally {
      setComment('');
      setIsSubmitting(false);
      showSuccess('Comment submitted!');
    }
    
  }

  return(
    <div className='comment-form-container'>
      <form>
        <h1>Reply to this post</h1>
        {currentUser ?
      
        <Stack>
          <Textarea placeholder='Post a comment here' 
                  value={comment} 
                  onChange={ (e)=>{setComment(e.target.value)}} 
                  maxLength={10000}
                  id='comment-textarea'
                  data-cy=''/>
          <Button onClick={()=>post()} 
                  isDisabled={!isFormValid() || isSubmitting } 
                  isLoading={isSubmitting} 
                  variant='smallFormSubmitButton'
                  data-cy='s-submit'>
            Submit
          </Button>
        </Stack>
      :
      
        <Stack>
          <Input placeholder='Log in to comment' />
          <Button isDisabled={true} 
                  variant='smallFormSubmitButton'>
            Submit
          </Button>
        </Stack>}
      </form>
    </div>


    
  )
};

export default PostAComment;