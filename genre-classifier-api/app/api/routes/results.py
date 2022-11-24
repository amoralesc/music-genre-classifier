from fastapi import APIRouter, HTTPException

from app import crud, schemas

router = APIRouter()


@router.get("/", response_model=list[schemas.ResultSchema])
async def read_results() -> list[schemas.ResultSchema]:
    results = await crud.result_crud.retrieve_results()
    return results


@router.get("/{id}", response_model=schemas.ResultSchema)
async def read_result(id: str) -> schemas.ResultSchema:
    result = await crud.result_crud.retrieve_result(id)
    if result is None:
        raise HTTPException(status_code=404, detail="Result not found")
    return result


@router.delete("/{id}", status_code=204)
async def delete_result(id: str) -> None:
    await crud.result_crud.delete_result(id)
    return None
