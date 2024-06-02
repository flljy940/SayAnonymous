import React, { useState, Component} from 'react';
import { 
  Text, 
  SafeAreaView, 
  StyleSheet, 
  View,
  TouchableOpacity,
  SearchIcon,
  Image,
  } from 'react-native';


function SearchBar() {
  const [query, setQuery] = React.useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the search logic here
    console.log("Searching for:", query);
  };

  return (
    <>
      <div className="search-bar">
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            className="input"
            placeholder="Search..."
          />
          <button type="submit" className="button">
            <Image src="./search.png" />
          </button>
        </form>
      </div>

      <style jsx>{`
        .search-bar {
          border-radius: 30px;
          display: flex;
          max-width: 600px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          
        }

        .form {
          display: flex;
          width: 100%;
        }

        .input {
          flex: 1;
          padding: 10px 15px;
          border-radius: 30px 0 0 30px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 16px;
        }

        .button {
          padding: 10px 20px;
          border-radius: 0 30px 30px 0;
          border: none;
          background-color: #021A56;
          font-size: 16px;
          cursor: pointer;
        }

        .button:hover {
          background-color: #0539BC;
        }
      `}</style>
    </>
  );
}

export default SearchBar;

/*
const SearchBarContainer = styled.section`
  border-radius: 30px;
  background-color: #f5f5f5;
  display: flex;
  max-width: 400px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 9px 15px;
`;

const InputWrapper = styled.div`
  flex: 1;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 15px;
  font-size: 16px;
`;

const SearchIcon = styled.img`
  width: 24px;
  margin-left: 10px;
`;

function SearchBar() {
  const [searchText, setSearchText] = React.useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <SearchBarContainer>
      <InputWrapper>
        <TextInput
          type="text"
          value={searchText}
          onChange={handleInputChange}
          placeholder="Search..."
        />
      </InputWrapper>
      <SearchIcon src="http://b.io/icon_search" alt="Search Icon" />
    </SearchBarContainer>
  );
}

export default SearchBar;
*/

/*
  const SearchBar = () => {

    const [query, setQuery] = useState("")

    function search(e){
        e.preventDefault()
        setQuery(e.target.value)

    }

    return (
        <div style = {styles.searchView}>
            <TextInput
                type="text"
                onChange={search}
                value={query}
                placeholder="Search"
                style = {styles.search}
            />
        </div>
    );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchView: {
    padding: 3,
  },
  search: {
    backgroundColor: '#F5F5F5',
    borderColor: 'transparent',
    borderRadius: 30,
    paddingLeft: 3,
    color: 'blue',
  },
});
*/