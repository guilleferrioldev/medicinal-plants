from fastapi import APIRouter
from fastapi.responses import ORJSONResponse
from utils import apply_from_split_to_lemmatization, load_json, split_sentence
from tf_idf import extract_tfidf, tf
from collections import defaultdict

from typing import Optional

router = APIRouter()

@router.get("/plants")
async def get_prediction(symptoms: str) -> ORJSONResponse:
    try:
        properties = load_json("propiedades.json")
        diseases = load_json("enfermedades.json")
        plants = load_json("plantas.json")
    
        symptoms_lemma = apply_from_split_to_lemmatization(symptoms)

        "TF-IDF"
        properties_tf_idf_lemma = extract_tfidf(symptoms_lemma, {prop["nombre"]: prop["lema"] for prop in properties})
        diseases_tf_idf_lemma = extract_tfidf(symptoms_lemma, {disease["nombre"]: disease["lema"] for disease in diseases}, "diseases")
        
        plants_tf = defaultdict(int)
        for plant in plants:
            for disease, value in diseases_tf_idf_lemma.items():
                if disease in plant["enfermedades"]:
                    plants_tf[plant["nombre"]] += value

            for prop, value in properties_tf_idf_lemma.items():
                if prop in sum(plant["propiedades"].values(), []):
                    plants_tf[plant["nombre"]] += value
        
        return ORJSONResponse(
            {
             "status": "success",
             "plants": list(dict(sorted(plants_tf.items(), key=lambda item: item[1], reverse=True)))[:5]
            }, 
            status_code=200)
    except Exception as err:
        return ORJSONResponse({"status": "error", "message": err.args[0]}, status_code=400)


@router.get("/plants/{name}")
async def get_plant(name: str) -> ORJSONResponse:
    try:
        plants = load_json("plantas.json")

        return ORJSONResponse({
             "status": "success",
             "data": [plant for plant in plants if plant["nombre"] == name][0]
            }, 
            status_code=200)
    except Exception as err:
        return ORJSONResponse({"status": "error", "message": err.args[0]}, status_code=400)
