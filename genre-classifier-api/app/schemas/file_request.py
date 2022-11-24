from pydantic import BaseModel, Field


class FileRequestSchema(BaseModel):
    fileName: str = Field(
        ...,
        description="File name of the audio file",
        example="audio_file.wav",
        title="File name",
    )
    fileUrl: str = Field(
        ...,
        description="URL of the audio file",
        example="https://example.com/audio_file.wav",
        title="File URL",
    )
    storagePath: str = Field(
        ...,
        description="Path of the audio file compatible with Firebase Storage",
        example="audio/audio_file.wav",
        title="Firebase Storage path",
    )
