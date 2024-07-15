from fastapi import APIRouter
from fastapi.responses import ORJSONResponse
from utils import apply_from_split_to_lemmatization, load_json, split_sentence, remove_stopwords
from calculus import extract_tf_idf, extract_jaccard_similarity
from collections import defaultdict

router = APIRouter()

@router.get("/plants")
async def get_prediction(symptoms: str, page: int) -> ORJSONResponse:
    try:
        properties = load_json("propiedades.json")
        diseases = load_json("enfermedades.json")
        plants = load_json("plantas.json")

        start = (page - 1) * 10
        end = start + 10

        if (symptoms == "") : 
            return ORJSONResponse(
            {
             "status": "success",
             "plants": [plant["nombre"] for plant in plants][start: end]
            }, 
            status_code=200)
    
        symptoms_lemma = apply_from_split_to_lemmatization(symptoms)

        "TF-IDF"
        properties_tf_idf = extract_tf_idf(symptoms_lemma, {prop["nombre"]: prop["lema"] for prop in properties})
        diseases_tf_idf = extract_tf_idf(symptoms_lemma, {disease["nombre"]: disease["lema"] for disease in diseases}, "diseases")

        "Jaccard Similarity"
        properties_jaccard = extract_jaccard_similarity(symptoms_lemma, {prop["nombre"]: prop["lema"] for prop in properties})
        diseases_jaccard = extract_jaccard_similarity(symptoms_lemma, {disease["nombre"]: disease["lema"] for disease in diseases}, "diseases")
        
        response_plants = {}
        for plant in plants:
            values = defaultdict(int)
            properties_of_this_plant = sum(plant["propiedades"].values(), [])
            diseases_of_this_plant = plant["enfermedades"]
            #tf-idf
            for prop, value in properties_tf_idf.items():
                if prop in properties_of_this_plant:
                    values["tf_idf"] += value

            for disease, value in diseases_tf_idf.items():
                if disease in diseases_of_this_plant:
                    values["tf_idf"] += value

            #Jaccard Similarity
            for prop, value in properties_jaccard.items():
                if prop in properties_of_this_plant:
                    values["jaccard"] += value

            for disease, value in diseases_jaccard.items():
                if disease in diseases_of_this_plant:
                    values["jaccard"] += value

            if values != {}:
                values["tf_idf"] *= 0.3
                values["jaccard"] *= 0.1
                response_plants[plant["nombre"]] = sum(values.values())
        
        return ORJSONResponse(
            {
             "status": "success",
             "plants": list(dict(sorted(response_plants.items(), key=lambda item: item[1], reverse=True)))[start:end]
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
             "plant": [plant for plant in plants if plant["nombre"] == name][0]
            }, 
            status_code=200)
    except Exception as err:
        return ORJSONResponse({"status": "error", "message": err.args[0]}, status_code=400)

@router.get("/property/{name}")
async def get_property(name: str) -> ORJSONResponse:
    try:
        properties = load_json("propiedades.json")

        return ORJSONResponse({
             "status": "success",
             "descripcion": [prop["descripcion"] for prop in properties if prop["nombre"] == name][0]
            }, 
            status_code=200)
    except Exception as err:
        return ORJSONResponse({"status": "error", "message": err.args[0]}, status_code=400)
