import math
from typing import List, Dict

def tf(word: str, sentence: List[str]):
  """Calculates the term frequency (TF) of a word in a list"""
  return sentence.count(word) / len(sentence)

def idf(word: str, documents: List[str]):
  """
  Calculates the inverse document frequency (IDF) of a word in a set of documents.
  """
  num_documents_with_word = sum(1 for document in documents if word in document) + 1
  return math.log(len(documents) / (num_documents_with_word))

def tfidf(word: str, sentence: List[str], documents: List[str]):
  """
  Calculates the TF-IDF value of a word in a sentence given a set of documents.
  """
  return tf(word, sentence) * idf(word, documents)

def extract_tfidf(list_of_words: List[str], properties: Dict[str, List[str]], name: str = ""):
  result = {prop: sum({word: tfidf(word, lemma, properties) for word in list_of_words}.values()) for prop, lemma in properties.items()}
  if name == "diseases":
    return dict(sorted({prop : value + 3  for prop, value in result.items() if value != 0.0}.items(), key=lambda item: item[1], reverse=True))
  return dict(sorted({prop : value for prop, value in result.items() if value != 0.0}.items(), key=lambda item: item[1], reverse=True))