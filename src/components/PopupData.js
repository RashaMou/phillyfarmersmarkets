const PopupData = ({ market, isExpanded, onToggleExpand, coords }) => {
  const toggleExpansion = (event) => {
    event.stopPropagation();
    onToggleExpand();
  };

  return (
    <div className="text-[#333] p-3.5 shadow-[0 2px 6px rgba(0,0,0,0.1)]">
      <p className="text-base font-medium text-[#ffa500]">{market.name}</p>
      <div className="flex items-center">
        <a href={`https://www.google.com/maps/dir/?api=1&destination=${coords.y},${coords.x}`}><img src="compass.png" className="w-6 mr-1" alt="compass" /></a><span className="text-sm" alt="compass">{market.address}, {market.zip}</span>
      </div>
      {
        Object.keys(market.hours).map(day => {
          return (
            <p key={day}>{day}: {market.hours[day].start} - {market.hours[day].end}</p>
          );
        })
      }
      {
        !isExpanded &&
        <img src="down.png" alt="expand arrow" className="w-3 cursor-pointer m-auto block" onClick={toggleExpansion} />
      }
      {
        isExpanded &&
        <>
          <img src="down.png" alt="expand arrow" className="w-3 cursor-pointer m-auto block rotate-180 mb-2" onClick={toggleExpansion} />
          <div className="flex flex-col justify-between h-full mb-2">
            <span className="mb-2">{
              market.website
                ? <a href={market.website} className="mb-2">{market.operator}</a>
                : market.operator
            }</span>
            <span>{
              market.season.year_round
                ? "Open year-round"
                : (market.season.opening_month || market.season.closing_month)
                  ? `${market.season.opening_day ? market.season.opening_day + " " : ""}${market.season.opening_month ? market.season.opening_month + " - " : ""
                  }${market.season.closing_day ? market.season.closing_day + " " : ""}${market.season.closing_month ? market.season.closing_month : ""
                  }`
                  : ""}
            </span>
            <div className="flex mt-2 justify-start pb-2">
              {market.contact_facebook && <a href={market.contact_facebook}><img src="facebook.png" className="w-7 pr-2" alt="facebook" /></a>}
              {market.contact_instagram && <a href={market.contact_instagram}><img src="instagram.png" className="w-7 pr-2" alt="instagram" /></a>}
              {market.contact_x && <a href={market.contact_x}><img src="x.png" className="w-6" alt="x logo" /></a>}
            </div>
            <hr className="mb-3 mt-1" />
            {Object.keys(market.payment_methods).length > 0 &&
              <div className="flex flex-col justify-between">
                <div className="flex items-center ml-[-6px] mb-2">
                  <img src="payment.png" className="w-7 mr-1" alt="payment icon" /><span className="text-sm text-[#ffa500]">Payment Methods:</span>
                </div>
                <ul className="list-disc ml-[18px]">
                  {Object.keys(market.payment_methods).map((idx, method => {
                    return <li className="pb-1" key={idx}>{market.payment_methods[method]}</li>
                  }))}
                </ul>
              </div>
            }
          </div>
        </>
      }
    </div >
  )
};

export default PopupData;
