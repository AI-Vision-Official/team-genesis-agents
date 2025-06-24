
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Archive, Download, Save } from 'lucide-react';
import type { Deck } from '@/types/cardDeck';
import type { AccessibilityOptions } from '@/types/creative';

interface ExportControlsProps {
  currentDeck: Deck;
  exportAsPDF: () => Promise<void>;
  exportAsZip: () => Promise<void>;
  exportAsHTML: () => Promise<void>;
  saveDeck: () => void;
  settings: AccessibilityOptions;
}

export const ExportControls = ({
  currentDeck,
  exportAsPDF,
  exportAsZip,
  exportAsHTML,
  saveDeck,
  settings
}: ExportControlsProps) => {
  return (
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
  );
};
