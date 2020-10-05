// mutations
const mutations = {
  SET_COLUMNS: (state, columns) => {
    state.columns = columns;
  },
  SET_TASKS: (state, { tasks, columnID }) => {
    state.columns = state.columns.map((column) => {
      if (column.id === columnID) {
        column = {
          ...column,
          tasks,
          error: false,
        };
      }
      return column;
    });
  },
  CREATE_TASK: (state, task) => {
    state.columns = state.columns.map((column) => {
      if (column.id === task.column_id) {
        column.tasks.push({ ...task });
      }
      return column;
    });
  },
  UPDATE_TASK: (state, task) => {
    state.columns = state.columns.map((column) => {
      column.tasks.forEach((t, i) => {
        if (task.id === t.id) {
          column.tasks.splice(i, 1);
        }
      });
      if (column.id === task.column_id) {
        column.tasks.push({ ...task });
      }
      return column;
    });
  },
  DELETE_TASK: (state, task) => {
    state.columns = state.columns.map((column) => {
      column.tasks.forEach((t, i) => {
        if (task.id === t.id) {
          column.tasks.splice(i, 1);
        }
      });
      return column;
    });
  },
  SET_TASKS_LOADING: (state, { loading, columnID }) => {
    state.columns = state.columns.map((column) => {
      if (column.id === columnID) {
        column.loading = loading;
      }
      return column;
    });
  },
  SET_TASKS_ERROR: (state, { error, columnID }) => {
    state.columns = state.columns.map((column) => {
      if (column.id === columnID) {
        column.error = error;
      }
      return column;
    });
  },
  SET_COLUMNS_LOADING: (state, loading) => {
    state.columnsLoading = loading;
  },
  SET_COLUMNS_ERROR: (state, error) => {
    state.columnsError = error;
  },
  SET_CREATE_TASK_LOADING: (state, loading) => {
    state.createTaskLoading = loading;
  },
  SET_UPDATE_TASK_LOADING: (state, loading) => {
    state.updateTaskLoading = loading;
  },
  SET_DELETE_TASK_LOADING: (state, loading) => {
    state.deleteTaskLoading = loading;
  },
  SET_CURRENT_TASK: (state, task) => {
    state.currentTask = { ...task };
  },
};
export default mutations;
