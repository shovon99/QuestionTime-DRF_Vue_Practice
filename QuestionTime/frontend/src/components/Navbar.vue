<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light my-nav">
    <div class="container">
      <router-link :to="{ name: 'Home' }" class="navbar-brand mynavbar-brand">
        QuestionTime
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active mx-1 mb-1">
            <router-link :to="{ name: 'Home' }" class="btn btn-sm btn-success">
              Home
            </router-link>
          </li>
          <li class="nav-item mx-1 mb-1">
            <router-link :to="{ name: 'About' }" class="btn btn-sm btn-success">
              About
            </router-link>
          </li>
          <li class="nav-item mx-1 mb-1">
            <a class="btn btn-sm btn-outline-danger" href="/accounts/logout/"
              >Log Out</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarComponent"
};
</script>

<style>
.my-nav {
  border-bottom: 1px solid rgb(190, 183, 183);
  margin-bottom: 10px;
}
.navbar-brand.mynavbar-brand {
  font-weight: bold;
  font-size: 130%;
}
.navbar-brand.mynavbar-brand:hover {
  color: red;
}
</style>
