<template lang="pug">
  div( id="app" :class="$style.appInner")
    header
      button(@click="handleClick") 添加一条记录
      router-link(to="/goods") goods
      router-link(to="/personal") personal
    div(v-if="loading" :class="$style.loading") loading....
    div#appContainer(:class="$style.appContainer")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace, State } from 'vuex-class'

const user = namespace('user')

@Component
export default class App extends Vue {
  @State('loading') loading!:boolean

  @user.Mutation('SET_RECORD') setRecord!:(data:{record: string;fromType: 'MAIN_APPLICATION' | 'MICRO_APPLICATION';})=>void

  handleClick () {
    this.setRecord({
      record: 'commit test data',
      fromType: 'MAIN_APPLICATION'
    })
  }
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
    background rgba(255,255,255,.7)
    top 0%
    left 0%
    padding-top 200px
    box-sizing border-box
    font-size 100px
    font-weight bold
    z-index 999
  .appContainer
    width 100%
</style>
