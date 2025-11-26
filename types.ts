export enum MascotEmotion {
  NEUTRAL = 'neutral',
  HAPPY = 'happy',
  EXCITED = 'excited',
  ECSTATIC = 'ecstatic'
}

export interface BillState {
  amount: number;
  tipPercentage: number;
  splitCount: number;
}

export interface CalculationResult {
  tipAmount: number;
  totalAmount: number;
  amountPerPerson: number;
}
