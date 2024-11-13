export interface NotificationData {
  id: string; 
  recipient: string[];  
  sender?: string;  
  projectId?: string;
  taskId?: string;
  message: string;
  type: "task-update" | "new-assignment" | "project-status" | "general";
  read: boolean;
  createdAt: string; 
  updatedAt: string;
}

export interface NotificationState {
  notificationsList: NotificationData[];
  notificationLoading: boolean;
  notificationError: string | null;
  count: number
}

// interfaces/errorResponse.ts
export interface ErrorResponse {
  message?: string;
  status?: number;
  [key: string]: any; // Allow other properties if they exist in the response
}
