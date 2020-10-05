<template>
  <div class="column">
    <h2>{{ column.name }}</h2>
    <div
      v-if="column.loading"
      class="loading"
    >
      <i class="el-icon-loading" />
    </div>
    <div
      v-if="column.error"
      class="error"
    >
      <Button @click="getTasks(column.id)">
        Retry
      </Button>
    </div>
    <Task
      v-for="task in column.tasks"
      :key="task.id"
      :task="task"
    />
  </div>
</template>

<script>
import Task from './task';

export default {
  name: 'Column',
  components: { Task },
  props: {
    column: {
      type: Object,
      default: null,
    },
    getTasks: {
      type: Function,
      default: () => true,
    },
  },
  created() {
    console.log(this.column);
  },
};
</script>
<style lang="scss" scoped>
  .column {
    width: 300px;
    background:#eee;
    padding: 0 20px;
    margin-right: 20px;
    flex-shrink: 0;
  }
  .loading {
    width:100%;
    height:300px;
    background:#eee;
    text-align:center;
    line-height: 300px;
  }
  .loading i {
    font-size: 50px;
  }
</style>
