import { useState } from "react";

const CookieBanner = () => {
  const [display, setDisplay] = useState(
    Boolean(document) &&
      !(document.cookie.match(/cookies-accepted=(true)/i) || [])[1],
  );

  const handleClick = () => {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie = `cookies-accepted=true;expires=${expires.toUTCString()};path=/`;
    setDisplay(false);
  };

  if (!display) return null;

  return (
    <div className="vf-banner vf-banner--fixed vf-banner--bottom vf-banner--notice">
      <div className="vf-banner__content | vf-grid">
        <p className="vf-banner__text vf-banner__text--lg">
          This website uses cookies, and the limiting processing of your personal
          data to function. By using the site you are agreeing to this as outlined
          in our{" "}
          <a
            className="vf-banner__link"
            href="https://www.ebi.ac.uk/data-protection/privacy-notice/embl-ebi-public-website"
          >
            Privacy Notice
          </a>{" "}
          and{" "}
          <a className="vf-banner__link" href="https://www.ebi.ac.uk/about/terms-of-use">
            Terms Of Use
          </a>
          .
        </p>
        <button className="vf-button vf-button--primary" onClick={handleClick}>
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
