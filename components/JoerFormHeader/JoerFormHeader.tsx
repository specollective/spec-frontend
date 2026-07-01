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
        <div className={classes.j}>J</div>
        <div className={classes.specLogo}></div>
        <div className={classes.eR}>ER</div>
        <div className={classes.welcomeToTheJournalOfEngagedResearch}>
          {t("welcome")}
        </div>
      </div>
    </div>
  );
});
