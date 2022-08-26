import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler} className='d-flex' inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search products'
        className='mr-sm-2 ml-sm-5'
        aria-label='Search'
      />
      <Button
        type='submit'
        variant='outline-light'
        className='p-2'
        style={{ borderRadius: "5px" }}
      >
        Search
      </Button>
    </Form>
  );
};

export default Search;
