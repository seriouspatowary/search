import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import "../styles/dropdown.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCaretDown } from '@fortawesome/free-solid-svg-icons';


function SearchPage() {
  // 1. Create an array with at least three items
  const items = ["Apple", "Orange", "Banana","Mango","Pineapple","Strawberries"];


  const [activeItem, setActiveItem] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

 


 

  // 4. Get URL values and match with array item values
  const location = useLocation();




  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const itemFromUrl = params.get('item');
    if (items.includes(itemFromUrl)) {
      setActiveItem(itemFromUrl);
    }
  }, [location.search, items]);

  // 3. Handle item clicks to update URL
  const handleItemClick = (item) => {
    setActiveItem(item);
    const searchParams = new URLSearchParams({ item: item }).toString();
    window.history.pushState(null, '', `?${searchParams}`);
    setDropdownOpen(false); 
  };


  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };



  return (

    <div className="dropdown">
    <div className="dropdown-wrapper">
      <button className="dropbtn" onClick={toggleDropdown}>Select Item
      <FontAwesomeIcon icon={faCaretDown} style={{ color: 'white', fontSize: '24px' }} />
     

      </button>
      {dropdownOpen && (
      <div className="dropdown-content">
        {items.map((item, index) => (
          <Link
            key={index}
            to={`?item=${item}`}
            className={item === activeItem ? 'active' : ''}
            onClick={() => handleItemClick(item)}
          >
            {item}
          </Link>
        ))}
      </div>
      )}
      </div>
    </div>
  );
}

export default SearchPage;
