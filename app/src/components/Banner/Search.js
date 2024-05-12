/**
 * Search component
 * 
 * Handles form submission. Initiates a POST requests
 * 
 */

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Link, IconButton } from '@chakra-ui/react';
import { IoSearchOutline } from "react-icons/io5";




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
                  onChange={(e) => setInput(e.target.value)}/>
        
          <InputRightElement>
            <IconButton type="submit" aria-label='Search database' icon={<IoSearchOutline />} variant="unstyled" />
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
