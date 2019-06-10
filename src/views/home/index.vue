<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前用户:{{ name }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "dashboard",
  computed: {
    ...mapGetters({
      name: "user/name"
    })
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 28px;
    line-height: 46px;

    span {
      margin-right: 15px;
    }
  }
}
</style>
