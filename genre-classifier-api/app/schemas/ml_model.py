from pydantic import BaseModel, Field


class MLModelSchema(BaseModel):
    name: str = Field(
        ...,
        description="Name of the model",
        example="genre-classifier",
        title="Model name",
    )
    version: str = Field(
        ...,
        description="Version of the model",
        example="1",
        title="Model version",
    )
    description: str = Field(
        description="Description of the model",
        example="A model that classifies audio files into 10 genres",
        title="Model description",
        default="",
    )
    serialization: str = Field(
        ...,
        description="Pickle serialization of the model",
        example="",
        title="Model serialization",
    )
