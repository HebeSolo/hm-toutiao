<template>
    <div class="container">
        <el-card class="my-card">
            <img src="../../assets/images/logo_index.png" alt="">
            <el-form  ref="loginForm"  :model="loginForm" :rules="loginRules" status-icon>
                <el-form-item prop="mobile">
                    <el-input v-model="loginForm.mobile" placeholder="请输入手机号" ></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:236px; margin-right:10px;"></el-input>
                    <el-button>发送验证码</el-button>
                </el-form-item>
                <el-form-item>
                     <el-checkbox :value="true">已同意条款项</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login()"   style="width:100%">登录</el-button>
                </el-form-item>

            </el-form>
        </el-card>
    </div>
</template>

<script>
import store from '@/store'
export default {
  methods: {
    login () {
      // 对整个表单进行验证
      // 调用其他组件的函数
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          // this.$http
          //   .post('http://ttapi.research.itcast.cn/mp/v1_0/authorizations', this.loginForm)
          //   .then(res => {
          //     // 成功后 返回res.data 主体   保存 用户信息(token) 获取响应主体下data对象
          //     store.setUser(res.data.data)
          //     this.$router.push('/')
          //   })
          //   .catch(() => {
          //     this.$message.error('手机号或验证码错误')
          //   })
          // 使用 async await 发送请求
          try {
            const { data: { data } } = await this.$http.post('authorizations', this.loginForm)
            store.setUser(data)
            this.$router.push('/')
          } catch (e) {
            this.$message.error('手机号或验证码错误')
          }
        }
      })
    }
  },

  data () {
    // 定义校验函数 要在return数据之前
    const checkMobile = (rule, value, callback) => {
      // .test(value)用来测试一下是否符合规则
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return callback(new Error('手机号格式不对'))
      }
      callback()
    }
    return {
      loginForm: {
        checkMobile: '',
        mobile: '13578101231',
        code: '246810'
      },
      // 校验规则对象
      loginRules: {
        // 定义字段的校验规则
        mobile: [
          // required 是否是必填项
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位验证码', trigger: 'change' }

        ]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: url(../../assets/images/login_bg.jpg) no-repeat center / cover ;
    .my-card{
        width: 400px;
        height: 350px;
        position: relative
        ;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        img{
          display: block;
          width: 200px;
          margin: 0 auto 30px;
        }
    }
}
</style>
