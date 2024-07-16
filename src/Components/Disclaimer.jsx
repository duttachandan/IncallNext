import React from "react";

export default function Disclaimer() {
  return (
    <div className="container"
    style={{userSelect:"none"}}>
      <hr className="mx-auto" style={{}} />
      <div className="mt-2 mb-2 fs-6 fw-bolder text-dark text-center">
        Disclaimer from Incallup
      </div>
      <div
        className="container pt-2 rounded mx-auto text-secondary"
        style={{ border: "1px solid gray", fontSize:"0.8rem" }}
      >
          The User agrees to abide by our terms and conditions of use and to
          keep up with any changes by visiting our website and utilizing our
          services.
        <br/>
        <br/>
          The advertiser took the initiative and is solely responsible for
          publishing the current advertising in Incallup. Incallup.com does not
          conduct any kind of pre-publication verification before publishing
          such advertisements. Under no circumstances will incallup.com be held
          liable for the accuracy, legality, respect for property rights, or any
          offense against public or moral order of any online content entered by
          the user.
        <br/>
        <br/>
          Free Internet ad publishing and website navigation are provided by
          Incallup.com does not act as a middleman or intermediary between users
          who browse the website and users who post content.
      </div>
    </div>
  );
}

