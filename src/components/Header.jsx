
import React from 'react';

const Header = () => {
  const changeTheme = () => {
    document.body.classList.toggle('light-theme');
  };

  return (
    <>
      <header className="header">
        <div>
          <h1>Where in the world?</h1>
        </div>
        <div>
          <i className='fas fa-moon' onClick={changeTheme}></i>
        </div>
      </header>
    </>
  );
};

export default Header;
