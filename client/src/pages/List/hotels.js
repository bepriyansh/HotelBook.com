import "./hotels.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Navbar from "../../components/Navbar/navbar";
import Header from "../../components/Header/header";
import SearchItems from "../../components/SearchItems/searchitems";
import useFetch from "../../components/hooks/useFetch";

const Hotels = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(99999);
  console.log(options);

  const { data, loading, error } = useFetch(`/hotel?city=${destination}`);
  console.log(data, loading, error);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input value={destination} type="text" onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night (₹)</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMin(e.target.value)} value={`${min}`} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night (₹)</small>
                  </span>
                  <input type="number" className="lsOptionInput" onChange={(e) => setMax(e.target.value)} value={`${max}`} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.adults}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    value={options.children}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={options.rooms}
                  />
                </div>
              </div>
            </div>
            <button onClick={() => setOptions(options)}>Search</button>
          </div>

          <div className="listResult">
            {
              loading ? <h1>Loading...</h1> :
                <div>
                  {data.map(data => (<SearchItems data={data} key={data._id} />))}
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hotels