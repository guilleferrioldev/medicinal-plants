from utils import apply_from_split_to_lemmatization, load_json

diseases = load_json("enfermedades.json")

print(apply_from_split_to_lemmatization("ansiedad, estrés insimnio alergias estresada fiebre"))