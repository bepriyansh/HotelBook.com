import { useNavigate } from 'react-router-dom';
import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import './featured.css'
import { useContext } from 'react';
import { SearchContext } from '../../Context/searchContext';

const Featured = () => {

  const { data, loading } = useFetch(`${baseURL}/hotel/countByCity?cities=Delhi,Mumbai,Bangalore`);
  // console.log(data, loading, error);

  const imgList = [
    "https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o=",
    "https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
  ];

  const navigate = useNavigate();
  const {  dates, options, dispatch } = useContext(SearchContext);
  const handleClick = (city) => {
    navigate('/hotels', { state: { destination: city, dates, options } });
    dispatch({ type: "NEW_SEARCH", payload: { destination: city } });
    // console.log("Dispatched from Hotel Search List's handleClick");
  };
  return (
    <div>
      {
        loading ? <h1>Loading...</h1> :
          <div className='featured'>
            {data.map((item, i) => (
              <div onClick={() => handleClick(item.city)} className="featuredItem" key={i}>
                <img
                  src={imgList[i]}
                  alt=""
                  className="featuredImg"
                />
                <div className="featuredTitles">
                  <h1>{item.city}</h1>
                  <h2>{item.count} properties</h2>
                </div>
              </div>

            ))}
          </div>}
    </div>
  );
}

export default Featured