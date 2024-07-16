import React, { useEffect, useState } from "react";

function Content({ props }) {
  const [loaded, setLoaded] = useState(false);

  // Function to filter HTML content and remove empty paragraphs
  const filterHtmlContent = (htmlContent) => {
    return htmlContent
      .replace(/<p><br\s*\/?><\/p>/g, "")
      .replace(/<p>&nbsp;<\/p>/g, "");
  };

  // UseEffect to simulate a loading delay
  useEffect(() => {
    const timeout = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const placeholder = (
    <div
      style={{
        minHeight: "283px",
        height: "283px",
        width: "936px",
        backgroundColor: "rgba(255,255,255,0.1)",
      }}
    ></div>
  );

  return (
    <div className="container" style={{ cursor: "default" }}>
      {props ? (
        loaded ? (
          <div
            style={{ userSelect: "none" }}
            className="border-secondary py-3 content contentDisclamer"
            dangerouslySetInnerHTML={{ __html: filterHtmlContent(props) }}
          />
        ) : (
          placeholder
        )
      ) : loaded ? (
        <p
          style={{ userSelect: "none" }}
          className="border-secondary py-3 content contentDisclamer"
        >
          Welcome to IncallUp, the premier destination where desires transcend
          the ordinary and fantasy finds its home. In the bustling world of
          adult dating, IncallUp stands out as a beacon of authenticity and
          excitement. Whether you&apos;re seeking a fiery fling or a deep, meaningful
          connection, our platform is designed to cater to your every desire.
          Imagine a world where inhibitions are left at the door, and
          exploration knows no bounds. Here at IncallUp, we believe in embracing
          the diverse tapestry of human desires, where every whim and fancy is
          celebrated. Our members come from all walks of life, united by their
          shared quest for passion and pleasure. From the moment you step into
          the realm of IncallUp, you&apos;ll be greeted by a vibrant community of
          like-minded individuals, each with their own unique story to tell. Our
          platform offers a safe and discreet environment where you can explore
          your deepest desires without judgment or reservation. Whether you&apos;re
          into steamy one-night encounters or prefer the thrill of a long-term
          connection, IncallUp has something for everyone. Our intuitive
          matchmaking algorithms ensure that you&apos;re paired with compatible
          partners who share your interests and preferences, making every
          encounter an unforgettable experience. Indulge your senses and ignite
          the flames of passion with our array of features designed to tantalize
          and excite. From private messaging to video chats, the possibilities
          are endless when you join the IncallUp community. Our platform is
          constantly evolving to meet the needs of our members, ensuring that
          your journey towards fulfillment is nothing short of extraordinary. So
          why wait? Join us at IncallUp today and unlock a world of limitless
          possibilities. Whether you&apos;re a seasoned veteran or new to the world
          of adult dating, our platform welcomes you with open arms. Dare to
          explore, dare to dream, and let IncallUp be your guide on the path to
          ultimate satisfaction.
        </p>
      ) : (
        placeholder
      )}
    </div>
  );
}

export default Content;
