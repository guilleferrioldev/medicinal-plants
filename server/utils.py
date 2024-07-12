from typing import List
from re import findall
from nltk.corpus import stopwords
import json

def split_this(sentence: str) -> List[str]:
    return findall(r'\b\w+\b', sentence.lower())

def remove_stopwords(list_to_remove: List[str]) -> List[str]:
    stops = set(stopwords.words('spanish'))
    return [word for word in list_to_remove if word not in stops]

def load_json(path: str):
    with open(path, 'r') as file:
        return json.load(file)