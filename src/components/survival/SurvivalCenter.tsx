import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Shield, Radio, MapPin, Zap, Heart, Wrench, 
  Home, Car, Backpack, Phone, AlertTriangle, 
  Search, Download, Eye
} from 'lucide-react';

export const SurvivalCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const emergencyCategories = [
    { id: 'all', name: 'All Categories', icon: Shield, color: 'bg-red-500' },
    { id: 'immediate', name: 'Immediate Threats', icon: AlertTriangle, color: 'bg-red-600' },
    { id: 'communication', name: 'Communication', icon: Radio, color: 'bg-blue-500' },
    { id: 'shelter', name: 'Shelter & Security', icon: Home, color: 'bg-green-500' },
    { id: 'supplies', name: 'Supplies & Tools', icon: Backpack, color: 'bg-orange-500' },
    { id: 'medical', name: 'Medical & Health', icon: Heart, color: 'bg-pink-500' },
    { id: 'transport', name: 'Transportation', icon: Car, color: 'bg-purple-500' },
  ];

  const immediateThreats = [
    {
      title: "Natural Disasters",
      scenarios: [
        { name: "Earthquake", actions: ["Drop, Cover, Hold", "Stay away from windows", "Check for gas leaks", "Have evacuation plan ready"] },
        { name: "Flood", actions: ["Move to higher ground", "Avoid walking in moving water", "Turn off utilities", "Monitor emergency broadcasts"] },
        { name: "Fire", actions: ["Stay low to avoid smoke", "Feel doors before opening", "Have multiple escape routes", "Meet at designated location"] },
        { name: "Hurricane/Tornado", actions: ["Seek interior room/basement", "Stay away from windows", "Monitor weather radio", "Have supplies ready"] }
      ]
    },
    {
      title: "Man-Made Crises",
      scenarios: [
        { name: "Civil Unrest", actions: ["Avoid crowds/protests", "Secure home perimeter", "Monitor news constantly", "Have bug-out plan ready"] },
        { name: "Power Grid Failure", actions: ["Preserve phone battery", "Use flashlights (not candles)", "Keep refrigerator closed", "Check on neighbors"] },
        { name: "Economic Collapse", actions: ["Secure cash reserves", "Stock essential supplies", "Network with community", "Protect valuable items"] },
        { name: "Chemical/Biological", actions: ["Seal doors/windows", "Turn off HVAC", "Use N95+ masks", "Monitor emergency broadcasts"] }
      ]
    }
  ];

  const hamRadioFrequencies = [
    { band: "2 Meters", frequency: "144-148 MHz", use: "Local emergency communication, repeaters" },
    { band: "70cm", frequency: "420-450 MHz", use: "Backup local communication, digital modes" },
    { band: "GMRS", frequency: "462-467 MHz", use: "Family radio service (requires license)" },
    { band: "FRS", frequency: "462-467 MHz", use: "Unlicensed family radios (low power)" },
    { band: "MURS", frequency: "151-154 MHz", use: "Unlicensed business band" },
    { band: "Marine VHF", frequency: "156-158 MHz", use: "Coast Guard emergency: Channel 16" },
    { band: "Aviation", frequency: "118-137 MHz", use: "Emergency: 121.5 MHz" },
    { band: "Weather", frequency: "162.4-162.55 MHz", use: "NOAA Weather Radio" }
  ];

  const emergencyChannels = [
    { service: "Coast Guard", frequency: "156.800 MHz", channel: "Channel 16", notes: "International distress frequency" },
    { service: "Aviation Emergency", frequency: "121.500 MHz", channel: "Guard", notes: "Aircraft emergency frequency" },
    { service: "Local Emergency", frequency: "155.160 MHz", channel: "VTAC11", notes: "Interagency tactical" },
    { service: "Red Cross", frequency: "47.660 MHz", channel: "Various", notes: "Disaster response coordination" },
    { service: "FEMA", frequency: "138-144 MHz", channel: "Various", notes: "Federal emergency management" },
    { service: "Weather Alert", frequency: "162.550 MHz", channel: "WX4", notes: "Severe weather warnings" }
  ];

  const essentialSupplies = {
    "Water & Food": [
      "1 gallon water per person per day (3-day minimum)",
      "Water purification tablets/filters",
      "Non-perishable food (3-day supply minimum)",
      "Manual can opener",
      "Emergency cooking source (portable stove, fuel)"
    ],
    "Communication & Power": [
      "Battery-powered/hand-crank radio",
      "Ham radio (if licensed) + backup batteries",
      "Cell phone with solar/battery chargers",
      "Emergency whistle",
      "Signal mirror/flares"
    ],
    "Medical & Safety": [
      "First aid kit + prescription medications",
      "N95 masks, latex gloves",
      "Fire extinguisher",
      "Smoke/CO detectors (battery backup)",
      "Emergency blankets/sleeping bags"
    ],
    "Tools & Defense": [
      "Multi-tool with knife",
      "Duct tape, plastic sheeting",
      "Rope/paracord (100ft minimum)",
      "Crowbar/pry bar",
      "Self-defense items (legal in your area)"
    ]
  };

  const bugOutBag = [
    { category: "Documents", items: ["ID copies", "Insurance papers", "Cash ($500+ small bills)", "USB drive with scanned documents"] },
    { category: "Survival", items: ["Water filter/purification", "72-hour food supply", "Fire starting materials", "Emergency shelter/tarp"] },
    { category: "Navigation", items: ["Physical maps of area", "Compass", "GPS device + batteries", "Radio scanner"] },
    { category: "Medical", items: ["Personal medications", "First aid supplies", "Emergency antibiotics", "Pain relievers"] },
    { category: "Security", items: ["Personal protection", "Door reinforcement", "Window film", "Alarm systems"] }
  ];

  const shelterOptions = [
    {
      type: "Safe Room",
      description: "Interior room with no windows, reinforced door",
      supplies: ["3-day supplies", "Communication equipment", "Sanitation materials", "Tools for escape"],
      considerations: ["Multiple exit routes", "Ventilation", "Structural integrity", "Hidden from view"]
    },
    {
      type: "Underground Shelter",
      description: "Below-ground protection from threats",
      supplies: ["Extended food/water", "Air filtration", "Waste management", "Backup power"],
      considerations: ["Drainage", "Access security", "Ventilation system", "Multiple exits"]
    },
    {
      type: "Remote Location",
      description: "Rural property away from population centers",
      supplies: ["Self-sufficient utilities", "Agricultural capability", "Defense positioning", "Communication hub"],
      considerations: ["Water source", "Growing season", "Access roads", "Community relations"]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Alert Header */}
      <Card className="border-l-4 border-l-red-500 bg-red-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <Shield className="h-6 w-6" />
                Survival & Emergency Preparedness Hub
              </CardTitle>
              <CardDescription className="text-red-600">
                Comprehensive survival information for any crisis situation
              </CardDescription>
            </div>
            <Badge variant="destructive" className="text-lg px-4 py-2">
              EMERGENCY READY
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="destructive" size="lg" className="h-16">
          <AlertTriangle className="h-6 w-6 mr-2" />
          IMMEDIATE DANGER
        </Button>
        <Button variant="outline" size="lg" className="h-16">
          <Radio className="h-6 w-6 mr-2" />
          Emergency Radio
        </Button>
        <Button variant="outline" size="lg" className="h-16">
          <MapPin className="h-6 w-6 mr-2" />
          Bug Out Routes
        </Button>
        <Button variant="outline" size="lg" className="h-16">
          <Download className="h-6 w-6 mr-2" />
          Offline Maps
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search survival information..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          {emergencyCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <Tabs defaultValue="immediate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="immediate">Immediate</TabsTrigger>
          <TabsTrigger value="communication">Radio/Comms</TabsTrigger>
          <TabsTrigger value="supplies">Supplies</TabsTrigger>
          <TabsTrigger value="shelter">Shelter</TabsTrigger>
          <TabsTrigger value="medical">Medical</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        {/* Immediate Threats */}
        <TabsContent value="immediate">
          <div className="space-y-6">
            {immediateThreats.map((threat, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="text-red-600">{threat.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {threat.scenarios.map((scenario, sidx) => (
                      <div key={sidx} className="border-l-4 border-l-orange-400 pl-4">
                        <h4 className="font-semibold text-lg mb-2">{scenario.name}</h4>
                        <ul className="space-y-1">
                          {scenario.actions.map((action, aidx) => (
                            <li key={aidx} className="flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Communication & Ham Radio */}
        <TabsContent value="communication">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Radio className="h-5 w-5" />
                  Ham Radio Frequencies
                </CardTitle>
                <CardDescription>
                  Essential frequencies for emergency communication
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {hamRadioFrequencies.map((freq, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <div className="font-semibold">{freq.band}</div>
                        <div className="text-sm text-muted-foreground">{freq.frequency}</div>
                      </div>
                      <div className="text-sm text-right max-w-xs">
                        {freq.use}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emergency Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {emergencyChannels.map((channel, idx) => (
                    <div key={idx} className="grid grid-cols-4 gap-4 p-3 border rounded">
                      <div className="font-semibold">{channel.service}</div>
                      <div className="font-mono text-sm">{channel.frequency}</div>
                      <div className="text-sm">{channel.channel}</div>
                      <div className="text-xs text-muted-foreground">{channel.notes}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Radio className="h-4 w-4" />
              <AlertDescription>
                <strong>Remember:</strong> Monitor emergency frequencies regularly. Have backup power for radios. 
                Practice using equipment before emergencies. Consider getting ham radio license for full access.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>

        {/* Essential Supplies */}
        <TabsContent value="supplies">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Backpack className="h-5 w-5" />
                  Essential Supplies Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(essentialSupplies).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-lg mb-3 text-blue-600">{category}</h3>
                      <ul className="space-y-2">
                        {items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <div className="w-4 h-4 border rounded-sm mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Bug-Out Bag Essentials</CardTitle>
                <CardDescription>72-hour survival kit for rapid evacuation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bugOutBag.map((category, idx) => (
                    <div key={idx} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-green-600">{category.category}</h4>
                      <ul className="space-y-1">
                        {category.items.map((item, iidx) => (
                          <li key={iidx} className="text-sm flex items-start gap-2">
                            <div className="w-3 h-3 border rounded-sm mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Shelter & Security */}
        <TabsContent value="shelter">
          <div className="space-y-6">
            {shelterOptions.map((shelter, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="h-5 w-5" />
                    {shelter.type}
                  </CardTitle>
                  <CardDescription>{shelter.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-blue-600">Required Supplies</h4>
                      <ul className="space-y-1">
                        {shelter.supplies.map((supply, sidx) => (
                          <li key={sidx} className="flex items-center gap-2 text-sm">
                            <Zap className="h-3 w-3 text-blue-500" />
                            {supply}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">Key Considerations</h4>
                      <ul className="space-y-1">
                        {shelter.considerations.map((consideration, cidx) => (
                          <li key={cidx} className="flex items-center gap-2 text-sm">
                            <Eye className="h-3 w-3 text-green-500" />
                            {consideration}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Security Tip:</strong> Multiple layers of security work best. Avoid obvious patterns. 
                Have backup plans for backup plans. Test your shelter setup regularly.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>

        {/* Medical & Health */}
        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Emergency Medical Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-red-600">First Aid Priorities</h3>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Ensure scene safety</li>
                    <li>Check responsiveness</li>
                    <li>Call for help (911/emergency services)</li>
                    <li>Check ABCs (Airway, Breathing, Circulation)</li>
                    <li>Control bleeding</li>
                    <li>Treat for shock</li>
                    <li>Monitor vital signs</li>
                  </ol>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-blue-600">Medication Storage</h3>
                  <ul className="space-y-2">
                    <li>• 90-day supply of prescription meds</li>
                    <li>• Antibiotics (if available)</li>
                    <li>• Pain relievers (ibuprofen, acetaminophen)</li>
                    <li>• Anti-diarrheal medication</li>
                    <li>• Allergy medications</li>
                    <li>• Insulin/diabetes supplies</li>
                    <li>• Blood pressure medication</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Emergency Planning */}
        <TabsContent value="planning">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Action Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-purple-600">Communication Plan</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Primary contact person out of state</li>
                      <li>• Local emergency contact</li>
                      <li>• Meeting locations (2 per area)</li>
                      <li>• Important phone numbers memorized</li>
                      <li>• Ham radio contact schedule</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-orange-600">Evacuation Routes</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• Primary route mapped</li>
                      <li>• Alternative routes identified</li>
                      <li>• Vehicle maintenance current</li>
                      <li>• Fuel tanks kept ¾ full</li>
                      <li>• Paper maps stored in vehicle</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-green-600">Important Documents</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• IDs and passports</li>
                      <li>• Insurance policies</li>
                      <li>• Financial records</li>
                      <li>• Medical records</li>
                      <li>• Property deeds/titles</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <Wrench className="h-4 w-4" />
              <AlertDescription>
                <strong>Regular Maintenance:</strong> Review and update plans every 6 months. 
                Practice evacuation routes. Test communication equipment monthly. 
                Rotate stored supplies based on expiration dates.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
      </Tabs>

      {/* Disclaimer */}
      <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
        <CardContent className="pt-6">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This information is for educational and preparedness purposes only. 
            Always follow local laws and regulations. Consult with local emergency management for area-specific guidance. 
            Regular training and practice are essential for effective emergency response.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};