import mutations from './mutations';
import actions from './actions';

const state = () => ({
  columns: [],
  columnsLoading: false,
  columnsError: false,
  createTaskLoading: false,
  updateTaskLoading: false,
  deleteTaskLoading: false,
  currentTask: {
    id: 0,
    user_id: 0,
    column_id: 0,
    name: '',
  },
});

// getters
const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
