import { Mutation, Action } from 'vuex';
import { StoreModuleType } from "@/utils/store";

export interface IErrorLog {
  err: Error;
  vm: any;
  info: string;
  url: string;
}

export interface StateType {
  logs: IErrorLog[];
}

export interface ModuleType extends StoreModuleType<StateType> {
  state: StateType;
  mutations: {
    addErrorLog: Mutation<StateType>;
    clearErrorLog: Mutation<StateType>;
  };
  actions: {
    addErrorLog: Action<StateType, StateType>;
    clearErrorLog: Action<StateType, StateType>;
  };
}

const initState: StateType = {
  logs: []
}

const StoreModel: ModuleType = {
  namespaced: true,
  name: 'errorLog',
  state: {
    ...initState
  },
  mutations: {
    addErrorLog(state, payload) {
      state.logs.push(payload.logs)
    },
    clearErrorLog(state) {
      state.logs.splice(0)
    }
  },
  actions: {
    async addErrorLog({ commit }, log: IErrorLog) {
      try {
        commit('addErrorLog', log);
        return true;
      } catch (error) {
        return false;
      }
    },
    async clearErrorLog({ commit }) {
      try {
        commit('clearErrorLog');
        return true;
      } catch (error) {
        return false;
      }
    }
  }
}

export default StoreModel;
