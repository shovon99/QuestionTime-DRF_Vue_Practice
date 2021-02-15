import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Question from "../views/Question.vue"
import QuestionEditor from "../views/QuestionEditor.vue"
import AnswerEditor from "../views/AnswerEditor.vue"
import NotFound from "../views/NotFound.vue"


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
  {
    path: "/question/:slug",
    name: "Question",
    component: Question,
    props: true
  },
  {
    path: "/ask/:slug?",
    name: "Question-Editor",
    component: QuestionEditor,
    props: true
  },
  {
    path: "/answer/:id",
    name: "Answer-Editor",
    component: AnswerEditor,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: "Page-Not-Found",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(),
  // history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
