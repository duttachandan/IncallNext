import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const ShowModal = ({ acceptTerms, declineTerms, LogoImage }) => {
    return (
        <div className="modal-backdrop" style={{ userSelect: "none" }}>
            <div
                className="modal-content d-flex 
            gap-1 px-1"
            >
                <Image
                    className="ModalLogo"
                    src={LogoImage}
                    alt="navLogo" />
                <h6
                    className="text-decoration-underline
            fw-bold headModal text-danger"
                >
                    Important Disclaimer
                </h6>
                <h4 className="fw-bolder text-secondary fs-6 textModal">
                    Please read the following warning before continuing
                </h4>
                <p className="fw-bold text-center headModal">
                    Do you accept the terms and conditions?
                </p>
                <p className="fw-bold contentModal" style={{ flexGrow: "2" }}>
                    <ul className="list-unstyled">
                        <li className="text-center textdescModal">
                            InCallUp is not responsible for any malicious monetary
                            transaction. The current advertisements on the InCallUp, are
                            published on the sole initiative and full responsibility of the
                            advertiser. There is no relationship between the website and the
                            advertiser.
                        </li>
                        <li className="text-center textdescModal">
                            This site contains adult content for those over 18 years of age.
                            If you are under 18, if you are guilty of adult material, or if
                            you are visiting this site from a country or region where adult
                            material is prohibited by law, please leave now.
                        </li>
                        <li className="text-center textdescModal">
                            I am over 18 years old and I accept the viewing of explicit texts
                            and images intended for an adult audience.
                        </li>
                    </ul>
                </p>
                <p className="text-secondary textModal">
                    I have read and accept the{" "}
                    <span className="text-danger" style={{ color: "#e46fa4" }}>
                        Terms and Conditions
                    </span>
                </p>
                <div className="modal-buttons d-flex flex-column">
                    <button
                        style={{ backgroundColor: "#e46fa4" }}
                        className="btn fw-bold rounded-pill modalBtn text-light"
                        onClick={acceptTerms}
                    >
                        Accept
                    </button>
                    <button
                        className="btn fw-bold modalBtn text-danger "
                        style={{ color: "#e46fa4" }}
                        onClick={declineTerms}
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
};

const Hero = ({ initialData, LogoImage }) => {
    const [showModal, setShowModal] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const isFirstVisit = !localStorage.getItem("email");
        const isAcceptedTerms = sessionStorage.getItem("acceptedTerms");

        if (isAcceptedTerms) {
            setShowModal(false);
        } else if (isFirstVisit) {
            // implement something here, e.g. setShowModal(true) or other logic
        } else {
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, []);

    useEffect(() => {
        if (isMounted) {
            document.body.style.overflowY = showModal ? "hidden" : "scroll";
        }
    }, [showModal, isMounted]);

    const acceptTerms = () => {
        sessionStorage.setItem("acceptedTerms", "true");
        setShowModal(false);
    };

    const declineTerms = () => {
        setShowModal(false);
        window.location.href = "https://www.google.com";
    };

    return (
        <div className={`container-fluid bg-secondary header d-flex flex-column`} style={{ minHeight: "26vh" }}>
            <div className={`w-100 py-lg-5 py-3 d-flex justify-content-center align-items-center flex-column text-light`}>
                <h1 className="text-uppercase fw-bolder mt-1">
                    Welcome to the IncallUp
                </h1>
                <h4>Have a date in your city today, choose your category</h4>
            </div>
            <div className="d-flex flex-wrap align-items-center justify-content-center container-fluid gap-4 mx-auto pb-lg-5">
                {initialData &&
                    initialData.map((item, index) => {
                        const itemTitle = item.title.replaceAll(" ", "-").toLowerCase();
                        return (
                            <div key={index} className="card_banner d-flex flex-column" style={{ height: "356px", width: "260px" }}>
                                <div style={{ flexGrow: "1" }}>
                                    <Link href={`/${itemTitle}`} as={`/${itemTitle}`} passHref>
                                        <div>
                                            <Image
                                                className="card-img-top card_image cursor-pointer"
                                                height={304}
                                                width={258}
                                                src={item.image}
                                                alt={`Image for ${itemTitle}`}
                                                priority={index === 0} // Add priority to the first image
                                                style={{ width: '100%', height: 'auto' }} // Maintain aspect ratio
                                            />
                                        </div>
                                    </Link>
                                </div>
                                <div className="card-button mb-1" style={{ height: "48px", width: "258px" }}>
                                    <Link href={`/${itemTitle}`} as={`/${itemTitle}`} passHref>
                                        <div className="btn btn_banner w-100">
                                            {item.title}
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
            </div>

            {isMounted && showModal && (
                <ShowModal
                    showModal={showModal}
                    acceptTerms={acceptTerms}
                    declineTerms={declineTerms}
                    LogoImage={LogoImage}
                />
            )}
        </div>
    );
};

export default Hero;