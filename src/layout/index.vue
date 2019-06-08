<template>
  <div :class="classObj" class="app-wrapper">
		<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<sidebar class="sidebar-container" />
		<router-view />
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { Sidebar } from './components'

export default {
	name: 'Layout',
  components: {
    Sidebar,
  },
	computed: {
    ...mapState({
			sidebar: state => state.app.sidebar,
			device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.needTagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
				withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
	},
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>


<style lang="scss" scoped>
@import "./index.scss";
</style>