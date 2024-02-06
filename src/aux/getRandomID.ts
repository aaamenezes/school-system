function generateRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return letters.charAt(Math.round(Math.random() * letters.length));
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
