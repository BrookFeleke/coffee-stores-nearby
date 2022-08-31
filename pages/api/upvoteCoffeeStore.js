import {
    table,
    getMinifiedRecord,
    findCoffeeStoresById,
  } from '../../lib/airTable';

const upvoteCoffeeStore = async (req,res) => {

    const {method} = req
    if(method === "PUT"){
        // res.json(id)
        try {
            const {id} = req.body
            if(id){
                const records = await findCoffeeStoresById(id)
                if(records){
                    const {upvote,recordId} = records[0]

                    console.log(upvote);
                    const updatedUpvote = parseInt(upvote) + 1
                    const updatedRecord = await table.update([{
                        id:`${recordId}`,
                        fields:{
                            // ...records[0],
                            upvote:updatedUpvote
                        }
                    },])
                    res.json(await getMinifiedRecord(updatedRecord))
                }else {
                    res.json({message:"Coffee Store Doesnt exists in database", id})
                }
            } else {
                res.status(500)
                res.json({message: "Error, couldnt find valid Id"})
            }
        } catch (error) {
            console.log(error);
            res.status(500)
            res.json({message:"Error, Something went wrong with Air Table"}, error.message)
        }
    }

}




  export default upvoteCoffeeStore;
