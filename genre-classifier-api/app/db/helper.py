def result_helper(result) -> dict:
    return {
        "id": str(result["_id"]),
        "status": result["status"],
        "file_request": result["file_request"],
        "prediction": result["prediction"],
    }


def ml_model_helper(ml_model) -> dict:
    return {
        "id": str(ml_model["_id"]),
        "name": ml_model["name"],
        "description": ml_model["description"],
        "serialization": ml_model["serialization"],
    }
