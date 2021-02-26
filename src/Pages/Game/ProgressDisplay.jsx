import { GiBarbedSun, GiGothicCross, GiWarlockEye } from "react-icons/gi";
import { GoPrimitiveDot } from "react-icons/go";
const evil = <GiWarlockEye />;
const good = <GiGothicCross />;
const neutral = <GiBarbedSun />;

const styles = {};
const ProgressDisplay = ({
  missions,
  currentMission,
  rejectCount,
  displayMissionDetails,
}) => {
  let symbolArr = [];
  let rejectDisplay = [];
  for (let i = 0; i < missions.length; i++) {
    let mission = missions[i];
    if (!mission.roundFinished) {
      symbolArr.push(neutral);
    } else if (mission.roundWinner) {
      symbolArr.push(good);
    } else {
      symbolArr.push(evil);
    }
  }

  console.log(currentMission);
  const missionsJsx = symbolArr.map((symbol, idx) => (
    <span
      key={idx}
      onClick={() => displayMissionDetails(idx)}
      className={
        idx === currentMission.round
          ? styles.currentMission
          : styles.notCurrentMission
      }
    >
      {symbol}
    </span>
  ));

  for (let i = 0; i < 5; i++) {
    if (i < rejectCount) {
      rejectDisplay.push(true);
    } else {
      rejectDisplay.push(false);
    }
  }

  const rejectDisplayJsx = rejectDisplay.map((reject, idx) =>
    reject ? (
      <GoPrimitiveDot key={idx} className="filledDot" />
    ) : (
      <GoPrimitiveDot key={idx} className="unfilledDot" />
    )
  );

  return (
    <div className={styles.ProgressDisplay}>
      <div className={styles.missions}>{missionsJsx}</div>
      <div className={styles.rejects}>{rejectDisplayJsx}</div>
    </div>
  );
};

export default ProgressDisplay;
