const getUrlForCoffeeStores = (latlong, query, radius,limit) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latlong}&query=${query}&radius=${radius}&limit=${limit}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: process.env.FS_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(
      '8.949697666499166%2C38.72713045818331',
      'coffee',
      '90000',
      '30'
    ),
    options
  );
  const data = await response.json();
const results = await data.results
console.log("RESULTS --------------------------",results.length);

const final = results.filter((store,id) => {
return (store.location.formatted_address && store.location.address )
})
console.log("RESULTS --------------------------",final.length);
  return final;
};

