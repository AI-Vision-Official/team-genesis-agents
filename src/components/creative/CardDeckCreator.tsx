
import { useState, useRef } from 'react';
import type { AccessibilityOptions } from '@/types/creative';
import type { DeckCard, Deck, DeckType } from '@/types/cardDeck';
import { DeckConfiguration } from './DeckConfiguration';
import { CardGrid } from './CardGrid';
import { CardEditor } from './CardEditor';
import { ExportControls } from './ExportControls';

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

  const deckTypes: DeckType[] = [
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <DeckConfiguration
          currentDeck={currentDeck}
          setCurrentDeck={setCurrentDeck}
          deckTypes={deckTypes}
          createStandardDeck={createStandardDeck}
          addCard={addCard}
          generateAllImages={generateAllImages}
          saveDeck={saveDeck}
          isGenerating={isGenerating}
        />

        <CardGrid
          currentDeck={currentDeck}
          settings={settings}
          flipCard={flipCard}
          setEditingCard={setEditingCard}
          deleteCard={deleteCard}
          generatingImages={generatingImages}
          handleDragStart={handleDragStart}
          handleDragOver={handleDragOver}
          handleDragEnd={handleDragEnd}
        />
      </div>

      <CardEditor
        editingCard={editingCard}
        setEditingCard={setEditingCard}
        updateCard={updateCard}
        generateCardImage={generateCardImage}
        handleImageUpload={handleImageUpload}
        generateInterpretation={generateInterpretation}
        generatingImages={generatingImages}
        settings={settings}
      />

      <ExportControls
        currentDeck={currentDeck}
        exportAsPDF={exportAsPDF}
        exportAsZip={exportAsZip}
        exportAsHTML={exportAsHTML}
        saveDeck={saveDeck}
        settings={settings}
      />
    </div>
  );
};
