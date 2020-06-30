<template>
  <div>
    <vue-typer :text='tab'></vue-typer>
  </div>
</template>

<script>
import { VueTyper } from 'vue-typer'
export default {
  components: { VueTyper },
  data () {
    return {
      // eslint-disable-next-line quotes
      tab: ['hello', 'world', 'have a nice day']
    }
  }
}
</script>
<style>

</style>
