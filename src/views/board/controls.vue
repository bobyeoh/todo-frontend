<template>
  <div class="controls">
    <div class="logout">
      <el-button
        type="text"
        @click="logout"
      >
        Logout
      </el-button>
    </div>
    <h1>Controls</h1>
    <div class="row">
      <el-input
        v-model="newTaskName"
        placeholder="New task name"
        :plain="true"
      />
      <el-button
        :disabled="columns.length === 0"
        :loading="createTaskLoading"
        @click="createTask"
      >
        Create
      </el-button>
    </div>
    <div class="row">
      <el-input
        v-model="currentTask.name"
        placeholder="Click on an existing task"
        :disabled="true"
      />
      <el-button
        :loading="updateTaskLoading"
        :disabled="currentTask.id === 0 || isFirstColumn()"
        @click="moveBack"
      >
        Move back
      </el-button>
      <el-button
        :loading="updateTaskLoading"
        :disabled="currentTask.id === 0 || isLastColumn()"
        @click="moveForward"
      >
        Move forward
      </el-button>
      <el-button
        :loading="deleteTaskLoading"
        :disabled="currentTask.id === 0"
        @click="deleteTask"
      >
        Delete
      </el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Controls',
  data() {
    return {
      newTaskName: '',
    };
  },
  computed: mapState({
    columns: (state) => state.board.columns,
    currentTask: (state) => state.board.currentTask,
    createTaskLoading: (state) => state.board.createTaskLoading,
    updateTaskLoading: (state) => state.board.updateTaskLoading,
    deleteTaskLoading: (state) => state.board.deleteTaskLoading,
  }),
  methods: {
    isFirstColumn() {
      for (let i = 0; i < this.columns.length; i += 1) {
        const column = this.columns[i];
        if (column.id === this.currentTask.column_id) {
          if (i === 0) {
            return true;
          }
        }
      }
      return false;
    },
    isLastColumn() {
      for (let i = 0; i < this.columns.length; i += 1) {
        const column = this.columns[i];
        if (column.id === this.currentTask.column_id) {
          if (i === this.columns.length - 1) {
            return true;
          }
        }
      }
      return false;
    },
    moveBack() {
      let newColumn = null;
      for (let i = 0; i < this.columns.length; i += 1) {
        const column = this.columns[i];
        if (column.id === this.currentTask.column_id) {
          newColumn = this.columns[i - 1];
          break;
        }
      }
      const task = { ...this.currentTask, column_id: newColumn.id };
      this.updateTask(task);
    },
    moveForward() {
      let newColumn = null;
      for (let i = 0; i < this.columns.length; i += 1) {
        const column = this.columns[i];
        if (column.id === this.currentTask.column_id) {
          newColumn = this.columns[i + 1];
          break;
        }
      }
      const task = { ...this.currentTask, column_id: newColumn.id };
      this.updateTask(task);
    },
    createTask() {
      if (!this.newTaskName) {
        this.$message({
          message: 'The task name is required.',
          type: 'error',
        });
        return;
      }
      const task = {
        column_id: this.columns[0].id,
        name: this.newTaskName,
      };
      this.$store.dispatch('board/createTask', task)
        .then(() => {
          this.newTaskName = '';
        })
        .catch((error) => {
          const { response } = error;
          if (response && response.data) {
            this.$message({
              message: response.data.Message,
              type: 'error',
            });
          }
        });
    },
    updateTask(task) {
      this.$store.dispatch('board/updateTask', task)
        .catch((error) => {
          const { response } = error;
          if (response && response.data) {
            this.$message({
              message: response.data.Message,
              type: 'error',
            });
          }
        });
    },
    deleteTask() {
      this.$store.dispatch('board/deleteTask', this.currentTask)
        .catch((error) => {
          const { response } = error;
          if (response && response.data) {
            this.$message({
              message: response.data.Message,
              type: 'error',
            });
          }
        });
    },
    logout() {
      this.$store.dispatch('user/logout')
        .then(() => {
          this.$router.push('/');
        })
        .catch((error) => {
          const { response } = error;
          if (response && response.data) {
            this.$message({
              message: response.data.Message,
              type: 'error',
            });
          }
        });
    },
  },
};
</script>
<style lang="scss" scoped>
  .controls {
    background: #eafcfd;
    padding: 10px;
  }
  .logout {
    position: absolute;
    top:0;
    right: 0;
    padding: 0 10px;
  }
  .controls h1 {
    font-size: 28px;
    text-align: center;
  }
  .controls .row .el-input {
    width: 200px;
    margin-right:10px;
  }
  .controls .row {
    display: flex;
    padding: 10px 0;
  }
</style>
