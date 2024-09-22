const isOpen = (market) => {
  const days = {
    0: "Sun",
    1: "Mon",
    2: "Tues",
    3: "Wed",
    4: "Thurs",
    5: "Fri",
    6: "Sat",
  };

  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const d = new Date();
  const today = days[d.getDay()];
  const hour = d.getHours();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  // return false if we aren't on an opening day
  if (market.hours[today]?.start == null) {
    return false;
  }

  const isOpenHours = checkOpeningHours(market.hours[today], hour);

  // return false if we aren't within opening hours
  if (!isOpenHours) {
    return false;
  }

  // if it's open year round, we're good!
  if (market.season?.year_round) {
    return true;
  }

  // it's open today, is today between opening and closing months?
  const openingMonth = market.season.opening_month;
  const closingMonth = market.season.closing_month;
  const openingDay = market.season.opening_day;
  const closingDay = market.season.closing_day;

  // first check if they're valid
  if (
    openingMonth == null ||
    closingMonth == null ||
    openingDay == null ||
    closingDay == null
  ) {
    return false;
  }

  const months_reversed = Object.fromEntries(
    Object.entries(months).map(([k, v]) => [v, parseInt(k)]),
  );

  const opening_month = months_reversed[market.season.opening_month];
  const closing_month = months_reversed[market.season.closing_month];
  const opening_day = market.season.opening_day;
  const closing_day = market.season.closing_day;

  const opening = new Date(
    `${year}-${String(opening_month).padStart(2, "0")}-${String(opening_day).padStart(2, "0")}`,
  );
  const closing = new Date(
    `${year}-${String(closing_month)}-${String(closing_day)}`,
  );

  if (d > opening && d < closing) {
    return true;
  } else {
    return false;
  }
};

const checkOpeningHours = (market_hours, current_hour) => {
  if (current_hour >= market_hours.start && current_hour < market_hours.end) {
    return true;
  }
};

module.exports = { isOpen, checkOpeningHours };
