import "./hotels.css";
// import { useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Navbar from "../../components/Navbar/navbar";
import Header from "../../components/Header/header";
import SearchItems from "../../components/SearchItems/searchitems";
import useFetch from "../../hooks/useFetch";
import { baseURL } from "../../baseURL/baseURL";
import { SearchContext } from "../../Context/searchContext";

const Hotels = () => {
  // const location = useLocation();
  const { destination, dates, options, dispatch } = useContext(SearchContext);

  useEffect(() => {
    console.log(new Date(JSON.parse(localStorage.getItem("searchState")).dates[0].endDate))
    console.log(new Date(JSON.parse(localStorage.getItem("searchState")).dates[0].startDate))
    console.log("from useeffect hook === ",destination, dates, options);
  }, [destination, dates, options])
  
  const [searchedDestination, setDestination] = useState(destination);
  const [date, setDate] = useState(dates);
  const [openDate, setOpenDate] = useState(false);
  const [option, setOptions] = useState(options);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(99999);
  // console.log(options);

  const handleOptions = (name, value) => {
    setOptions(prev => {
      return {
        ...prev, [name]: value ? option[name] = value : option[name],
      }
    })
  }
  console.log(dates)

  const { data, loading, error, reFetch } = useFetch(`${baseURL}/hotel?city=${destination}&min=${min || 0}&max=${max || 99999}`);
  // console.log( error);

  const handleClick = () => {
    dispatch({ type: 'NEW_SEARCH', payload: { destination: searchedDestination, dates: date, options: option } });
    reFetch();
  };
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
              <input value={searchedDestination} type="text" onChange={(e) => setDestination(e.target.value)} />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span className="dateInput" onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "dd/MM/yyyy"
              )} to ${format(date[0].endDate, "dd/MM/yyyy")}`}
              </span>
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
                    value={option.adults}
                    onChange={(e) => handleOptions('adults', e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    value={option.children}
                    onChange={(e) => handleOptions('children', e.target.value)}
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    value={option.rooms}
                    onChange={(e) => handleOptions('rooms', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
          </div>

          <div className="listResult">
            {
              !error && loading ? <h1>Loading...</h1> :
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