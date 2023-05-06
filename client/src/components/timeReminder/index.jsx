import React, { useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { v4 } from "uuid";
import "./style.css";

const renderTime = (history) => {

  if (!history) {
    return <div className="timers">No Biding.....</div>;
  }

  return (
    <div className="timers">
      <div className="texts">Last Bid</div>
      <div className="value">{history.biddingAmount}</div>
      <div className="texts">{history.userName}</div>
    </div>
  );
};

const TimeReminder = ({bidingHistory}) => {
  let history = bidingHistory && bidingHistory[0];
  const [resetValue, setResetValue] = useState(5);
  return (
    <div className="App">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          key={v4()}
          isPlaying
          duration={resetValue}
          colors={["#004777", 0.33]}
          onComplete={() => [true, 10000]}
        >
         {() => renderTime(history)}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default TimeReminder;
