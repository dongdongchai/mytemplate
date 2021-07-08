<template>
  <div>

    <div ref="basicBarChart" style="width:100%;height:350px">
    </div>
  </div>

</template>
<script>
// import { mapState } from 'vuex'
export default {
     

  data () {
    return {
    location:new Array(10001)

    }
  },
  mounted () {
    this.get()
    // this.$store.dispatch("test/initChartProto").then(() => {
    //   setTimeout(() => {
    //     this.renderBarChart()
    //   }, 1000);
    // })
     this.renderBarChart()
  },
  methods: {
    get(){
           for (var i = 0; i < 10001; i++){
         this.location[i]=i
        }
      console.log(this.location)
      this.$store.commit('test/setlocation',this.location)
    },

     renderBarChart () {
       const chart = this.$refs.basicBarChart
       const myChart = this.$echarts.init(chart)
      if (myChart) {
         myChart.setOption({
         backgroundColor: "#FFFFFF",
        title: {
          top: 20,
          text: "拉曼测温",
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#818183"
          },
          left: "1%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#57617B"
            }
          }
        },     
        toolbox:{
          show:true,
          feature:{
            dataZoom:{
              //yAxisIndex:"none"
              
            },
            dataView: {
        readOnly: false
         },
            restore:{},
             saveAsImage: {}
          }

        },

        // dataZoom:[
        //  { type:"inside"},
        //  {type: 'inside',
        //     orient: 'vertical',}
        // ],

      

        xAxis: [{
          type: "category",
         nameLocation:"end",
          boundaryGap: false,
        axisLabel:{interval:999}, 
          name: "位置",

         //  min:0,
         //  max:10000,
          axisLine: {
            lineStyle: {
              color: "#57617B"
            }
          },
        data: this.$store.state.test.Location
 
       
        }],
        yAxis: [{
          type: "value",
          minInterval: 1.0,
          name: "℃",
          min:0,
          max:5,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#57617B"
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: "#57617B"
            }
          }
        }],
        series:{
          type:'line',
          smooth:'false',
          symbol: "none",
          lineStyle: {
            normal: {
              width: 2
            }
          },
          data:this.objj

        }
       })
     }
     },
   
     

    //       tooltip: {
    //         trigger: 'item',
    //         formatter: '{a} <br/>{b} : {c} ({d}%)'
    //       },
    //       legend: {
    //         orient: 'vertical',
    //         left: 'left ',
    //         data: ['成功', '失败', '验证']
    //       },
    //       series: [
    //         {
    //           name: '测试',
    //           type: 'pie',
    //           radius: '55%',
    //           data: [
    //             { value: this.obj.success, name: '成功' },
    //             { value: this.obj.error, name: '失败' },
    //             { value: this.obj.pending, name: '验证' }
    //           ],
    //           emphasis: {
    //             itemStyle: {
    //               shadowBlur: 10,
    //               shadowOffsetX: 0,
    //               shadowColor: 'rgba(0, 0, 0, 0.5)'
    //             }
    //           }
    //         }
    //       ]
    //     })
    //     window.addEventListener('resize', function () {
    //       myChart.resize()
    //     })
    //   }
    //   this.$on('hook:destroyed', () => {
    //     window.removeEventListener('resize', function () {
    //       myChart.resize()
    //     })

  
  },
  computed: {
    objj () {
     // console.log(this.$store.state.test.obj)
      return this.$store.state.test.Temp
 
    }
  },
  watch: {
    
      objj:{
        handler(newval,oldval){
        if(this.$store.state.test.stop == 'false'){
        console.log('我准备调用renderBarChart函数了')
        this.renderBarChart()
        }else{
          return} 
      },
        deep:true
      }
    
  }
}
</script>

