import { useState } from "react";
import { hasCookieDecision, setCookiesAccepted } from "@/analytics/cookies";
import { grantMatomoConsent } from "@/analytics/matomo";
import { isMatomoEnabled } from "@/config";
import "./style.css";

const CookieBanner = () => {
  const [display, setDisplay] = useState(
    () => isMatomoEnabled() && typeof document !== "undefined" && !hasCookieDecision(),
  );

  if (!display) return null;

  const handleAccept = () => {
    setCookiesAccepted(true);
    grantMatomoConsent();
    setDisplay(false);
  };

  const handleReject = () => {
    setCookiesAccepted(false);
    setDisplay(false);
  };

  return (
    <div className="vf-banner vf-banner--fixed vf-banner--bottom vf-banner--notice gp-cookie-banner">
      <div className="vf-banner__content gp-cookie-banner__content">
        <p className="vf-banner__text vf-banner__text--lg gp-cookie-banner__text">
          This site uses cookies. We use essential cookies for site functionality,
          and non-essential cookies to help improve the service using Matomo
          analytics. No data is shared with third parties for advertising. See our{" "}
          <a
            className="vf-banner__link"
            href="https://www.ebi.ac.uk/data-protection/privacy-notice/embl-ebi-public-website"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Notice
          </a>{" "}
          and{" "}
          <a
            className="vf-banner__link"
            href="https://www.ebi.ac.uk/about/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms Of Use
          </a>
          .
        </p>
        <div className="gp-cookie-banner__actions">
          <button
            className="vf-button vf-button--primary"
            onClick={handleAccept}
            type="button"
          >
            Accept all
          </button>
          <button
            className="vf-button vf-button--secondary"
            onClick={handleReject}
            type="button"
          >
            Reject non-essential
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
