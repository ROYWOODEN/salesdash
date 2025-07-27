<template>
  <div>

    <div class="card">
      <Chart type="bar" :data="chartData" :options="chartOptions" class="h-[30rem]" />
    </div>

  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue'
import api from '@/api/axios'
import Chart from 'primevue/chart'
import { type Data } from '@/composebles/types/incomes';


const incomes = ref<Data[] | null>(null);

async function fetchUrl() {

    const date = new Date();

    const formarDate: string = date
  .toLocaleDateString("ru", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .split(".")
  .reverse()
  .join("-");

    

  try {

    const res = await api.get('incomes', {
      params: {
        page: 1,
        limit: 50,
        dateFrom: '2025-01-01',
        dateTo: formarDate,
      },
    });
    incomes.value = res.data.data;

  }   catch(error) {
    console.log(error, 'Кажется нет соединения с интернетом');
  }

}

onMounted(async () => {
  await fetchUrl();
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();


const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  
  const grouped: Record<string, number> = {};

  incomes.value?.forEach(el => {
    const date = el.date;
    if(!grouped[date]) {
      grouped[date] = 0;
    }

    grouped[date] += el.quantity;

  });

  console.log(grouped);
  const labels = Object.keys(grouped);
  const values = Object.values(grouped);

  return {
    labels,
    datasets: [
      {
        label: 'Сумма quantity по дате',
        backgroundColor: documentStyle.getPropertyValue('--p-cyan-500'),
        data: values
      }
    ]
  };
};

const setChartOptions = () =>  {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            tooltips: {
                mode: 'index',
                intersect: false
            },
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                stacked: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}


</script>

<style scoped>

</style>