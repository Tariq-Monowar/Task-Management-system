interface Timeline {
    start: string; // ISO date string
    end: string; // ISO date string
  }
  
  interface User {
    userId: {
      _id: string;
      name: string;
      email: string;
      availability: boolean;
      __v: number;
    };
    role: string;
    _id: string;
  }
  
 export interface Project {
    _id: string;
    title: string;
    description: string;
    users: User[];
    tasks: any[]; // You can replace `any` with a more specific type if needed
    archived: boolean;
    priority: 'low' | 'medium' | 'high'; // Extend this as needed
    status: 'active' | 'completed' | 'pending'; // Extend as needed
    currency: 'BDT' | 'USD';
    amount: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    timeline: Timeline;
    __v: number;
  }
  