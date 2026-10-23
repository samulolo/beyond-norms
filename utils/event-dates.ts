// Um evento é "passado" a partir do dia seguinte à sua data (id em
// formato YYYY-MM-DD). Partilhado pelo checkout e pela página de
// Upcoming Events, para os dois concordarem sobre o que ainda está aberto.
export function isPastEventDate(id: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(id).getTime() < today.getTime();
}
