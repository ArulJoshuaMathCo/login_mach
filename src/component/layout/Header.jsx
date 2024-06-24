import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLogoutQuery } from '../../redux/authapi';

const Header = () => {


  

  return (
    <div>
      <nav>
        <div className="ms-4 dropdown">
        
         
            <Link to="/" >  <button
            classname='logout'
            type="button"
            id="dropDownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >Logout
        
          </button>
              
            </Link>
          
        </div>
        <Link to="/login" className="btn ms-4" id="login_btn">
          Login
        </Link>
      </nav>
    </div>
  );
};

export default Header;
