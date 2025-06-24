
export interface DeckCard {
  id: string;
  title: string;
  meaning: string;
  interpretation: string;
  symbol: string;
  imageDescription?: string;
  generatedImage?: string;
  localImage?: string;
  isFlipped?: boolean;
}

export interface Deck {
  id: string;
  name: string;
  type: 'tarot' | 'angel' | 'affirmation' | 'oracle';
  description: string;
  cards: DeckCard[];
  createdAt: Date;
}

export interface DeckType {
  value: 'tarot' | 'angel' | 'affirmation' | 'oracle';
  label: string;
  description: string;
  count: number;
}
