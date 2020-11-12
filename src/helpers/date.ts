export const writeDate = (date: string) => {
  const date1 = new Date(date);
  let sliceDate = date.split("T")[0].split("-");
  let month = sliceDate[1];
  switch (month) {
    case "01":
      month = "янв.";
      break;
    case "02":
      month = "фев.";
      break;
    case "03":
      month = "мар.";
      break;
    case "04":
      month = "апр.";
      break;
    case "05":
      month = "мая";
      break;
    case "06":
      month = "июн.";
      break;
    case "07":
      month = "июл.";
      break;
    case "08":
      month = "авг.";
      break;
    case "09":
      month = "сен.";
      break;
    case "10":
      month = "окт.";
      break;
    case "11":
      month = "ноя.";
      break;
    case "12":
      month = "дек.";
      break;
    default:
      month = "another";
      break;
  }
  return sliceDate[2] + " " + month;
};

export const writeTime = (time: string) => {
  let sliceDate = time.split("T");
  let sliceTime = sliceDate[1].split(":");
  return sliceTime[0] + ":" + sliceTime[1];
};
