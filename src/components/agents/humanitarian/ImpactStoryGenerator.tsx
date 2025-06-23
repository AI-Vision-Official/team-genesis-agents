
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Edit, Share } from 'lucide-react';

export const ImpactStoryGenerator = () => {
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [location, setLocation] = useState('');
  const [intervention, setIntervention] = useState('');
  const [outcome, setOutcome] = useState('');
  const [storyType, setStoryType] = useState('individual');
  const [tone, setTone] = useState('inspiring');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedStory, setGeneratedStory] = useState('');

  const generateStory = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const stories = {
      individual: `
**${beneficiaryName}'s Journey to Hope**

In the heart of ${location}, ${beneficiaryName} faced challenges that seemed insurmountable. Before our intervention, daily life was a struggle - limited access to basic necessities and opportunities seemed out of reach.

Through our ${intervention} program, everything began to change. ${beneficiaryName} gained access to essential resources and support that transformed not just their circumstances, but their entire outlook on the future.

**The transformation was remarkable:** ${outcome}

Today, ${beneficiaryName} stands as a testament to the power of community support and human resilience. Their story reminds us why our work matters - because every person deserves the opportunity to thrive.

*"The support I received didn't just change my situation; it changed my belief in what's possible."* - ${beneficiaryName}

This is the impact of your support in action. Thank you for making stories like ${beneficiaryName}'s possible.
      `,
      community: `
**Transforming ${location}: A Community's Story of Change**

The community of ${location} was ready for change. Families faced daily challenges that required innovative solutions and collective action.

Our ${intervention} initiative brought the community together, creating new possibilities for growth and development. Local leaders, families, and our team worked hand in hand to address the root causes of their challenges.

**The results speak for themselves:** ${outcome}

But the numbers only tell part of the story. What's truly remarkable is how the community has embraced ownership of their progress, building sustainable systems that will benefit generations to come.

This transformation demonstrates the power of community-led development and the incredible potential that exists when people are given the tools and support they need to succeed.

*Together, we're not just changing lives - we're building a stronger, more resilient future for ${location}.*
      `
    };
    
    setGeneratedStory(stories[storyType as keyof typeof stories]);
    setIsGenerating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5" />
          Impact Story Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="storyType">Story Type</Label>
            <Select value={storyType} onValueChange={setStoryType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual Journey</SelectItem>
                <SelectItem value="community">Community Transformation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="tone">Tone</Label>
            <Select value={tone} onValueChange={setTone}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inspiring">Inspiring & Hopeful</SelectItem>
                <SelectItem value="factual">Factual & Direct</SelectItem>
                <SelectItem value="emotional">Emotional & Personal</SelectItem>
                <SelectItem value="professional">Professional & Measured</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="beneficiary">
              {storyType === 'individual' ? 'Beneficiary Name' : 'Community Name'}
            </Label>
            <Input
              id="beneficiary"
              value={beneficiaryName}
              onChange={(e) => setBeneficiaryName(e.target.value)}
              placeholder={storyType === 'individual' ? 'e.g., Maria' : 'e.g., Kibera Village'}
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Nairobi, Kenya"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="intervention">Intervention/Program</Label>
          <Input
            id="intervention"
            value={intervention}
            onChange={(e) => setIntervention(e.target.value)}
            placeholder="e.g., clean water access, education support, microfinance"
          />
        </div>

        <div>
          <Label htmlFor="outcome">Key Outcome/Impact</Label>
          <Textarea
            id="outcome"
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            placeholder="Describe the main positive change or result..."
            rows={3}
          />
        </div>

        <Button 
          onClick={generateStory} 
          disabled={!beneficiaryName || !location || !intervention || !outcome || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Edit className="w-4 h-4 mr-2 animate-pulse" />
              Crafting Your Impact Story...
            </>
          ) : (
            <>
              <Heart className="w-4 h-4 mr-2" />
              Generate Impact Story
            </>
          )}
        </Button>

        {generatedStory && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Your Impact Story</h3>
              <div className="flex gap-2">
                <Badge className="bg-pink-100 text-pink-800">Ready to Share</Badge>
                <Button size="sm" variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  Share Story
                </Button>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border">
              <div className="whitespace-pre-wrap text-sm leading-relaxed">{generatedStory}</div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This AI-generated story should be reviewed and verified with actual beneficiary consent and program data before publication.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
