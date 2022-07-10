<template>
 <div class="navbar navbar-dark bg-dark">
  <router-link to="/" class="navbar-brand">
    Forms
  </router-link>
  <div class="d-flex">
    <router-link to="/" class="btn btn-dark">Tasks</router-link>
  </div>
 </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'// @ is an alias to /src
export default defineComponent({
  name: 'NavBar',
  components: {
  }
})
</script>

<style>

</style>
