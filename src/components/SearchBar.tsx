/**
 * SearchBar Component
 * Allows users to search for weather in different locations
 */

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { searchLocations } from '../services/weatherService';
import { SearchResult } from '../types/weather';
import './SearchBar.css';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
}

const SearchBar = ({ onLocationSelect }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {
      if (searchTerm.trim().length < 3) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchLocations(searchTerm);
        setSearchResults(results);
      } catch (error) {
        console.error('Error searching locations:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchLocations, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowResults(true);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onLocationSelect(searchTerm);
      setShowResults(false);
    }
  };

  const handleResultClick = (location: SearchResult) => {
    const locationString = location.name;
    setSearchTerm(locationString);
    onLocationSelect(locationString);
    setShowResults(false);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => setShowResults(true)}
          aria-label="Search for a city"
          className="search-input"
        />
        <button type="submit" className="search-button" aria-label="Search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </button>
      </form>

      {showResults && searchResults.length > 0 && (
        <ul className="search-results">
          {searchResults.map((result) => (
            <li key={`${result.id}-${result.name}`} onClick={() => handleResultClick(result)}>
              {result.name}, {result.region && `${result.region}, `}{result.country}
            </li>
          ))}
        </ul>
      )}

      {isLoading && <div className="search-loading">Searching...</div>}
      
      {showResults && searchTerm.length >= 3 && searchResults.length === 0 && !isLoading && (
        <div className="search-no-results">No locations found</div>
      )}
    </div>
  );
};

export default SearchBar;
