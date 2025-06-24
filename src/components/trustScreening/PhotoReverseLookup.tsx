
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, ExternalLink, AlertTriangle, CheckCircle } from 'lucide-react';
import type { PhotoReverseResult, ScreeningReport } from '@/types/trustScreening';

interface PhotoReverseLookupProps {
  activeReport: ScreeningReport | null;
  onCreateReport: (subject: string) => ScreeningReport;
  onUpdateReport: (reportId: string, updates: Partial<ScreeningReport>) => void;
}

export const PhotoReverseLookup = ({ activeReport, onCreateReport, onUpdateReport }: PhotoReverseLookupProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [result, setResult] = useState<PhotoReverseResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async () => {
    if (!selectedImage) return;

    setIsSearching(true);
    
    // Simulate API call with realistic data
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockResult: PhotoReverseResult = {
      originalUrl: selectedImage,
      similarImages: [
        {
          url: 'https://example.com/profile1.jpg',
          platform: 'LinkedIn',
          similarity: 95,
          context: 'Professional profile photo'
        },
        {
          url: 'https://example.com/social1.jpg',
          platform: 'Facebook',
          similarity: 87,
          context: 'Social media profile'
        },
        {
          url: 'https://example.com/dating1.jpg',
          platform: 'Dating App',
          similarity: 72,
          context: 'Dating profile - different name'
        }
      ],
      platforms: ['LinkedIn', 'Facebook', 'Dating App', 'Stock Photo Site'],
      possibleClone: Math.random() > 0.6,
      confidence: 89
    };

    setResult(mockResult);

    // Update or create report
    let reportToUpdate = activeReport;
    if (!reportToUpdate) {
      reportToUpdate = onCreateReport('Photo Analysis');
    }

    onUpdateReport(reportToUpdate.id, {
      photoReverse: mockResult
    });

    setIsSearching(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Photo Reverse Lookup
          </CardTitle>
          <CardDescription>
            Check where else a photo appears online to detect fake profiles and image theft
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {selectedImage ? (
              <div className="space-y-4">
                <img 
                  src={selectedImage} 
                  alt="Selected for analysis" 
                  className="max-w-xs max-h-64 mx-auto rounded-lg"
                />
                <div className="space-y-2">
                  <Button variant="outline" onClick={() => setSelectedImage(null)}>
                    Remove Image
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button variant="ghost" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Choose Different Image
                      </span>
                    </Button>
                  </label>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <Camera className="w-12 h-12 text-gray-400 mx-auto" />
                <div>
                  <h3 className="font-semibold">Upload Photo for Analysis</h3>
                  <p className="text-sm text-gray-500">
                    Drag & drop or click to select an image file
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Select Image
                    </span>
                  </Button>
                </label>
              </div>
            )}
          </div>

          {selectedImage && (
            <Button 
              onClick={handleSearch} 
              disabled={isSearching}
              className="w-full"
            >
              {isSearching ? 'Searching Image...' : 'Search for Similar Images'}
            </Button>
          )}

          <div className="text-xs text-gray-500 space-y-1">
            <p>• Supported formats: JPG, PNG, GIF, WebP (max 10MB)</p>
            <p>• Searches major platforms and stock photo sites</p>
            <p>• Results include similarity scores and context information</p>
          </div>
        </CardContent>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Camera className="w-5 h-5" />
                  Reverse Search Results
                </span>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    Confidence: {result.confidence}%
                  </Badge>
                  {result.possibleClone && (
                    <Badge variant="destructive">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Possible Clone
                    </Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Original Image</h4>
                  <img 
                    src={result.originalUrl} 
                    alt="Original" 
                    className="w-full max-w-xs rounded-lg border"
                  />
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Detection Summary</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {result.possibleClone ? (
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span className={result.possibleClone ? 'text-red-700' : 'text-green-700'}>
                        {result.possibleClone 
                          ? 'Potential identity theft detected' 
                          : 'No suspicious usage patterns found'
                        }
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">Platforms found: </span>
                      <span className="font-semibold">{result.platforms.length}</span>
                    </div>
                    
                    <div>
                      <span className="text-gray-600">Similar matches: </span>
                      <span className="font-semibold">{result.similarImages.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Images Found ({result.similarImages.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {result.similarImages.map((image, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{image.platform}</h4>
                        <p className="text-sm text-gray-600">{image.context}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={image.similarity > 90 ? 'destructive' : image.similarity > 70 ? 'default' : 'secondary'}>
                          {image.similarity}% match
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Found on {image.platform}
                      </span>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={image.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Source
                        </a>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className={result.possibleClone ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
            <CardContent className="pt-6">
              <h4 className={`font-semibold mb-2 ${result.possibleClone ? 'text-red-800' : 'text-green-800'}`}>
                Analysis Summary
              </h4>
              <p className={result.possibleClone ? 'text-red-700' : 'text-green-700'}>
                {result.possibleClone 
                  ? '⚠️ This image appears across multiple platforms with different names or contexts, suggesting possible identity theft or catfishing. Exercise extreme caution when dealing with this individual.'
                  : '✅ This image appears to be legitimately used across consistent platforms. While reverse image searches found matches, they appear to be from the same person across their legitimate profiles.'
                }
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
