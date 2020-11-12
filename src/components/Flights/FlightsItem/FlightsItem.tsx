import React from "react";
import FlightSegment from "../FlightSegment/FlightSegment";
import "./App.css";

interface Props {
  item: any;
}

const FlightsItem: React.FC<Props> = ({ item }) => {
  let { flight } = item;

  const renderSegments = (seg: any) => {
    let segments = [];
    for (let i = 0; i < seg.length; i++) {
      segments.push(<FlightSegment seg={seg[i]} />);
      if (i === 0) {
        segments.push(
          <div className="flight__transfer">
            {flight.legs[0].segments.length >= 2 ? (
              <p className="flight__transfer-number">
                {flight.legs[0].segments.length - 1} пересадка
              </p>
            ) : (
              <p className="flight__transfer-number">
                {flight.legs[0].segments.length - 1} пересадок
              </p>
            )}
          </div>
        );
      }
    }
    return segments;
  };

  return (
    <>
      <li key={item.flightToken}>
        <div className="flight__header">
          <div>{flight.carrier.caption}</div>
          <div>
            <p className="flight__amount">
              {flight.price.total.amount} {flight.price.total.currency}
            </p>
            <p>Стоимость для одного взрослого пассажира</p>
          </div>
        </div>
        <div className="flight">
          {/*flight.legs[0].segments.map((seg: any) => (
            <FlightSegment seg={seg} />
          ))*/}
          {renderSegments(flight.legs[0].segments)}
        </div>
        <div>{renderSegments(flight.legs[0].segments)}</div>
      </li>
    </>
  );
};

export default FlightsItem;
