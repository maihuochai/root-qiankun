import { action } from '@/main'

export default {
  state: {
    record: [
      'raw record'
    ]
  },
  mutations: {
    /**
     * 用户操作记录
     * @param state 当前模块state
     * @param record 修改的记录
     * @param fromType 数据来源：
     *                    MAIN_APPLICATION：主应用
     *                    MICRO_APPLICATION：微应用
     * @constructor
     */
    SET_RECORD (state: any, { record, fromType }: { record: string | Array<string>; fromType: 'MAIN_APPLICATION' | 'MICRO_APPLICATION'; }) {
      if (fromType === 'MICRO_APPLICATION') {
        state.record = record
      } else {
        state.record.push(record)
        action.setGlobalState({
          record: state.record,
          fromType: 'MAIN_APPLICATION'
        })
      }
    }
  },
  actions: {},
  namespaced: true
}
