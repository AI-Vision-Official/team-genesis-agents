
import { useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Upload, Wand2, RotateCcw } from 'lucide-react';
import type { DeckCard } from '@/types/cardDeck';
import type { AccessibilityOptions } from '@/types/creative';

interface CardEditorProps {
  editingCard: DeckCard | null;
  setEditingCard: (card: DeckCard | null) => void;
  updateCard: (cardId: string, updates: Partial<DeckCard>) => void;
  generateCardImage: (cardId: string) => Promise<void>;
  handleImageUpload: (cardId: string, file: File) => void;
  generateInterpretation: (cardId: string) => void;
  generatingImages: Set<string>;
  settings: AccessibilityOptions;
}

export const CardEditor = ({
  editingCard,
  setEditingCard,
  updateCard,
  generateCardImage,
  handleImageUpload,
  generateInterpretation,
  generatingImages,
  settings
}: CardEditorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!editingCard) return null;

  return (
    <Card className="fixed inset-0 z-50 bg-white shadow-2xl overflow-y-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Edit Card: {editingCard.title || 'Untitled'}</CardTitle>
          <Button onClick={() => setEditingCard(null)} variant="ghost">
            ✕
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="card-title">Card Title</Label>
              <Input
                id="card-title"
                value={editingCard.title}
                onChange={(e) => updateCard(editingCard.id, { title: e.target.value })}
                placeholder="Enter card title..."
              />
            </div>

            <div>
              <Label htmlFor="card-symbol">Symbol/Emoji</Label>
              <Input
                id="card-symbol"
                value={editingCard.symbol}
                onChange={(e) => updateCard(editingCard.id, { symbol: e.target.value })}
                placeholder="🌟 Add a symbol..."
              />
            </div>

            <div>
              <Label htmlFor="card-meaning">Meaning/Message</Label>
              <Textarea
                id="card-meaning"
                value={editingCard.meaning}
                onChange={(e) => updateCard(editingCard.id, { meaning: e.target.value })}
                placeholder="Enter the card's meaning or message..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="card-interpretation">Interpretation</Label>
              <Textarea
                id="card-interpretation"
                value={editingCard.interpretation}
                onChange={(e) => updateCard(editingCard.id, { interpretation: e.target.value })}
                placeholder="Enter detailed interpretation..."
                rows={3}
              />
              <Button 
                onClick={() => generateInterpretation(editingCard.id)}
                variant="outline" 
                size="sm"
                className="mt-2"
              >
                <Wand2 className="w-4 h-4 mr-2" />
                AI Suggest Interpretation
              </Button>
            </div>

            <div>
              <Label htmlFor="image-description">Image Description (for AI generation)</Label>
              <Textarea
                id="image-description"
                value={editingCard.imageDescription || ''}
                onChange={(e) => updateCard(editingCard.id, { imageDescription: e.target.value })}
                placeholder="Describe the image you'd like for this card..."
                rows={2}
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={() => generateCardImage(editingCard.id)}
                disabled={generatingImages.has(editingCard.id)}
                variant="outline" 
                size="sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Generate AI Image
              </Button>
              
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline" 
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(editingCard.id, file);
                }}
                className="hidden"
              />
            </div>
          </div>

          {/* Card Preview */}
          <div className="space-y-4">
            <Label>Card Preview</Label>
            <div className="relative">
              <div className="w-full max-w-xs mx-auto aspect-[3/4] bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-gray-300 overflow-hidden">
                {(editingCard.generatedImage || editingCard.localImage) ? (
                  <img 
                    src={editingCard.generatedImage || editingCard.localImage} 
                    alt={editingCard.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <div className="text-4xl mb-4">{editingCard.symbol}</div>
                    <div className={`font-bold text-lg mb-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {editingCard.title}
                    </div>
                    <div className={`text-sm text-gray-700 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {editingCard.meaning}
                    </div>
                  </div>
                )}
              </div>
              
              <Button
                onClick={() => updateCard(editingCard.id, { isFlipped: !editingCard.isFlipped })}
                variant="outline"
                size="sm"
                className="mt-2 w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Flip Card
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
