import { memo } from "react";
import type { FC } from "react";
import classes from "./JoerFormHeader.module.css";

interface Props {
  className?: string;
}
/* @figmaId 3643:4119 */
export const JoerFormHeader: FC<Props> = memo(function JoerFormHeader(
  props = {}
) {
  return (
    <>
      <div className={classes.rectangle405}></div>
      <div className={classes.j}>J </div>
      <div className={classes.specLogo3}></div>
      <div className={classes.eR}>ER</div>
      <div className={classes.welcomeToTheJournalOfEngagedResearch}>
        Welcome to the Journal of Engaged Research!
      </div>
    </>
  );
});
