<template>
<div>
  <my-add></my-add>
</div>

</template>
<script>
import add from './components/line1'

export default {
  data () {
    return {
 
    error:new Array(10000)
   
    }
  },
  mounted () {
    
    this.getTest()
  },
//   beforeDestroy () {
//     this.$store.commit('count/setObj', { success: 0, error: 0, pending: 0 })
//   },
  methods: {
    
    getTest (){

      setInterval(() => {
          this.error.fill(0)
          this.error.fill(Math.ceil(Math.random() * 6),Math.ceil(Math.random() * 10000),10000)
          this.$store.commit('test/setobj',this.error)

          console.log(this.$store.state.test.obj.error)
       // this.$store.commit('test/setobj', { success: Math.ceil(Math.random() * 100), error: Math.ceil(Math.random() * 100), pending: Math.ceil(Math.random() * 100) })
      },1000)
    }
  },
  components: {
    'my-add': add
  }
}
</script>

