import Link from 'next/link';
import './Navbar.css';
import Modal from "../CartModal/CartModal";
import {useState} from "react";

const Navbar: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <nav className='navbar'>
        <div className='navlogo'>
          <Link href="/" passHref>
            PACO PACO
          </Link>
        </div>
        <button onClick={() => {if (openModal) setOpenModal(false); else setOpenModal(true);}}className='navImage'>
              <img src="images/img-5.png" className='w-10'/>
        </button>
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
      </nav>
      {openModal && <Modal />}
    </div>
  );
};

export default Navbar;
