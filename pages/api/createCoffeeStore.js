const Airtable = require('airtable');
const base = new Airtable({ apiKey: `${process.env.AIRTABLE_API_KEY}` }).base(
  `${process.env.AIRTABLE_BASE_KEY}`
);
const table = base('coffee stores');

// console.log({ table: { find } });

const createCoffeeStore = async (req, res) => {
  const { method } = req;
//   const { id } = req.query;
  const {coffeeStore} = req.body

  const {id} = coffeeStore
  if (method === 'POST') {
    try {
      const coffeeStoreFound = await table
        .select({ filterByFormula: `id=${id}` })
        .firstPage();
      //   console.log({ respnose });
      if (coffeeStoreFound.length !== 0) {
        const record = coffeeStoreFound.map((record) => {
          return {
            ...record.fields,
          };
        });
        res.status(200);
        res.json(coffeeStoreFound);
      } else {
        const createRecord = await table.create([
          {
            fields: {
              id: `${id}`,
              name: 'Brooks Second Coffee Store',
              address: 'idk',
              neighborhood: 'here',
              upvote: 100,
              imgUrl: 'sike',
            ...coffeeStore
            },
          },
        ]);
        const record = createRecord.map((record) => {
            return {
              ...record.fields,
            };
          });
        res.status(200).json( record );
      }
    } catch (err) {
      console.log(err);
      res.status(500);
      res.json({ message: 'error', err });
    }
  }
  if (method == 'GET') {
    res.status(200).json({ Message: 'Tis is a Get method' });
  }
};

export default createCoffeeStore;
