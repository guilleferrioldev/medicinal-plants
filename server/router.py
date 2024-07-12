from fastapi import APIRouter
from fastapi.responses import ORJSONResponse
from utils import apply_from_split_to_lemmatization, load_json

router = APIRouter()

@router.get("/plants")
async def get_prediction(symptoms: str) -> ORJSONResponse:
    try:
        properties = load_json("propiedades.json")["propiedades"]

        return ORJSONResponse(
            {
             "status": "success",
             "input": apply_from_split_to_lemmatization(symptoms),
             "data": properties
            },
            status_code=200)
    except Exception as err:
        return ORJSONResponse({"status": "error", "message": err.args[0]}, status_code=400)