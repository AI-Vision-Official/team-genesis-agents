
import type { CreativeAgent } from '@/types/creative';

export const mockCreativeAgents: CreativeAgent[] = [
  {
    id: '1',
    name: 'ContentMaster-Alpha',
    specialization: 'content_writer',
    status: 'active',
    currentProject: 'Blog Series: AI in Education',
    expertise: ['Technical Writing', 'SEO Content', 'Creative Writing', 'Multilingual'],
    performanceScore: 96,
    projectsCompleted: 142,
    creativityRating: 94
  },
  {
    id: '2',
    name: 'VisualArtist-Beta',
    specialization: 'visual_designer',
    status: 'creating',
    currentProject: 'Brand Identity Package',
    expertise: ['Logo Design', 'Illustration', 'UI/UX Design', 'Digital Art'],
    performanceScore: 91,
    projectsCompleted: 87,
    creativityRating: 98
  },
  {
    id: '3',
    name: 'VideoProducer-Gamma',
    specialization: 'video_creator',
    status: 'processing',
    currentProject: 'Social Media Campaign Videos',
    expertise: ['Motion Graphics', 'Video Editing', 'Animation', 'Storytelling'],
    performanceScore: 89,
    projectsCompleted: 56,
    creativityRating: 92
  },
  {
    id: '4',
    name: 'AudioMaestro-Delta',
    specialization: 'audio_specialist',
    status: 'idle',
    currentProject: 'Podcast Intro Music',
    expertise: ['Music Composition', 'Sound Design', 'Voice Synthesis', 'Audio Editing'],
    performanceScore: 93,
    projectsCompleted: 73,
    creativityRating: 95
  }
];
