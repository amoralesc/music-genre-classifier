from fastapi import APIRouter

from app import crud, schemas
from app.worker import classify_audio

router = APIRouter()


@router.post("/", response_model=schemas.ResultSchema)
async def predict(file: schemas.FileRequestSchema) -> schemas.ResultSchema:
    status = schemas.ResultSchema.Status(
        code="PROCESSING", message="The request is being processed"
    )
    result = schemas.ResultSchema(status=status, file_request=file)

    # Create a new result in the database
    result = await crud.result_crud.add_result(result)

    # Send the file to the worker
    classify_audio.delay(result.id, file)

    return result
