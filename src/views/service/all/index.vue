<template>
  <div class="indexlayout-main-conent">
    <el-card shadow="never" class="cus-card">
      <h3>{{t('index-layout.menu.service')}}</h3>
      <el-alert title="查看管理服务运行状态，进行服务实时编辑" type="warning"/>
      <div class="margin-top-20">
        <el-form :inline="true" :model="projectFilter" label-width="85px" label-position="left">
          <el-row :gutter="8">
            <el-col :span="4">
              <el-form-item label="服务名称">
                <el-input v-model="projectFilter.serviceName" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="服务类型">
                <el-input v-model="projectFilter.serviceType" clearable></el-input>
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
        <el-table-column type="expand">
          <template #default="props">
            <div class="padding-0-10">
              <p>仓库地址: {{ props.row.repo }}</p>
              <p>分支名称: {{ props.row.branch }}</p>
              <p>运行端口: {{ props.row.port }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" align="center" />
        <!--<template #header>-->
        <!--<el-input v-model="search" size="mini" placeholder="Type to search" />-->
        <!--</template>-->
        <el-table-column prop="serviceOrigin" label="服务来源">
          <template #default="scope">
            <el-tooltip>
              <template  #content>
                服务来源于：{{scope.row.originId}}
              </template>
              <span>{{scope.row.serviceOrigin}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="serviceName" label="服务名称"/>
        <el-table-column prop="serviceType" label="服务类型" />
        <el-table-column prop="initType" label="初始化方式" />
        <el-table-column prop="startCmd" label="启动脚本" />
        <el-table-column prop="buildCmd" label="编译脚本" />
        <el-table-column prop="creator" label="创建人" />
        <!--<el-table-column prop="repo" label="仓库地址" />-->
        <!--<el-table-column prop="branch" label="分支名称" />-->
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column prop="ModifyTime" label="更新时间" />
        <el-table-column prop="projectStatus" label="运行状态" width="90">
          <template #default="scope">
            <span class="inline-block border-radius-5 margin-right-10" :class="[`background-${execStatusColor(scope.row.projectStatus)}`]" style="width: 10px;height: 10px;"></span>
            {{execStatusText(scope.row.projectStatus)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" header-align="center" align="right" width="275">
          <template #default="scope">
            <el-button size="mini" type="success" plain @click="handlePublish(scope.$index, scope.row)">
              构建
            </el-button>
            <el-button size="mini" type="success" plain @click="handleStart(scope.$index, scope.row)" v-if="scope.row.projectStatus === 3">
              启动
            </el-button>
            <el-button size="mini" type="warning" plain @click="handleStop(scope.$index, scope.row)" v-if="scope.row.projectStatus === 1">
              停止
            </el-button>
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
    originId: number;
    serviceOrigin: string;
    serviceName: string;
    serviceType: string;
    initType: string;
    startCmd: string;
    buildCmd: string;
    creator: string;
    createTime: string;
    ModifyTime: string;
    projectStatus: number;
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

  // 服务状态
  const useServiceStatus = () => {
    // 运行状态
    const execStatus = reactive([
      {
        value: 1,
        text: '运行中'
      },
      {
        value: 2,
        text: '重启中'
      },
      {
        value: 3,
        text: '已停止'
      }
    ]);
    // 运行状态图标颜色
    const execStatusColor = (projectStatus: number) => {
      return projectStatus === 1 ? 'green' :
        projectStatus === 2 ? 'blue' :
          projectStatus === 3 ? 'red' : 'gray'
    };
    // 运行状态
    const execStatusText = (projectStatus: number) => {
      return projectStatus === 1 ? '运行中' :
        projectStatus === 2 ? '重启中' :
          projectStatus === 3 ? '已停止' : ''
    };
    return {
      execStatus,
      execStatusColor,
      execStatusText
    };
  };

  // 操作列
  const useOperation = (tableData: ITableData) => {
    // 服务部署
    const handlePublish = (item: ITableItem) => {};
    // 启动服务
    const handleStart = (item: ITableItem) => {};
    // 停止服务
    const handleStop = (item: ITableItem) => {};
    // 服务编辑
    const handleEdit = (item: ITableItem) => {};
    // 服务删除
    const handleDelete = (index: number, item: ITableItem) => {
      tableData.data.splice(index, 1)
    };
    return {
      handlePublish,
      handleStart,
      handleStop,
      handleEdit,
      handleDelete
    }
  };

  export default defineComponent({
    name: 'ServiceAll',
    setup() {
      const {t} = useI18n();
      const tableData = reactive<ITableData>({
        data: [
          {
            id: 1,
            serviceOrigin: '新建需求',
            originId: 1,
            serviceName: '造价云管理平台',
            serviceType: '项目',
            initType: '标准模版',
            startCmd: 'npm run start',
            buildCmd: 'npm run build',
            creator: 'ker',
            createTime: '2016-05-03',
            ModifyTime: '2016-05-03',
            projectStatus: 1,
            repo: 'ssh://git@geekssh.glodon.com:7999/gcc-zjy/zjy-web.git',
            branch: 'master'
          },
          {
            id: 2,
            serviceOrigin: '新建项目',
            originId: 1,
            serviceName: '造价云管理平台',
            serviceType: '项目',
            initType: '标准模版',
            startCmd: 'npm run start',
            buildCmd: 'npm run build',
            creator: 'ker',
            createTime: '2016-05-03',
            ModifyTime: '2016-05-03',
            projectStatus: 2,
            repo: 'ssh://git@geekssh.glodon.com:7999/gcc-zjy/zjy-web.git',
            branch: 'develop'
          },
          {
            id: 3,
            serviceOrigin: '新建项目',
            originId: 1,
            serviceName: 'yzj-ui',
            serviceType: '组件库',
            initType: '标准模版',
            startCmd: 'npm run start',
            buildCmd: 'npm run build',
            creator: 'ker',
            createTime: '2016-05-03',
            ModifyTime: '2016-05-03',
            projectStatus: 3,
            repo: 'ssh://git@geekssh.glodon.com:7999/gcc-zjy/zjy-web.git',
            branch: 'test'
          },
          {
            id: 4,
            serviceOrigin: '反馈处理',
            originId: 1,
            serviceName: '造价云管理平台',
            serviceType: '项目',
            initType: '自定义',
            startCmd: 'npm run start',
            buildCmd: 'npm run build',
            creator: 'ker',
            createTime: '2016-05-03',
            ModifyTime: '2016-05-03',
            projectStatus: 1,
            repo: 'ssh://git@geekssh.glodon.com:7999/gcc-zjy/zjy-web.git',
            branch: 'feature'
          }
        ]
      });
      const { execStatus, execStatusColor, execStatusText } = useServiceStatus();
      const { handlePublish, handleStart, handleStop, handleEdit, handleDelete } = useOperation(tableData);
      const projectFilter = reactive({
        serviceName: '',
        serviceType: '',
        initType: '',
        projectStatus: null,
        creator: ''
      });
      const {currentPage, pageSize, pageSizes, total, handleSizeChange, handleCurrentChange, handleSetTotal} = usePagination();
      handleSetTotal(tableData.data.length);
      return {
        t,
        ...toRefs(tableData),
        handlePublish,
        handleStart,
        handleStop,
        handleEdit,
        handleDelete,
        projectFilter,
        execStatus,
        execStatusColor,
        execStatusText,
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
