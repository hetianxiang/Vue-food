<template>
    <div>
      <m-header title="美食列表"></m-header>
      <scroller :on-refresh="refresh" ref="scroller" class="top">
      <ul class="list">
        <li v-for="food in foods">
          <img v-lazy="food.foodCover" alt="">
          <div>
            <h3>{{food.foodName}}</h3>
            <p>{{food.content}}</p>
            <i class="iconfont icon-shoucang" @click="save(food)"></i>
            <p class="btn-list">
              <router-link :to="{path:'/update/'+food.id}" tag="button">修改</router-link>
              <button @click="remove(food.id)">删除</button>
            </p>
          </div>
        </li>
      </ul>
      </scroller>
    </div>
</template>
<script>
    import {mapMutations} from 'vuex';
    import MHeader from 'components/MHeader';
    import * as Types from '../store/mutation-types'
    import {getFood,removeFood} from 'api';
    export default {
        data(){
            return {foods:[]}
        },
        created(){
          this.getList();
        },
        computed: {},
        components: {MHeader},
        methods: {
            ...mapMutations([Types.ADD_COLLECT]),
            save(food){
              this[Types.ADD_COLLECT](food);
              this.$router.push('/collect');
            },
            remove(id){
              removeFood(id).then(res=>{
                  //前台删除成功 将此项在页面中移除掉
                this.foods = this.foods.filter(item=>item.id!=id);
              });
            },
            refresh(){
                //获取最新数据
              this.getList();
            },
            getList(){
              getFood().then(res=>{
                this.foods = res.data;//读取所有美食放到数组中
                //加载数据后 获取scroller 调用 finishPullToRefresh
                this.$refs.scroller.finishPullToRefresh();
              });
            }
        }
    }
</script>
<style scoped lang="less">
  .btn-list{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button{
      width: 60px;
    }
  }
.list{
  li{
    display: flex;
    border-bottom: 1px dashed #ccc;
    img{
      width: 100px;
      height: 90px;
      margin: 10px;
      box-shadow: 1px 1px 2px 1px;
    }
    div{
      h3{color: #333;margin: 5px;}
      display: flex;
      flex-direction: column;
      i{
        display: flex;
       justify-content: space-around;
      }
    }
  }
  img[lazy="loading"]{
    background: url("../assets/loading.gif") no-repeat center;
    background-size: 50%;
  }
  img[lazy="loaded"]{
    animation: fadeIn 0.5s;
  }
}
  @keyframes fadeIn {
    from{opacity: 0}
    to{opacity: 1}
  }
.top{margin-top:50px}
  .icon-shoucang{font-size: 22px;color: orangered}
</style>
