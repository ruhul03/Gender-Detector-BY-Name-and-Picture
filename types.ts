
export interface GenderGuess {
  gender: 'male' | 'female' | 'non-binary' | 'unknown';
  confidence: number;
  reasoning: string;
}
