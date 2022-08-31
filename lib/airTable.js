const Airtable = require('airtable');
const base = new Airtable({ apiKey: `${process.env.AIRTABLE_API_KEY}` }).base(
  `${process.env.AIRTABLE_BASE_KEY}`
);
const table = base('coffee stores');

const getMinifiedRecord = (records) => {
  return records.map((record) => {
    return { recordId:record.id,...record.fields };
  });
};

const findCoffeeStoresById = async (id,) => {
  const coffeeStoreFound = await table
    .select({ filterByFormula: `id="${id}"` })
    .firstPage();
  //   console.log({ respnose });
 
  return await getMinifiedRecord(coffeeStoreFound);
};

export { table, getMinifiedRecord, findCoffeeStoresById };
