import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  Project,
  ProjectState,
  ErrorResponse,
 
} from "./../../interfaces/project"; // Import your interfaces

axios.defaults.withCredentials = true;

// Async thunks for project management
export const createProject = createAsyncThunk<
  Project,
  Omit<Project, "_id" | "createdAt" | "updatedAt" | "__v">,
  { rejectValue: ErrorResponse }
>("projects/create", async (projectData, { rejectWithValue }) => {
  console.log(projectData)
  try {
    const response = await axios.post("/api/project", projectData, {
      withCredentials: true,
    });
    return response.data; // Return the created project
  } catch (error: any) {
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});

export const getAllProjects = createAsyncThunk<
  Project[],
  void,
  { rejectValue: ErrorResponse }
>("projects/getAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/project", {
      withCredentials: true,
    });
    return response.data; // Return the list of projects
  } catch (error: any) {
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});

export const updateProject = createAsyncThunk<
  Project,
  {
    id: string;
    data: any;
  },
  { rejectValue: ErrorResponse }
>("projects/update", async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(`/api/project/${id}`, data);
    return response.data; // Return the updated project
  } catch (error: any) {
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});

export const deleteProject = createAsyncThunk<
  string,
  string,
  { rejectValue: ErrorResponse }
>("projects/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/api/project/${id}`);
    return id; // Return the deleted project ID
  } catch (error: any) {
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});

export const updateUserRole = createAsyncThunk<
  Project,
  { projectId: string; userId: string; newRole: string },
  { rejectValue: ErrorResponse }
>(
  "projects/updateUserRole",
  async ({ projectId, userId, newRole }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/project/${projectId}/users/role`, {
        userId,
        newRole,
      });
      console.log(response);
      return response.data; // Return the updated project with the updated role
    } catch (error: any) {
      return rejectWithValue(error.response.data as ErrorResponse);
    }
  }
);

export const getAllUser = createAsyncThunk<
  Project[],
  void,
  { rejectValue: ErrorResponse }
>("projects/getAllusers", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get("/api/users/", {
      withCredentials: true,
    });
    return response.data; // Return the list of projects
  } catch (error: any) {
    return rejectWithValue(error.response.data as ErrorResponse);
  }
});

export const rejectUsersFromProject = createAsyncThunk<
  Project,
  { projectId: string; userIds: string[] },
  { rejectValue: ErrorResponse }
>(
  "projects/rejectUsersFromProject/users",
  async ({ projectId, userIds }, { rejectWithValue }) => {
    console.log(userIds, projectId);
    console.log(JSON.stringify({ userIds }));
    try {
      const response = await axios.put(
        `/api/project/${projectId}/users`,
        JSON.stringify({ userIds }), // Convert data to JSON string
        {
          headers: {
            "Content-Type": "application/json", // Ensure the content type is JSON
          },
          withCredentials: true,
        }
      );

      console.log(response);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data as ErrorResponse);
      }
      return rejectWithValue({
        message: "An unexpected error occurred",
      } as ErrorResponse);
    }
  }
);

// Initial state for the project slice
const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,

  users: [],
  sidebarEnable: true,
};

// Project slice definition
const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarEnable = !state.sidebarEnable; 
    },
    addUserToProjectInState: (state, action) => {
      const { projectId, user }:any = action.payload;
      const project = state.projects.find((proj) => proj._id === projectId);
      if (project) {
        project.users.push(user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects.push(action.payload); // Add the new project to the list
      })
      .addCase(createProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null; // Set error message
      });

    builder
      .addCase(getAllProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(getAllProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });

    builder
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null;
      });

    builder
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload
        ); // Remove the deleted project
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message ?? null; // Set error message
      });

    builder
      // .addCase(updateUserRole.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.projects.findIndex(
          (project) => project._id === action.payload._id
        );
        if (index !== -1) {
          state.projects[index] = action.payload; // Update the project with the updated role
        }
      });
    // .addCase(updateUserRole.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload?.message ?? null; // Set error message
    // });

    builder
      // .addCase(updateUserRole.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(rejectUsersFromProject.fulfilled, (state, action) => {
        console.log(state);
        console.log(action);
        // const index = state.projects.findIndex(
        //   (project) => project._id === action.payload._id
        // );
        // if (index !== -1) {
        //   state.projects[index] = action.payload; // Update the project with the updated role
        // }
      });
    // .addCase(updateUserRole.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload?.message ?? null; // Set error message
    // });

    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});
export const { toggleSidebar, addUserToProjectInState } = projectSlice.actions;
export default projectSlice.reducer;
