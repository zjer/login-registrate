<template>
  <el-row>
    <el-col :span="8" :offset="8" class="sign-bg">
      <h3>用户登陆</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-margin" type="primary" @click="submitForm('ruleForm')">登陆</el-button>
          <router-link :to="{ path: 'Registrate'}">
            <el-button>注册</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
        url: '/user/getByNameAndPass.do',
        ruleForm: {
          name: '',
          pass: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入你的用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入你的密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this
            this.$ajax.post(this.rootUrl + _this.url, _this.ruleForm)
              .then((response) => {
               console.log(response.data.num)
                if (response.data.num === 1) {
                  this.$message.success('登陆成功！')
                  //  跳转到登录成功页
                  this.$router.push({path: '/success'})
                } else if (response.data.num === 0) {
                  this.$message.success('用户名，密码错误！')
                } else {
                  this.$message.success('系统错误！')
                }
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style scoped>
  .sign-bg {
    background-color: rgba(255, 255, 255, 0.5);
  }
  h3 {
    text-align: center;
    font-weight: normal;
  }
  .el-input {
    width: 300px;
  }
  .btn-margin {
    margin: 0 30px 0 50px;
  }
</style>
