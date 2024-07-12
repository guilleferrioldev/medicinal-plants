import math

def calcular_tf(palabra, documento):
  """Calcula la frecuencia del término (TF) de una palabra en un documento."""
  return documento.count(palabra) / len(documento)

def calcular_idf(palabra, corpus):
  """Calcula la frecuencia inversa del documento (IDF) de una palabra en un corpus."""
  n_documentos = len(corpus)
  n_documentos_con_palabra = sum(1 for documento in corpus if palabra in documento)
  return math.log((n_documentos + 1) / (n_documentos_con_palabra + 1)) + 1

def calcular_tfidf(palabra, documento, corpus):
  """Calcula el puntaje TF-IDF de una palabra en un documento."""
  tf = calcular_tf(palabra, documento)
  idf = calcular_idf(palabra, corpus)
  return tf * idf

def obtener_vector_tfidf(documento, corpus):
  """Calcula el vector TF-IDF para un documento dado."""
  palabras_unicas = set()
  for doc in corpus:
    for palabra in doc:
      palabras_unicas.add(palabra)

  vector_tfidf = {}
  for palabra in palabras_unicas:
    vector_tfidf[palabra] = calcular_tfidf(palabra, documento, corpus)

  return vector_tfidf

# Ejemplo de uso
corpus = [
  ["Esta", "es", "una", "prueba", "de", "corpus"],
  ["otra", "prueba", "de", "corpus", "con", "palabras"],
  ["diferentes", "palabras", "en", "el", "corpus"],
]

documento = ["Esta", "es", "otra", "prueba"]

vector_tfidf = obtener_vector_tfidf(documento, corpus)

print(vector_tfidf)
