
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Home, 
  Globe, 
  Plus, 
  ExternalLink, 
  Edit, 
  Trash2, 
  FolderOpen,
  Star,
  Calendar,
  User
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Website {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  isFavorite: boolean;
  lastVisited?: Date;
}

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'paused' | 'planning';
  url?: string;
  category: string;
  tags: string[];
  createdAt: Date;
  lastUpdated: Date;
}

export const PersonalWorkstation = () => {
  const [websites, setWebsites] = useState<Website[]>([
    {
      id: '1',
      name: 'GitHub Profile',
      url: 'https://github.com',
      description: 'My code repositories and projects',
      category: 'Development',
      isFavorite: true,
      lastVisited: new Date()
    },
    {
      id: '2',
      name: 'Portfolio Website',
      url: 'https://myportfolio.com',
      description: 'Personal portfolio showcasing my work',
      category: 'Personal',
      isFavorite: true
    }
  ]);

  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'AI Agent Platform',
      description: 'Building an advanced AI agent management system',
      status: 'active',
      url: 'https://myproject.com',
      category: 'AI/ML',
      tags: ['React', 'TypeScript', 'AI'],
      createdAt: new Date(),
      lastUpdated: new Date()
    },
    {
      id: '2',
      name: 'Personal Blog',
      description: 'Writing about technology and innovation',
      status: 'active',
      category: 'Content',
      tags: ['Writing', 'Tech', 'Blog'],
      createdAt: new Date(),
      lastUpdated: new Date()
    }
  ]);

  const [isAddWebsiteOpen, setIsAddWebsiteOpen] = useState(false);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    name: '',
    url: '',
    description: '',
    category: ''
  });
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    url: '',
    category: '',
    tags: '',
    status: 'planning' as const
  });

  const { toast } = useToast();

  const handleAddWebsite = () => {
    if (!newWebsite.name || !newWebsite.url) {
      toast({
        title: "Error",
        description: "Please fill in at least the name and URL.",
        variant: "destructive"
      });
      return;
    }

    const website: Website = {
      id: Date.now().toString(),
      name: newWebsite.name,
      url: newWebsite.url,
      description: newWebsite.description,
      category: newWebsite.category || 'General',
      isFavorite: false
    };

    setWebsites([...websites, website]);
    setNewWebsite({ name: '', url: '', description: '', category: '' });
    setIsAddWebsiteOpen(false);
    
    toast({
      title: "Website Added",
      description: `${newWebsite.name} has been added to your workstation.`
    });
  };

  const handleAddProject = () => {
    if (!newProject.name || !newProject.description) {
      toast({
        title: "Error",
        description: "Please fill in at least the name and description.",
        variant: "destructive"
      });
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      description: newProject.description,
      url: newProject.url,
      category: newProject.category || 'General',
      status: newProject.status,
      tags: newProject.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    setProjects([...projects, project]);
    setNewProject({ name: '', description: '', url: '', category: '', tags: '', status: 'planning' });
    setIsAddProjectOpen(false);
    
    toast({
      title: "Project Added",
      description: `${newProject.name} has been added to your workstation.`
    });
  };

  const toggleFavorite = (websiteId: string) => {
    setWebsites(websites.map(site => 
      site.id === websiteId ? { ...site, isFavorite: !site.isFavorite } : site
    ));
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'planning': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const favoriteWebsites = websites.filter(site => site.isFavorite);
  const activeProjects = projects.filter(project => project.status === 'active');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-3">
            <Home className="w-8 h-8 text-blue-600" />
            My Personal Workstation
          </h1>
          <p className="text-slate-600 mt-2">
            Your personal homebase for managing websites, projects, and important links
          </p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => setIsAddWebsiteOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Website
          </Button>
          <Button onClick={() => setIsAddProjectOpen(true)} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Favorite Websites
            </CardTitle>
            <CardDescription>Quick access to your most important sites</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {favoriteWebsites.length > 0 ? (
                favoriteWebsites.map((site) => (
                  <div key={site.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-blue-600" />
                      <div>
                        <h4 className="font-medium">{site.name}</h4>
                        <p className="text-sm text-slate-600">{site.description}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={site.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">No favorite websites yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-green-600" />
              Active Projects
            </CardTitle>
            <CardDescription>Currently working on</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeProjects.length > 0 ? (
                activeProjects.map((project) => (
                  <div key={project.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{project.name}</h4>
                        <p className="text-sm text-slate-600 mt-1">{project.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getStatusColor(project.status)}>
                            {project.status}
                          </Badge>
                          <Badge variant="outline">{project.category}</Badge>
                        </div>
                      </div>
                      {project.url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-4">No active projects</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="websites" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="websites">All Websites</TabsTrigger>
          <TabsTrigger value="projects">All Projects</TabsTrigger>
        </TabsList>

        <TabsContent value="websites" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((site) => (
              <Card key={site.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600" />
                      <CardTitle className="text-lg">{site.name}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(site.id)}
                    >
                      <Star className={`w-4 h-4 ${site.isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                  <CardDescription>{site.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{site.category}</Badge>
                    <Button variant="outline" size="sm" asChild>
                      <a href={site.url} target="_blank" rel="noopener noreferrer">
                        Visit <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{project.category}</Badge>
                      {project.url && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={project.url} target="_blank" rel="noopener noreferrer">
                            Open <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Website Dialog */}
      <Dialog open={isAddWebsiteOpen} onOpenChange={setIsAddWebsiteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Website</DialogTitle>
            <DialogDescription>
              Add a website or web application to your personal workstation.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website-name">Name *</Label>
              <Input
                id="website-name"
                value={newWebsite.name}
                onChange={(e) => setNewWebsite({ ...newWebsite, name: e.target.value })}
                placeholder="e.g., My Portfolio"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website-url">URL *</Label>
              <Input
                id="website-url"
                value={newWebsite.url}
                onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website-description">Description</Label>
              <Textarea
                id="website-description"
                value={newWebsite.description}
                onChange={(e) => setNewWebsite({ ...newWebsite, description: e.target.value })}
                placeholder="Brief description of the website"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website-category">Category</Label>
              <Input
                id="website-category"
                value={newWebsite.category}
                onChange={(e) => setNewWebsite({ ...newWebsite, category: e.target.value })}
                placeholder="e.g., Development, Personal, Work"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddWebsiteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddWebsite}>Add Website</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Project Dialog */}
      <Dialog open={isAddProjectOpen} onOpenChange={setIsAddProjectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Add a project to track your work and progress.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Name *</Label>
              <Input
                id="project-name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="e.g., AI Chat Application"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-description">Description *</Label>
              <Textarea
                id="project-description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="What is this project about?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-url">URL (optional)</Label>
              <Input
                id="project-url"
                value={newProject.url}
                onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                placeholder="https://github.com/username/project"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-category">Category</Label>
              <Input
                id="project-category"
                value={newProject.category}
                onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                placeholder="e.g., Web Development, AI/ML, Mobile"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project-tags">Tags (comma-separated)</Label>
              <Input
                id="project-tags"
                value={newProject.tags}
                onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                placeholder="e.g., React, TypeScript, API"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProjectOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddProject}>Add Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
