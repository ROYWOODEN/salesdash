<template>
   <main>
    <div style="display: flex; justify-content: end; margin-right: 10%;">
        <button v-if="isSort" @click="sortByQuantity()">sort Quantity</button>
        <button v-else @click="sortByQuantity()">sort Quantity</button>

    </div>
        <DataTable 
        lazy 
        :value="incomes" 
        paginator 
        :totalRecords="total" 
        :rows="row" 
        :first="first" 
        :rowsPerPageOptions="[10, 20, 30, 50]" 
        @page="onPageChange"
        tableStyle="min-width: 50rem">
            <Column field="warehouse_name" header="City" style="width: 25%"></Column>
            <Column field="date" header="Date" style="width: 25%"></Column>
            <Column field="quantity" header="Quantity" style="width: 25%"></Column>
        </DataTable>
   </main>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';  
import Row from 'primevue/row';  
import { computed, onMounted, ref, watch } from 'vue';
import api from '@/api/axios';
import { useData } from '@/composebles/Data/useData';
import { type incomes } from '@/composebles/types/incomes';


onMounted(async () => {
    await getIncomes();
})

const incomes = ref<incomes[]>([]);
const row = ref(10);
const page = ref(1);
const total = ref(0);


const first = computed(() => (page.value - 1) * row.value);


const isSort = ref<boolean>(false);

const sortByQuantity = () => {
    isSort.value = !isSort.value
    if(isSort.value) {
        incomes.value.sort((a, b) => a.quantity - b.quantity)
    }   else {
        incomes.value.sort((a, b) => b.quantity - a.quantity)
    }
}

watch([row, page], async () => {
    await getIncomes();
});

async function onPageChange(event: any) {
  row.value = event.rows;
  page.value = event.page + 1;
}


async function getIncomes() {

    try {
        const formatDate = useData();
    
        const res = await api.get('incomes', {
            params: {
                page: page.value,
                limit: row.value,
                dateFrom: "2025-07-01",
                dateTo: formatDate,
            }
        });
    
        incomes.value = res.data.data;
        total.value = res.data.meta.total;

    }   catch(error) {
        console.log(error, 'Ошибка соединения с интернетом');
    }

}


</script>

<style scoped>



</style>