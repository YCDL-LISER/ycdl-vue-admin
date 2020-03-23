<template>
  <div class="basic-container">
    <el-card>
      <slot />
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BasicContainer'
}
</script>

<!--<style lang="scss" scoped>-->
  <!--.dashboard-editor-container {-->
    <!--padding: 32px;-->
    <!--background-color: rgb(240, 242, 245);-->
    <!--position: relative;-->

    <!--.github-corner {-->
      <!--position: absolute;-->
      <!--top: 0px;-->
      <!--border: 0;-->
      <!--right: 0;-->
    <!--}-->

    <!--.chart-wrapper {-->
      <!--background: #fff;-->
      <!--padding: 16px 16px 0;-->
      <!--margin-bottom: 32px;-->
    <!--}-->
  <!--}-->
<!--</style>-->

<style lang="scss">
  .basic-container {
    padding: 10px;
    border-radius: 10px;
    // box-sizing: border-box;

    .el-card {
      width: 100%;
    }

    /*&:first-child {*/
      /*padding-top: 0;*/
    /*}*/
  }
</style>
