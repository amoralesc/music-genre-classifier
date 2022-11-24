from pydantic import BaseSettings, AnyHttpUrl, validator, AnyUrl


class Settings(BaseSettings):
    API_STR: str = "/api"
    PROJECT_NAME: str
    BACKEND_CORS_ORIGINS: list[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: str | list[str]) -> list[str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    MONGODB_URI: AnyUrl
    MONGODB_DATABASE: str

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
