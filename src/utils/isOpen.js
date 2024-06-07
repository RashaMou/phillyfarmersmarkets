export const isOpen = (market) => {
  const days = {
    0: 'sun',
    1: 'mon',
    2: 'tues',
    3: 'wed',
    4: 'thurs',
    5: 'fri',
    6: 'sat',
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
    11: "December"
  };

  const d = new Date()
  const today = days[d.getDay()];
  const hour = d.getHours()
  const month = months[d.getMonth()]
  const year = d.getFullYear();

  if (market.hours[today]?.start != null) {
    // if it's open year round, we're good!
    if (market.season?.year_round) {
      return true;
    };

    // it's open today, is today between opening and closing months?
    // check if they're valid
    const openingMonth = market.season.opening_month;
    const closingMonth = market.season.closing_month;
    const openingDay = market.season.opening_day;
    const closingDay = market.season.closing_day;

    if (openingMonth == null || closingMonth == null || openingDay == null || closingDay == null) {
      return false;
    }

    const months_reversed = Object.fromEntries(Object.entries(months).map(([k, v]) => [v, parseInt(k)]));

    const opening_month = months_reversed[market.season.opening_month];
    const closing_month = months_reversed[market.season.closing_month];
    const opening_day = market.season.opening_day;
    const closing_day = market.season.closing_day;

    console.log(market.season.opening_month)
    const opening = new Date(`${year}-${String(opening_month).padStart(2, '0')}-${String(opening_day).padStart(2, '0')}`);
    const closing = new Date(`${year}-${months_reversed[market.season.closing_month]}-${market.season?.closing_day}`);

    if (d > opening && d < closing) {
      return true
    }
  }
  return false;
};
