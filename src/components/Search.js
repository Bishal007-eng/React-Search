import React, { useEffect, useState } from 'react'
import "./Search.css"
// import Icon from 'react-remixicon';

export default function Search(props) {

  const [data , setData] = useState('');
  const [result , setResult] = useState('');

  const fetchData = (value) => {
    fetch ("https://fakestoreapi.com/products").then((response) => response.json()).then(json => {
      const filter = json.filter((products)=> {
        return value &&
          products &&
          products.title &&
          products.title.includes(value)
      });

      setResult(filter);
    })
      .catch((error) => { 
      console.error("Error while fetching Data", error);
    });
  };

  const handleChange = (value) => {
    setData(value);
    fetchData(value);
  };

  //  this function is to close the pop up when user presses Escape key.
  const myEscapeFunction = () => {
    // console.log('pressed Esc ✅');
    props.setPopUpTrigger(false)
  };

  useEffect(() => {
    const keyDownHandler = event => {
      // console.log('User pressed: ', event.key);


      if (event.key === 'Escape') {
        event.preventDefault();

        myEscapeFunction();
      }
    };

    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  
  return (props.PopupTrigger)? (
    <>
    <div className="container">
      <div className="popup"> 

      {/* Search and filter */}
      <div className="search-box"> 
        <div className="component col-lg-12">
          {/* Search Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" className="Icon-Search" viewBox="0 0 24 24">
              <path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path>
          </svg>

          {/* This is for input field */}
          <input             
            className="input-field" 
            type=" text"
            placeholder= "Search"
            value={data}
            onChange={(e) => handleChange(e.target.value)}
          />   
        
        {/* Button to filter Search */}
        <button className="Search-Options">
          <svg xmlns="http://www.w3.org/2000/svg" className="Filter-Search" viewBox="0 0 24 24"><path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071Z">
            </path>
          </svg>
          </button>

          {/* Button to close the search PopUp */}
          <button className="Search-Options"  onClick={() => props.setPopUpTrigger(false)} >
          <svg xmlns="http://www.w3.org/2000/svg" className="Close-Search" viewBox="0 0 24 24">
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z">
            </path>
          </svg>
        </button>
        {props.childern}
        </div>                 
       </div>
       {result.length >0 ? (
        <div className="results-list">
          {result.map((product)=>(
            <div key={product.id}>
              <li className='list'>Title:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;{product.title}</li>
              <li className='list'> Category:&nbsp;&nbsp; {product.category}</li>
              <li className='list'> Price:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{product.price}</li>
              <hr />
            </div>

          ))}
        </div>
       ):""}
      </div>
      
      <div className="components col-lg-4">

      <div className="navigator">
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" className="Arrow" viewBox="0 0 24 24">
              <path d="M12.9999 7.82843V20H10.9999V7.82843L5.63589 13.1924L4.22168 11.7782L11.9999 4L19.778 11.7782L18.3638 13.1924L12.9999 7.82843Z">
              </path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" className="Arrow" viewBox="0 0 24 24">
              <path d="M12.9999 16.1716L18.3638 10.8076L19.778 12.2218L11.9999 20L4.22168 12.2218L5.63589 10.8076L10.9999 16.1716V4H12.9999V16.1716Z">
            </path>
            </svg> to navigate   
          </p>
        </div>
        <div className="selector">
          <p>
          <svg xmlns="http://www.w3.org/2000/svg" className="Select" viewBox="0 0 24 24">
            <path d="M19.0003 13.9999L19.0004 5.00003L17.0004 5L17.0003 11.9999L6.82845 12L10.7782 8.05027L9.36396 6.63606L3 13L9.36396 19.364L10.7782 17.9498L6.8284 14L19.0003 13.9999Z">
            </path>
          </svg>  to select
          </p>
        </div>
        <div className="selector">
          <p><button className="Escape">esc</button> to exit
          </p>
        </div>
       </div>


       


    </div>
    </> 
  ): "";
};

