<template>
  <div class="example">
    <h1>First Single File Component! Practice.</h1>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  name: "example",
  data(){
    return{
      message: "Hello World!"
    }
  }
}
</script>

<style scoped>
  h1 {
    color: red;
  }
</style>
