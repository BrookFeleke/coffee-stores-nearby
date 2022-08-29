import { fetchCoffeeStores } from '../../lib/coffee-stores';

const coffeeStoreFetch = async (req, res) => {
  const latLong = req.query.latlong;
  const radius = req.query.r;
  try {
    const response = await fetchCoffeeStores(latLong, radius);
    res.status(200).json(response);
  } catch (e) {
    console.log(e.message);
  }
};

export default coffeeStoreFetch;
