
export interface WebAgent {
  id: string;
  name: string;
  type: 'frontend' | 'backend' | 'mobile' | 'uiux' | 'qa' | 'security' | 'seo' | 'localization';
  status: 'active' | 'idle' | 'developing' | 'testing' | 'deploying';
  currentProject: string;
  specializations: string[];
  efficiency: number;
  projectsCompleted: number;
  bugsFixed: number;
}

export interface WebProject {
  id: string;
  name: string;
  type: 'website' | 'web_app' | 'mobile_app' | 'pwa';
  status: 'planning' | 'development' | 'testing' | 'deployed' | 'maintenance';
  progress: number;
  assignedAgents: string[];
  features: ProjectFeature[];
  technologies: string[];
  accessibility: AccessibilityScore;
  performance: PerformanceMetrics;
  security: SecurityStatus;
  lastUpdated: Date;
  deploymentUrl?: string;
}

export interface ProjectFeature {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'testing';
  complexity: 'low' | 'medium' | 'high';
  estimatedHours: number;
  actualHours?: number;
  assignedTo: string;
}

export interface AccessibilityScore {
  wcagLevel: 'A' | 'AA' | 'AAA';
  score: number;
  issues: AccessibilityIssue[];
  neurodiversityFriendly: boolean;
  darkModeSupport: boolean;
  dyslexiaFriendly: boolean;
}

export interface AccessibilityIssue {
  type: 'color_contrast' | 'keyboard_navigation' | 'screen_reader' | 'focus_management';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  autoFixable: boolean;
}

export interface PerformanceMetrics {
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };
  pageSpeed: number;
  mobileScore: number;
  desktopScore: number;
  recommendations: string[];
}

export interface SecurityStatus {
  vulnerabilities: SecurityVulnerability[];
  sslStatus: 'valid' | 'expired' | 'invalid';
  lastSecurityScan: Date;
  securityScore: number;
  backupStatus: 'current' | 'outdated' | 'failed';
}

export interface SecurityVulnerability {
  type: 'dependency' | 'code' | 'config' | 'server';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  cve?: string;
  autoFixable: boolean;
  fixInstructions: string;
}

export interface MonitoringAlert {
  id: string;
  type: 'performance' | 'security' | 'error' | 'downtime' | 'seo';
  severity: 'info' | 'warning' | 'critical' | 'emergency';
  message: string;
  projectId: string;
  timestamp: Date;
  resolved: boolean;
  autoFixAttempted: boolean;
  suggestedActions: string[];
}

export interface LocalizationProject {
  id: string;
  projectId: string;
  languages: LocalizedLanguage[];
  status: 'planning' | 'translating' | 'reviewing' | 'completed';
  progress: number;
  culturalAdaptations: CulturalAdaptation[];
}

export interface LocalizedLanguage {
  code: string;
  name: string;
  progress: number;
  translatedStrings: number;
  totalStrings: number;
  status: 'pending' | 'in_progress' | 'review' | 'completed';
}

export interface CulturalAdaptation {
  type: 'colors' | 'images' | 'layout' | 'content' | 'currency';
  description: string;
  region: string;
  implemented: boolean;
}

export interface VersionControl {
  id: string;
  projectId: string;
  version: string;
  changes: VersionChange[];
  timestamp: Date;
  author: string;
  status: 'draft' | 'committed' | 'deployed' | 'rolled_back';
  rollbackAvailable: boolean;
}

export interface VersionChange {
  type: 'feature' | 'bugfix' | 'security' | 'performance' | 'design';
  description: string;
  files: string[];
  impact: 'low' | 'medium' | 'high';
}

export interface VisualEditor {
  projectId: string;
  components: EditableComponent[];
  currentView: 'desktop' | 'tablet' | 'mobile';
  previewMode: boolean;
  unsavedChanges: boolean;
}

export interface EditableComponent {
  id: string;
  type: 'text' | 'image' | 'button' | 'form' | 'navigation' | 'layout';
  content: any;
  styles: ComponentStyles;
  position: ComponentPosition;
  editable: boolean;
}

export interface ComponentStyles {
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  fontFamily?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  animation?: string;
}

export interface ComponentPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}
