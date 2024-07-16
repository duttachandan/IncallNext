import React from "react";
import Image from 'next/image';
import Link from 'next/link';
import RTA from "../assets/RTA.png";
import DMCA from "../assets/DMCA.png";
/* 
    Author: Nihal Sherkar
    Date: 28-05-2024 
    Description: This is Footer.
*/
const Footer = () => {
  return (
    <>
      <footer
        className="mt-5 text-center text-dark shadow-lg border-top text-lg-start bg-body-tertiary text-muted bottom-0 position-relative"
        style={{
          backgroundColor: "white",
          position: "relative",
          bottom: -10,
          width: "100%",
        }}
      >
        <section className="d-flex flex-wrap justify-content-center align-items-center p-4 border-bottom text-light">
          <div className="w-100 px-lg-5 px-1 w-lg-50 d-flex justify-content-center align-items-center gap-5">
            <span>
              <Image
                style={{ width: "100px", height: "50px", objectFit: "cover" }}
                src={RTA}
                alt="RTA Logo"
                width={100}
                height={50}
              />
              <p style={{ fontSize: "0.5rem" }} className="text-dark fw-bolder">
                RESTRICTED TO ADULTS
              </p>
            </span>
            <span>
              <Image
                style={{
                  width: "100px",
                  height: "50px",
                  objectFit: "cover",
                  transform: "scale(1.4)",
                }}
                src={DMCA}
                alt="DMCA Logo"
                width={100}
                height={50}
              />
              <p></p>
            </span>
          </div>
          <div className="d-flex flex-column w-100">
            <div className="d-none d-lg-block text-center mb-3" >
              <span style={{ color: "#cc206b", fontWeight: "600" }}>Follow Us on social networks:</span>
            </div>
            <div className="text-center">
              <Link
                href="#"
                style={{ boxShadow: "0 1px 3px gray" }}
                className="me-4 text-rese btn rounded py-2 px-3"
              >
                <i className="fab fa-facebook-f text-dark"></i>
              </Link>
              <Link
                href="#"
                style={{ boxShadow: "0 1px 3px gray" }}
                className="me-4 text-rese btn rounded py-2 px-3"
              >
                <i className="fab fa-twitter text-dark"></i>
              </Link>
              <Link
                href="#"
                style={{ boxShadow: "0 1px 3px gray" }}
                className="me-4 text-rese btn rounded py-2 px-3"
              >
                <i className="fab fa-google text-dark"></i>
              </Link>
              <Link
                href="#"
                style={{ boxShadow: "0 1px 3px gray" }}
                className=" text-rese btn rounded py-2 px-3"
              >
                <i className="fab fa-instagram text-dark"></i>
              </Link>
            </div>
          </div>
        </section>
        <div className="text-center border-0 p-2 text-dark fs-6">
          © 2021 Copyright:
          <Link className="text-reset fw-bold" href="https://incallup.com">
            InCallup.com
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
