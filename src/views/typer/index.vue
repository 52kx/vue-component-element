<template>
  <vue-typer :text='tab'></vue-typer>
</template>

<script>
import { VueTyper } from 'vue-typer'
export default {
  components: { VueTyper },
  data () {
    return {
      // eslint-disable-next-line quotes
      tab: [`
        <pre>
          <code>
            rect: {
              background: #eaeaea;
            }
          </code>
        </pre>
      `]
    }
  }
}
</script>
<style>

</style>
