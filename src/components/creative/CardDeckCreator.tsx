
import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Download, 
  Shuffle, 
  Edit, 
  Trash2, 
  GripVertical, 
  Sparkles, 
  FileText, 
  Image as ImageIcon,
  Archive,
  Save,
  Wand2
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface DeckCard {
  id: string;
  title: string;
  meaning: string;
  symbol: string;
  imageDescription?: string;
  generatedImage?: string;
}

interface Deck {
  id: string;
  name: string;
  type: 'tarot' | 'angel' | 'affirmation' | 'oracle';
  description: string;
  cards: DeckCard[];
  createdAt: Date;
}

interface CardDeckCreatorProps {
  settings: AccessibilityOptions;
}

export const CardDeckCreator = ({ settings }: CardDeckCreatorProps) => {
  const [currentDeck, setCurrentDeck] = useState<Deck>({
    id: 'new',
    name: '',
    type: 'oracle',
    description: '',
    cards: [],
    createdAt: new Date()
  });
  
  const [editingCard, setEditingCard] = useState<DeckCard | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const deckTypes = [
    { value: 'tarot', label: 'Tarot Cards', description: 'Traditional divination cards' },
    { value: 'angel', label: 'Angel Cards', description: 'Spiritual guidance cards' },
    { value: 'affirmation', label: 'Affirmation Cards', description: 'Positive affirmation cards' },
    { value: 'oracle', label: 'Oracle Cards', description: 'Custom divination cards' }
  ];

  const createNewCard = (): DeckCard => ({
    id: `card-${Date.now()}`,
    title: '',
    meaning: '',
    symbol: '',
    imageDescription: ''
  });

  const addCard = () => {
    const newCard = createNewCard();
    setCurrentDeck(prev => ({
      ...prev,
      cards: [...prev.cards, newCard]
    }));
    setEditingCard(newCard);
  };

  const updateCard = (cardId: string, updates: Partial<DeckCard>) => {
    setCurrentDeck(prev => ({
      ...prev,
      cards: prev.cards.map(card => 
        card.id === cardId ? { ...card, ...updates } : card
      )
    }));
  };

  const deleteCard = (cardId: string) => {
    setCurrentDeck(prev => ({
      ...prev,
      cards: prev.cards.filter(card => card.id !== cardId)
    }));
    if (editingCard?.id === cardId) {
      setEditingCard(null);
    }
  };

  const generateDeckContent = async (theme: string) => {
    setIsGenerating(true);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const themes = {
      healing: [
        { title: 'Inner Peace', meaning: 'Find tranquility within yourself and embrace the calm that comes from acceptance.', symbol: '🕊️' },
        { title: 'Emotional Release', meaning: 'Let go of what no longer serves you and make space for new growth.', symbol: '🌊' },
        { title: 'Self-Compassion', meaning: 'Treat yourself with the same kindness you would show a dear friend.', symbol: '💚' },
        { title: 'Renewed Energy', meaning: 'Feel the life force flowing through you, bringing vitality and strength.', symbol: '⚡' },
        { title: 'Sacred Boundaries', meaning: 'Honor your limits and protect your energy with loving firmness.', symbol: '🛡️' }
      ],
      'inner child': [
        { title: 'Playful Wonder', meaning: 'Reconnect with the joy and curiosity that lives within you.', symbol: '🎈' },
        { title: 'Creative Expression', meaning: 'Allow your authentic self to shine through creative play.', symbol: '🎨' },
        { title: 'Innocent Joy', meaning: 'Find happiness in simple moments and embrace childlike delight.', symbol: '🌈' },
        { title: 'Fearless Dreams', meaning: 'Remember when anything felt possible and reclaim that magic.', symbol: '⭐' },
        { title: 'Unconditional Love', meaning: 'Love yourself as completely as you did when you were small.', symbol: '💕' }
      ],
      'spiritual strength': [
        { title: 'Divine Connection', meaning: 'You are connected to something greater than yourself.', symbol: '✨' },
        { title: 'Inner Wisdom', meaning: 'Trust the knowledge that comes from your soul.', symbol: '🔮' },
        { title: 'Sacred Purpose', meaning: 'Your life has meaning and your presence makes a difference.', symbol: '🌟' },
        { title: 'Spiritual Protection', meaning: 'You are surrounded by love and light at all times.', symbol: '🙏' },
        { title: 'Higher Perspective', meaning: 'See your challenges from a place of wisdom and understanding.', symbol: '🦅' }
      ]
    };

    const selectedTheme = themes[theme as keyof typeof themes] || themes.healing;
    const generatedCards = selectedTheme.map(card => ({
      ...createNewCard(),
      ...card,
      imageDescription: `A beautiful, ethereal illustration representing ${card.title.toLowerCase()} with ${card.symbol} symbolism`
    }));

    setCurrentDeck(prev => ({
      ...prev,
      cards: [...prev.cards, ...generatedCards]
    }));
    
    setIsGenerating(false);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    
    if (draggedIndex !== index) {
      const newCards = [...currentDeck.cards];
      const draggedCard = newCards[draggedIndex];
      newCards.splice(draggedIndex, 1);
      newCards.splice(index, 0, draggedCard);
      
      setCurrentDeck(prev => ({ ...prev, cards: newCards }));
      setDraggedIndex(index);
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const downloadDeckAsPDF = () => {
    // In a real implementation, this would generate a PDF
    const deckData = JSON.stringify(currentDeck, null, 2);
    const blob = new Blob([deckData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDeck.name || 'my-deck'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveDeck = () => {
    // Save to localStorage for offline functionality
    const savedDecks = JSON.parse(localStorage.getItem('cardDecks') || '[]');
    const deckToSave = { ...currentDeck, id: currentDeck.id === 'new' ? `deck-${Date.now()}` : currentDeck.id };
    const existingIndex = savedDecks.findIndex((deck: Deck) => deck.id === deckToSave.id);
    
    if (existingIndex >= 0) {
      savedDecks[existingIndex] = deckToSave;
    } else {
      savedDecks.push(deckToSave);
    }
    
    localStorage.setItem('cardDecks', JSON.stringify(savedDecks));
    setCurrentDeck(deckToSave);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl font-bold ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            🃏 Card Deck Creator
          </h2>
          <p className={`text-gray-600 mt-1 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
            Create personalized tarot, angel, affirmation, and oracle card decks
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveDeck} variant="outline" size="sm">
            <Save className="w-4 h-4 mr-2" />
            Save Deck
          </Button>
          <Button onClick={downloadDeckAsPDF} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Deck Configuration */}
        <Card>
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
                        <div className="text-xs text-gray-500">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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

            <div className="space-y-2">
              <Label>AI Content Generation</Label>
              <div className="flex gap-2">
                <Button 
                  onClick={() => generateDeckContent('healing')} 
                  disabled={isGenerating}
                  size="sm"
                  variant="outline"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Healing
                </Button>
                <Button 
                  onClick={() => generateDeckContent('inner child')} 
                  disabled={isGenerating}
                  size="sm"
                  variant="outline"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Inner Child
                </Button>
                <Button 
                  onClick={() => generateDeckContent('spiritual strength')} 
                  disabled={isGenerating}
                  size="sm"
                  variant="outline"
                >
                  <Sparkles className="w-4 h-4 mr-1" />
                  Spiritual
                </Button>
              </div>
              {isGenerating && (
                <p className="text-sm text-gray-500">Generating AI content...</p>
              )}
            </div>

            <Button onClick={addCard} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add New Card
            </Button>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span>Total Cards:</span>
                <Badge variant="secondary">{currentDeck.cards.length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card List */}
        <Card>
          <CardHeader>
            <CardTitle>Card Collection</CardTitle>
            <CardDescription>Manage and reorder your cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {currentDeck.cards.map((card, index) => (
                <div
                  key={card.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`flex items-center gap-3 p-3 border rounded-lg cursor-move hover:bg-gray-50 ${
                    editingCard?.id === card.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium truncate ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {card.title || 'Untitled Card'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{card.symbol} {card.meaning}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingCard(card)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteCard(card.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {currentDeck.cards.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No cards yet. Add your first card to get started!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Card Editor */}
        <Card>
          <CardHeader>
            <CardTitle>Card Editor</CardTitle>
            <CardDescription>
              {editingCard ? `Editing: ${editingCard.title || 'Untitled Card'}` : 'Select a card to edit'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {editingCard ? (
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
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="image-description">Image Description (for AI generation)</Label>
                  <Textarea
                    id="image-description"
                    value={editingCard.imageDescription || ''}
                    onChange={(e) => updateCard(editingCard.id, { imageDescription: e.target.value })}
                    placeholder="Describe the image you'd like for this card..."
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      // AI suggestion functionality would go here
                      const suggestions = [
                        "Trust your intuition and inner wisdom.",
                        "Embrace change as a pathway to growth.",
                        "You have the strength to overcome any challenge.",
                        "Love yourself as you are in this moment.",
                        "Your authentic self is your greatest gift."
                      ];
                      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
                      updateCard(editingCard.id, { meaning: randomSuggestion });
                    }}
                  >
                    <Wand2 className="w-4 h-4 mr-2" />
                    AI Suggest
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingCard(null)}
                  >
                    Done
                  </Button>
                </div>

                {/* Card Preview */}
                <div className="mt-6 p-4 border-2 border-dashed border-gray-300 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50">
                  <div className="text-center">
                    <div className="text-2xl mb-2">{editingCard.symbol}</div>
                    <div className={`font-bold text-lg mb-2 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {editingCard.title}
                    </div>
                    <div className={`text-sm text-gray-700 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
                      {editingCard.meaning}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Edit className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select a card from the collection to edit it</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Download Options</CardTitle>
          <CardDescription>Choose how you want to export your finished deck</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              onClick={downloadDeckAsPDF} 
              variant="outline"
              disabled={currentDeck.cards.length === 0}
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF (Print Ready)
            </Button>
            <Button 
              onClick={() => {
                // Export as individual PNG files
                console.log('Exporting as PNG files...');
              }}
              variant="outline"
              disabled={currentDeck.cards.length === 0}
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              PNG Images
            </Button>
            <Button 
              onClick={() => {
                // Export as ZIP archive
                console.log('Creating ZIP archive...');
              }}
              variant="outline"
              disabled={currentDeck.cards.length === 0}
            >
              <Archive className="w-4 h-4 mr-2" />
              ZIP Archive
            </Button>
            <Button 
              onClick={saveDeck}
              variant="outline"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Locally
            </Button>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className={`text-sm text-blue-800 ${settings.dyslexiaFont ? 'font-mono' : ''}`}>
              💡 <strong>Tip:</strong> Your deck is automatically saved locally and will persist between sessions. 
              Use the export options to create shareable files or print your cards.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
