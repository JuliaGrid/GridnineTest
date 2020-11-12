import React, { useEffect, useState } from "react";
import "./App.css";
import FlightsList from "../Flights/FlightsList/FlightsList";
import DataFlights from "../../utils/flights.json";
import { FlightType, FlightsPriceType } from "../../types/flights";

const MainPage: React.FC = () => {
  let [flights, setFlights]: any = useState([]);
  let [searched, setSearched] = useState(false);
  let [sort, setSort] = useState({
    increase: false,
    decrease: false,
    time: false,
  });
  let [checkbox, setCheckbox] = useState({
    transfer1: false,
    transferNo: false,
  });
  let [airline, setAirline] = useState({
    AirFrance: false,
    KLM: false,
    Airflot: false,
  });
  let [airlineCaption, setAirlineCaption] = useState({
    AirFrance: "",
    KLM: "",
    Airflot: "",
  });
  let [price, setPrice] = useState({
    min: "0",
    max: "999999999",
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
    function sortTime(a: any, b: any) {
      return a.flight.legs[0].duration - b.flight.legs[0].duration;
    }
    if (value === "increase") {
      setFlights(flightsCopy.sort(sortIncrease));
      setSort({ increase: true, decrease: false, time: false });
    } else if (value === "decrease") {
      setFlights(flightsCopy.sort(sortDecrease));
      setSort({ increase: false, decrease: true, time: false });
    } else if (value === "time") {
      setFlights(flightsCopy.sort(sortTime));
      setSort({ increase: false, decrease: false, time: true });
    }
  };

  const filterTransferFlights = () => {
    let result = flights;
    if (checkbox.transfer1) {
      result = flights.filter((flight: FlightType) => {
        return Number(flight.flight.legs[0].segments.length) === 2;
      });
    } else if (checkbox.transferNo) {
      result = flights.filter((flight: FlightType) => {
        return Number(flight.flight.legs[0].segments.length) === 1;
      });
    }
    setFlights(result);
    flights = result;
  };

  const filterPriceFlights = () => {
    let result = flights.filter((flight: any) => {
      return (
        Number(flight.flight.price.total.amount) >= Number(price.min) &&
        Number(flight.flight.price.total.amount) <= Number(price.max)
      );
    });
    setFlights(result);
    flights = result;
  };

  const filterAirlineFlights = () => {
    console.log(airlineCaption);
    let result: any = [];
    if (airline.AirFrance) {
      result = result.concat(
        flights.filter((flight: any) => {
          return flight.flight.carrier.caption.includes(
            airlineCaption.AirFrance
          );
        })
      );
    }
    if (airline.KLM) {
      result = result.concat(
        flights.filter((flight: any) => {
          return flight.flight.carrier.caption.includes(airlineCaption.KLM);
        })
      );
    }
    if (airline.Airflot) {
      result = result.concat(
        flights.filter((flight: any) => {
          return flight.flight.carrier.caption.includes(airlineCaption.Airflot);
        })
      );
    }

    setFlights(result);
  };

  const handleChangeTransfer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setCheckbox({ ...checkbox, [e.target.name]: target.checked });
  };

  const handleChangeAirline = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setAirline({ ...airline, [e.target.name]: target.checked });
    target.checked
      ? setAirlineCaption({
          ...airlineCaption,
          [e.target.name]: e.target.value,
        })
      : setAirlineCaption({ ...airlineCaption, [e.target.name]: "" });
  };

  const handlePrice = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    price = { ...price, [e.target.name]: target.value };
    setPrice({ ...price, [e.target.name]: target.value });
  };

  const search = () => {
    filterPriceFlights();
    if (checkbox.transferNo || checkbox.transfer1) filterTransferFlights();
    filterAirlineFlights();
    setSearched(true);
  };

  const lose = () => {
    setCheckbox({
      transfer1: false,
      transferNo: false,
    });
    setPrice({
      min: "0",
      max: "99999999",
    });
    setAirline({
      AirFrance: false,
      KLM: false,
      Airflot: false,
    });
    setAirlineCaption({
      AirFrance: "",
      KLM: "",
      Airflot: "",
    });
    setSort({ increase: false, decrease: false, time: false });
    setFlights(dataFromBack.result.flights);
    setSearched(false);
  };

  console.log(flights);

  return (
    <>
      <div className="main">
        <div className="main__wrapper">
          <section className="menu">
            <div className="menu__wrapper">
              <form className="sort form">
                <b className="form__title">Сортировать</b>
                <label>
                  <input
                    name="sort"
                    type="radio"
                    value="increase"
                    checked={sort.increase}
                    onChange={sortFlights}
                  />
                  - по возрастанию цены
                </label>
                <label>
                  <input
                    name="sort"
                    type="radio"
                    value="decrease"
                    checked={sort.decrease}
                    onChange={sortFlights}
                  />
                  - по убыванию цены
                </label>
                <label>
                  <input
                    name="sort"
                    type="radio"
                    value="time"
                    checked={sort.time}
                    onChange={sortFlights}
                  />
                  - по времени в пути
                </label>
              </form>

              <form className="filter form">
                <b className="form__title">Фильтровать</b>
                <label>
                  <input
                    type="checkbox"
                    name="transfer1"
                    checked={checkbox.transfer1}
                    onChange={handleChangeTransfer}
                  />
                  1 пересадка
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="transferNo"
                    checked={checkbox.transferNo}
                    onChange={handleChangeTransfer}
                  />
                  без пересадок
                </label>
              </form>

              <form className="price form">
                <b className="form__title">Цена</b>
                <label className="form__price">
                  От
                  <input
                    type="text"
                    name="min"
                    onChange={handlePrice}
                    value={price.min}
                  />
                </label>
                <label className="form__price">
                  До
                  <input
                    type="text"
                    name="max"
                    onChange={handlePrice}
                    value={price.max}
                  />
                </label>
              </form>

              <form className="airline form">
                <b className="form__title">Авиакомпания</b>
                <label>
                  <input
                    type="checkbox"
                    name="AirFrance"
                    value="Air France"
                    checked={airline.AirFrance}
                    onChange={handleChangeAirline}
                  />
                  Air France
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="KLM"
                    value="KLM"
                    checked={airline.KLM}
                    onChange={handleChangeAirline}
                  />
                  KLM
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="Airflot"
                    value="Аэрофлот"
                    checked={airline.Airflot}
                    onChange={handleChangeAirline}
                  />
                  Аэрофлот
                </label>
              </form>

              {!searched ? (
                <button onClick={search} className="form__button">
                  {" "}
                  искать
                </button>
              ) : (
                <button onClick={lose} className="form__button">
                  сбросить
                </button>
              )}
            </div>
          </section>

          <FlightsList flights={flights} />
        </div>
      </div>
    </>
  );
};

export default MainPage;
