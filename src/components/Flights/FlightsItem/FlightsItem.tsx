import React from "react";
import { writeHours } from "../../../helpers/date";
import FlightSegment from "../FlightSegment/FlightSegment";
import "./App.css";

interface Props {
  item: any;
}

const FlightsItem: React.FC<Props> = ({ item }) => {
  let { flight } = item;

  const renderSegments = (seg: any[], number: number) => {
    let segments = [];
    for (let i = 0; i < seg.length; i++) {
      segments.push(<FlightSegment seg={seg[i]} />);
      if (i === 0) {
        segments.push(
          <>
            <p className="flight__duration">
              {writeHours(flight.legs[number].duration)}
            </p>
            <div className="flight__transfer">
              {flight.legs[number].segments.length >= 2 ? (
                <p className="flight__transfer-number">
                  {flight.legs[number].segments.length - 1} пересадка
                </p>
              ) : (
                <p className="flight__transfer-number">
                  {flight.legs[number].segments.length - 1} пересадок
                </p>
              )}
            </div>
          </>
        );
      }
    }
    return segments;
  };

  return (
    <>
      <li key={item.flightToken}>
        <div className="flight__header">
          <p className="flight__carrier">{flight.carrier.caption}</p>
          <div className="flight__price">
            <p className="flight__amount">
              {flight.price.total.amount} {flight.price.total.currency}
            </p>
            <p>Стоимость для одного взрослого пассажира</p>
          </div>
        </div>
        <div className="flight">
          {renderSegments(flight.legs[0].segments, 0)}
        </div>
        <div>{renderSegments(flight.legs[1].segments, 1)}</div>
        <button className="flight__button">выбрать</button>
      </li>
    </>
  );
};

export default FlightsItem;
