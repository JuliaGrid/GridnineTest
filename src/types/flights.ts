export type FlightType = {
  flight: {
    legs: [
      | { duration: number }
      | {
          segments: [];
        }
    ];
  };
};

export type FlightSegmentsType = {
  flight: {
    legs: [
      {
        segments: [];
      }
    ];
  };
};

export type FlightSegType = {
  departureCity?: {
    caption: string;
  };
  departureAirport: {
    caption: string;
    uid: string;
  };
  arrivalCity?: {
    caption: string;
  };
  arrivalAirport: {
    caption: string;
    uid: string;
  };
  departureDate: string;
  arrivalDate: string;
  airline: {
    uid: string;
    caption: string;
  };
};

export type FlightPriceType = {
  flight: {
    price: {
      total: {
        amount: number;
      };
    };
  };
};

export type FlightDurationType = {
  flight: {
    legs: [
      {
        duration: number;
      }
    ];
  };
};

export type FlightCarrierType = {
  flight: {
    carrier: {
      caption: string;
    };
  };
};
