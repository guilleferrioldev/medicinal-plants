from typing import List, Set
from re import findall
from nltk.corpus import stopwords
from json import load as load_this_json
from spacy import load as load_spacy

def split_sentence(sentence: str) -> List[str]:
    return list(set(findall(r'\b\w+\b', sentence.lower())))

def remove_stopwords(list_to_remove: List[str]) -> Set[str]:
    stops = set(stopwords.words('spanish'))
    return {word for word in list_to_remove if word not in stops}

def replace_accents(word: str) -> str:
    return word.replace('á', 'a').replace('é', 'e').replace('í', 'i').replace('ó', 'o').replace('ú', 'u')

def lemmatization(words: Set[str]) -> List[str]:
    nlp = load_spacy("es_core_news_sm")
    return list({replace_accents(token.lemma_) for word in words for token in nlp(word)})

def apply_from_split_to_lemmatization(sentence: str) -> List[str]:
    return lemmatization(remove_stopwords(split_sentence(sentence)))

def load_json(path: str):
    with open(path, 'r') as file:
        return load_this_json(file)