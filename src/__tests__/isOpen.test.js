const { isOpen, checkOpeningHours } = require("../utils/isOpen");

// Mock Date object
const mockDate = (date) => {
  const RealDate = Date;
  const MockDate = class extends RealDate {
    constructor(...args) {
      if (args.length) {
        return new RealDate(...args);
      }
      return new RealDate(date);
    }
  };
  global.Date = MockDate;
};

describe("isOpen function", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return false when market is closed on the current day", () => {
    mockDate("2023-09-21T12:00:00"); // Thursday
    const market = {
      hours: {
        Mon: { start: 9, end: 17 },
        Wed: { start: 9, end: 17 },
        Fri: { start: 9, end: 17 },
      },
    };
    expect(isOpen(market)).toBe(false);
  });

  test("should return false when current time is outside market hours", () => {
    mockDate("2023-09-20T18:00:00"); // Wednesday 6 PM
    const market = {
      hours: {
        Wed: { start: 9, end: 17 },
      },
    };
    expect(isOpen(market)).toBe(false);
  });

  test("should return true when market is open year-round and within hours", () => {
    mockDate("2023-09-20T12:00:00"); // Wednesday 12 PM
    const market = {
      hours: {
        Wed: { start: 9, end: 17 },
      },
      season: {
        year_round: true,
      },
    };
    expect(isOpen(market)).toBe(true);
  });

  test("should return true when market is open seasonally and within season", () => {
    mockDate("2023-07-15T12:00:00"); // July 15, 12 PM
    const market = {
      hours: {
        Sat: { start: 9, end: 17 },
      },
      season: {
        year_round: false,
        opening_month: "June",
        closing_month: "August",
        opening_day: 1,
        closing_day: 31,
      },
    };
    expect(isOpen(market)).toBe(true);
  });

  test("should return false when market is open seasonally but outside season", () => {
    mockDate("2023-09-15T12:00:00"); // September 15, 12 PM
    const market = {
      hours: {
        Fri: { start: 9, end: 17 },
      },
      season: {
        year_round: false,
        opening_month: "June",
        closing_month: "August",
        opening_day: 1,
        closing_day: 31,
      },
    };
    expect(isOpen(market)).toBe(false);
  });
});

describe("checkOpeningHours function", () => {
  test("should return true when current hour is within market hours", () => {
    const marketHours = { start: 9, end: 17 };
    expect(checkOpeningHours(marketHours, 12)).toBe(true);
  });

  test("should return undefined when current hour is outside market hours", () => {
    const marketHours = { start: 9, end: 17 };
    expect(checkOpeningHours(marketHours, 18)).toBeUndefined();
  });
});
