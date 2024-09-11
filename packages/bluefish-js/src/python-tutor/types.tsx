export type Address = number;

export type Pointer = { type: "pointer"; value: Address };

export const pointer = (value: Address): Pointer => ({
  type: "pointer",
  value,
});

export type Value = string | number | Pointer;

export type StackSlot = {
  variable: string;
  value: Value;
};

export const formatValue = (value: Value): string | number => {
  let formattedValue: string | number;
  if (typeof value === "string" || typeof value === "number") {
    formattedValue = `${value}`;
  } else {
    formattedValue = value.value;
  }
  return formattedValue;
};

export const stackSlot = (variable: string, value: Value): StackSlot => {
  return {
    variable,
    value: value,
  };
};

export type Tuple = { type: "tuple"; values: Value[] };

export const tuple = (values: Value[]): Tuple => ({ type: "tuple", values });

export type HeapObject = Tuple;
