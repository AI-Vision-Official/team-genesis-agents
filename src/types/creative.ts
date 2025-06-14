
export interface CreativeAgent {
  id: string;
  name: string;
  specialization: 'content_writer' | 'visual_designer' | 'video_creator' | 'template_designer' | 'product_designer' | 'audio_specialist' | 'research_assistant';
  status: 'active' | 'idle' | 'creating' | 'processing' | 'reviewing';
  currentProject: string;
  expertise: string[];
  performanceScore: number;
  projectsCompleted: number;
  creativityRating: number;
}

export interface CreativeProject {
  id: string;
  title: string;
  type: 'content' | 'image' | 'video' | 'template' | 'product' | 'audio' | 'research';
  status: 'draft' | 'in_progress' | 'review' | 'completed' | 'published';
  description: string;
  assignedAgent: string;
  createdAt: Date;
  lastModified: Date;
  tags: string[];
  language: string;
  accessibility: AccessibilityOptions;
  files: CreativeFile[];
}

export interface CreativeFile {
  id: string;
  name: string;
  type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'template';
  url: string;
  size: number;
  format: string;
  thumbnail?: string;
  metadata: FileMetadata;
}

export interface FileMetadata {
  width?: number;
  height?: number;
  duration?: number;
  colorPalette?: string[];
  altText?: string;
  transcription?: string;
  language?: string;
}

export interface AccessibilityOptions {
  dyslexiaFont: boolean;
  highContrast: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  quietMode: boolean;
  minimalistUI: boolean;
  readingLevel: 'simple' | 'standard' | 'advanced';
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
}

export interface ContentRequest {
  type: 'article' | 'poetry' | 'script' | 'book' | 'social_post' | 'newsletter';
  topic: string;
  length: 'short' | 'medium' | 'long';
  tone: 'professional' | 'casual' | 'creative' | 'academic' | 'humorous';
  language: string;
  targetAudience: string;
  keywords?: string[];
  style?: string;
}

export interface ImageRequest {
  prompt: string;
  style: 'realistic' | 'artistic' | 'cartoon' | 'abstract' | 'minimal' | 'vintage';
  dimensions: '1:1' | '16:9' | '9:16' | '4:3' | '3:4';
  colorScheme?: string[];
  mood: 'bright' | 'dark' | 'neutral' | 'vibrant' | 'pastel';
  language: string;
}

export interface VideoRequest {
  type: 'social_clip' | 'presentation' | 'tutorial' | 'promotional' | 'story';
  duration: number;
  template: string;
  content: string;
  style: 'modern' | 'classic' | 'minimal' | 'energetic' | 'calm';
  language: string;
  subtitles: boolean;
}

export interface ProductDesign {
  id: string;
  name: string;
  type: 'logo' | 'tshirt' | 'business_card' | 'book_cover' | 'mockup' | 'poster';
  status: 'designing' | 'review' | 'approved' | 'production';
  description: string;
  specifications: ProductSpecs;
  files: CreativeFile[];
  schedule?: PublishSchedule;
}

export interface ProductSpecs {
  dimensions: string;
  colors: string[];
  format: string;
  resolution: string;
  printReady: boolean;
  brand?: BrandGuidelines;
}

export interface BrandGuidelines {
  primaryColors: string[];
  secondaryColors: string[];
  fonts: string[];
  logoVariants: string[];
  style: string;
  tone: string;
}

export interface PublishSchedule {
  platform: string;
  scheduledDate: Date;
  autoPost: boolean;
  status: 'scheduled' | 'posted' | 'failed';
}

export interface ColorPalette {
  id: string;
  name: string;
  colors: ColorInfo[];
  theme: 'monochrome' | 'complementary' | 'analogous' | 'triadic' | 'split_complementary';
  accessibility: ColorAccessibility;
  createdAt: Date;
}

export interface ColorInfo {
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
  role: 'primary' | 'secondary' | 'accent' | 'neutral';
}

export interface ColorAccessibility {
  wcagAACompliant: boolean;
  contrastRatio: number;
  colorBlindFriendly: boolean;
  recommendations: string[];
}

export interface IdeaBoard {
  id: string;
  title: string;
  description: string;
  ideas: Idea[];
  connections: IdeaConnection[];
  collaborators: string[];
  lastModified: Date;
  tags: string[];
}

export interface Idea {
  id: string;
  text: string;
  type: 'concept' | 'task' | 'question' | 'insight' | 'reference';
  position: { x: number; y: number };
  color: string;
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'developing' | 'implemented';
  attachments: string[];
}

export interface IdeaConnection {
  id: string;
  fromId: string;
  toId: string;
  type: 'relates_to' | 'depends_on' | 'inspires' | 'conflicts_with';
  label?: string;
}

export interface FractalPattern {
  id: string;
  name: string;
  type: 'mandelbrot' | 'julia' | 'sierpinski' | 'burning_ship' | 'custom';
  parameters: FractalParams;
  colors: string[];
  resolution: string;
  iterations: number;
  preview: string;
  fullImage?: string;
}

export interface FractalParams {
  centerX: number;
  centerY: number;
  zoom: number;
  angle: number;
  customFormula?: string;
  seedValues?: number[];
}

export interface Template {
  id: string;
  name: string;
  type: 'document' | 'presentation' | 'social_media' | 'email' | 'website' | 'print';
  category: string;
  description: string;
  preview: string;
  file: string;
  customizable: TemplateCustomization[];
  languages: string[];
  accessibility: boolean;
}

export interface TemplateCustomization {
  field: string;
  type: 'text' | 'image' | 'color' | 'font' | 'size';
  required: boolean;
  defaultValue?: string;
  options?: string[];
}

export interface AudioRequest {
  type: 'music' | 'jingle' | 'speech' | 'sound_effect' | 'ambient';
  description: string;
  duration: number;
  mood: string;
  genre?: string;
  voice?: 'male' | 'female' | 'neutral' | 'robotic';
  language?: string;
  text?: string;
}

export interface ResearchQuery {
  topic: string;
  depth: 'overview' | 'detailed' | 'comprehensive';
  sources: 'academic' | 'news' | 'general' | 'mixed';
  language: string;
  timeframe?: 'recent' | 'year' | 'all_time';
  format: 'summary' | 'report' | 'bullets' | 'mindmap';
}

export interface CreativeWorkflow {
  id: string;
  name: string;
  steps: WorkflowStep[];
  automations: Automation[];
  triggers: WorkflowTrigger[];
  active: boolean;
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: 'create' | 'review' | 'edit' | 'approve' | 'publish';
  assignedTo: string;
  duration: number;
  dependencies: string[];
  automated: boolean;
}

export interface Automation {
  id: string;
  trigger: string;
  action: string;
  conditions: AutomationCondition[];
  active: boolean;
}

export interface AutomationCondition {
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than';
  value: string;
}

export interface WorkflowTrigger {
  id: string;
  type: 'time' | 'completion' | 'approval' | 'upload';
  schedule?: string;
  conditions?: string[];
}
