import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_API_ACCESS_KEY,
  // clientKey: process.env.UNSPLASH_API_ACCESSKEY
});

const getUrlForCoffeeStores = (latlong, query, radius, limit) => {
  return `https://api.foursquare.com/v3/places/search?ll=${latlong}&query=${query}&radius=${radius}&limit=${limit}`;
};

const getCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 10,
    orientation:'landscape'
  });

  const unsplashResults = await photos.response.results;
  return unsplashResults.map((results) => results.urls['full']);
};

export const fetchCoffeeStores = async () => {
  const photos = await getCoffeeStorePhotos();
  // console.log(photos)

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
  const results = await data.results;

  const final = results.filter((store, id) => {
    return store.location.formatted_address && store.location.address;
  });

  return final.map((store, index) => {
    return {
      ...store,
      imgUrl: photos[index],
    };
  });
};
