<template>
  <el-container>
    <div class="MainHeader">
      <el-header>
        <div class="navBar">
          <el-button
            type="danger"
            plain
            :icon="Delete"
            id="delete"
            @click="deleteTask()"
            >Delete</el-button
          >

          <div class="HideButton">
            <el-button
              type="primary"
              plain
              :icon="View"
              id="Hide"
              @click="HideDoneTask"
            >
              {{ ShowOrHideButtonTitle }}
            </el-button>
          </div>

          <label for="drop"></label>
          <el-select
            name="drop"
            id="drop"
            v-model="DropDownOptions"
            @change="NavDropDown()"
          >
            <el-option value="/home/Q%A">FeedBack</el-option>
            <el-option value="/home/Info">Info</el-option>
            <el-option value="/home/Settings" :icon="Setting"
              >Settings</el-option
            >
            <el-option value="/">Sign Out</el-option>
          </el-select>
        </div>
      </el-header>
    </div>
    <el-main>
      <div id="TaskFormContainer">
        <h1>Hello {{ username }}</h1>
        <form id="TaskForm" v-bind:key="task" v-for="(task, index) in tasks">
          <div v-show="ShouldHideTask(task)" class="TaskInputs">
            <div class="Input-Label">
              <el-input
                @change="ChangeTask(task)"
                v-bind:class="{ checked: task.checked }"
                v-model="task.title"
                class="task"
                type="text"
                placeholder="Add your Task here..."
              >
                <template #prepend
                  ><label for="task">{{ index + 1 }} Task </label></template
                >
              </el-input>
            </div>

            <div class="CheckBox-Label">
              <el-checkbox
                size="medium"
                @change="ChangeTask(task)"
                v-model="task.checked"
                class="check"
                type="checkbox"
              >
              </el-checkbox>
            </div>
          </div>
        </form>
      </div>

      <div>
        <div>
          <el-button
            type="success"
            plain
            id="AddButtonClass"
            @click="addTask(task)"
            >Add</el-button
          >
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {
  UpdateTask,
  GetTask,
  DeleteCheckedTask,
  CreateTask,
  GetOneUserNameToDisplay,
} from '../services/taskService';
import { Delete, Setting, View } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { reactive } from '@vue/reactivity';
//import axios from 'axios';
export default {
  name: 'HomePage',
  props: {
    msg: String,
  },
  data() {
    return {
      shouldShowTitle: true,
      DoneToDoHidden: false,
      ShowOrHideButtonTitle: 'Hide',
      username: 'Unknown',
      task: {
        title: '',
        checked: false,
      },
      tasks: reactive([]),
      Delete,
      Setting,
      View,
    };
  },
  mounted() {
    GetTask().then((data) => {
      this.tasks = data;
    });
    GetOneUserNameToDisplay().then((data) => {
      this.username = data.name;
    });
  },
  methods: {
    addTask(task) {
      if (this.tasks.length <= 0) {
        task.id = 0;
      } else {
        const lastTask = this.tasks.at(-1);
        task.id = lastTask.id + 1;
      }
      CreateTask(task).then(() => {
        ElNotification({
          title: 'To-Do Added!',
          message: "You've successfully added a To-Do",
          duration: 2000,
        });
      });
      GetTask().then((data) => {
        this.tasks = data;
      });
    },
    deleteTask() {
      const ItemsToDelete = this.tasks.filter((task) => task.checked);
      DeleteCheckedTask(ItemsToDelete);
      GetTask().then((data) => {
        this.tasks = data;
      });
    },
    NavDropDown() {
      if (this.DropDownOptions === '/') {
        sessionStorage.removeItem('BooleanSafeURL');
        sessionStorage.removeItem('userId');
      }
      this.$router.push(this.DropDownOptions);
    },
    HideDoneTask() {
      if (this.DoneToDoHidden === true) {
        this.DoneToDoHidden = false;
        this.ShowOrHideButtonTitle = 'Hide';
      } else if (this.DoneToDoHidden === false) {
        this.ShowOrHideButtonTitle = 'Show';
        this.DoneToDoHidden = true;
      }
    },
    ShouldHideTask(Task) {
      if (Task.checked === true && this.DoneToDoHidden === true) {
        return false;
      }
      return true;

      //return !(Task.checked === true && this.DoneToDoHidden === true)
    },
    ChangeTask(TaskValue) {
      UpdateTask(TaskValue).then(() => {
        GetTask().then((data) => {
          this.tasks = data;
        });
      });
    },
  },
};
</script>

<style scoped>
body {
  margin: 0px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

a {
  color: #42b983;
}

.task {
  background: whitesmoke;
  height: 0.1rem;
}

.checked {
  text-decoration: line-through;
}

#delete {
  width: 50%;
  max-width: 100px;
  top: 1.5em;
  right: 3em;
  position: absolute;
  transition: 0.3s;
  /*
  background: #DD1122;
  border: black 0.2em solid;
  height: 2rem;
   */
}

#delete:active {
  transform: scale(0.75);
}
#Hide {
  width: 50%;
  max-width: 100px;
  top: 1.5rem;
  right: 12rem;
  position: absolute;
  transition: 0.3s;
}
#Hide:active {
  transform: scale(0.75);
}
.el-select {
  position: absolute;
  top: 1.5em;
  left: 3em;
  max-width: 90px;
}

#TaskForm {
  align-self: center;
  transition-duration: 0.5s;
  margin-bottom: 1rem;
}

#TaskForm:hover {
  transform: scale(1.05);
}

#TaskFormContainer {
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
}

#AddButtonClass {
  height: 2rem;
  margin: 0.75rem;
  transition: 0.3s;
}

#AddButtonClass:active {
  transform: scale(0.75);
}
.Input-Label {
  display: inline-block;
}
.CheckBox-Label {
  display: inline-block;
  margin-left: 0.5rem;
}
header.el-header {
  border-bottom: solid 0.1rem rgb(131, 131, 131);
  height: 86px;
  position: fixed;
  width: 100%;
  z-index: 2;
  backdrop-filter: blur(10px);
  background-position-y: -1;
}

main {
  margin-top: 4rem;
}
</style>
