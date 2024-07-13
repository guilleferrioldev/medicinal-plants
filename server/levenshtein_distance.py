def levenshtein_distance(cadena1, cadena2):
  """Calcula la distancia de Levenshtein entre dos cadenas de caracteres.

  Args:
    cadena1: La primera cadena de caracteres.
    cadena2: La segunda cadena de caracteres.

  Returns:
    La distancia de Levenshtein entre las dos cadenas.
  """

  # Crea una matriz de tamaño (len(cadena1) + 1) x (len(cadena2) + 1)
  n = len(cadena1) + 1
  m = len(cadena2) + 1
  distancia = [[0 for _ in range(m)] for _ in range(n)]

  # Inicializa la primera fila y columna de la matriz
  for i in range(n):
    distancia[i][0] = i
  for j in range(m):
    distancia[0][j] = j

  # Calcula la distancia de Levenshtein para cada par de caracteres
  for i in range(1, n):
    for j in range(1, m):
      costo = 0 if cadena1[i - 1] == cadena2[j - 1] else 1
      distancia[i][j] = min(
          distancia[i - 1][j] + 1,  # Eliminación
          distancia[i][j - 1] + 1,  # Inserción
          distancia[i - 1][j - 1] + costo  # Sustitución
      )

  # La distancia de Levenshtein se encuentra en la última celda de la matriz
  return distancia[n - 1][m - 1]

