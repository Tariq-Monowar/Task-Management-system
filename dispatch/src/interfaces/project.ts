// interfaces/project.ts

export interface User {
  userId: string;
  role: string;
  _id: string;
}

export interface Project {
  amount: number;
  currency: string;
  status: string;
  _id: string;
  title: string;
  description: string;
  users: User[];
  tasks: any[];  
  createdAt: string;  
  updatedAt: string; 
  __v: number;  
  timeline: {
    start: string;  
    end: string;  
  };
  
 
}

export interface Task {
  _id: string;
  taskName: string;
  description: string;
  assignedBy: {
    _id: string;
    name: string;
    email: string;
  };
  assignedTo: {
    _id: string;
    name: string;
    email: string;
  };
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in-progress' | 'completed' | 'on-hold' | 'archived';
  projectId: string;
  dependencies: string[];
  notificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface ProjectState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  users: any;
  sidebarEnable: boolean;
 
}

export interface ErrorResponse {
  message: string;  
  statusCode?: number; 
}
