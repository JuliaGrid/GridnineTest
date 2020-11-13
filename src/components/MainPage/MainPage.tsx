import React, { useEffect, useState } from "react";
import "./App.css";
import FlightsList from "../Flights/FlightsList/FlightsList";
import DataFlights from "../../utils/flights.json";
import {
  FlightPriceType,
  FlightDurationType,
  FlightCarrierType,
  FlightSegmentsType,
} from "../../types/flights";
import {
  sortInit,
  transferInit,
  airlineInit,
  airlineCaptionInit,
  priceInit,
} from "../../initState/mainPage";

const MainPage: React.FC = () => {
  let [flights, setFlights]: any = useState([]);
  let [searched, setSearched] = useState(false);
  let [sort, setSort] = useState(sortInit);
  let [transfer, setTransfer] = useState(transferInit);
  let [airline, setAirline] = useState(airlineInit);
  let [airlineCaption, setAirlineCaption] = useState(airlineCaptionInit);
  let [price, setPrice] = useState(priceInit);

  let dataFromBack: any = DataFlights;
  useEffect(() => {
    setFlights(dataFromBack.result.flights);
  }, []);

  const sortFlights = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = e.currentTarget.value;
    if (value === "increase") {
      setFlights(
        flights.sort((a: FlightPriceType, b: FlightPriceType) => {
          return a.flight.price.total.amount - b.flight.price.total.amount;
        })
      );
      setSort({ increase: true, decrease: false, time: false });
    } else if (value === "decrease") {
      setFlights(
        flights.sort((a: FlightPriceType, b: FlightPriceType) => {
          return b.flight.price.total.amount - a.flight.price.total.amount;
        })
      );
      setSort({ increase: false, decrease: true, time: false });
    } else if (value === "time") {
      setFlights(
        flights.sort((a: FlightDurationType, b: FlightDurationType) => {
          return a.flight.legs[0].duration - b.flight.legs[0].duration;
        })
      );
      setSort({ increase: false, decrease: false, time: true });
    }
  };

  const filterTransferFlights = () => {
    let result = flights;
    if (transfer.transfer1) {
      result = flights.filter((flight: FlightSegmentsType) => {
        return Number(flight.flight.legs[0].segments.length) === 2;
      });
    } else if (transfer.transferNo) {
      result = flights.filter((flight: FlightSegmentsType) => {
        return Number(flight.flight.legs[0].segments.length) === 1;
      });
    }
    setFlights(result);
    flights = result;
  };

  const filterPriceFlights = () => {
    let result = flights.filter((flight: FlightPriceType) => {
      return (
        Number(flight.flight.price.total.amount) >= Number(price.min) &&
        Number(flight.flight.price.total.amount) <= Number(price.max)
      );
    });
    setFlights(result);
    flights = result;
  };

  const filterAirlineFlights = () => {
    let result: any[] = [];
    if (airline.AirFrance) {
      result = result.concat(
        flights.filter((flight: FlightCarrierType) => {
          return flight.flight.carrier.caption.includes(
            airlineCaption.AirFrance
          );
        })
      );
    }
    if (airline.KLM) {
      result = result.concat(
        flights.filter((flight: FlightCarrierType) => {
          return flight.flight.carrier.caption.includes(airlineCaption.KLM);
        })
      );
    }
    if (airline.Airflot) {
      result = result.concat(
        flights.filter((flight: FlightCarrierType) => {
          return flight.flight.carrier.caption.includes(airlineCaption.Airflot);
        })
      );
    }
    if (!airline.AirFrance && !airline.KLM && !airline.Airflot) {
      result = flights;
    }
    setFlights(result);
  };

  const handleChangeTransfer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setTransfer({ ...transfer, [e.target.name]: target.checked });
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
    if (transfer.transferNo || transfer.transfer1) {
      filterTransferFlights();
    }
    filterAirlineFlights();
    setSearched(true);
  };

  const lose = () => {
    setTransfer(transferInit);
    setPrice(priceInit);
    setAirline(airlineInit);
    setAirlineCaption(airlineCaptionInit);
    setSort(sortInit);
    setFlights(dataFromBack.result.flights);
    setSearched(false);
  };

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
                    checked={transfer.transfer1}
                    onChange={handleChangeTransfer}
                  />
                  1 пересадка
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="transferNo"
                    checked={transfer.transferNo}
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
