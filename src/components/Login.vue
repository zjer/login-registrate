<template>
  <el-row>
    <el-col :span="8" :offset="8" class="sign-bg">
      <h3>用户登陆</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input type="text" v-model="ruleForm.code" auto-complete="off" class="code"></el-input>
          <img src="createImg.do" alt="验证码" title="点击切换验证码" @click="createImg()">
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
      let checkCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('验证码不正确!'))
        } else {
          callback()
        }
      }
      return {
        url: '/user/getByNameAndPass.do',
        ruleForm: {
          name: '',
          pass: '',
          code: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入你的密码', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
          code: [
            { required: true, message: '请输入右侧验证码', trigger: 'blur' },
            { min: 4, max: 4, message: '长度为 4 个字符', trigger: 'blur' },
            { validator: checkCode, trigger: 'blur' }
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
      },
      createImg() {
        this.setAttribute('src', 'createImg.do?x=' + Math.random())
      }
    }
  }
</script>

<style scoped>
  .el-row {
    width: 1200px;
    margin: 20% auto;
  }
  .sign-bg {
    background-color: rgba(255, 255, 255, 0.5);
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
  h3 {
    text-align: center;
    font-weight: normal;
    color: #ffffff;
  }
  .el-input {
    width: 300px;
  }
  .el-input.code {
    width: 80px;
  }
  .btn-margin {
    margin: 0 30px 0 50px;
  }
</style>
