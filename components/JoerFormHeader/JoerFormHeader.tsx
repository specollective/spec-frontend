import { memo } from "react";
import type { FC } from "react";
import { useTranslation } from "next-i18next/pages";
import classes from "./JoerFormHeader.module.css";

interface Props {
  className?: string;
}

export const JoerFormHeader: FC<Props> = memo(function JoerFormHeader(
  props = {}
) {
  const { t } = useTranslation("journal");
  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={classes.backgroundImage}></div>
      <div className={classes.content}>
        {/* Decorative J-[logo]-ER lockup; the h1 below carries the journal name for AT. */}
        <div aria-hidden="true" className={classes.j}>J</div>
        <div aria-hidden="true" className={classes.specLogo}></div>
        <div aria-hidden="true" className={classes.eR}>ER</div>
        <h1 className={classes.welcomeToTheJournalOfEngagedResearch}>
          {t("welcome")}
        </h1>
      </div>
    </div>
  );
});
