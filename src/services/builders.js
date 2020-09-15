export function quantityBuilder(details) {
  const result = [];
  Object.entries(details).forEach((element) => {
    if (element[0].includes('strMeasure') && element[1] && element[1] !== ' ') {
      result.push(element[1]);
    }
  });
  return result;
}

export function ingredientBuilder(details) {
  const result = [];
  Object.entries(details).forEach((element) => {
    if (element[0].includes('strIngredient') && element[1] && element[1] !== ' ') {
      result.push(element[1]);
    }
  });
  return result;
}
