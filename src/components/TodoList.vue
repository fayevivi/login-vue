<template>
    <!--
Twitter: https://twitter.com/tjgillweb
Codepen: https://codepen.io/tjgill/
Github: https://github.com/tjgillweb/
-->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
        integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
<div class="todoList">
        <div class="cover-img">
            <div class="cover-inner">
                <!--<h3>Vacation</h3>-->
                <h3>{{ name }}'TODO</h3>
            </div>
        </div>
        <div class="content">
            <form class="add">
                <input type="text" name="add" placeholder="Add item..." v-model="todo">
                <button class="clickBtn" @click.prevent="addTodo()">click</button>
                <div class="input-buttons" @click.prevent="addTodo()">
                    <a href="" class="add-todo">
                        <i class="fas fa-plus add"></i>
                    </a>
                </div>
            </form>
            <div class="todoTotal">Total tasks: {{ todoList.length }}</div>
            <div class="todoTotal">Total completes: {{ completeTotal2 }}</div>
            <ul class="todos">
                <li v-for="(todo, index) in todoList" :key="index">
                    <input @click="completeTodo(index)" type="checkbox" :checked="todo.complete" id="todo_1" />
                    <label for="todo_1" :class="{'completeLine':todo.complete}" v-show="!todoList[index].isEdit">
                        <!--<span class="check"></span>-->
                        {{todo.title}}
                    </label>
                    <div>
                      <input 
                        type="text" 
                        v-show="todoList[index].isEdit" 
                        :value="todo.title"
                        @change="getChange(todo, $event)"
                        >
                      <button v-show="todoList[index].isEdit" @click="editTitle(todo)">confirm</button>
                    </div>
                    <i @click="deleteTodo(index)" class="far fa-trash-alt delete"></i>
                    <!--<i class="far fa-regular fa-pen-to-square"></i>why i can't add new icon from font-awsome-->
                    <p @click="editTodo(index)">edit</p>
                </li>
            </ul>
        </div>

    </div>

<!--<div class="social">
  <ul>
			<li>
				<a href="https://twitter.com/tjgillweb" target="_blank">
					<i class="fab fa-twitter"></i>
				</a>
			</li>
			<li>
				<a href="https://github.com/tjgillweb/" target="_blank">
					<i class="fab fa-github"></i>
				</a>
			</li>
			<li>
				<a href="https://www.linkedin.com/in/taranjot-gill-2704552a/" target="_blank">
					<i class="fab fa-linkedin"></i>
				</a>
			</li>
		</ul>
</div>-->
</template>

<script setup>
import { ref, computed } from "vue";

const name = ref('vv');
const todo = ref('');
const todoList = ref([]);
let getChangeTitle = ""


defineProps({
    name2: 'vv',
    test:'test'
})

function addTodo(){
    todoList.value.unshift({
        title: todo.value,
        complete: false,
        isEdit: false,
    })
    todo.value = "",
    console.log('todoList', todoList)
}


const completeTodo = (index) => {
    console.log('complete', todoList.value[index].complete)
    todoList.value[index].complete = !todoList.value[index].complete;

    console.log('completenew', todoList.value[index].complete)
}

//show edit input
const editTodo = (index) => {
  console.log('isEdit1', todoList.value[index].isEdit)
  todoList.value[index].isEdit = true;
  console.log('isEdit2', todoList.value[index].isEdit)

}

const editTitle = (todo) => {
  todo.isEdit = false;
  todo.title = getChangeTitle
  console.log('todo222222======', todo)
  console.log('todoList======', todoList)
}

const getChange = function(todo, e){
  getChangeTitle = e.target.value;
}

const handleBlur = (todo, e) => {
  // 若要使用handleBlur，則在input上改寫成＠blur=handleBlur(todo, $event)；離開input匡時會觸發
  console.log('todoparam', todo)
  todo.isEdit = false;
  console.log('todoList', todoList)
  console.log('todo', todo)
  todo.title = e.target.value
  console.log('todo222222', todo)
  console.log('todoList', todoList)
  console.log('e.target.value', e.target.value)
}


const completeTotal = computed(() => {
    return todoList.value.filter(todo => todo.complete).length;
});

const completeTotal2 = computed(function(){
    return todoList.value.filter( function(todo){ return todo.complete }).length;
})

const deleteTodo = (index) => {
  console.log('jjjj')
    todoList.value.splice(index, 1)
}

// watch:{
//   getChangeTitle()
// }


</script>

