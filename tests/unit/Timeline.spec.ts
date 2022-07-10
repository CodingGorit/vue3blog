// npm run test:unit
import { mount } from '@vue/test-utils'
import TimeLine from '@/components/TimeLine.vue'
import { nextTick } from '@vue/runtime-dom'

// 进入测试的组件
describe('TimeLine.vue', () => {
  it('测试三个a标签的功能', () => {
    const msg = "测试完毕"
    const wrapper = mount(TimeLine, {})
    // console.log(wrapper.html())

    // 测试的内容 期望2 得到1
    // expect(1).toBe(2); // error
    // expect(1).toBe(1); // true
    // const periods = wrapper.findAll("a");
    // expect(periods.length).toBe(3);

    expect(wrapper.findAll("a")).toHaveLength(3)
    // wrapper.findall("[data-test]='period'")  自定义属性
  })

  it('测试三个a标签的事件功能', async () => {
    const msg = "测试完毕"
    const wrapper = mount(TimeLine, {})
    const $tody = wrapper.findAll("[data-test='period']")[0]
    expect($tody.classes()).toContain("is-active");
    const $thisWeek = wrapper.findAll("[data-test='period']")[1];
    $thisWeek.trigger("click");
    await nextTick();
    expect($tody.classes()).not.toContain("is-active");
    // expect(wrapper.findAll("a")).toHaveLength(3)
  })
})
