export const mungeMarkets = (markets) => {
  for (const market of markets) {
    const { attributes } = market;
    const website = attributes.contact_website ? (attributes.contact_website.startsWith('https://')
      ? attributes.contact_website
      : `https://${attributes.contact_website}`)
      : '';
    const days = ["mon", "tues", "wed", "thurs", "fri", "sat", "sun"];
    const hours = {};
    const season = {};
    const payment_methods = {};

    for (const day of days) {
      // set hours
      if (attributes[`hours_${day}_start`]) {
        hours[capitalize(day)] = {};
        hours[capitalize(day)].start = attributes[`hours_${day}_start`];
        hours[capitalize(day)].end = attributes[`hours_${day}_end`];
        hours[capitalize(day)].exceptions = attributes[`hours_${day}_exceptions`];
      }
      // set season
      season.year_round = attributes.season_year_round == 'yes' ? true : false;
      season.opening_month = attributes.season_opening_month;
      season.closing_month = attributes.season_closing_month;
      season.opening_day = attributes.season_opening_day;
      season.closing_day = attributes.season_closing_day;

      // set payment_methods
      if (attributes.payment_cash && attributes.payment_cash.toLowerCase() == "yes") {
        payment_methods.cash = "Cash";
      }
      if (attributes.payment_credit && attributes.payment_credit.toLowerCase() == "yes") {
        payment_methods.credit = "Credit";
      }
      if (attributes.payment_snap && attributes.payment_snap.toLowerCase() == "yes") {
        payment_methods.snap = "SNAP";
      }
      if (attributes.payment_fmnp && attributes.payment_fmnp.toLowerCase() == "yes") {
        payment_methods.fmnp = "FMNP";
      }
      if (attributes.payment_philly_food_bucks && attributes.payment_philly_food_bucks.toLowerCase() == "yes") {
        payment_methods.philly_food_bucks = "Philly Food Bucks";
      }
      if (attributes.payment_low_cost && attributes.payment_low_cost.toLowerCase() == "yes") {
        payment_methods.low_cost = "Low cost";
      }
      if (attributes.payment_other_low_cost) {
        payment_methods.other_low_cost = attributes.payment_other_low_cost;
      }
    }

    // remove unnecessary properties
    for (const key in attributes) {
      if (/^payment_/.test(key)) delete attributes[key];
      if (/^hours_/.test(key)) delete attributes[key];
      if (/^season_/.test(key)) delete attributes[key];
      if (/^contact_website/.test(key)) delete attributes[key];
    }

    market.attributes = { ...attributes, hours, season, payment_methods, website };
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return markets;
};
