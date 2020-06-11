<template lang="pug">
  div( id="app" :class="$style.appInner")
    header
      router-link(to="/goods") goods
      router-link(to="/personal") personal
    div(v-if="loading" :class="$style.loading") loading....
    div(:class="$style.appContainer" v-html="content") content
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  @Prop(Boolean) loading!: boolean
  @Prop(String) content!: string
}
</script>

<style lang="stylus" module>
.appInner
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 30px
  display grid
  grid-template-rows 100px auto
  .loading
    position absolute
    width 100%
    height 100%
    background rgba(255,255,255,.5)
    top 0%
    left 0%
    padding-top 200px
    box-sizing border-box
  .appContainer
    width 100%
</style>
