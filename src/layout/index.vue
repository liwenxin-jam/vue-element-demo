<template>
  <div :class="classObj" class="app-wrapper">
		<div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
		<sidebar class="sidebar-container" />
		<div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
      <!-- <c-right-panel v-if="showSettings">
        <settings />
      </c-right-panel> -->
    </div>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components';
import ResizeMixin from './mixin/ResizeHandler';

export default {
	name: 'Layout',
	mixins: [ResizeMixin],
  components: {
		AppMain,
		Navbar,
		Settings,
    Sidebar,
    TagsView
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