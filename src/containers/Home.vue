<template>
    <div>
      <m-header title="舌尖上的美食"></m-header>
      <!--如果一个组件过于庞大 会导致难以维护,轮播图组件 可能也会被复用-->
      <div v-if="sliders.length">
        <slider :data="sliders"></slider>
      </div>
      <!--不能直接渲染sider可以数据没过来 slider就渲染完毕了 ，导致轮播图不能使用-->
      <h3>最新发现美食:</h3>
      <ul class="hot">
        <li v-for="hot in hots">
          <img :src="hot.foodCover" alt="">
          <span>{{hot.foodName}}</span>
        </li>
      </ul>
      <loading v-if="isLoading"></loading>
    </div>
</template>
<script>
    import {getSliders,getHot} from 'api';
    import Slider from 'components/Slider';
    import Loading from 'components/Loading';
    import MHeader from 'components/MHeader'
    export default {
        data(){
            return {
                sliders:[],
                hots:[],
                isLoading:true
            }
        },
        created(){
          getSliders().then(res=>{
              this.sliders = res.data; //将获取的数据放到sliders数组中
          }).catch(err=>{
              console.log(err);
          });
          getHot().then(res=>{
              this.hots = res.data;
              this.isLoading = false;
              //数据加载完成隐藏loading
          })
        },
        computed: {},
        components: {Slider,Loading,MHeader},
        methods: {}
    }
</script>
<style scoped lang="less">
  h3{color:red;padding-left: 2%;margin: 10px 5px; font-weight: normal}
  .hot{
    display: flex;
    flex-wrap: wrap;
    li{
      text-align: center;
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 33.333%;
      img{
        width: 80%;
        height: 80px;
        box-shadow: 1px 1px 2px 1px;
        margin: 5px;
      }
    }
  }
</style>
