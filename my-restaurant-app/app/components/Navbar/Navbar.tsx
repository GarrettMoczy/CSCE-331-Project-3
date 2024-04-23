import Link from 'next/link';
import './Navbar.css';
import Modal from "../CartModal/CartModal";
import {useState} from "react";
import { GoogleLogin } from 'react-google-login';
  const responseGoogle = (response: any) => {
        console.log(response);
  }
  const handleGoogleLogin = () => {
    return (
      <GoogleLogin
        clientId= "426894892243-8busb36ofb5949nkdf4qgvq10g0rci3l.apps.googleusercontent.com"
        buttonText="Manager"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
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
            <GoogleLogin
              clientId= "426894892243-8busb36ofb5949nkdf4qgvq10g0rci3l.apps.googleusercontent.com"
              buttonText="Manager"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            </Link>
          </li>
          <li className='navitem'>
            <Link href="/waiter" passHref className='navlink'>
            </Link>
          </li>
        </ul>
      </nav>
      {openModal && <Modal />}
    </div>
  );
};

export default Navbar;
