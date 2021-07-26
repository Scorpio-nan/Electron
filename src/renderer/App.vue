<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "electron-webui-tool",
};
</script>

<style>
/* CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:Microsoft YaHei;
}
html,
body,
#app {
  height: 100%;
  width: 100%;
}
.container-header{
  padding-bottom:15px;
}
/*滚动条样式*/
::-webkit-scrollbar {
    width: 4px;    
    /*height: 4px;*/
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
}
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
    background: rgba(0,0,0,0.1);

}
</style>
