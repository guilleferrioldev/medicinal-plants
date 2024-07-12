from fastapi import APIRouter
from fastapi.responses import ORJSONResponse
from utils import split_this, remove_stopwords, load_json

router = APIRouter()

@router.get("/plants")
async def get_prediction(symptoms: str) -> ORJSONResponse:
    return ORJSONResponse({"status": "success", "input": remove_stopwords(split_this(symptoms)), "plantas": load_json("plantas.json")}, status_code=200)