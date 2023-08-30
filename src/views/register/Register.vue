<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png" />
    <div class="wrapper__input">
      <input
        type="text"
        class="wrapper__input__content"
        placeholder="请输入用戶名"
        v-model="username"
      >
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="请输入密码"
        v-model="password"
      >
    </div>
    <div class="wrapper__input">
      <input
        type="password"
        class="wrapper__input__content"
        placeholder="确认密码"
        v-model="confirmPassword"
      >
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleLoginClick">已有帐号去登陆</div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 處理註冊相關邏輯
const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const inputData = reactive({ username: '', password: '', confirmPassword: '' })
  const handleRegister = async () => {
    try {
      const { username, password, confirmPassword } = inputData
      if (!username || !password || !confirmPassword) {
        return showToast('用戶名或密码有误')
      }
      if (password !== confirmPassword) {
        return showToast('确认密码有误')
      }
      const result = await post('/user/register', { username, password })
      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('注册失败')
      }
    } catch (error) {
      showToast('請求失敗')
    }
  }
  const { username, password, confirmPassword } = toRefs(inputData)
  return { username, password, confirmPassword, handleRegister }
}
// 處理登入頁面跳轉
const useLoginEffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Register',
  components: { Toast },
  setup () {
    const { show, toastMessage, showToast } = useToastEffect()
    const { username, password, confirmPassword, handleRegister } = useRegisterEffect(showToast)
    const { handleLoginClick } = useLoginEffect()
    return {
      username,
      password,
      confirmPassword,
      show,
      toastMessage,
      handleRegister,
      handleLoginClick
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variables.scss';
.wrapper {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto .4rem auto;
    width: .66rem;
    height: .66rem;
  }
  &__input {
    padding: 0 .16rem;
    margin: 0 .4rem .16rem .4rem;
    background: #F9F9F9;
    border: .01rem solid rgba(0, 0, 0, 0.1);
    border-radius: .06rem;
    &__content {
      line-height: .42rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: .16rem;
      color: $content-notice-fontColor;
      &::placeholder {
        color: $content-notice-fontColor;
      }
    }
  }
  &__register-button {
    margin: .32rem .4rem .16rem .4rem;
    line-height: .48rem;
    background: $btn-bgColor;
    box-shadow: 0 .04rem .08rem rgba(0, 145, 255, 0.32);
    border-radius: .04rem;
    color: $bgColor;
    font-size: .16rem;
    text-align: center;
  }
  &__register-link {
    text-align: center;
    font-size: .14rem;
    color: $content-notice-fontColor;
  }
}
</style>
