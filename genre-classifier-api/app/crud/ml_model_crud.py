from bson.objectid import ObjectId

from app.db.database import ml_models_collection
from app.db.helper import ml_model_helper


# while this is a collection, at all times, there is only
# one ml_model in the collection that is replaced if POSTed


async def retrieve_ml_model() -> dict:
    ml_model = await ml_models_collection.find_one()
    if ml_model:
        return ml_model_helper(ml_model)


async def update_ml_model(ml_model_data: dict) -> dict:
    # before adding, delete the existing ml_model
    await ml_models_collection.delete_many({})

    ml_model = await ml_models_collection.insert_one(ml_model_data)
    new_ml_model = await ml_models_collection.find_one({"_id": ml_model.inserted_id})
    return ml_model_helper(new_ml_model)


async def delete_ml_model() -> bool:
    ml_model = await ml_models_collection.find_one()
    if ml_model:
        await ml_models_collection.delete_one({"_id": ObjectId(ml_model["_id"])})
        return True
    return False
