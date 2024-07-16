import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Logo from '../assets/InCallApp.png';
import { IoReorderThreeSharp } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import { FaSearch } from 'react-icons/fa';
import Sidebar from './Sidebar';
import Searchbar from './Searchbar';

const Navbar = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleCloseSearch = () => {
    setShowSearch(false);
    document.body.style.overflowY = 'scroll';
  };

  const handleShowSearch = () => {
    setShowSearch(true);
    document.body.style.overflowY = 'hidden';
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
    document.body.style.overflowY = isSidebarOpen || showSearch ? 'hidden' : 'scroll';
  };

  return (
    <div className="mx-auto w-100 position-fixed top-0 navbar-index">
      <nav className="navbar navbar-light navBar">
        <div className="container mx-auto">
          <Link href="/" passHref style={{ cursor: 'pointer', textDecoration: "none" }}>
            <div
              className="navbar-brand d-flex align-items-center justify-content-center"
              onClick={() => {
                router.push('/');
                sessionStorage.clear();
              }}
            >
              <Image
                src={Logo}
                alt="Logo Of InCallUp"
                className="d-inline-block align-text-top navLogoImg"
                width={100}
                height={40}
              />
              <h2 className="navLogo">InCallup</h2>
            </div>
          </Link>
          <div className="d-flex justify-content-evenly align-items-center gap-4 ms-auto px-2 me-2 me-lg-0">
            <div
              className={`rounded-circle d-flex justify-content-center align-items-center text-light px-2 py-2 search ${showSearch ? 'active' : ''}`}
              style={{ backgroundColor: '#103652', cursor: 'pointer' }}
              onClick={handleShowSearch}
            >
              <FaSearch />
            </div>

            {isSidebarOpen ? (
              <RxCross1
                className="hamberger text-dark"
                onClick={toggleSidebar}
              />
            ) : (
              <IoReorderThreeSharp
                className="fs-3 text-dark"
                style={{ cursor: 'pointer' }}
                onClick={toggleSidebar}
              />
            )}
            {isSidebarOpen && (
              <div
                className="blur-background active"
                onClick={toggleSidebar}
              ></div>
            )}
            {isSidebarOpen && (
              <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
            )}
            {showSearch && <Searchbar show={showSearch} handleClose={handleCloseSearch} />}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default React.memo(Navbar);
