<template>
  <div class="Index">
    <el-container>
      <el-header>
        <div>便捷开发工具</div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="1-4-1" class="el-menu-vertical-demo">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">敏捷开发</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
            <el-menu-item index="3">
              <i class="el-icon-document"></i>
              <span slot="title">导航三</span>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title">导航四</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: "Index",
  };
</script>

<style lang="scss" scoped>
  .Index {
    height: 100%;
    display: flex;

    /deep/ .el-header {
      background: rgb(84, 92, 100);
      color: #fff;
      text-align: center;
      line-height: 60px;
    }
    /deep/ .el-aside{
      border-right: 1px solid #e6e6e6;
    }
    /deep/ .el-menu{
      border: none;
    }
  }
</style>