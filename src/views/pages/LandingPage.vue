<template>
    <v-row>
        <v-col cols="12" md="6">
            <UiParentCard :title="$t('cardTitle')">
                <v-form ref="checkBpForm">
                    <v-row class="d-flex pa-5">
                        <v-col cols="12">
                            <v-text-field
                                class="inputAge"
                                v-model="name"
                                :rules="nameRules"
                                :label="$t('name')"
                                variant="solo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                suffix="years"
                                class="inputAge"
                                v-model="age"
                                :rules="ageRules"
                                :label="$t('age')"
                                type="number"
                                variant="solo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4"
                            ><v-select
                                v-model="gender"
                                variant="solo"
                                :label="$t('gender')"
                                :rules="genderRules"
                                :items="[
                                    { label: $t('genderMale'), value: 'm' },
                                    { label: $t('genderFemale'), value: 'f' }
                                ]"
                                item-title="label"
                                item-value="value"
                            ></v-select>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                v-model="height"
                                :rules="heightRules"
                                suffix="cm"
                                :label="$t('height')"
                                variant="solo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="systolic"
                                suffix="mmHg"
                                :rules="systolicRules"
                                :label="$t('systolic')"
                                variant="solo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                v-model="diastolic"
                                suffix="mmHg"
                                :rules="diastolicRules"
                                :label="$t('diastolic')"
                                variant="solo"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="pt-0">
                            <v-btn @click="handleCalculate" color="primary" block flat>Calculate</v-btn>
                        </v-col>
                        <v-col cols="12" class="pt-0">
                            <span id="ctl00_ContentPlaceHolder1_Label1" style="color: Red; font-size: 15px"> </span>
                        </v-col>
                    </v-row>
                </v-form>
            </UiParentCard>
        </v-col>
        <v-col cols="12" md="6">
            <UiParentCard :title="$t('info.howToUse')">
                <div class="pa-7 pt-2" v-html="$t('info.howToUseExplained')"></div>
            </UiParentCard>
        </v-col>
        <v-col cols="12" md="12">
            <UiParentCard :title="$t('info.whyToMonitor')">
                <div class="pa-7 pt-2" v-html="$t('info.whyToMonitorExplained')"></div>
            </UiParentCard>
        </v-col>
        <v-col cols="12" md="12">
            <UiParentCard :title="$t('info.howToCalculate')">
                <div class="pa-7 pt-2" v-html="$t('info.howToCalculateExplained')"></div>
            </UiParentCard>
        </v-col>
        <v-col cols="12" md="6">
            <UiParentCard :title="$t('info.risks')">
                <div class="pa-7 pt-2" v-html="$t('info.risksExplained')"></div>
            </UiParentCard>
            <br />
            <UiParentCard :title="$t('info.causes')">
                <div class="pa-7 pt-2" v-html="$t('info.causesExplained')"></div>
            </UiParentCard>
        </v-col>
        <v-col cols="12" md="6">
            <v-img src="/reference-table.jpg" height="700"></v-img>
        </v-col>
    </v-row>
</template>

<script>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import axios from 'axios';
export default {
    name: 'LandingPage',
    data() {
        return {
            ageRules: [(v) => this.isAgeValid(v)],
            genderRules: [(v) => this.isGenderValid(v)],
            heightRules: [(v) => this.isHeightValid(v)],
            systolicRules: [(v) => this.isSystolicValid(v)],
            diastolicRules: [(v) => this.isDiastolicValid(v)],
            nameRules: [(v) => this.isNameValid(v)],
            age: null,
            height: null,
            systolic: null,
            diastolic: null,
            gender: null,
            name: null
        };
    },
    components: {
        UiParentCard
    },
    mounted() {
        document.getElementById('ctl00_ContentPlaceHolder1_Label1').innerHTML = '';
    },
    methods: {
        async handleCalculate() {
            let validation = await this.$refs.checkBpForm.validate();
            console.log(validation);
            if (validation.valid) {
                try {
                    let obj = {
                        age: this.age,
                        ht: this.height,
                        sys: this.systolic,
                        dis: this.diastolic,
                        gen: this.gender,
                        result: null
                    };
                    await axios.post('https://www.pediatriconcall.com/calc/bp.aspx/getdata', obj).then((response) => {
                        if (response && response.data && response.data.d) {
                            document.getElementById('ctl00_ContentPlaceHolder1_Label1').style.color = '';
                            document.getElementById('ctl00_ContentPlaceHolder1_Label1').innerHTML = response.data.d;
                            obj.result = response.data.d;
                            obj.name = this.name;
                            this.saveDataToLocalStorage(obj);
                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Can't Validate Form");
            }
        },
        isGenderValid(gender) {
            if (!gender) return this.$t('genderValidation');
        },
        isAgeValid(age) {
            if (!age) return this.$t('ageRequiredValidation');
            if (age >= 1 && age <= 17) {
                if (/(^[1]{1}[0-7]{1}$)|(^[0-9]$)/.test(age)) {
                    return true;
                } else {
                    return this.$t('decimalNotAllowedValidation');
                }
            } else {
                return this.$t('ageLimitValidation');
            }
        },
        isHeightValid(height) {
            if (!height) return this.$t('heightRequiredValidation');
            if (height >= 1 && height <= 200) {
                if (/(^[2][0]{2}$)|(^[1]{1}[0-9]{1}[0-9]{1}$)|(^[0-9]{1}[0-9]{1}$)|(^[0-9]$)/.test(height)) {
                    return true;
                } else {
                    return this.$t('decimalNotAllowedValidation');
                }
            } else {
                return this.$t('heightLimitValidation');
            }
        },
        isSystolicValid(systolic) {
            if (!systolic) return this.$t('systolicRequiredValidation');
            if (systolic >= 1 && systolic <= 200) {
                if (/(^[3][0]{2}$)|(^[1-2]{1}[0-9]{1}[0-9]{1}$)|(^[0-9]{1}[0-9]{1}$)|(^[0-9]$)/.test(systolic)) {
                    return true;
                } else {
                    return this.$t('decimalNotAllowedValidation');
                }
            } else {
                return this.$t('systolicLimitValidation');
            }
        },
        isDiastolicValid(diastolic) {
            if (!diastolic) return this.$t('diastolicRequiredValidation');
            if (diastolic >= 1 && diastolic <= 200) {
                if (/(^[3][0]{2}$)|(^[1-2]{1}[0-9]{1}[0-9]{1}$)|(^[0-9]{1}[0-9]{1}$)|(^[0-9]$)/.test(diastolic)) {
                    return true;
                } else {
                    return this.$t('decimalNotAllowedValidation');
                }
            } else {
                return this.$t('diastolicLimitValidation');
            }
        },
        isNameValid(name) {
            if (!name) return this.$t('nameRequiredValidation');
            return true;
        },
        saveDataToLocalStorage(obj) {
            let history = window.localStorage.getItem('history');
            console.log(history);
            if (history) {
                history = JSON.parse(history);
                history.push(obj);
            } else {
                history = [obj];
            }

            window.localStorage.setItem('history', JSON.stringify(history));
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
