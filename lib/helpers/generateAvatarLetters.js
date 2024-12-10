export function generateAvatarLetters(name) {
  let shortName = "";

  const words = name.split(" ");
  words.forEach((word) => {
    if (word.length > 0) {
      shortName += word[0];
    }
  });

  // Если длина сокращенного имени больше 2, обрезаем до двух символов
  if (shortName.length > 2) {
    shortName = shortName.substring(0, 2);
  }

  return shortName.toUpperCase(); // Возвращаем сокращенное имя в верхнем регистре
}
