import { createAsyncThunk, createSlice,   } from "@reduxjs/toolkit";
import axios from "axios";

import { TaskErrorResponse, TaskState } from "../../interfaces/task";
import { Task } from "../../interfaces/project";
 

axios.defaults.withCredentials = true;

// Thunk to get all tasks in a project
export const getAllTaskInProject = createAsyncThunk<
  Task[],
  string,
  { rejectValue: TaskErrorResponse }
>("task/project", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/api/task/project/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data as TaskErrorResponse);
  }
});

// Thunk to add a user to a project
export const addUserToProject = createAsyncThunk<
  any,
  { projectId: string; userId: string; role: string },
  { rejectValue: TaskErrorResponse }
>(
  "projects/addUser",
  async ({ projectId, userId, role }, { rejectWithValue }) => {
    console.log(projectId, userId, role)
    try {
      const response = await axios.post(`/api/project/${projectId}/users`, {
        userId,
        role,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data as TaskErrorResponse);
    }
  }
);

// Thunk to update a task
export const updateTask = createAsyncThunk<
  Task,
  {
    taskId: string;
    projectId: string;
    data: any;
  },
  { rejectValue: TaskErrorResponse }
>(
  "projects/task/update",
  async ({ taskId, projectId, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/task/${taskId}/${projectId}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data as Task;
    } catch (error: any) {
      return rejectWithValue(error.response.data as TaskErrorResponse);
    }
  }
);

export const createTask = createAsyncThunk<
  Task,
  {
    id: string;
    data: any;
  },
  { rejectValue: TaskErrorResponse }
>("projects/task/create", async ({ id, data }, { rejectWithValue }) => {
  console.log(id);
  console.log('data', data.assignedTo)
  console.log(data)

  try {
    const response = await axios.post(`/api/task/${id}`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data as TaskErrorResponse);
  }
});

export const deletetask = createAsyncThunk<
  any,
  {
    taskId: any;
    id: string;
  },
  { rejectValue: TaskErrorResponse }
>("projects/task/delete", async ({ taskId, id }, { rejectWithValue }) => {
  console.log(id);
  try {
    const response = await axios.delete(`/api/task/${taskId}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data as TaskErrorResponse);
  }
});

// Initial state for the task slice
const initialState: TaskState = {
  task: [],
  taskError: null,
  taskLoading: false,
};

// Task slice definition
const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getAllTaskInProject
    builder
      .addCase(getAllTaskInProject.pending, (state) => {
        state.taskLoading = true;
        state.taskError = null;
      })
      .addCase(getAllTaskInProject.fulfilled, (state, action) => {
        state.taskLoading = false;
        state.task = JSON.parse(JSON.stringify(action.payload));
      })
      .addCase(getAllTaskInProject.rejected, (state, action) => {
        state.taskLoading = false;
        state.taskError = action.payload?.message ?? null;
      });

    // Handle updateTask
    builder
      // Handle updateTask

      .addCase(updateTask.pending, (state) => {
        state.taskLoading = true;
        state.taskError = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.taskLoading = false;

        // Find the task by taskId in the tasks array
        const updatedTask = action.payload;
        const taskIndex = state.task.tasks.findIndex(
          (task: any) => task._id === updatedTask._id
        );

        if (taskIndex !== -1) {
          // Update the task in the state with the updated task data
          state.task.tasks[taskIndex] = updatedTask;
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.taskLoading = false;
        state.taskError = action.payload?.message ?? "An error occurred";
      });

    builder.addCase(addUserToProject.fulfilled, (state, action) => {
      // console.log(state.task);
      console.log(111, state.task);
      console.log(action.payload.user);
      state.task.users.push(action.payload.user);
    });

    builder.addCase(createTask.fulfilled, (state, action) => {
      console.log("Payload from createTask:", action.payload);
      if (action.payload) {
        state.task.tasks.push(action.payload);
      }
    });

    builder.addCase(deletetask.fulfilled, (state, action) => {
      console.log("Payload from createTask:", action.payload);
      if (action.payload) {
        state.task.tasks = state.task.tasks.filter((task: any) => task._id !== action.payload.id);

      }
    });
  },
});

export default taskSlice.reducer;

function dispatch(arg0: {
  payload: any;
  type: "project/addUserToProjectInState";
}) {
  throw new Error("Function not implemented.");
}
