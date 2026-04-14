import siteCtaStyles from "@site/src/components/SiteCta/styles.module.scss";

import Link from "@docusaurus/Link";
import { translate } from "@docusaurus/Translate";
import { SiteCta } from "@site/src/components/SiteCta";
import { Button } from "@site/src/components/ui/button";

export const GetStartedPrompt = () => {
  return (
    <SiteCta
      id="download"
      title={translate({ message: "HOME.GetStartedPrompt.title" })}
      description={translate({ message: "HOME.GetStartedPrompt.subtitle" })}
      actions={
        <>
          <Button asChild size="lg" className={siteCtaStyles.actionButton}>
            <Link to="/cli">
              {translate({ message: "HOME.GetStartedPrompt.primary" })}
            </Link>
          </Button>
          <Button
            asChild
            variant="contrast"
            size="lg"
            className={siteCtaStyles.actionButton}
          >
            <Link to="/studio">
              {translate({ message: "HOME.GetStartedPrompt.secondary" })}
            </Link>
          </Button>
        </>
      }
    />
  );
};
