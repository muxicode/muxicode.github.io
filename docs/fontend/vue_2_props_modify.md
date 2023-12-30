---
title: props双向修改
autoGroup-1: VUE
---

# 如何修改Props？

![](/vue_2_props_modify.assets/vue_ts_props.drawio.png)


🔐 **Props属性的限制与优雅解决方案**

在使用Props属性下的流程中，我们发现了一些限制：

1. 在弹窗组件中，无法修改Button组件传递过来的属性，以便自己关闭弹窗。
2. Button需要额外监控弹窗的关闭事件，导致需要编写冗余的关闭窗口代码。

那么，有没有更加优雅的方式，让关闭弹窗的逻辑由弹窗自身来控制呢？

🌟 **巧妙解决方案：自主掌控弹窗**

为了摆脱Props的限制，我们可以让弹窗组件自主掌控关闭逻辑，从而使整个流程更为优雅。通过以下方法，我们能够轻松实现：

- **弹窗主动控制关闭：** 弹窗组件内部处理关闭逻辑，不再受限于外部传递的Props属性。
- **事件冒泡机制：** 弹窗触发关闭事件，父组件监听即可，省去Button额外监控的烦恼。

这样一来，不仅解决了Props属性的限制，还使得整个弹窗交互更加清晰、简洁，让代码更具可读性。优雅解决问题，让代码更加美妙！💡✨

## 拷贝&隐式通知

![](/vue_2_props_modify.assets/vue_ts_props1.drawio.png)

1. 🖱️ **按钮点击变身：轻松修改可见属性**
2. 🔄 **调用init方法：将props属性变为己有**
3. 🤝 **组件内变量魔法绑定：内外通行证**
4. 🚪 **一键关闭：语法糖通知父级修改**

> 子组件封装、

```vue
<!-- CustomDialog.vue -->
<template>
  <div>
    <el-dialog :visible="dialogVisible" @close="closeDialog"></el-dialog>
    <el-button @click="openDialog">Open Dialog</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Emit } from 'vue-property-decorator';

export default class CustomDialog extends Vue {
  @Prop({ type: Boolean }) readonly visible!: boolean;
  private dialogVisible: boolean = false; // 设置默认值；
    
  public async init() { // 异步方法处理请求调用
    this.dataDrivenVisible = this.visible // 修改为父组件中的值
  }

  private openDialog() {
    this.dialogVisible = true;
  }

  private closeDialog() {
    this.dialogVisible = false;
    this.$emit('update:visible', false);
  }
}
</script>
```

> 父组件调用

```vue
<!-- ParentComponent.vue -->
<template>
  <div>
    <!-- .sync 修饰符可以自动监听update:visible事件，并将返回值赋给dialogVisible  -->
    <!-- ref 让父组件可以找到，并调用其中的init方法，ref可动态绑定如 :ref="组件前缀+{变量}"  -->
    <custom-dialog ref="customDialog" :visible.sync="dialogVisible"></custom-dialog>
    <el-button @click="openDialog">Open Dialog</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import CustomDialog from '@/components/CustomDialog.vue';

@Component({
  components: {
    CustomDialog,
  },
})
export default class ParentComponent extends Vue {
  private dialogVisible: boolean = false;

  private openDialog() {
    this.dialogVisible = true;
    this.$nextTick(()=>{ // 调用初始化方法
      (this.$refs.customDialog as CustomDialog).init();
    });
    // 如果多个弹窗可使用Map记录多个标志，通过$set响应式设置值
    // this.$set(this.dataDrivenVisibleMap, node.data.pipelineStageId, true)
    // this.$nextTick(()=>{
    //  (this.$refs["唯一标识字符串"] as CustomDialog).init();
    // });
  }
}
</script>
```