<template>
  <div
    :class="task.id === currentTask.id ? 'task_active' : 'task'"
    @click="setCurrentTask"
  >
    {{ task.name }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Task',
  props: {
    task: {
      type: Object,
      default: null,
    },
  },
  computed: mapState({
    currentTask: (state) => state.board.currentTask,
  }),
  methods: {
    setCurrentTask() {
      this.$store.dispatch('board/setCurrentTask', this.task);
    },
  },
};
</script>
<style lang="scss" scoped>
  .task {
    text-align: center;
    height: 30px;
    line-height: 30px;
    border:1px solid #ccc;
    margin-bottom: 10px;
    cursor: pointer;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .task_active {
    text-align: center;
    height: 30px;
    line-height: 30px;
    border:1px solid yellow;
    margin-bottom: 10px;
    cursor: pointer;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
</style>
