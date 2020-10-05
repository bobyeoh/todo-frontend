<template>
  <div class="columns">
    <div class="container">
      <div
        v-if="columnsLoading"
        class="loading"
      >
        <i class="el-icon-loading" />
      </div>
      <div
        v-if="columnsError"
        class="error"
      >
        <Button @click="getColumns">
          Retry
        </Button>
      </div>
      <Column
        v-for="column in columns"
        :key="column.id"
        :column="column"
        :get-tasks="getTasks"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Column from './column';

export default {
  name: 'Columns',
  components: { Column },
  props: {
    getColumns: {
      type: Function,
      default: () => true,
    },
    getTasks: {
      type: Function,
      default: () => true,
    },
  },
  computed: mapState({
    user: (state) => state.user.user,
    columns: (state) => state.board.columns,
    columnsLoading: (state) => state.board.columnsLoading,
    columnsError: (state) => state.board.columnsError,
  }),
};
</script>
<style lang="scss" scoped>
  .columns {
    overflow: scroll;
    width: 100%;
  }
  .container {
    width:100%;
    display:flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
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
  .error {
    width:100%;
    height:300px;
    background:#eee;
    text-align:center;
    line-height: 300px;
  }
</style>
