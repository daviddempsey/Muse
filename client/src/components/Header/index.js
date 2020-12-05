import React, {useState} from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import './index.css';
import fb from '../../base';
import 'firebase/auth';
const auth = fb.auth();

const Header = () => {
  const SPACE = '\u00a0';
  const [link, setLink] = useState('');

  const getLink = async () => {
    setLink(await getUser());
  }

  const getUser = async () => {
    if (auth.currentUser) {
      return auth.currentUser.email;
    } else {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          if (user.email === this.state.userEmail) {
            return user.email;
          }
        }
      });
    }
  }

  React.useEffect(() => {
    getLink();
  })

  return (
    <div className='Header'>
      <h3>
        <ul className='navbar'>
          <li>
            <Link to='/'>
              <img src={Logo} alt='Muse' />
            </Link>
            <h1>{SPACE}Muse</h1>
          </li>
          <li className='empty' />
          <li>
            <NavLink to={'/profile/' + btoa(link)} className='nav-item'>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink to='/friends' className='nav-item'>
              Friends
            </NavLink>
          </li>
          <li>
            <NavLink to='/harmony' className='nav-item'>
              In Harmony
            </NavLink>
          </li>
          <li>
            <NavLink to='/messages' className='nav-item'>
              Messaging
            </NavLink>
          </li>
          <li>
            <NavLink to='/' className='nav-item'>
              Logout
            </NavLink>
          </li>
        </ul>
      </h3>
    </div>
  );
};
export default Header;
