function generateRandomLetter() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomPosition = Math.round(Math.random() * letters.length);
  return letters.charAt(randomPosition);
}

function generateRandomNumber() {
  return Math.round(Math.random() * 9);
}

function generateRandomGroupLetter() {
  const letters = 'ABCDEFGH';
  const randomPosition = Math.round(Math.random() * letters.length);
  return letters.charAt(randomPosition);
}

function generateRandomShift() {
  const shifts = 'MTN';
  const randomPosition = Math.round(Math.random() * shifts.length);
  return shifts.charAt(randomPosition);
}

////////////////////

function getRandomId() {
  return [
    generateRandomLetter(),
    generateRandomLetter(),
    generateRandomNumber(),
    generateRandomNumber(),
    generateRandomNumber()
  ].join('');
}

function getRandomGroupCode() {
  return [
    generateRandomNumber(),
    generateRandomGroupLetter(),
    '-',
    generateRandomShift()
  ].join('');
}

export { getRandomId, getRandomGroupCode };
