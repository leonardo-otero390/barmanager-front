export interface BudgetRequest {
  categoryId: number;
  guests: number;
  cocktails: number[];
}

export interface BudgetValues extends Omit<BudgetRequest, "cocktails"> {
  cocktail1: number;
  cocktail2: number;
  cocktail3: number;
  cocktail4: number;
}
