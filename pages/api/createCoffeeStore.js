// console.log({ table: { find } });
import {
  table,
  getMinifiedRecord,
  findCoffeeStoresById,
} from '../../lib/airTable';

const createCoffeeStore = async (req, res) => {
  const { method } = req;

  if (method === 'POST') {
    const { id, name, address, neighborhood, upvote, imgUrl } = req.body;
    if (id) {
      try {
        const record = await findCoffeeStoresById(id);
        if (record.length !== 0) {
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
            const record = await getMinifiedRecord(createRecord);
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
  if (method === 'GET') {
    res.status(200).json({ Message: 'Tis is a Get method' });
  }
};

export default createCoffeeStore;
