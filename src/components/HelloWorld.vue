<template>
  <div id="app">
    <span class="msg-text">Choose a plan</span>

    <div style="margin-left: 250px; margin-top: 20px;">
      <button @click="" style="margin-left:20px" id="plan1">{{ plan1 }}</button>
      <button @click="" style="margin-left:50px" id="plan2">{{ plan2 }}</button>
    </div>

    <div style="display:grid; margin: 30px;">
      <div style="display:inline-block">
        <span id="text1-1"  class="function">{{ msgText1 }}</span>
        <span id="text1-2" style="margin-left: 180px;" class="error" >{{ msgText12 }}</span>
        <span id="text1-3" style="margin-left: 140px;" class="error">{{ msgText13 }}</span>
      </div>
      <div style="display:inline-block;margin-top: 20px">
        <span id="text2-1"   class="function">{{ msgText2 }}</span>
        <span id="text2-2" style="margin-left: 180px;" class="error">{{ msgText22 }}</span>
        <span id="text2-3" style="margin-left: 140px;" class="error">{{ msgText23 }}</span>
      </div>
      <div style="display:inline-block;margin-top: 20px">
        <span id="text3-1"   class="function">{{ msgText3 }}</span>
        <span id="text3-2" style="margin-left: 180px;" class="error">{{ msgText32 }}</span>
        <span id="text3-3" style="margin-left: 140px;" class="error">{{ msgText33 }}</span>
      </div>
    </div>

    <div style="margin-left: 260px;">
      <input type="radio" name="radios" value="1" v-model="param"><label>{{ btn1 }}</label>
      <input type="radio" name="radios" value="2" v-model="param" style="margin-left: 60px;"><label>{{ btn2 }}</label>
    </div>
  </div>
</template>

<script>
import request from '../util/request.js'

export default {
  // 监听路由，每次进入页面调用方法，放在method里
  mounted() {
    this.created()
  },
  methods: {
    created() {
      request({
        method: 'GET',
        url: '/api/getPlan',
      }).then(res => {
        const data = res.data.data;
        const plan = data.plan;
        const funcion = data.function;
        for (var i in plan) {
          var p = document.getElementById("plan" + (parseInt(i) + 1));
          p.innerHTML = plan[i].planName;
          this["btn" + (parseInt(i) + 1)] = "HK$" + plan[i].price + "/Month";

          var functionIds = plan[i].functionIds.split(",");
          for(var j in functionIds){
            var p = document.getElementById("text" + (functionIds[j]  + "-" + (parseInt(i) + 2)));
            p.className = "right";
          }
        }

        for (var i in funcion) {
          this["msgText" + (parseInt(i) + 1)] = funcion[i].functionName
        }
      })
    }
  },
  watch: {
    '$route': 'created'
  },
  data() {
    return {
      msgText1: "",
      msgText2: "",
      msgText3: "",
      btn1: "",
      btn2: "",
    }
  },

}
</script>


<style>
.msg-text {
  display: block;
  margin-left: 180px;
}

.function {
  display: inline-block;
  width:100px;
}

.right {
  width: 28px;
  height: 28px;
  line-height: 26px;
  position: relative;
  cursor: pointer;
}

.right::before {
  position: absolute;
  content: " ";
  width: 7px;
  height: 13px;
  transform: rotate(45deg);
  border-right: 2px solid rgb(0, 0, 0);
  border-bottom: 2px solid rgb(0, 0, 0);
  top: 4px;
  left: 9px;
}

.error {
  width: 28px;
  height: 28px;
  line-height: 26px;
  position: relative;
  cursor: pointer;
}

.error::before,
.error::after {
  content: "";
  position: absolute;
  height: 18px;
  width: 2px;
  top: 5px;
  left: 12px;
  background: rgb(1, 1, 1);
}
.error::before {
  transform: rotate(45deg);
}
.error::after {
  transform: rotate(-45deg);
}

</style>