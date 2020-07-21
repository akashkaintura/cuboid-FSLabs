export const intersectionNonEmpty = (a, b) => a.some((aa) => b.includes(aa));
export const intersection = (a, b) => a.filter((aa) => b.includes(aa));
