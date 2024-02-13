function generateRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomPosition = Math.round(Math.random() * letters.length);
  return letters.charAt(randomPosition);
}

function generateRandomNumber() {
  return Math.round(Math.random() * 9);
}

export function getRandomId() {
  return [
    generateRandomLetter(),
    generateRandomLetter(),
    generateRandomNumber(),
    generateRandomNumber(),
    generateRandomNumber()
  ].join('');
}
