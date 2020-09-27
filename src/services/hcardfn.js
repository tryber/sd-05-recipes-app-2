export function handleClick(history, type, id) {
  if (type === 'comida') {
    history.push(`/comidas/${id}`);
  } else {
    history.push(`/bebidas/${id}`);
  }
}