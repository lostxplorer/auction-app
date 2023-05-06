import { Fragment, useEffect, useMemo, useState } from "react";
import "./Timer.css";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const Timer = ({ deadTime, getTimeInterVal }) => {
  const parsedDeadline = useMemo(() => Date.parse(deadTime), [deadTime]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );
    getTimeInterVal && getTimeInterVal(parsedDeadline - Date.now());
    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
    <Fragment>
      {!time ? (
        <div className="timer">
          <span>"Loading....."</span>
        </div>
      ) : (
        <div className="timer">
          {Math.sign(time) === -1
            ? Object.entries({
                Days: 0,
                Hours: 0 % 24,
                Minutes: 0 % 60,
                Seconds: 0 % 60,
              }).map(([label, value]) => (
                <div key={label} className="col-4">
                  <div className="box">
                    <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                    <span className="text">{label}</span>
                  </div>
                </div>
              ))
            : Object.entries({
                Days: time / DAY,
                Hours: (time / HOUR) % 24,
                Minutes: (time / MINUTE) % 60,
                Seconds: (time / SECOND) % 60,
              }).map(([label, value]) => (
                <div key={label} className="col-4">
                  <div className="box">
                    <p>{`${Math.floor(value)}`.padStart(2, "0")}</p>
                    <span className="text">{label}</span>
                  </div>
                </div>
              ))}
        </div>
      )}
    </Fragment>
  );
};
