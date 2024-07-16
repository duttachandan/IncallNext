import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import CryptoJS from 'crypto-js';
import Image from 'next/image';
const SECRET_KEY = 'tGh45lP7qR3aS9eC8dN6bM5';

const Sidebar = ({ isOpen, toggle }) => {
    const [email, setEmail] = useState();
    const [verify, setVerify] = useState(true);
    const [userName, setUserName] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const encryptedEmail = localStorage.getItem('email');
            const name = localStorage.getItem('fullname');
            if (encryptedEmail) {
                const bytes = CryptoJS.AES.decrypt(encryptedEmail, SECRET_KEY);
                const decryptedEmail = bytes.toString(CryptoJS.enc.Utf8);

                setVerify(false);
                setEmail(decryptedEmail);
                setUserName(name);
            } else {
                setVerify(true);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        router.push('/LogIn');
        window.location.reload();
    };

    const handleDisabledClick = (event) => {
        if (verify) {
            event.preventDefault();
        }
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="w-100 sidebarinsideDiv">
                <button className="close-btn closeBtn" onClick={toggle}>
                    &times;
                </button>
                <div className="sidebar-content mt-4 h-100">
                    <h5 className="font-start text-secondary">Services for you!</h5>
                    <hr />
                    <ul className="flex flex-col gap-2 sidebar_ul" style={{ height: '75vh' }}>
                        <li>
                            <Link href="#">
                                <div className="d-flex align-items-center sidebar_hover disabled-link">
                                    <i className="fa-solid fa-location-arrow me-3"></i>
                                    Locate me
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link href="/AddPost">
                                <div
                                    className={`d-flex align-items-center sidebar_hover ${verify ? 'disabled-link' : ''}`}
                                    onClick={handleDisabledClick}
                                >
                                    <i className="fa-solid fa-camera me-3"></i>
                                    Post Ad
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link href="/">
                                <div className="d-flex align-items-center sidebar_hover">
                                    <i className="fa-solid fa-house me-3" style={{ fontSize: '0.8rem' }}></i>
                                    Home
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link href="/Login">
                                <div className="d-flex align-items-center sidebar_hover">
                                    <i className="fa-solid fa-id-badge me-3"></i>
                                    Login
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link href="/newUser">
                                <div className="d-flex align-items-center sidebar_hover">
                                    <i className="fa-solid fa-user" style={{ fontSize: '0.8rem' }}></i>
                                    <i className="fa-solid fa-plus me-2" style={{ fontSize: '0.5rem' }}></i>
                                    Sign up
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link href="/myads">
                                <div
                                    className={`d-flex align-items-center sidebar_hover ${verify ? 'disabled-link' : ''}`}
                                    onClick={handleDisabledClick}
                                >
                                    <i className="fa-solid fa-handshake me-2"></i>
                                    My Ads
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link href="/activity">
                                <div
                                    className={`d-flex align-items-center sidebar_hover ${verify ? 'disabled-link' : ''}`}
                                    onClick={handleDisabledClick}
                                >
                                    <i className="fa-solid fa-chart-line me-3" style={{ fontSize: '0.8rem' }}></i>
                                    Activity
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <div
                                href="mailto:support@InCallUp.com"
                                className="d-flex align-items-center sidebar_hover"
                                onClick={toggle}
                            >
                                <i className="fa-solid fa-comment me-3"></i>
                                Support
                            </div>
                        </li>
                        <hr />
                        <li>
                            <Link href="/privacy&policy">
                                <div className="d-flex align-items-center sidebar_hover">
                                    <i className="fa-solid fa-user-secret me-3"></i>
                                    Privacy Policy
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link href="/terms&conditions">
                                <div className="d-flex align-items-center sidebar_hover">
                                    <i className="fa-solid fa-handshake me-2"></i>
                                    Terms & Condition
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link href="/about">
                                <div className="d-flex align-items-center sidebar_hover">
                                    <i className="fa-solid fa-circle-info me-2"></i>
                                    About Us
                                </div>
                            </Link>
                        </li>
                        <hr />
                        <li>
                            <Link href="/contactus">
                                <div className="d-flex align-items-center sidebar_hover">
                                    <i className="fa-solid fa-address-book me-2"></i>
                                    Contact Us
                                </div>
                            </Link>
                        </li>
                        <hr />
                        {email && (
                            <li>
                                <div className="d-flex align-items-center sidebar_hover" onClick={handleLogout}>
                                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                                    <span>LogOut</span>
                                </div>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex align-items-center sidebarUser" style={{ justifyContent: 'center' }}>
                        <Image
                            src="../assets/profile.svg"
                            className="profileImg"
                            alt="Profile Image"
                            width={50}
                            height={50}
                        />
                        <div className="ms-2">
                            <p style={{ fontSize: '0.8rem', color: 'white' }}>
                                <i className="fa-solid fa-circle me-1" style={{ fontSize: '0.5rem', color: 'lime' }}></i>
                                {userName ? userName : 'Guest User'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
