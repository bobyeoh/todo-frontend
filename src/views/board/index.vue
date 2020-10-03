<template>
  <div class="board">
    <Controls />
    <div class="kanban">
      <h1>Kanban board</h1>
      <Columns
        :get-columns="getColumns"
        :get-tasks="getTasks"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Controls from './controls';
import Columns from './columns';

export default {
  name: 'Board',
  components: { Controls, Columns },
  data() {
    return {
      newTaskName: '',
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
    columns: (state) => state.board.columns,
  }),
  created() {
    if (this.user.id === 0) {
      this.$router.push('/');
    } else {
      this.getColumns();
    }
  },
  methods: {
    getColumns() {
      this.$store.dispatch('board/getColumns')
        .then(() => {
          this.columns.forEach((column) => {
            this.getTasks(column.id);
          });
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
    getTasks(columnID) {
      this.$store.dispatch('board/getTasks', columnID)
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
  .board {
    width: 100%;
  }
  .kanban {
    width: 100%;
  }
  .kanban h1 {
    font-size: 28px;
    text-align: center;
  }
</style>
