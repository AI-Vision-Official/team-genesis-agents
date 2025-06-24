
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
  Wand2,
  Upload,
  RotateCcw,
  Zap
} from 'lucide-react';
import type { AccessibilityOptions } from '@/types/creative';

interface DeckCard {
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
  const [generatingImages, setGeneratingImages] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const deckTypes = [
    { value: 'tarot', label: 'Tarot Cards', description: 'Traditional divination cards', count: 78 },
    { value: 'angel', label: 'Angel Cards', description: 'Spiritual guidance cards', count: 44 },
    { value: 'affirmation', label: 'Affirmation Cards', description: 'Positive affirmation cards', count: 52 },
    { value: 'oracle', label: 'Oracle Cards', description: 'Custom divination cards', count: 36 }
  ];

  const createNewCard = (): DeckCard => ({
    id: `card-${Date.now()}`,
    title: '',
    meaning: '',
    interpretation: '',
    symbol: '',
    imageDescription: '',
    isFlipped: false
  });

  const createStandardDeck = (type: 'tarot' | 'angel' | 'affirmation' | 'oracle') => {
    const deckData = {
      tarot: {
        count: 78,
        sampleCards: [
          { title: 'The Fool', meaning: 'New beginnings, innocence, spontaneity', interpretation: 'Step into the unknown with trust and openness', symbol: '🃏' },
          { title: 'The Magician', meaning: 'Manifestation, resourcefulness, power', interpretation: 'You have all the tools needed to create your reality', symbol: '🎩' },
          { title: 'The High Priestess', meaning: 'Intuition, sacred knowledge, divine feminine', interpretation: 'Trust your inner voice and hidden wisdom', symbol: '🌙' },
          { title: 'The Empress', meaning: 'Femininity, beauty, nature, abundance', interpretation: 'Embrace creativity and nurturing energy', symbol: '👑' },
          { title: 'The Emperor', meaning: 'Authority, father-figure, structure, foundation', interpretation: 'Take control and establish order in your life', symbol: '⚡' }
        ]
      },
      angel: {
        count: 44,
        sampleCards: [
          { title: 'Divine Guidance', meaning: 'Trust in heavenly protection', interpretation: 'Your angels are guiding you toward your highest good', symbol: '👼' },
          { title: 'Inner Peace', meaning: 'Find tranquility within', interpretation: 'Breathe deeply and connect with your peaceful center', symbol: '🕊️' },
          { title: 'Love and Light', meaning: 'You are surrounded by love', interpretation: 'Open your heart to receive divine love and share it freely', symbol: '💖' },
          { title: 'New Beginnings', meaning: 'Fresh starts await you', interpretation: 'Trust that this new chapter brings wonderful opportunities', symbol: '🌅' },
          { title: 'Healing Energy', meaning: 'Divine healing surrounds you', interpretation: 'Allow angelic energy to heal your body, mind, and spirit', symbol: '✨' }
        ]
      },
      affirmation: {
        count: 52,
        sampleCards: [
          { title: 'I Am Worthy', meaning: 'Self-worth and confidence', interpretation: 'You deserve all the good things life has to offer', symbol: '💎' },
          { title: 'I Am Strong', meaning: 'Inner strength and resilience', interpretation: 'You have overcome challenges before and you will again', symbol: '💪' },
          { title: 'I Am Loved', meaning: 'Love and acceptance', interpretation: 'You are deeply loved exactly as you are right now', symbol: '❤️' },
          { title: 'I Am Grateful', meaning: 'Gratitude and abundance', interpretation: 'Appreciation opens the door to even more blessings', symbol: '🙏' },
          { title: 'I Am Peaceful', meaning: 'Calm and serenity', interpretation: 'Peace begins within you and radiates outward', symbol: '🧘' }
        ]
      },
      oracle: {
        count: 36,
        sampleCards: [
          { title: 'Trust Your Path', meaning: 'Have faith in your journey', interpretation: 'Every step you take is leading you exactly where you need to be', symbol: '🛤️' },
          { title: 'Embrace Change', meaning: 'Welcome transformation', interpretation: 'Change is the universe\'s way of helping you grow and evolve', symbol: '🦋' },
          { title: 'Listen Within', meaning: 'Inner wisdom speaks', interpretation: 'Your intuition knows the answer - quiet your mind and listen', symbol: '🔮' },
          { title: 'Choose Joy', meaning: 'Happiness is a choice', interpretation: 'Find something to smile about in this very moment', symbol: '😊' },
          { title: 'Release and Let Go', meaning: 'Freedom through surrender', interpretation: 'What you release makes space for something better to enter', symbol: '🎈' }
        ]
      }
    };

    const typeData = deckData[type];
    const cards: DeckCard[] = [];
    
    // Add sample cards first
    typeData.sampleCards.forEach((sample, index) => {
      cards.push({
        ...createNewCard(),
        id: `${type}-${index}`,
        ...sample,
        imageDescription: `A beautiful, mystical illustration representing ${sample.title.toLowerCase()}`
      });
    });
    
    // Fill remaining slots with template cards
    for (let i = typeData.sampleCards.length; i < typeData.count; i++) {
      cards.push({
        ...createNewCard(),
        id: `${type}-${i}`,
        title: `Card ${i + 1}`,
        meaning: 'Click to edit this card meaning',
        interpretation: 'Add your interpretation here',
        symbol: '✨',
        imageDescription: `A meaningful illustration for card ${i + 1}`
      });
    }
    
    setCurrentDeck(prev => ({
      ...prev,
      cards: cards,
      name: `${typeData.sampleCards[0].title.split(' ')[0]} ${type.charAt(0).toUpperCase() + type.slice(1)} Deck`
    }));
  };

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
    if (editingCard?.id === cardId) {
      setEditingCard(prev => prev ? { ...prev, ...updates } : null);
    }
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

