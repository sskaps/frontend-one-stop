<template>
  <div class="indexlayout-main-conent">
    <el-card shadow="never" class="cus-card">
      <h3>{{t('index-layout.menu.project')}}</h3>
      <el-alert title="查看管理项目运行状态，进行项目实时编辑" type="warning"/>
      <div class="margin-top-20">
        <el-form :inline="true" :model="projectFilter" label-width="85px" label-position="left">
          <el-row :gutter="8">
            <el-col :span="4">
              <el-form-item label="项目名称">
                <el-input v-model="projectFilter.projectName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="项目类型">
                <el-input v-model="projectFilter.projectType" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="初始化方式">
                <el-input v-model="projectFilter.initType" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="创建人">
                <el-input v-model="projectFilter.creator" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="运行状态">
                <el-select v-model="projectFilter.projectStatus" clearable>
                  <el-option v-for="status in execStatus" :label="status.text" :value="status.value">{{status.text}}</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="text-align-right">
              <el-button>查询</el-button>
              <el-button type="primary">新增</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-table :data="data" :border="true" style="width: 100%" :header-cell-style="{background: '#f3f4f7'}">
        <el-table-column type="index" label="序号" align="center" />
        <!--<template #header>-->
        <!--<el-input v-model="search" size="mini" placeholder="Type to search" />-->
        <!--</template>-->
        <el-table-column prop="projectName" label="项目名称">
          <template #default="scope">
            <div>{{scope.row.projectName}}</div>
            <el-tag size="mini" effect="dark" class="cursor-pointer">
              <i class="el-icon-document"></i>
              WebIDE
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="projectType" label="项目类型" />
        <el-table-column prop="initType" label="初始化方式" />
        <el-table-column prop="startCmd" label="启动脚本" />
        <el-table-column prop="buildCmd" label="编译脚本" />
        <el-table-column prop="creator" label="创建人" />
        <el-table-column prop="repo" label="仓库地址" />
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="ModifyTime" label="更新时间" />
        <el-table-column label="操作" header-align="center" align="right" width="145">
          <template #default="scope">
            <el-button size="mini" type="primary" plain @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini" type="danger" plain @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-block text-align-right margin-top-10">
        <el-pagination
          v-model:currentPage="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
  import {defineComponent, ref, reactive, toRefs} from "vue";
  import {useI18n} from "vue-i18n";

  interface ITableItem {
    readonly id: number;
    projectName: string;
    projectType: string;
    initType: string;
    startCmd: string;
    buildCmd: string;
    creator: string;
    createTime: string;
    ModifyTime: string;
    repo: string;
    branch: string;
  }

  interface ITableData {
    data: ITableItem[];
  }

  // 分页
  const usePagination = () => {
    const currentPage = ref<number>(1);
    const pageSize = ref<number>(100);
    const total = ref<number>(0);
    const pageSizes = reactive([100, 200, 300, 400]);
    const handleSizeChange = (val: number) => {
      pageSize.value = val
    };
    const handleCurrentChange = (val: number) => {
      currentPage.value = val
    };
    const handleSetTotal = (val: number) => {
      total.value = val
    };
    return {
      currentPage,
      pageSize,
      pageSizes,
      total,
      handleSizeChange,
      handleCurrentChange,
      handleSetTotal
    };
  };


  // 操作列
  const useOperation = (tableData: ITableData) => {
    // 项目编辑
    const handleEdit = (item: ITableItem) => {};
    // 项目删除
    const handleDelete = (index: number, item: ITableItem) => {
      tableData.data.splice(index, 1)
    };
    return {
      handleEdit,
      handleDelete
    }
  };

  export default defineComponent({
    name: 'ProjectAll',
    setup() {
      const {t} = useI18n();
      const tableData = reactive<ITableData>({
        data: [
          {
            id: 1,
            projectName: '造价云管理平台',
            projectType: '项目',
            initType: '标准模版',
            startCmd: 'npm run start',
            buildCmd: 'npm run build',
            creator: 'ker',
            createTime: '2016-05-03',
            ModifyTime: '2016-05-03',
            repo: 'ssh://git@geekssh.glodon.com:7999/gcc-zjy/zjy-web.git',
            branch: 'master'
          },
          {
            id: 2,
            projectName: '造价云管理平台',
            projectType: '项目',
            initType: '标准模版',
            startCmd: 'npm run start',
            buildCmd: 'npm run build',
            creator: 'ker',
            createTime: '2016-05-03',
            ModifyTime: '2016-05-03',
            repo: 'ssh://git@geekssh.glodon.com:7999/gcc-zjy/zjy-web.git',
            branch: 'develop'
          },
          {
            id: 3,
            projectName: 'yzj-ui',
            projectType: '组件库',
            initType: '标准模版',
            startCmd: 'npm run start',
            buildCmd: 'npm run build',
            creator: 'ker',
            createTime: '2016-05-03',
            ModifyTime: '2016-05-03',
            repo: 'ssh://git@geekssh.glodon.com:7999/gcc-zjy/zjy-web.git',
            branch: 'test'
          },
          {
            id: 4,
            projectName: '造价云管理平台',
            projectType: '项目',
            initType: '自定义',
            startCmd: 'npm run start',
            buildCmd: 'npm run build',
            creator: 'ker',
            createTime: '2016-05-03',
            ModifyTime: '2016-05-03',
            repo: 'ssh://git@geekssh.glodon.com:7999/gcc-zjy/zjy-web.git',
            branch: 'feature'
          }
        ]
      });
      const { handleEdit, handleDelete } = useOperation(tableData);
      const projectFilter = reactive({
        projectName: '',
        projectType: '',
        initType: '',
        projectStatus: null,
        creator: ''
      });
      const {currentPage, pageSize, pageSizes, total, handleSizeChange, handleCurrentChange, handleSetTotal} = usePagination();
      handleSetTotal(tableData.data.length);
      return {
        t,
        ...toRefs(tableData),
        handleEdit,
        handleDelete,
        projectFilter,
        currentPage,
        pageSize,
        pageSizes,
        total,
        handleSizeChange,
        handleCurrentChange,
        handleSetTotal
      }
    }
  })
</script>
