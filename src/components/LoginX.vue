<template>
  <section class="w-full gradient-custom">
    <div class="container py-3 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem;">
            <div class="card-body p-5 text-center">

              <div class="mb-md-5 mt-md-4 pb-5">

                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">Please enter your username and password!</p>

                <div class="form-outline form-white mb-4">
                  <input v-model="username" id="typeEmailX" class="form-control form-control-lg" />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input v-model="password" type="password" id="typePasswordX" class="form-control form-control-lg" />
                  <label class="form-label" for="typePasswordX">Password</label>
                </div>
                <button class="btn btn-outline-light btn-lg px-5" @click="login">Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import router from '@/router'; // assuming you have a router file
export default {
  name: "LoginX",
  data() {
    return {
      username: '',
      password: '',
      loginError: '',
    };
  },
  methods: {
    async login() {
      const url = 'http://localhost:5287/PorxyServer';
      const data = {
        act: {
          A: 'LoginX',
          P: `${this.username};${this.password}`,
        },
      };

      try {
        // Gửi request đăng nhập và lấy cookie từ hàm trung gian LoginRequest trong dự án .NET
        const response = await axios.get(url + '/loginRequest', {
          params: {
            jsonString: JSON.stringify(data),
          },
        });

        if (response.status === 200 && response.data.SResult.C == 0) {
          console.log('Đăng nhập thành công');
          console.log(response.data);

          // Lấy cookie từ response data
          const cookieValue = response.data.cookie;

          // Lưu cookie vào local storage
          localStorage.setItem('login-Cookie', cookieValue);
          router.push('/chart');
        } else {
          console.error('Yêu cầu không thành công. Mã trạng thái:', response.status);
        }
      } catch (error) {
        console.error('Yêu cầu không thành công:', error);
      }
    }
  },
};
</script>
<style>
.gradient-custom {
  /* fallback for old browsers */
  background: #6a11cb;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
}
</style>