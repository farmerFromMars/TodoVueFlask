import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { Item, State } from '@/store/store.interface';
import AxiosService from '@/service/axios.service';
import { axiosConfig } from '@/service/util.service';
import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
Vue.use(Vuex);

const store: StoreOptions<State> = {
  state: {
    todoList: [],
  },
  mutations: {
    addItem(state, item: Item) {
      state.todoList.push(item);
    },
    changeItem(state, item: Item) {
      const idx = state.todoList.findIndex((a: Item) => (a.id === item.id));
      state.todoList[idx] = item;
    },
    changeStatus(state, {id, status}: {id: number, status: 'active' | 'clear'}) {
      const idx = state.todoList.findIndex((a: Item) => (a.id === id));
      state.todoList[idx].status = status;
    },
    removeItem(state, id: number) {
      const idx = state.todoList.findIndex((a: Item) => (a.id === id));
      state.todoList.splice(idx, 1);
    },
    setTodoList(state, todoList: Item[]) {
      state.todoList = todoList;
    },
  },
  actions: {
    async initData({commit}) {
      const res: AxiosResponse<{todoList: Item[]}> = await AxiosService.instance.get('/api/tasks');
      // tslint:disable-next-line: no-console
      console.log(res.data);
      commit('setTodoList', res.data);
    },
    async addData({commit}, data: object) {
      const res: AxiosResponse = await AxiosService.instance.post('/api/task', data, axiosConfig);
      // tslint:disable-next-line: no-console
      console.log(res.data.result);
      commit('addItem', res.data.result);
    },
    async changeData({commit}, data: Item) {
      const res: AxiosResponse = await AxiosService.instance.put(`/api/task/${data.id}`, data, axiosConfig);
      // tslint:disable-next-line: no-console
      console.log(res.data.result);
      commit('changeStatus', {id: res.data.result.id, status: res.data.result.status });
    },
    async removeData({commit}, id: string) {
      const res: AxiosResponse = await AxiosService.instance.delete(`/api/task/${id}`, axiosConfig);
      commit('removeItem', id);
    },
  },
  getters: {
    allTodoList: (state) => state.todoList,
    activeTodoList: (state) => {
      return state.todoList.filter((item: Item) => item.status === 'active');
    },
    clearTodoList: (state) => {
      return state.todoList.filter((item: Item) => item.status === 'clear');
    },
  },
};
export default new Vuex.Store(store);
