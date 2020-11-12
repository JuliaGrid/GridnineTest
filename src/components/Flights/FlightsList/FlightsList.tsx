import React from "react";
import { FlightType } from "../../../types/flights";
import FlightsItem from "../FlightsItem/FlightsItem";
import "./App.css";

interface Props {
  flights: [];
}

const FlightsList: React.FC<Props> = ({ flights }) => {
  return (
    <>
      <section className="flights">
        <ul className="flights__list">
          {flights.map((flight: FlightType) => (
            <FlightsItem item={flight} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default FlightsList;
