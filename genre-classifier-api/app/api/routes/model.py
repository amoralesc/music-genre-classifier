from fastapi import APIRouter, HTTPException

from app import crud, schemas

router = APIRouter()


@router.get("/", response_model=schemas.MLModelSchema)
async def read_model() -> schemas.MLModelSchema:
    model = await crud.ml_model_crud.retrieve_ml_model()
    if model is None:
        raise HTTPException(status_code=404, detail="Model not found")
    return model


@router.post("/", response_model=schemas.MLModelSchema)
@router.put("/", response_model=schemas.MLModelSchema)
async def replace_model(model: schemas.MLModelSchema) -> schemas.MLModelSchema:
    await crud.ml_model_crud.update_ml_model(model)
    return model


@router.delete("/", status_code=204)
async def delete_model() -> None:
    await crud.ml_model_crud.delete_ml_model()
    return None
