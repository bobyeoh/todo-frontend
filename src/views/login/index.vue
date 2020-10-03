<template>
  <div class="login">
    <div class="title">
      Login
    </div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="90px"
      @keyup.enter.native="login"
    >
      <el-form-item
        label="Name"
        prop="name"
      >
        <el-input
          v-model="form.name"
          class="input-with-select"
        />
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
      >
        <el-input
          v-model="form.password"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loginLoading"
          @click="login"
        >
          Submit
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      form: {
        name: '',
        password: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'The user name is required.',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: 'The password is required.', trigger: 'blur' },
        ],
      },
    };
  },
  computed: mapState({
    user: (state) => state.user.user,
    loginLoading: (state) => state.user.loginLoading,
  }),
  created() {
    if (this.user.id > 0) {
      this.$router.push('/board');
    }
  },
  methods: {
    login() {
      this.$refs.form.validate((valid) => {
        if (!this.loginLoading && valid) {
          this.$store.dispatch('user/login', this.form)
            .then(() => {
              this.$message({
                message: 'Login successful.',
                type: 'success',
              });
              this.$router.push('/board');
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
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
  .login {
    width:400px;
    margin: 20px auto
  }
  .login .title {
    font-size: 36px;
    margin-bottom: 10px;
    padding:20px 0;
    text-align: center;
  }
</style>
