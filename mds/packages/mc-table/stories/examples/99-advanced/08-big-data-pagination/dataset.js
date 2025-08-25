export const generateData = () => {
  const data = [];

  for (let i = 0; i < 100; i++) {
    const id = Math.floor(Math.random() * 10000000) + 1;
    const product = generateRandomString();
    const trade = generateRandomString().toUpperCase();
    const weekNumber = generateRandomNumber(202300, 202400);
    const active = generateRandomBoolean();
    const updatedWhen = generateRandomDate().toISOString();

    data.push({
      id,
      product,
      trade,
      weekNumber,
      active,
      updatedWhen,
    });
  }

  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generateRandomBoolean() {
    return Math.random() < 0.5;
  }

  function generateRandomDate() {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }
  return data;
};
