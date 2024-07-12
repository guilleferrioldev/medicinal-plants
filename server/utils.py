from typing import List
from re import findall
from nltk.corpus import stopwords
import json

import spacy

def split_sentence(sentence: str) -> List[str]:
    return findall(r'\b\w+\b', sentence.lower())

def remove_stopwords(list_to_remove: List[str]) -> List[str]:
    stops = set(stopwords.words('spanish'))
    return [word for word in list_to_remove if word not in stops]

def lemmatization(words: List[str]) -> List[str]:
    nlp = spacy.load("es_core_news_sm")
    return [token.lemma_ for word in words for token in nlp(word)]

def apply_from_split_to_lemmatization(sentence: str) -> List[str]:
    return lemmatization(remove_stopwords(split_sentence(sentence)))

def load_json(path: str):
    with open(path, 'r') as file:
        return json.load(file)