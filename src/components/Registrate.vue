<template>
  <el-row>
    <el-col :span="8" :offset="8" class="sign-bg">
      <h3>用户注册</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repass">
          <el-input type="password" v-model="ruleForm.repass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-margin" type="primary" @click="submitForm('ruleForm')">注册</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    data () {
      let validateAccount = (rule, value, callback) => {
        this.$ajax.post('/list/user/findByName.do', this.ruleForm)
          .then((response) => {
            console.log(response.data.num)
            if (response.data.num === 1) {
              callback(new Error('用户名已存在'))
            } else if (response.data.num === 0) {
              callback(new Error('通过'))
            } else {
              callback(new Error('错误'))
            }
          })
      }
      let validatePass = (rule, value, callback) => {
        let regExp = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,10}$/
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (regExp.test(value) === false) {
          callback(new Error('5-10字母和数字组成，不能是纯数字或纯英文'))
        } else {
          if (this.ruleForm.repass !== '') {
            this.$refs.ruleForm.validateField('repass')
          }
          callback()
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        url: '/user/insert.do',
        ruleForm: {
          name: '',
          pass: '',
          repass: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
            { validator: validateAccount, trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入你的密码', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          repass: [
            { required: true, message: '请输入你的密码', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      //  提交按钮事件
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let _this = this
            this.$ajax.post(this.rootUrl + _this.url, _this.ruleForm)
              .then((response) => {
                this.$message.success('注册成功！')
                this.$refs[formName].resetFields()
                //  跳转到登录页
                this.$router.push({path: '/'})
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 重置按钮事件
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style scoped>
  .el-row {
    width: 1200px;
    margin: 15% auto 0;
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
  .btn-margin {
    margin: 0 30px 0 50px;
  }
</style>
