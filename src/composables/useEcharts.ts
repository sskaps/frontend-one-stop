// @ts-ignore
import {onMounted, onBeforeUnmount, Ref, ref} from 'vue';
import debounce from 'lodash.debounce';
import {ECharts, EChartsOption} from 'echarts';
import * as echarts from 'echarts';
import 'echarts/theme/macarons';

export default function useEcharts(
  labRef: Ref<HTMLDivElement | HTMLCanvasElement | undefined>,
  initOption: EChartsOption,
  theme = 'macarons'
): Ref<echarts.ECharts | undefined> {

  let ec: ECharts;
  const chart = ref<ECharts>();

  const resizeHandler = debounce(() => {
    ec.resize();
  }, 100);

  onMounted(() => {
    if (labRef.value) {
      ec = echarts.init(labRef.value, theme);
      ec.setOption(initOption);
      chart.value = ec;
    }

    window.addEventListener('resize', resizeHandler);
  })

  onBeforeUnmount(() => {
    ec.dispose();
    window.removeEventListener('resize', resizeHandler);
  });

  return chart;
}
