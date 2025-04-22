import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../src/components/SearchBar';
import { searchLocations } from '../src/services/weatherService';

// Mock the weatherService module
vi.mock('../src/services/weatherService', () => ({
  searchLocations: vi.fn()
}));

describe('SearchBar Component', () => {
  const mockOnLocationSelect = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
    // Set up a default mock implementation for searchLocations
    (searchLocations as any).mockResolvedValue([]);
  });

  it('renders search input correctly', () => {
    render(<SearchBar onLocationSelect={mockOnLocationSelect} />);
    
    expect(screen.getByPlaceholderText('Search for a city...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls searchLocations when user types in search input', async () => {
    render(<SearchBar onLocationSelect={mockOnLocationSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search for a city...');
    await userEvent.type(searchInput, 'London');
    
    // Wait for debounce
    await waitFor(() => {
      expect(searchLocations).toHaveBeenCalledWith('London');
    }, { timeout: 1000 });
  });

  it('does not call searchLocations when input is less than 3 characters', async () => {
    render(<SearchBar onLocationSelect={mockOnLocationSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search for a city...');
    await userEvent.type(searchInput, 'Lo');
    
    // Wait to ensure searchLocations is not called
    await new Promise(resolve => setTimeout(resolve, 600));
    expect(searchLocations).not.toHaveBeenCalled();
  });

  it('displays search results when results are available', async () => {
    const mockSearchResults = [
      { id: 1, name: 'London', region: 'City of London', country: 'United Kingdom', lat: 51.52, lon: -0.11 },
      { id: 2, name: 'Londonderry', region: 'Northern Ireland', country: 'United Kingdom', lat: 55.0, lon: -7.32 }
    ];
    
    (searchLocations as any).mockResolvedValue(mockSearchResults);
    
    render(<SearchBar onLocationSelect={mockOnLocationSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search for a city...');
    await userEvent.type(searchInput, 'London');
    
    // Wait for search results to be displayed
    await waitFor(() => {
      expect(screen.getByText('London, City of London, United Kingdom')).toBeInTheDocument();
      expect(screen.getByText('Londonderry, Northern Ireland, United Kingdom')).toBeInTheDocument();
    });
  });

  it('calls onLocationSelect when a search result is clicked', async () => {
    const mockSearchResults = [
      { id: 1, name: 'London', region: 'City of London', country: 'United Kingdom', lat: 51.52, lon: -0.11 }
    ];
    
    (searchLocations as any).mockResolvedValue(mockSearchResults);
    
    render(<SearchBar onLocationSelect={mockOnLocationSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search for a city...');
    await userEvent.type(searchInput, 'London');
    
    // Wait for search results to be displayed
    await waitFor(() => {
      expect(screen.getByText('London, City of London, United Kingdom')).toBeInTheDocument();
    });
    
    // Click on a result
    fireEvent.click(screen.getByText('London, City of London, United Kingdom'));
    
    expect(mockOnLocationSelect).toHaveBeenCalledWith('London');
  });

  it('calls onLocationSelect when the form is submitted', async () => {
    render(<SearchBar onLocationSelect={mockOnLocationSelect} />);
    
    const searchInput = screen.getByPlaceholderText('Search for a city...');
    await userEvent.type(searchInput, 'Paris');
    
    // Submit the form
    fireEvent.submit(searchInput.closest('form')!);
    
    expect(mockOnLocationSelect).toHaveBeenCalledWith('Paris');
  });
});
