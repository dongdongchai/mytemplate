
<template>
	<div class="baidumap" id="allmap"></div>
</template>
<script>
export default {
    name: 'pm-distribution',
     
    components: {
      
    },
    data:{
     pointList:{
         name:"",
         lat:"",
         lot:""
     }
      
    },
    mounted() {
     
        this.baiduMap()
       //  this.starttt()
    }, 
    methods: {
      
        baiduMap() {

　　　　　　　 this.map = new BMap.Map("allmap"); // 创建地图实例
     　//　let point = new BMap.Point(119.043485,32.180122);
      　　　let point = new BMap.Point(112.528506,37.866671); // 创建点坐标
      　　　　this.map.centerAndZoom(point, 16); // 初始化地图，设置中心点坐标和地图级别
      　　　　this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
 



      　　　　this.map.addControl(new BMap.NavigationControl());
      　　　　this.map.addControl(new BMap.ScaleControl());
      　　　　this.map.addControl(new BMap.OverviewMapControl());
      　　　　this.map.addControl(new BMap.MapTypeControl());
      　　　　//map.setMapStyle({ style: 'midnight' }) //地图风格

          

     var polyline = new BMap.Polyline([
		new BMap.Point(112.525576,37.86407),
		new BMap.Point(112.532048,37.864245),
		new BMap.Point(112.531594,37.869928),
        new BMap.Point(112.53287,37.869956),
        new BMap.Point(112.532834,37.87064),
        new BMap.Point(112.529834,37.871452),
        new BMap.Point(112.528666,37.870911),  
        new BMap.Point(112.528468,37.870184),
        new BMap.Point(112.527732,37.87007),
        new BMap.Point(112.527444,37.868632),
        new BMap.Point(112.525378,37.86876),
        new BMap.Point(112.525576,37.86407)
	], {strokeColor:"red", strokeWeight:3, strokeOpacity:0.5});   //创建折线
   this.map.addOverlay(polyline);//添加折线




//       　　　　let pointList = [
//         　　　　{
//           　　　　name: "北京",
//           　　　　id: 2,
//           　　　　info: "提示信息2",
//           　　　　lat: "116.331398",
//           　　　　lot: "39.897445",
//         　　　　},
//         　　　　{
//           　　　　name: "太原理工大学",
//           　　　　id: 1,
//           　　　　info: "提示信息1",
//           　　　　lat: "112.528506",
//           　　　　lot: "37.866671",
//         　　　　},

//       　　　　];

      

//       　　　　for (let i = 0; i < pointList.length; i++) {
//         　　　　let point = new BMap.Point(pointList[i].lat, pointList[i].lot);
//         　　　　let marker = new window.BMap.Marker(point); // 创建标注
//         　　　　this.map.addOverlay(marker); // 将标注添加到地图中



//         　　　　//提示信息  可以解析 HTML标签以及CSS
//         　　　　let infoWindow = new BMap.InfoWindow(`<p style='text-align:left;font-weight:800'>标题:${pointList[i].name}</p>
//         　　　　　　<p style='text-align:left;font-weight:0'>信息:${pointList[i].info}</p>`);
//         　　　　// 鼠标移上标注点要发生的事
//         　　　　marker.addEventListener("mouseover", function () {
//           　　　　this.openInfoWindow(infoWindow);
//         　　　　});



//         　　　　// 鼠标移开标注点要发生的事
//         　　　　marker.addEventListener("mouseout", function () {
//           　　　　this.closeInfoWindow(infoWindow);
//         　　　　});
// 　　　　　　　　　// 鼠标点击标注点要发生的事情
//         　　　　marker.addEventListener("click", function () {
//           　　　　alert("点击");
//         　　　　});
//       　　　　};
    },




  starttt() {
    
     this.map.clearOverlays()
     
//      var fly= new Image()
//      fly.src="https://imgtu.com/i/RbJQlF"
    
//      let icon1 = new BMap.Icon(fly, new BMap.Size(20, 60), {

//   anchor: new BMap.Size(20, 36),
 
//   imageOffset: new BMap.Size(0, 0)
// })


       var polyline = new BMap.Polyline([
		new BMap.Point(112.525576,37.86407),
		new BMap.Point(112.532048,37.864245),
		new BMap.Point(112.531594,37.869928),
        new BMap.Point(112.53287,37.869956),
        new BMap.Point(112.532834,37.87064),
        new BMap.Point(112.529834,37.871452),
        new BMap.Point(112.528666,37.870911),  
        new BMap.Point(112.528468,37.870184),
       new BMap.Point(112.527732,37.87007),
       new BMap.Point(112.527444,37.868632),
       new BMap.Point(112.525378,37.86876),
        new BMap.Point(112.525576,37.86407)
	], {strokeColor:"red", strokeWeight:3, strokeOpacity:0.5});   //创建折线
   this.map.addOverlay(polyline);//添加折线

  var len =this.map.getOverlays().length
   console.log(len)
       
         if(this.obj1==1){
                             this.pointList ={name:"1000米处报警",
                                       lat: "112.528917",
          　　　　                      lot: "37.864198"}
         }else if(this.obj1==2){
                            　this.pointList ={name:"2000米处报警",
                                       lat: "112.532079",
          　　　　                      lot: "37.867688"}
         }else if(this.obj1==3){
                              this.pointList ={name:"3000米处报警",
                                       lat: "112.531449",
          　　　　                      lot: "37.871063"}
         }else if(this.obj1==4){
                            　this.pointList ={name:"4000米处报警",
                                       lat: "112.527498",
          　　　　                      lot: "37.868671"}
         }else if(this.obj1==5){
                              this.pointList ={name:"5000米处报警",
                                       lat: "112.52554",
          　　　　                      lot: "37.866406"}
           }



           console.log(this.pointList)

      　　　//　for (let i = 0; i < pointList.length; i++) {
        　　　　let point = new BMap.Point(this.pointList.lat, this.pointList.lot);
        　　　　let marker = new window.BMap.Marker(point); // 创建标注
        　　　　this.map.addOverlay(marker); // 将标注添加到地图中
　let infoWindow = new BMap.InfoWindow(`<p style='text-align:left;font-weight:800'>警告:${this.pointList.name}</p>`);


        　　　　//提示信息  可以解析 HTML标签以及CSS
        　　　//　let infoWindow = new BMap.InfoWindow(`<p style='text-align:left;font-weight:800'>标题:${pointList[i].name}</p>
        　　　//　　　<p style='text-align:left;font-weight:0'>信息:${pointList[i].info}</p>`);
        　　　　// 鼠标移上标注点要发生的事
        　　　　marker.addEventListener("mouseover", function () {
          　　　　this.openInfoWindow(infoWindow);
        　　　　});



        　　　　// 鼠标移开标注点要发生的事
        　　　　marker.addEventListener("mouseout", function () {
          　　　　this.closeInfoWindow(infoWindow);
        　　　　});
　　　　　　　　　// 鼠标点击标注点要发生的事情
        　　　　marker.addEventListener("click", function () {
          　　　　alert("警告:");
        　　　　});
      　　　//　};
       
     
   },
  
},
computed:{
     obj1(){
        
   return this.$store.state.test.map
   
   }
},
watch:{
          obj1:{
        handler(newval,oldval){
        console.log('我准备调用start函数了')
        this.starttt()
      
        },
        deep:true
      }
}
}
</script>

<style>
.baidumap {
    /* width: 100%;
    height: 100%; */
    width: 1300px;
    height: 650px;
    border: 1px solid red;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
}

/* 去除百度地图版权那行字 和 百度logo */
.baidumap > .BMap_cpyCtrl {
    display: none !important;
}
.baidumap > .anchorBL {
    display: none !important;
}
</style>