<style  lang="scss">
@import url('https://fonts.googleapis.com/css?family=Nunito:600,700&display=swap');

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  min-height: 450px;
  height: 100vh;
  margin: 0;
  background: radial-gradient(ellipse farthest-corner at center top, #f39264 0%, #f2606f 100%);
  color: #fff;
  font-family: 'Nunito', sans-serif;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

/*-------------------- ToDo List -------------------*/
.todoList {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 320px;
  height: 500px;
  background: #fff;
}

/** Header Image **/
.cover-img {

  .cover-inner {
    background: url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1533&q=80');
    height: 190px;
    background-size: cover;
    background-position: 10% 20%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;

    &::after {
      background: rgba(0, 0, 0, 0.3);
      content: "";
      top: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    h3 {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Nunito', sans-serif;
      text-transform: uppercase;
      font-size: 2.8rem;
      z-index: 10;
      font-weight: 700;
    }
  }
}

/* Main Content */
.content {
  padding: 10px 20px;

  form {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 0 10px 0 5px;
    border-bottom: 1px solid #8e979c;
  }

  form>* {
    background: transparent;
    border: none;
    height: 35px;
  }

  input[type=text] {
    //flex-basis: 80%;
    //padding: 0 5px;
    font-weight: 700;
    font-size: 1.2rem;
    color: #6C717B;
  }
  .clickBtn{
    color: #f2606f !important;
  }

  .input-buttons {
    // border-bottom: 1px solid #8e979c;
    // flex-basis: 20%;
    // text-align: center;
    // padding: 0px 0 0 10px;
  }

  .input-buttons a {
    text-decoration: none;
  }

  .input-buttons i {
    margin-top: 5px;
    font-size: 20px;
    color: #8e979c;
  }

  ul.todos {
    margin-left: 0;
    padding: 0;
    list-style: none;
    height: 220px;
    overflow: auto;
  }

  li {
    user-select: none;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  li i {
    color: #6C717B;
    font-size: 15px;
    cursor: pointer;
    padding: 5px 10px;
  }
  .completeLine{
    text-decoration-line: line-through;
  }

//   input[type=checkbox] {
//     display: none
//   }

  input[type=checkbox]+label {
    color: #6C717B;
    font-size: 15px;
    cursor: pointer;
    position: relative;
    border-radius: 3px;
    display: inline-block;
    padding: 5px 5px 5px 30px;
  }

  input[type=checkbox]+label:hover {
    color: #353A42;
    background-color: #F4F7FA;
  }

//   input[type=checkbox]+label span.check {
//     left: 4px;
//     top: 50%;
//     position: absolute;
//     transform: translateY(-50%);
//     width: 18px;
//     height: 18px;
//     display: block;
//     background: white;
//     border-radius: 3px;
//     border: 1px solid #b8bfcc;
//     box-shadow: 0 2px 3px #F0F4F8;
//   }

//   input[type=checkbox]:checked+label {
//     color: #AEB7C6;
//     text-decoration: line-through;
//   }

//   input[type=checkbox]:checked+label span.check {
//     background-color: transparent;
//     border-color: transparent;
//     box-shadow: none;
//   }

//   input[type=checkbox]+label span.check::after {
//     width: 100%;
//     height: 100%;
//     content: '';
//     display: block;
//     position: absolute;
//     background-image: url('https://tjgillweb.github.io/Vacation-Todo-App/images/tick.svg');
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: 16px 16px;
//     transform: scale(0);
//     transition: transform 300ms cubic-bezier(0.3, 0, 0, 1.5);
//   }

//   input[type=checkbox]:checked+label span.check::after {
//     transform: scale(1);
//   }

//   input[type=checkbox]+label span.check::before {
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     display: block;
//     content: '';
//     position: absolute;
//     border-radius: 50%;
//     background: #8798AA;

//     opacity: .8;
//     transform: scale(0);
//   }

//   input[type=checkbox]:checked+label span.check::before {
//     opacity: 0;
//     transform: scale(1.3);
//     transition: opacity 300ms cubic-bezier(0.2, 0, 0, 1), transform 400ms cubic-bezier(0.3, 0, 0, 1.4);
//   }
}

/** Social Icons **/
@media(max-width: 767px){
  .social{
    display: none;
  }
}
@media(min-width: 767px){
.social{
  position: absolute;
  right: 0;
  top: 33.33%;
}
.social ul {
	display: flex;
  flex-direction: column;
	list-style: none;
	padding: 0;
	margin: 0;
}

.social ul li {
	margin: 5px 10px;
}

.social ul li a {
	color: #403f4c;
	font-size: 25px;
	height: 50px;
	width: 50px;
	text-decoration: none;
}

.social ul li a:hover {
	color: #272523;
}
}

</style>