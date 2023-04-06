import React from "react";

export default function Hero() {
  // const myComponentStyle = {
  //   fontSize: "88px",
  //   fontWeight: 400,
  //   fontFamily: "DM Serif Text",
  //   width: "568px",
  //   lineHeight: "100px",
  // };
  const componentStyles = {
    hero: {
      display: "Flex",
      padding: "0 0 117px 129px",
      position: "relative",
    },
    heroTitle: {
      fontSize: "88px",
      fontWeight: 400,
      fontFamily: "DM Serif Text",
      width: "568px",
      lineHeight: "100px",
      marginBottom: "43px",
      paddingTop: "85px",
    },
    heroSubject: {
      fontSize: "32px",
      fontFamily: "Montserrat",
      fontWeight: 500,
      lineHeight: "39px",
      color: "#0C9FAA",
      width: "405px",
    },
    backToTopButton: {
      position: "absolute",
      bottom: "230px",
      left: "1325px",
      // right: "0px",
    },
  };

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <section className="hero" style={componentStyles.hero}>
      <div className="hero-text" id="top">
        <h1 className="hero-title" style={componentStyles.heroTitle}>
          Paid training to promote equity and progress
        </h1>
        <p className="hero-subtitle" style={componentStyles.heroSubject}>
          SPEC provides paid learning opportunities by partnering with clients
          to build websites, hardware, art, and written content
        </p>
      </div>
      <img src="/TrainingImgCropped.svg" style={{ width: "743px" }} />
      <button
        href="#top"
        className="back-top-bttn"
        onClick={toTop}
        style={componentStyles.heroImg}
      >
        <img
          src="/Back to Top.svg"
          className="back-top"
          style={componentStyles.backToTopButton}
        />
      </button>
    </section>
  );
}
