<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-full">
      <div class="field title is-4 git">
        GIT-DOT
      </div>
      <div class="field">
        <div class="control has-icons-right">
          <input class="input is-half" type="email" placeholder="Github username" v-model="userName" v-on:keyup.enter="fetchUserData">
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
      <article class="message is-info" v-for="(item, index) in userData"        :key="index">
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
            <time>{{convertDate(item.updated_at)|ago}}</time>
          </p>
          <br>
          <a class="button is-info" v-bind:href="item.html_url" target="_blank">
          <i class="fab fa-github"></i>
          <span> &nbsp;Source</span>
          </a>
          <p >{{lang[index] !=null ? lang[index]:"No languages found"}}</p>
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
      repoLanguage: [],
      lang: [],
      profile: {
        name: '',
        image: ''
      }
    }
  },
  filters: {
    // eslint-disable-next-line
    ago: date => moment(date).fromNow()
  },
  methods: {
    fetchUserData () {
      let vm = this
      vm.axios.get('https://api.github.com/users/' + vm.userName + '/repos')
        .then(response => {
          vm.userData = response.data
          vm.profile.image = vm.userData[0].owner.avatar_url
          vm.profile.name = vm.userData[0].owner.login
          vm.getLang()
        })
        .catch((e) => {
          // eslint-disable-next-line
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
    getLang () {
      let vm = this
      vm.userData.forEach(repo => {
        vm.axios.get('https://api.github.com/repos/' + vm.userName + '/' + repo.name + '/languages').then((languages) => {
          vm.repoLanguage.push(Object.keys(languages.data))
          let fullLanguage = ''
          vm.repoLanguage.forEach(lang => {
            lang.forEach(l => {
              fullLanguage = fullLanguage + l + ', '
            })
            
            vm.lang.push(fullLanguage)
            fullLanguage = ''
          })
        }).catch((error) => {
          swal({
            title: 'Oops!',
            text: error,
            icon: 'error',
            button: 'Ok'
          }).then(() => {
            location.reload()
          })
        })
      })
    },
    // eslint-disable-next-line
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
