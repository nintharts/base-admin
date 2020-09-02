<template>
  <div>
    <a-form layout="inline"
      ><a-form-item>
        <a-button
          type="primary"
          @click="
            () => {
              isShowAdd = true;
            }
          "
          >添加一条数据</a-button
        >
      </a-form-item>
    </a-form>
    <div class="mt20">
      <a-table :columns="columns" :data-source="list" rowKey="id">
        <template slot="action" slot-scope="record">
          <a
            @click="
              () => {
                formModel = record;
                isShowAdd = true;
                addMode = 'edit';
              }
            "
            >编辑</a
          >
          <a-divider type="vertical" />
          <template v-if="record.pid == 0">
            <a @click="addData(record)">添加子分类</a>
            <a-divider type="vertical" />
          </template>
          <a-popconfirm v-if="list.length" title="确定删除改分类吗?" @confirm="() => onDelete(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <!-- 添加子分类 -->
    <a-modal
      :title="addMode == 'add' ? '添加数据示例' : '编辑数据示例'"
      :visible="isShowAdd"
      @ok="handleAddDataOk"
      ok-text="确认"
      cancel-text="取消"
      @cancel="
        () => {
          isShowAdd = false;
        }
      "
    >
      <a-form :model="formModel" layout="vertical" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="分类名称">
          <a-input v-model="formModel.name" placeholder="请输入分类名称"></a-input>
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model="formModel.sort" style="width:100%"></a-input-number>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import * as Api from './api';

export default {
  components: {},
  data() {
    return {
      addMode: 'add',
      isShowAsset: false,
      list: [],
      formModel: {
        id: '',
        sort: 1,
        name: '',
      },
      columns: [
        {
          title: '字段名称',
          dataIndex: 'name',
          // 自定义渲染，详情查看 antdv table文档
          // scopedSlots: { customRender: 'name' },
        },
        {
          title: '操作',
          width: 200,
          scopedSlots: { customRender: 'action' },
        },
      ],
      isShowAdd: false,
      isShowAdd: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await Api.List();
      this.list = res.list;
    },
    /**
     * 添加数据
     */
    addData(record) {
      this.addMode = 'add';
      this.formModel.pid = record.id;
      this.isShowAdd = true;
    },
    async handleAddDataOk() {
      let res;
      // 根据 addMode 来判断提交不同接口
      if (this.addMode == 'add') {
        res = await Api.Save(this.formModel);
      } else {
        res = await Api.Update(this.formModel);
      }
      if (res.code == '0') {
        this.isShowAdd = false;
        this.$message.success(res.message);
        this.getList();
      }
    },
    async onDelete(record) {
      const res = await Api.Remove(record.id);
      if (res.code == '0') {
        this.$message.success(res.message);
        this.getList();
      }
    },
  },
};
</script>

<style></style>
