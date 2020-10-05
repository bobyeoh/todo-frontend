import Vue from 'vue';
import request from '@/services/request';
import API from '@/services/api';

// actions
const actions = {
  getColumns({ commit }) {
    commit('SET_COLUMNS_LOADING', true);
    commit('SET_COLUMNS_ERROR', false);
    return new Promise((resolve, reject) => {
      request(API.columnGet).then((res) => {
        let data = [];
        if (res.data && res.data.columns) {
          data = res.data.columns.map((column) => {
            Vue.set(column, 'loading', false);
            Vue.set(column, 'error', false);
            Vue.set(column, 'tasks', []);
            return column;
          });
        }
        commit('SET_COLUMNS', data);
        commit('SET_COLUMNS_LOADING', false);
        resolve();
      }).catch((error) => {
        commit('SET_COLUMNS_LOADING', false);
        commit('SET_COLUMNS_ERROR', true);
        reject(error);
      });
    });
  },
  getTasks({ commit }, columnID) {
    commit('SET_TASKS_LOADING', { loading: true, columnID });
    commit('SET_TASKS_ERROR', { error: false, columnID });
    return new Promise((resolve, reject) => {
      const params = { id: columnID };
      request(API.taskGet, params).then((res) => {
        commit('SET_TASKS_LOADING', { loading: false, columnID });
        if (res.data && res.data.tasks) {
          const tasks = [...res.data.tasks];
          commit('SET_TASKS', { tasks, columnID });
        }
        resolve();
      }).catch((error) => {
        commit('SET_TASKS_ERROR', { error: true, columnID });
        commit('SET_TASKS_LOADING', { loading: false, columnID });
        reject(error);
      });
    });
  },
  createTask({ commit }, task) {
    commit('SET_CREATE_TASK_LOADING', true);
    return new Promise((resolve, reject) => {
      const params = {
        params: task,
      };
      request(API.taskCreate, params).then((res) => {
        if (res.data) {
          commit('CREATE_TASK', res.data);
        }
        commit('SET_CREATE_TASK_LOADING', false);
        resolve();
      }).catch((error) => {
        commit('SET_CREATE_TASK_LOADING', false);
        reject(error);
      });
    });
  },
  updateTask({ commit }, task) {
    commit('SET_UPDATE_TASK_LOADING', true);
    return new Promise((resolve, reject) => {
      const params = {
        id: task.id,
        params: {
          name: task.name,
          column_id: task.column_id,
        },
      };
      request(API.taskUpdate, params).then(() => {
        commit('UPDATE_TASK', task);
        commit('SET_CURRENT_TASK', task);
        commit('SET_UPDATE_TASK_LOADING', false);
        resolve();
      }).catch((error) => {
        commit('SET_UPDATE_TASK_LOADING', false);
        reject(error);
      });
    });
  },
  deleteTask({ commit }, task) {
    commit('SET_DELETE_TASK_LOADING', true);
    return new Promise((resolve, reject) => {
      const params = {
        id: task.id,
      };
      request(API.taskDelete, params).then(() => {
        commit('DELETE_TASK', task);
        commit('SET_CURRENT_TASK', {
          id: 0,
          user_id: 0,
          column_id: 0,
          name: '',
        });
        commit('SET_DELETE_TASK_LOADING', false);
        resolve();
      }).catch((error) => {
        commit('SET_DELETE_TASK_LOADING', false);
        reject(error);
      });
    });
  },
  setCurrentTask({ commit }, task) {
    commit('SET_CURRENT_TASK', task);
  },
};

export default actions;
