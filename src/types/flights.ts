export type FlightType = {
  flight: {
    legs: [
      {
        segments: [];
      }
    ];
  };
};

export type FlightsPriceType = {
  flight: {
    price: {
      total: {
        amount: number;
      };
    };
  };
};
