
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Plus, Zap, Save } from 'lucide-react';
import type { Deck, DeckType } from '@/types/cardDeck';

interface DeckConfigurationProps {
  currentDeck: Deck;
  setCurrentDeck: React.Dispatch<React.SetStateAction<Deck>>;
  deckTypes: DeckType[];
  createStandardDeck: (type: 'tarot' | 'angel' | 'affirmation' | 'oracle') => void;
  addCard: () => void;
  generateAllImages: () => Promise<void>;
  saveDeck: () => void;
  isGenerating: boolean;
}

export const DeckConfiguration = ({
  currentDeck,
  setCurrentDeck,
  deckTypes,
  createStandardDeck,
  addCard,
  generateAllImages,
  saveDeck,
  isGenerating
}: DeckConfigurationProps) => {
  return (
    <Card className="lg:col-span-1">
      <CardHeader>
        <CardTitle>Deck Configuration</CardTitle>
        <CardDescription>Set up your deck details and generate content</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="deck-name">Deck Name</Label>
          <Input
            id="deck-name"
            value={currentDeck.name}
            onChange={(e) => setCurrentDeck(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter deck name..."
          />
        </div>

        <div>
          <Label htmlFor="deck-type">Deck Type</Label>
          <Select value={currentDeck.type} onValueChange={(value: any) => setCurrentDeck(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {deckTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <div>
                    <div className="font-medium">{type.label}</div>
                    <div className="text-xs text-gray-500">{type.count} cards • {type.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={() => createStandardDeck(currentDeck.type)} 
          className="w-full"
          variant="outline"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Create Standard {deckTypes.find(t => t.value === currentDeck.type)?.count}-Card Deck
        </Button>

        <div>
          <Label htmlFor="deck-description">Description</Label>
          <Textarea
            id="deck-description"
            value={currentDeck.description}
            onChange={(e) => setCurrentDeck(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your deck's purpose and theme..."
            rows={3}
          />
        </div>

        <Button onClick={addCard} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>

        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Total Cards:</span>
            <Badge variant="secondary">{currentDeck.cards.length}</Badge>
          </div>
          
          <Button 
            onClick={generateAllImages} 
            disabled={isGenerating}
            className="w-full"
            variant="outline"
          >
            <Zap className="w-4 h-4 mr-2" />
            {isGenerating ? 'Generating...' : 'Generate All Images'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
