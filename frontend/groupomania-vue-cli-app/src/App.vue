<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #fff;
    font-size: 20px;
    padding: 15px 15px 5px 15px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #FFD7D7;
      border-bottom: solid 4px #FD2D01;
    }
    &:hover {
      color: #FFD7D7;
      border-bottom: solid 4px #FD2D01;
    }
  }
}
</style>
