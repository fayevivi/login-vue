<template>
  <form>
    <label for="email">Email:</label>
    <input type="email" v-model="email" required />
    <label for="password">Password:</label>
    <input type="password" v-model="password" required />
    <button type="button" @click="login">Login</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const login = async () => {
      console.log('auth', auth)
      try {
        const user = await signInWithEmailAndPassword(auth, email.value, password.value)
        // 登入成功，轉到其他頁面
        console.log('user', user)
      } catch (error) {
        // 登入失敗，顯示錯誤訊息
        console.error(error.message)
      }
    }

    return { email, password, login }
  }
}
</script>
