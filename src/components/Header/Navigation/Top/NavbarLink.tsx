import React from 'react'
import { Link } from 'react-router-dom';

import { INavbarLinksProps } from '../../../../../types';

const NavbarLink = ({ 
  idx, 
  path, 
  title, 
  handleClick 
}: INavbarLinksProps) => {

  return (
    <li key={idx} className={`navbar__item hidden-links slideDown-${idx+1}`}>
      <Link
        className="navbar__link"
        to={path}
        onClick={handleClick}
      >
        {title}
      </Link>
    </li>
  )
}

export default NavbarLink