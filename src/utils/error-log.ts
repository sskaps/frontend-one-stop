import settings from '@/config/settings';
import { useStore } from 'vuex';
import { StateType as GlobalStateType } from '@/store/error-log';
import {app} from '@/main';

const {errorLog: needErrorLog} = settings;

const checkNeed = () => {
  const env = process.env.NODE_ENV;
  if (Array.isArray(needErrorLog) && env) {
    return needErrorLog.includes(env);
  }
  return false;
};

if (checkNeed()) {
  const store = useStore<{errorLog: GlobalStateType}>();
  app.config.errorHandler = function (err: unknown, instance: any, info: string) {
    store.dispatch('addErrorLog', {
      err,
      vm: instance,
      info,
      url: window.location.href,
    });
  };
}
