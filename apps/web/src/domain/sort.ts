export type SortField = "name" | "price" | "rating";
export type SortDirection = "asc" | "desc";

export type SortDescriptor = {
  field: SortField;
  direction: SortDirection;
};

export function sortRows<
  T extends { name: string; price: number; rating: number },
>(rows: T[], sort: SortDescriptor): T[] {
  const dir = sort.direction === "asc" ? 1 : -1;
  const copy = [...rows];

  copy.sort((a, b) => {
    const av = a[sort.field];
    const bv = b[sort.field];

    if (typeof av === "string" && typeof bv === "string") {
      return av.localeCompare(bv) * dir;
    }

    return (Number(av) - Number(bv)) * dir;
  });

  return copy;
}