  const flipCard = (cardId: string) => {
    updateCard(cardId, { isFlipped: !currentDeck.cards.find(c => c.id === cardId)?.isFlipped });
  };

  const handleImageUpload = (cardId: string, file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateCard(cardId, { localImage: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateCardImage = async (cardId: string) => {
    const card = currentDeck.cards.find(c => c.id === cardId);
    if (!card) return;

    setGeneratingImages(prev => new Set([...prev, cardId]));
    
    // Simulate AI image generation
    setTimeout(() => {
      const mockImageUrl = `data:image/svg+xml;base64,${btoa(`
        <svg width="200" height="280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
            </linearGradient>
          </defs>
          <rect width="200" height="280" fill="url(#bg)" rx="15"/>
          <text x="100" y="50" text-anchor="middle" fill="white" font-size="16" font-weight="bold">${card.title}</text>
          <text x="100" y="140" text-anchor="middle" fill="white" font-size="40">${card.symbol}</text>
          <text x="100" y="200" text-anchor="middle" fill="white" font-size="12" opacity="0.8">Generated Image</text>
        </svg>
      `)}`;
      
      updateCard(cardId, { generatedImage: mockImageUrl });
      setGeneratingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(cardId);
        return newSet;
      });
    }, 2000);
  };

  const generateAllImages = async () => {
    setIsGenerating(true);
    for (const card of currentDeck.cards) {
      if (!card.generatedImage && !card.localImage) {
        await generateCardImage(card.id);
        await new Promise(resolve => setTimeout(resolve, 500)); // Stagger requests
      }
    }
    setIsGenerating(false);
  };

  const generateInterpretation = (cardId: string) => {
    const card = currentDeck.cards.find(c => c.id === cardId);
    if (!card) return;

    const interpretations = [
      `This card reminds you that ${card.title.toLowerCase()} brings ${card.meaning.toLowerCase()} into your life. Trust in this energy.`,
      `When ${card.title} appears, it's time to focus on ${card.meaning.toLowerCase()}. Let this guide your next steps.`,
      `The essence of ${card.title} teaches us about ${card.meaning.toLowerCase()}. Embrace this wisdom today.`,
      `${card.title} offers the gift of ${card.meaning.toLowerCase()}. How can you apply this in your current situation?`,
      `Through ${card.title}, you're invited to explore ${card.meaning.toLowerCase()} more deeply in your journey.`
    ];
    
    const randomInterpretation = interpretations[Math.floor(Math.random() * interpretations.length)];
    updateCard(cardId, { interpretation: randomInterpretation });
  };

  const exportAsZip = async () => {
    // Simulate ZIP creation
    const deckData = {
      deck: currentDeck,
      exportDate: new Date().toISOString(),
      format: 'ZIP Archive'
    };
    
    const blob = new Blob([JSON.stringify(deckData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDeck.name || 'card-deck'}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsPDF = async () => {
    // Simulate PDF creation
    const deckData = {
      deck: currentDeck,
      exportDate: new Date().toISOString(),
      format: 'PDF Print-Ready',
      layout: 'Double-sided cards'
    };
    
    const blob = new Blob([JSON.stringify(deckData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDeck.name || 'card-deck'}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsHTML = async () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${currentDeck.name}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
            .deck-title { text-align: center; color: #333; margin-bottom: 30px; }
            .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
            .card { background: white; border-radius: 15px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .card-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; color: #4f46e5; }
            .card-symbol { font-size: 24px; text-align: center; margin: 15px 0; }
            .card-meaning { color: #666; margin-bottom: 10px; }
            .card-interpretation { color: #333; font-style: italic; }
          </style>
        </head>
        <body>
          <h1 class="deck-title">${currentDeck.name}</h1>
          <div class="cards-grid">
            ${currentDeck.cards.map(card => `
              <div class="card">
                <div class="card-title">${card.title}</div>
                <div class="card-symbol">${card.symbol}</div>
                <div class="card-meaning"><strong>Meaning:</strong> ${card.meaning}</div>
                <div class="card-interpretation"><strong>Interpretation:</strong> ${card.interpretation}</div>
              </div>
            `).join('')}
          </div>
        </body>
      </html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDeck.name || 'card-deck'}.html`;
    a.click();
    URL.revokeObjectURL(url);
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

  const saveDeck = () => {
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
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Deck Configuration */}
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

        {/* Visual Card Grid */}
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
      </div>

      {/* Card Editor Modal */}
      {editingCard && (
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
      )}

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Download Options</CardTitle>
          <CardDescription>Download your finished deck in various formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button 
              onClick={exportAsPDF} 
              variant="outline"
              disabled={currentDeck.cards.length === 0}
            >
              <FileText className="w-4 h-4 mr-2" />
              PDF (Print Ready)
            </Button>
            <Button 
              onClick={exportAsZip}
              variant="outline"
              disabled={currentDeck.cards.length === 0}
            >
              <Archive className="w-4 h-4 mr-2" />
              ZIP Archive
            </Button>
            <Button 
              onClick={exportAsHTML}
              variant="outline"
              disabled={currentDeck.cards.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              HTML Viewer
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
              Use the export options to create shareable files or print your cards. Click cards in the grid to flip and see both sides!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
