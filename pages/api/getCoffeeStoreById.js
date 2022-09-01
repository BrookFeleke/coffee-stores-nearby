import {
  table,
  getMinifiedRecord,
  findCoffeeStoresById,
} from '../../lib/airTable';

const getCoffeeStoreById = async (req, res) => {
  const { id } = req.query;

  try {
    if (id) {
      const record = await findCoffeeStoresById(id);
      if (record.length > 0) {
        res.json({ ...record[0] });
      }
    } else {
      res.status(400).json({ message: 'OOerrps' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: 'ooerps', error });
  }
};

export default getCoffeeStoreById;
