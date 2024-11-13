
// interface Task {
//     _id: string;
//     taskName: string;
//     description: string;
//     assignedBy: {
//       _id: string;
//       name: string;
//       email: string;
//     };
//     assignedTo: {
//       _id: string;
//       name: string;
//       email: string;
//     };
//     priority: 'low' | 'medium' | 'high' | 'critical';
//     status: 'pending' | 'in-progress' | 'completed' | 'on-hold' | 'archived';
//     projectId: string;
//     dependencies: string[];
    
//     notificationsEnabled: boolean;
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//   }


  export interface TaskState {
    task: any;  
    taskError: string | null;
    taskLoading: boolean;
}

export interface TaskErrorResponse {
    message: string | null;  
    statusCode?: number; 
  }
  