function isExpire(date: number): boolean {
  return date > 0 && Date.now() >= date;
}

export {
  isExpire,
}
