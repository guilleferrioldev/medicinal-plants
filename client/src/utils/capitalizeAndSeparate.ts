export function separateWords(text: string): string[] {
  text = text.trim();
  text.replace(/[^a-zA-Z\sñáéíóúüÁÉÍÓÚÜ]/g, " ");
  return text.split(" ");
}
 
export function capitalizeFirstWord(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
 }
 
export function joinWords(words: string[], capitalizedFirstWord: string): string {
  return capitalizedFirstWord + " " + words.slice(1).join(" ");
}
 
export function capitalizeAndSeparate(text: string): string {
  const words = separateWords(text);
  const capitalizedFirstWord = capitalizeFirstWord(words[0]);
  return joinWords(words, capitalizedFirstWord);
}
