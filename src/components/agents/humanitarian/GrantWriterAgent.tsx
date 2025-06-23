
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, DollarSign, Target, Download } from 'lucide-react';

export const GrantWriterAgent = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [funder, setFunder] = useState('');
  const [projectGoal, setProjectGoal] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState('');

  const funderTemplates = {
    'EU': 'European Union format with logical framework and sustainability focus',
    'UN': 'United Nations format with SDG alignment and humanitarian principles',
    'Gates': 'Gates Foundation format emphasizing innovation and measurable impact',
    'Ford': 'Ford Foundation format focusing on social justice and community empowerment',
    'USAID': 'USAID format with democracy, human rights, and governance emphasis',
    'Other': 'Standard international development format'
  };

  const generateProposal = async () => {
    setIsGenerating(true);
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    const proposal = `
# Grant Proposal: ${projectTitle}

**Submitted to:** ${funder}
**Requested Amount:** ${budget}
**Project Duration:** ${duration}
**Submission Date:** ${new Date().toLocaleDateString()}

---

## 1. EXECUTIVE SUMMARY

This proposal requests ${budget} from ${funder} to implement "${projectTitle}", a ${duration} initiative designed to ${projectGoal}. The project will directly benefit ${beneficiaries} and contribute to sustainable development in the target region.

**Key Impact Indicators:**
• Direct beneficiaries: ${beneficiaries}
• Primary outcome: ${projectGoal}
• Alignment with ${funder} priorities: 100%

## 2. PROJECT DESCRIPTION

### Problem Statement
Our target communities face significant challenges that require immediate, evidence-based intervention. Current gaps in service delivery and resource access limit opportunities for sustainable development and human dignity.

### Proposed Solution
"${projectTitle}" addresses these challenges through:
- Community-centered implementation approach
- Evidence-based intervention strategies
- Sustainable capacity building components
- Measurable impact assessment framework

### Innovation Factor
This project introduces innovative approaches that leverage local knowledge, technological solutions, and cross-sector partnerships to maximize impact and ensure sustainability.

## 3. OBJECTIVES & OUTCOMES

### Primary Objective
${projectGoal}

### Specific Outcomes
1. **Short-term (0-6 months):** Establish project infrastructure and community partnerships
2. **Medium-term (6-18 months):** Deliver core interventions and build local capacity
3. **Long-term (18+ months):** Achieve sustainable systems and measure lasting impact

### Success Metrics
- Quantitative indicators aligned with ${funder} measurement frameworks
- Qualitative assessments through participatory evaluation methods
- Regular reporting using ${funder} standard formats

## 4. METHODOLOGY & APPROACH

### Implementation Strategy
Our approach follows proven methodologies adapted to local context:
- Participatory needs assessment
- Community-led implementation
- Continuous monitoring and adaptation
- Knowledge sharing and replication

### Risk Management
Comprehensive risk assessment with mitigation strategies for:
- Operational risks and contingency planning
- Financial management and transparency
- External factors and adaptive management

## 5. BUDGET OVERVIEW

**Total Project Budget:** ${budget}

**Budget Categories (Estimated):**
- Personnel (40%): ${(parseInt(budget.replace(/[^0-9]/g, '')) * 0.4).toLocaleString()}
- Direct Activities (35%): ${(parseInt(budget.replace(/[^0-9]/g, '')) * 0.35).toLocaleString()}
- Operations (15%): ${(parseInt(budget.replace(/[^0-9]/g, '')) * 0.15).toLocaleString()}
- Monitoring & Evaluation (10%): ${(parseInt(budget.replace(/[^0-9]/g, '')) * 0.1).toLocaleString()}

*Detailed budget breakdown available upon request*

## 6. ORGANIZATIONAL CAPACITY

Our organization brings proven experience in humanitarian and development work, with:
- Established field presence and community relationships
- Technical expertise in project implementation
- Financial management systems meeting international standards
- Monitoring and evaluation capabilities

## 7. SUSTAINABILITY & IMPACT

### Long-term Sustainability
- Local capacity building ensures continued impact
- Community ownership and leadership development
- Integration with existing systems and structures
- Knowledge transfer and institutional strengthening

### Expected Impact
Beyond immediate outputs, this project will create lasting change through:
- Strengthened community resilience
- Enhanced local systems and capacity
- Replicable models for scaling
- Contribution to broader development goals

## 8. CONCLUSION

"${projectTitle}" represents a strategic investment in sustainable development that aligns with ${funder}'s mission and priorities. We respectfully request ${budget} to implement this transformative initiative that will benefit ${beneficiaries} and create lasting positive change.

We welcome the opportunity to discuss this proposal and provide additional information as needed.

---

**Contact Information:**
[Organization Name]
[Contact Details]
[Website/Email]

*This proposal was developed with AI assistance to ensure comprehensive coverage of standard grant application requirements. All information should be verified and customized before submission.*
    `;
    
    setGeneratedProposal(proposal);
    setIsGenerating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="w-5 h-5" />
          AI Grant Writer Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="projectTitle">Project Title</Label>
          <Input
            id="projectTitle"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="e.g., Empowering Youth Through Digital Skills Training"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="funder">Target Funder</Label>
            <Select value={funder} onValueChange={setFunder}>
              <SelectTrigger>
                <SelectValue placeholder="Select funder type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(funderTemplates).map(([key, description]) => (
                  <SelectItem key={key} value={key}>
                    {key} - {description.split(' ')[0]} {description.split(' ')[1]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="budget">Requested Budget</Label>
            <Input
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="e.g., $50,000 USD"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="duration">Project Duration</Label>
            <Input
              id="duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g., 24 months"
            />
          </div>
          
          <div>
            <Label htmlFor="beneficiaries">Target Beneficiaries</Label>
            <Input
              id="beneficiaries"
              value={beneficiaries}
              onChange={(e) => setBeneficiaries(e.target.value)}
              placeholder="e.g., 500 youth aged 16-25"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="projectGoal">Project Goal/Objective</Label>
          <Textarea
            id="projectGoal"
            value={projectGoal}
            onChange={(e) => setProjectGoal(e.target.value)}
            placeholder="Describe the main goal and expected outcomes of your project..."
            rows={3}
          />
        </div>

        <Button 
          onClick={generateProposal} 
          disabled={!projectTitle || !funder || !projectGoal || !budget || isGenerating}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <FileText className="w-4 h-4 mr-2 animate-pulse" />
              Generating Grant Proposal...
            </>
          ) : (
            <>
              <Target className="w-4 h-4 mr-2" />
              Generate Grant Proposal
            </>
          )}
        </Button>

        {generatedProposal && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Generated Grant Proposal</h3>
              <div className="flex gap-2">
                <Badge className="bg-blue-100 text-blue-800">
                  {funder} Format
                </Badge>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Proposal
                </Button>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed">{generatedProposal}</pre>
            </div>
            
            <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> This AI-generated proposal provides a comprehensive foundation. Please review, customize with your specific details, and verify all information before submission to {funder}.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
