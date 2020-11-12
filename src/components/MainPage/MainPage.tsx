import React, { useEffect, useState } from "react";
import "./App.css";
import FlightsList from "../Flights/FlightsList/FlightsList";
import DataFlights from "../../utils/flights.json";
import { FlightType, FlightsPriceType } from "../../types/flights";

const MainPage: React.FC = () => {
  let [flights, setFlights]: any = useState([]);
  const [way, setWay] = useState({
    from: "",
    where: "",
  });

  let dataFromBack: any = DataFlights;
  useEffect(() => {
    setFlights(dataFromBack.result.flights);
  }, []);

  const sortFlights = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let flightsCopy = flights.slice();
    let value = e.currentTarget.value;
    function sortIncrease(a: FlightsPriceType, b: FlightsPriceType) {
      return a.flight.price.total.amount - b.flight.price.total.amount;
    }
    function sortDecrease(a: FlightsPriceType, b: FlightsPriceType) {
      return b.flight.price.total.amount - a.flight.price.total.amount;
    }
    if (value === "increase") {
      setFlights(flightsCopy.sort(sortIncrease));
    } else if (value === "decrease") {
      setFlights(flightsCopy.sort(sortDecrease));
    }
  };

  const filterFlights = () => {
    let flightsCopy = flights.slice();
    const result = flightsCopy.filter((flight: FlightType) => {
      return Number(flight.flight.legs[0].segments.length) === 1;
    });
    setFlights(result);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setWay({
      ...way,
      [e.target.name]: e.target.value,
    });
  };

  const search = (way: { from: string; where: string }) => {
    let lastSegment = flights[1].flight.legs.pop();
    console.log(flights[0].flight);
    console.log(lastSegment);
    if (way.from !== "") {
      //  flights.name.toLowerCase().includes(value);
    }
  };

  return (
    <>
      <div className="main">
        <section className="search" style={{ display: "none" }}>
          <form>
            <input
              type="text"
              placeholder="откуда"
              name="from"
              value={way.from}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="куда"
              name="where"
              value={way.where}
              onChange={handleChange}
            />
            <div onClick={() => search(way)}>искать</div>
          </form>
        </section>
        <div className="main__wrapper">
          <section className="menu">
            <div className="menu__wrapper">
              <form className="sort form">
                <b>Сортировать</b>
                <label>
                  <input
                    name="dzen"
                    type="radio"
                    value="increase"
                    onChange={sortFlights}
                  />
                  - по возрастанию цены
                </label>
                <label>
                  <input
                    name="dzen"
                    type="radio"
                    value="decrease"
                    onChange={sortFlights}
                  />
                  - по убыванию цены
                </label>
                <label>
                  <input name="dzen" type="radio" value="nedzen" /> - по времени
                  в пути
                </label>
              </form>

              <form className="filter form">
                <b>Фильтровать</b>
                <label>
                  <input
                    type="checkbox"
                    id="scales"
                    name="scales"
                    onChange={filterFlights}
                  />
                  1 пересадка
                </label>
                <label>
                  <input type="checkbox" id="scales" name="scales" /> без
                  пересадок
                </label>
              </form>

              <form className="price form">
                <b>Цена</b>
                <label>
                  От
                  <input type="text" id="scales" name="scales" />
                </label>
                <label>
                  До
                  <input type="text" id="scales" name="scales" />
                </label>
              </form>

              <form className="airline form">
                <b>Авиакомпания</b>
                <label>
                  <input type="checkbox" id="scales" name="scales" /> 1 dd
                </label>
                <label>
                  <input type="checkbox" id="scales" name="scales" /> без tt
                </label>
              </form>
            </div>
          </section>

          <FlightsList flights={flights} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
