<template>
    <div>
      <m-header title="修改美食信息"></m-header>
      <div class="add">
        <div class="group">
          <label for="foodName">美食名称</label>
          <input type="text" id="foodName" placeholder="请输入美食名称" v-model="food.foodName">
        </div>
        <div class="group">
          <label for="foodName">美食地址</label>
          <input type="text" id="foodCover" placeholder="请输入书美食封面" v-model="food.foodCover">
        </div>
        <div class="group">
          <label for="content">美食详情</label>
          <input type="text" id="content" placeholder="请输入美食详情" v-model="food.content">
        </div>
        <div class="group">
          <button @click="update">修改美食</button>
          <router-link to="/list" tag="button">返回</router-link>
        </div>
      </div>
    </div>
</template>
<script>
    import MHeader from 'components/MHeader';
    import {getOneFood,updateFood} from 'api';
    export default {
        data(){
            return {
                food:{
                    foodName:'',
                    foodCover:'',
                    content:''
                }
            }
        },
        created(){
            //id是当前路径的参数id
            this.getFood();
        },
        computed: {},
        components: {MHeader},
        methods: {
            getFood(){
              getOneFood(this.$route.params.id).then(res=>{
                this.food = res.data;//将数据挂载视图上
              });
            },
            update(){ //修改美食
              //1.告诉服务端 需要改哪个美食 美食的id /api/food?id=1  2.告诉更改的内容 food
              updateFood(this.$route.params.id,this.food).then(()=>{
                  this.$router.push('/list')
              });
            }
        },
        activated(){ //如果keep-alive执行 依然会调用activated方法
            this.getFood();
        }
        //钩子方法 beforeCreate() created beforeMount Mounted beforeUpdate update beforeDestroy destroyed beforeEach > beforeEnter > beforeRouteEnter

        //组件
    }
</script>
<style scoped lang="less">
  .add{
    padding: 100px 20px;
    display: flex;
    flex-direction: column;
    .group{
      label{
        font-size: 16px;
        line-height: 25px;
      }
      input{
        border: 1px solid #ccc;
        height: 30px;
      }
      margin-bottom: 15px;
      display: flex;
      flex-direction: column;
      button{
        height: 35px;
        margin-bottom: 10px;
        border-radius: 5px;
        background: lawngreen;
      }
    }
  }
</style>
