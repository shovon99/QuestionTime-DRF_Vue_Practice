<template>
    <div class="container mt-5">
        <div class="not-found">
            <h1 id="notfoundheader">{{ message }}</h1>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotFound",
    data(){
        return{
            message: "404 - Page Not Found!"
        }
    }
}
</script>

<style scoped>
#notfoundheader{
    color: red;
    text-align: center;

}
.not-found{
    border: 1px solid gray;
}
</style>