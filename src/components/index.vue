<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-full">
      <div class="field title is-4 git">
        GIT-DOT
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <input class="input is-half" type="email" placeholder="username" v-model="userName" v-on:keyup.enter="fetchUserData">
          <span class="icon is-small is-right" v-if="userName !=''" @click="fetchUserData">
          <i class="fas fa-search"></i>
          </span>
        </div>
      </div>
      <div v-if="profile.image !=null && profile.image !=''">
        <p>
          <img v-bind:src="profile.image" class="profile">
        </p>
        <p class="subtitle">{{profile.name}}</p>
        <br>
        <p class="title is-4">List of Repos</p>
      </div>
      <br>
      <article class="message is-info" v-for="item in userData"     :key="item.id">
        <div class="message-header">
          <p>{{item.name}}</p>
        </div>
        <div class="message-body">
          <p class="title is-5">Description</p>
          <p>
            {{item.description!=null ? item.description:"This repo doesn't have a description"}}
          </p>
          <br>
          <p>
            Last Updated at:
            <time>{{convertDate(item.updated_at)}}</time>
          </p>
          <br>
          <a class="button is-info" v-bind:href="item.html_url" target="_blank">
          <i class="fab fa-github"></i>
          <span> &nbsp;Source</span>
          </a>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      userName: '',
      userData: '',
      profile: {
        name: '',
        image: ''
      }
    }
  },
  methods: {
    fetchUserData () {
      let vm = this
      vm.axios.get('https://api.github.com/users/' + vm.userName + '/repos')
        .then(response => {
          vm.userData = response.data
          vm.profile.image = vm.userData[0].owner.avatar_url
          vm.profile.name = vm.userData[0].owner.login
        })
        .catch((e) => {
          swal({
            title: 'Oops!',
            text: 'Ooops!!! User not found',
            icon: 'error',
            button: 'Ok'
          }).then(() => {
            location.reload()
          })
        })
    },
    convertDate: date => moment(date).format('LLL')
  }
}
</script>
<style scoped>
  .icon{
  pointer-events: initial !important;
  cursor: pointer;
  }
  .fa-search{
  color:black;
  }
  .fa-search:hover{
  color: hsl(204, 86%, 53%);
  font-size: 18px;
  }
  .input{
  box-shadow: none;
  -moz-window-shadow: none;
  }
  .profile{
  border-radius: 50%;
  width: 98px;
  height: 98px;
  }
  .field{
  width: 40%;
  margin-left: 30%;
  }
  .git{
    color: white;
  }
</style>
