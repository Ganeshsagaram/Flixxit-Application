import Button from '@mui/material/Button';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function TestInput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ query: inputValue });
      console.log("Updated Search Params:", searchParams,"\n",inputValue);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="query" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Enter Movie Name"
        />
        <Button type="submit">Enter</Button>
      </form>
    </div>
  );
}
