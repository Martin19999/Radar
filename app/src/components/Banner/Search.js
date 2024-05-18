/**
 * Search component
 * 
 * In the banner. Handles form submission. Initiates a POST request
 * 
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input, InputGroup, InputRightElement, IconButton, Button } from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";

import "../../styles/common.css";

const Search = () => {
  const [input, setInput] = useState("");
  const [emptyError, setEmptyError] = useState(false);
  const [illegalError, setIllegalError] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 1. Empty 2. Too Long 3. Illegal characters all get handled
    if (input === null || input.trim().length === 0) {
      setEmptyError(true);
      setIllegalError(false);
    } else if (input.trim().length > 100) {
      setEmptyError(false);
      setInput(input.substring(0, 100));
    } else {
      setEmptyError(false);
      localStorage.setItem("input", input);
      if (!/^[A-Za-z\s'-]+$/.test(input)) {
        setIllegalError(true);
      } else {
        setIllegalError(false);
        try {
          fetch(process.env.REACT_APP_URL, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "text/plain",
            },
            body: input,
          }).then((response) => {
            if (response.ok) {
              navigate("/result");
            } else {
              navigate("/error", { state: { status: response.status } });
            }
          });
        } catch (error) {
          navigate("/error", { state: { status: "network-error" } });
        }
      }
    }
  };

  useEffect(() => {
    // persistence in the search box
    setInput(localStorage.getItem("input"));
  }, []);

  return (
    <form onSubmit={handleFormSubmit} className="search-form"> 
        <InputGroup>
          <Input id="searchField"
                  type="text"
                  placeholder="Search Radar"
                  value={input || ""}
                  onChange={(e) => setInput(e.target.value)}
                  variant='searchBar'/>
        
          <InputRightElement>
            <Button type="submit" as={IconButton} aria-label='Search database' icon={<IoSearchOutline />} variant="unstyled" />
          </InputRightElement>
        </InputGroup>
        
      
      

      {/* 1. Empty error msg 
          2. Illegal error msg
          3. No error msg */}
      {/* {emptyError && <div className="error-msg">! Input cannot be empty</div>}

      {illegalError && (
        <div className="error-msg">
          ! The only special characters allowed: spaces, hyphens & apostrophes
        </div>
      )}
      {!emptyError && !illegalError && <div className="invisible-div">a </div>} */}
    </form>
  );
};

export default Search;
