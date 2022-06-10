<template>
  <el-button type="primary" class="HomeButton" @click="ButtonHome"
    >Back Home</el-button
  >

  <div id="BorderQA">
    <h1>Feed Back</h1>
    <h2>Please give us a FeedBack, that we can improve our website!</h2>
  </div>
  <br />
  <form id="FeedBackForm" v-bind:key="FeedBack">
    <div id="Feedback">
      <el-input
        v-model="FeedBack.text"
        maxlength="250"
        placeholder="Please write a FeedBack that we can improve our Website"
        show-word-limit
        type="textarea"
        class="FeedBackInput"
      />
      <template>
        <label for="FeedBack">{{ index + 1 }}</label></template
      >
    </div>
  </form>
  <el-button @click="AddFeedBack" class="FeedBackSend" type="success" plain>
    Send
  </el-button>
  <div v-bind:key="Feedback.id" v-for="Feedback in FeedBacks">
    <p id="FeedBack">
      {{ Feedback.text }}
    </p>
    {{ Feedback.up }}
    <el-icon @click="Like(Feedback)"><check /></el-icon>
    {{ Feedback.down }}
    <el-icon @click="Dislike(Feedback)"><close /></el-icon>
  </div>
</template>

<script>
import { CreateFeedBack, GetFeedBack } from '../services/taskService';
import { FeedBackToUpdate } from '../services/taskService';
import { ElNotification } from 'element-plus';
import { Check, Close } from '@element-plus/icons-vue';
export default {
  components: {
    Check,
    Close,
  },
  data() {
    return {
      FeedBack: {
        text: '',
        up: 0,
        down: 0,
      },
      FeedBacks: [],
    };
  },
  mounted() {
    GetFeedBack().then((data) => {
      this.FeedBacks = data;
    });
  },
  methods: {
    Like(FeedBack) {
      FeedBack.up++;
      FeedBackToUpdate(FeedBack, FeedBack.id);
    },
    Dislike(FeedBack) {
      FeedBack.down++;
      FeedBackToUpdate(FeedBack, FeedBack.id);
    },
    ButtonHome() {
      this.$router.push('/home');
    },
    async AddFeedBack(FeedBack) {
      if (this.FeedBacks.length <= 0) {
        FeedBack.id = 0;
      } else {
        const lastFeedBack = this.FeedBacks.at(-1);
        FeedBack.id = lastFeedBack.id + 1;
      }
      CreateFeedBack(this.FeedBack).then((res) => {
        this.FeedBacks.push(res);
        console.log(this.FeedBacks);
      });

      ElNotification({
        title: 'Thanks',
        message: 'We really appreciate that',
        duration: 2000,
      });
      GetFeedBack().then((data) => {
        this.FeedBacks = data;
      });
      this.FeedBack.text = '';
    },
  },
};
</script>

<style scoped>
h3 {
  border-bottom: solid 0.15rem;
  width: fit-content;
  margin: auto;
}
.HomeButton {
  margin-top: 1.5rem;
}

h1 {
  padding-top: 5rem;
}
.Question {
  padding-top: 3rem;
}
#QuestionsBorder {
  border: 3px solid;
  width: fit-content;
  margin: auto;
  padding: 10px;
  border-radius: 30px;
}
.FeedBackInput {
  max-width: 75%;
}
.FeedBackSend {
  margin: 1rem;
}
#FeedBack {
  border: #dfe2e8 0.05rem solid;
  line-height: 1.5;
  resize: horizontal;
  max-width: 50%;
  display: block;
  box-sizing: border-box;
  text-align: left;
  margin-left: 12%;
  padding-top: 0;
  padding-bottom: 1rem;
  padding-left: 2%;
  padding-right: 3%;
  border-radius: 5px;
  background-color: #ffffff;
  word-break: break-all;
}
.el-icon {
  max-width: 50%;
  padding: 0.15rem;
  transition: 0.5s;
}
.el-icon:active {
  transform: scale(0.8);
  transition: 0.5s;
}
.el-icon:hover {
  color: #409eff;
}
</style>
