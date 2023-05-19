import { baseURL } from '../../baseURL/baseURL';
import useFetch from '../../hooks/useFetch';
import './featuredproperty.css';

const FeaturedProperty = () => {


  const { data, loading, error } = useFetch(`${baseURL}/hotel?featured=true&limit=3`);

  return (
    <div>
      {
        !error && loading ? <h1>Loading...</h1> :
          <div className="fp">
            {(data).map((data, index) => (
              <div className="fpItem" key={index}>
                <img
                  src={data.photos[0]}
                  alt=""
                  className="fpImg"
                />
                <span className="fpName">{data.name}</span>
                <span className="fpCity">{data.city}</span>
                <span className="fpPrice">Starting from ₹{data.cheapestPrice}/-</span>
                <div className="fpRating">
                  <button>{data.rating}</button>
                  <span>Excellent</span>
                </div>
              </div>
            ))}
          </div>
      }
    </div>
  )
}

export default FeaturedProperty