<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard :title="$t('history')">
                <v-table :key="historyTableKey">
                    <thead>
                        <tr>
                            <th v-for="header in headers" :key="header" class="text-center">
                                {{ header.title }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in historyItems" :key="item.name" class="text-center">
                            <td>{{ item.name }}</td>
                            <td>{{ item.age }}</td>
                            <td>{{ item.gen }}</td>
                            <td>{{ item.ht }}</td>
                            <td>{{ item.sys }}</td>
                            <td>{{ item.dis }}</td>
                            <td v-html="item.result"></td>
                        </tr>
                    </tbody>
                </v-table>
            </UiParentCard>
        </v-col>
    </v-row>
</template>

<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';

export default {
    name: 'HistoryPage',
    data() {
        return {
            historyItems: [],
            headers: [
                {
                    title: this.$t('name'),
                    align: 'start',
                    sortable: true,
                    value: 'name'
                },
                { title: this.$t('age'), value: 'age' },
                { title: this.$t('gender'), value: 'gen' },
                { title: this.$t('height'), value: 'ht' },
                { title: this.$t('systolic'), value: 'sys' },
                { title: this.$t('diastolic'), value: 'dis' }
            ],
            historyTableKey: 0
        };
    },
    created() {
        this.getHistory();
    },
    components: { UiParentCard },
    methods: {
        async getHistory() {
            let history = window.localStorage.getItem('history');
            if (history) {
                console.log(history);
                history = JSON.parse(history);
                for (let obj of history) {
                    console.log(obj);
                    this.historyItems.push(obj);
                }
                console.log(this.historyItems);
                this.historyTableKey += 1;
            }
        }
    }
};
</script>
<style scoped>
.inputAge >>> input[type='number'] {
    -moz-appearance: textfield !important;
}
.inputAge >>> input::-webkit-outer-spin-button,
.inputAge >>> input::-webkit-inner-spin-button {
    appearance: none !important;
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
}
</style>
