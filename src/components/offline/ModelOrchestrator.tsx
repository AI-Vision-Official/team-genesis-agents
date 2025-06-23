
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, Zap, Target, Activity, CheckCircle } from 'lucide-react';

interface LanguageModel {
  id: string;
  name: string;
  type: 'primary' | 'validator' | 'specialist';
  domain: string[];
  confidence: number;
  memoryUsage: number;
  status: 'active' | 'idle' | 'processing';
  capabilities: string[];
}

interface QueryResult {
  modelId: string;
  response: string;
  confidence: number;
  processingTime: number;
  tokens: number;
}

interface CollaborativeResponse {
  finalResponse: string;
  confidence: number;
  contributingModels: string[];
  processingTime: number;
  validationScore: number;
}

export const ModelOrchestrator = () => {
  const [models] = useState<LanguageModel[]>([
    {
      id: 'llama-13b',
      name: 'Llama-13B-Chat',
      type: 'primary',
      domain: ['general', 'reasoning', 'analysis'],
      confidence: 92,
      memoryUsage: 8.2,
      status: 'active',
      capabilities: ['Text Generation', 'Reasoning', 'Analysis', 'Code Review']
    },
    {
      id: 'code-t5',
      name: 'CodeT5-Large',
      type: 'specialist',
      domain: ['programming', 'code', 'technical'],
      confidence: 89,
      memoryUsage: 4.1,
      status: 'active',
      capabilities: ['Code Generation', 'Bug Detection', 'Documentation', 'Refactoring']
    },
    {
      id: 'distilbert',
      name: 'DistilBERT-Multilingual',
      type: 'validator',
      domain: ['validation', 'classification', 'sentiment'],
      confidence: 85,
      memoryUsage: 2.3,
      status: 'active',
      capabilities: ['Text Classification', 'Sentiment Analysis', 'Fact Checking', 'Translation']
    }
  ]);

  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState<CollaborativeResponse | null>(null);

  const selectOptimalModels = useCallback((query: string, domain?: string) => {
    // Model selection algorithm based on query analysis
    const queryKeywords = query.toLowerCase().split(' ');
    const codeKeywords = ['code', 'function', 'programming', 'bug', 'debug', 'javascript', 'typescript'];
    const analysisKeywords = ['analyze', 'explain', 'reasoning', 'logic', 'problem'];
    
    let selectedModels = models.filter(model => model.status === 'active');
    
    if (codeKeywords.some(keyword => queryKeywords.includes(keyword))) {
      selectedModels = selectedModels.filter(model => 
        model.domain.includes('programming') || model.type === 'primary'
      );
    } else if (analysisKeywords.some(keyword => queryKeywords.includes(keyword))) {
      selectedModels = selectedModels.filter(model => 
        model.domain.includes('reasoning') || model.type === 'validator'
      );
    }
    
    return selectedModels.sort((a, b) => b.confidence - a.confidence);
  }, [models]);

  const processCollaborativeQuery = useCallback(async (query: string) => {
    setIsProcessing(true);
    
    try {
      // Step 1: Select optimal models
      const selectedModels = selectOptimalModels(query);
      
      // Step 2: Parallel processing with primary model
      const primaryModel = selectedModels.find(m => m.type === 'primary') || selectedModels[0];
      const specialistModels = selectedModels.filter(m => m.type === 'specialist');
      const validatorModels = selectedModels.filter(m => m.type === 'validator');
      
      // Simulate model processing (in real implementation, this would call actual models)
      const primaryResult: QueryResult = {
        modelId: primaryModel.id,
        response: `Primary analysis: ${query}`,
        confidence: primaryModel.confidence,
        processingTime: Math.random() * 2000 + 1000,
        tokens: Math.floor(Math.random() * 500) + 100
      };
      
      // Step 3: Specialist enhancement
      const specialistResults = await Promise.all(
        specialistModels.map(async (model): Promise<QueryResult> => ({
          modelId: model.id,
          response: `Specialist insight from ${model.name}`,
          confidence: model.confidence,
          processingTime: Math.random() * 1500 + 500,
          tokens: Math.floor(Math.random() * 300) + 50
        }))
      );
      
      // Step 4: Validation and refinement
      const validationResults = await Promise.all(
        validatorModels.map(async (model): Promise<QueryResult> => ({
          modelId: model.id,
          response: `Validation from ${model.name}`,
          confidence: model.confidence,
          processingTime: Math.random() * 1000 + 300,
          tokens: Math.floor(Math.random() * 200) + 30
        }))
      );
      
      // Step 5: Weighted aggregation
      const allResults = [primaryResult, ...specialistResults, ...validationResults];
      const weightedConfidence = allResults.reduce((acc, result, index) => {
        const weight = index === 0 ? 0.5 : 0.5 / (allResults.length - 1); // Primary gets 50%, others split the rest
        return acc + (result.confidence * weight);
      }, 0);
      
      const collaborativeResponse: CollaborativeResponse = {
        finalResponse: `Collaborative response combining insights from ${allResults.length} models: ${query}`,
        confidence: weightedConfidence,
        contributingModels: allResults.map(r => r.modelId),
        processingTime: Math.max(...allResults.map(r => r.processingTime)),
        validationScore: validationResults.length > 0 ? 
          validationResults.reduce((acc, r) => acc + r.confidence, 0) / validationResults.length : 0
      };
      
      setLastResponse(collaborativeResponse);
      
    } catch (error) {
      console.error('Error in collaborative processing:', error);
    } finally {
      setIsProcessing(false);
    }
  }, [selectOptimalModels]);

  const totalMemoryUsage = models.reduce((acc, model) => acc + model.memoryUsage, 0);
  const activeModels = models.filter(model => model.status === 'active');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Multi-Model Orchestrator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Active Models</p>
              <p className="text-2xl font-bold text-blue-600">{activeModels.length}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Memory Usage</p>
              <p className="text-2xl font-bold text-green-600">{totalMemoryUsage.toFixed(1)} GB</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Avg Confidence</p>
              <p className="text-2xl font-bold text-purple-600">
                {activeModels.length > 0 ? 
                  (activeModels.reduce((acc, m) => acc + m.confidence, 0) / activeModels.length).toFixed(0) : 0}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {models.map((model) => (
          <Card key={model.id} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{model.name}</CardTitle>
                <Badge className={
                  model.type === 'primary' ? 'bg-blue-100 text-blue-800' :
                  model.type === 'specialist' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }>
                  {model.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Confidence</span>
                  <span>{model.confidence}%</span>
                </div>
                <Progress value={model.confidence} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory</span>
                  <span>{model.memoryUsage} GB</span>
                </div>
                <Progress value={(model.memoryUsage / 16) * 100} className="h-2" />
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Capabilities:</p>
                <div className="flex flex-wrap gap-1">
                  {model.capabilities.slice(0, 2).map((capability, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                  {model.capabilities.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{model.capabilities.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  model.status === 'active' ? 'bg-green-500' :
                  model.status === 'processing' ? 'bg-yellow-500' : 'bg-gray-400'
                }`} />
                <span className="text-sm capitalize">{model.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Collaborative Processing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              onClick={() => processCollaborativeQuery("Analyze the impact of AI on humanitarian work")}
              disabled={isProcessing}
              className="flex-1"
            >
              {isProcessing ? <Activity className="w-4 h-4 mr-2 animate-spin" /> : <Target className="w-4 h-4 mr-2" />}
              {isProcessing ? 'Processing...' : 'Test Collaborative Query'}
            </Button>
          </div>
          
          {lastResponse && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium">Collaborative Response</span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Confidence</p>
                  <p className="font-medium">{lastResponse.confidence.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-gray-600">Models Used</p>
                  <p className="font-medium">{lastResponse.contributingModels.length}</p>
                </div>
                <div>
                  <p className="text-gray-600">Processing Time</p>
                  <p className="font-medium">{(lastResponse.processingTime / 1000).toFixed(1)}s</p>
                </div>
                <div>
                  <p className="text-gray-600">Validation Score</p>
                  <p className="font-medium">{lastResponse.validationScore.toFixed(1)}%</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600 mb-2">Contributing Models:</p>
                <div className="flex flex-wrap gap-1">
                  {lastResponse.contributingModels.map((modelId, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {models.find(m => m.id === modelId)?.name.split('-')[0] || modelId}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded border">
                <p className="text-sm">{lastResponse.finalResponse}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
