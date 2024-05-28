/**
 * Search component
 * 
 * In the banner. Handles form submission. Initiates a POST request
 * 
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from 'dompurify';
import { useEasyToast } from "../toast";

import { Input, InputGroup, InputRightElement, IconButton, Button } from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";
import "../../styles/common.css";

const Search = () => {
  const [input, setInput] = useState<string>("");
  const navigate = useNavigate();
  const { showErrorNonFirebase } = useEasyToast();

  const isFormValid = (userInput: string) => {
    const input_spaceless = userInput.replace(/\s+/g, ' ').trim();
    const sanitized_input = DOMPurify.sanitize(input_spaceless);
    if (sanitized_input.length > 0) {
      setInput(sanitized_input); 
      localStorage.setItem("input", sanitized_input ); 
      return true;
    }
    return false;
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement> ) => {
    e.preventDefault();

    if (isFormValid(input)) {
      navigate('/result/users', {state:{input: input}})
    }
  };

  useEffect(() => {
    // persistence in the search box
    setInput(localStorage.getItem("input")?? "");
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="search-form"> 
        <InputGroup>
          <Input id="searchField"
                  type="text"
                  placeholder="Search Radar"
                  value={input || ""}
                  maxLength={100}
                  onChange={(e) => setInput(e.target.value)}
                  variant='searchBar'/>
        
          <InputRightElement>
            <Button type="submit" as={IconButton} aria-label='Search database' icon={<IoSearchOutline />} variant="unstyled" />
          </InputRightElement>
        </InputGroup>    
    </form>
  );
};

export default Search;
