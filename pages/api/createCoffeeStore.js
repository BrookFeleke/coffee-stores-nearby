// console.log({ table: { find } });
import { table, getMinifiedRecord } from '../../lib/airTable';

const createCoffeeStore = async (req, res) => {
  const { method } = req;
  //   const { id } = req.query;
  if (method === 'POST') {
    const { coffeeStore } = req.body;
    console.table(req.body);
    const { id, name, address, neighborhood, upvote, imgUrl } = req.body;
    if (id) {
      try {
        const coffeeStoreFound = await table
          .select({ filterByFormula: `id="${id}"` })
          .firstPage();
        //   console.log({ respnose });
        if (coffeeStoreFound.length !== 0) {
          const record = getMinifiedRecord(coffeeStoreFound);
          res.status(200);
          res.json(record);
        } else {
          if (name) {
            const createRecord = await table.create([
              {
                fields: {
                  id,
                  name,
                  address,
                  neighborhood,
                  upvote,
                  imgUrl,
                },
              },
            ]);
            const record = getMinifiedRecord(createRecord);
            res.status(200).json(record);
          } else {
            res.status(400).json({ message: 'It has No name' });
          }
        }
      } catch (err) {
        console.log(err);
        res.status(500);
        res.status(500).json({ message: 'error', err });
      }
    } else {
      res.status(400).json({ message: 'Body contains no valid Id' });
    }
  }
  if (method == 'GET') {
    res.status(200).json({ Message: 'Tis is a Get method' });
  }
};

export default createCoffeeStore;
