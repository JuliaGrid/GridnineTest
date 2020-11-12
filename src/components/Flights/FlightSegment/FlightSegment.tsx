import React from "react";
import "./App.css";
import { writeDate, writeTime } from "../../../helpers/date";

interface Props {
  seg: any;
}

const FlightSegment: React.FC<Props> = ({ seg }) => {
  return (
    <>
      <div className="flight__segment">
        <div className="flight__cities">
          <span>
            {seg.departureCity?.caption}, {seg.departureAirport.caption}{" "}
            <span className="blue">({seg.departureAirport.uid})</span>
          </span>
          <span className="blue"> → </span>
          <span>
            {seg.arrivalCity?.caption}, {seg.arrivalAirport.caption}
            <span className="blue"> ({seg.arrivalAirport.uid})</span>
          </span>
        </div>
        <div>
          <div className="flight__time">
            <div>
              {writeTime(seg.departureDate)}{" "}
              <span className="flight__date">
                {writeDate(seg.departureDate)}
              </span>
            </div>
            <span>→</span>
            <div>
              <span className="flight__date">{writeDate(seg.arrivalDate)}</span>{" "}
              {writeTime(seg.arrivalDate)}
            </div>
          </div>
          <p className="flight__airline">
            Рейс выполняет: {seg.airline.uid} {seg.airline.caption}
          </p>
        </div>
      </div>
    </>
  );
};

export default FlightSegment;
