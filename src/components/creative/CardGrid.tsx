
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, FileText } from 'lucide-react';
import type { DeckCard, Deck } from '@/types/cardDeck';
import type { AccessibilityOptions } from '@/types/creative';

interface CardGridProps {
  currentDeck: Deck;
  settings: AccessibilityOptions;
  flipCard: (cardId: string) => void;
  setEditingCard: (card: DeckCard) => void;
  deleteCard: (cardId: string) => void;
  generatingImages: Set<string>;
  handleDragStart: (index: number) => void;
  handleDragOver: (e: React.DragEvent, index: number) => void;
  handleDragEnd: () => void;
}

export const CardGrid = ({
  currentDeck,
  settings,
  flipCard,
  setEditingCard,
  deleteCard,
  generatingImages,
  handleDragStart,
  handleDragOver,
  handleDragEnd
}: CardGridProps) => {
  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle>Card Collection</CardTitle>
        <CardDescription>Visual grid of your cards - drag to reorder, click to flip</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
          {currentDeck.cards.map((card, index) => (
            <div
              key={card.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`relative group cursor-pointer transition-all duration-300 ${
                card.isFlipped ? 'transform rotateY-180' : ''
              }`}
              style={{ perspective: '1000px' }}
            >
              <div 
                className="relative w-full aspect-[3/4] bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden transition-transform duration-300 hover:scale-105"
                onClick={() => flipCard(card.id)}
              >
                {/* Front side */}
                <div className={`absolute inset-0 backface-hidden ${card.isFlipped ? 'rotateY-180' : ''}`}>
                  {(card.generatedImage || card.localImage) ? (
                    <img 
                      src={card.generatedImage || card.localImage} 
                      alt={card.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                      <div className="text-2xl mb-2">{card.symbol}</div>
                      <div className={`font-bold text-sm ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                        {card.title || 'Untitled'}
                      </div>
                    </div>
                  )}
                  
                  {/* Card title overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <div className={`text-xs font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {card.title || 'Untitled'}
                    </div>
                  </div>
                </div>

                {/* Back side */}
                <div className={`absolute inset-0 backface-hidden rotateY-180 bg-gradient-to-br from-indigo-50 to-purple-50 p-4 ${card.isFlipped ? 'rotateY-0' : ''}`}>
                  <div className="h-full flex flex-col justify-center text-center">
                    <div className={`text-xs font-bold mb-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {card.title}
                    </div>
                    <div className="text-2xl mb-2">{card.symbol}</div>
                    <div className={`text-xs text-gray-700 mb-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      <strong>Meaning:</strong> {card.meaning}
                    </div>
                    <div className={`text-xs text-gray-600 italic ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {card.interpretation}
                    </div>
                  </div>
                </div>
              </div>

              {/* Card actions overlay */}
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 bg-white bg-opacity-80"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingCard(card);
                  }}
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 bg-white bg-opacity-80"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteCard(card.id);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>

              {/* Generation status */}
              {generatingImages.has(card.id) && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <div className="text-white text-xs">Generating...</div>
                </div>
              )}
            </div>
          ))}
          
          {currentDeck.cards.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-gray-500">
              <FileText className="w-12 h-12 mb-4 opacity-50" />
              <p>No cards yet. Create a standard deck or add individual cards!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
