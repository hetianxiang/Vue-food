<template>
    <div>
      <m-header title="收藏美食"></m-header>
      <ul class="collect-list">
        <li v-for="col in collect">
          <img :src="col.foodCover" alt="">
          <div>
            <h3>{{col.foodName}}</h3>
            <button @click="cancel(col.id)">取消收藏</button>
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
    import {mapState,mapMutations} from 'vuex';
    import MHeader from 'components/MHeader';
    import * as Types from '../store/mutation-types'
    export default {
        data(){
            return {}
        },
        computed: {
          ...mapState(['collect'])
        },
        components: {MHeader},
        methods: {
          ...mapMutations([Types.REMOVE_COLLECT]),
            cancel(id){
              this[Types.REMOVE_COLLECT](id);
            }
        }
    }
</script>
<style scoped lang="less">
.collect-list{
  margin-bottom: 50px;
  li{
    display: flex;

    img{
      width: 100px;
      height: 90px;
      margin: 10px;
      box-shadow: 1px 2px 2px ;
    }
    div{
      h3{
        margin-bottom: 15px;
      }
      button{
        margin: 10px;
        border-radius: 5px;
      }
    }

    /*display: flex;*/
    flex-direction: row;
    border-bottom: 1px dashed #ccc;
    align-items: center;
  }
}
</style>
