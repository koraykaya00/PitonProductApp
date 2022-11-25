import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/styles.module.css';
import { Button } from '@chakra-ui/react';
function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.left}>
        <div className='logo'>
          <Link to='/'>eLogo</Link>
        </div>
        <ul className={styles.menu}>
          <li>
            <Link to='/'>Products</Link>
          </li>
        </ul>
      </div>

      <div className={styles.right}>
        <Link to='/loginForm'>
          <Button colorScheme='yellow'>Login</Button>
        </Link>
        {/* <Link to='/signUp'>
          <Button colorScheme='yellow'>Register</Button>
        </Link> */}
        <Link to='/'>
          <Button colorScheme='purple' onClick={() => localStorage.removeItem('token')}>
            Log Out
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
