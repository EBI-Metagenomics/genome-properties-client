import ExternalLink from "@/components/ExternalLink";
import { links } from "@/config";

const Contact = () => {
  return (
    <section>
      <h2 id="contactgenomeproperties">Contact Genome Properties</h2>
      <p>
        We welcome your feedback on any aspect of the Genome Properties resource
        including questions about the data, error reporting, and collaboration
        requests. You can contact us using this helpdesk address:
      </p>
      <p>
        <ExternalLink href={links.contactEmail}>GenProp@ebi.ac.uk</ExternalLink>
      </p>
    </section>
  );
};

export default Contact;
