export type UnitValue<Type = string, Unit = string, Condition = never> = {
  type: Type;
  unit: Unit;
  value: string | null;
  condition?: Condition;
};

export type UnitValueNotNull<Type = string, Unit = string, Condition = never> = {
  type: Type;
  unit: Unit;
  value: string;
  condition?: Condition;
};
