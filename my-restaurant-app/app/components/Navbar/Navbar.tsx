import Link from 'next/link';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <div className='navlogo'>
        <Link href="/" passHref>
          PACO PACO
        </Link>
      </div>
      <ul className='navmenu'>
        <li className='navitem'>
          <Link href="/menu" passHref className='navlink'>
            Menu
          </Link>
        </li>
        <li className='navitem'>
          <Link href="/manager" passHref className='navlink'>
            Manager
          </Link>
        </li>
        <li className='navitem'>
          <Link href="/waiter" passHref className='navlink'>
            Waiter
          </Link>
        </li>
      </ul>
      <div>
            <img src="images/img-5.png" className='w-10'/>
      </div>
    </nav>
  );
};

export default Navbar;
