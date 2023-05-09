<script>
export default {
    name: 'locale-changer',
    data() {
        return {
            langs: [
                { text: 'English', value: 'en', image: 'English.png' },
                { text: 'Hindi', value: 'hn', image: 'Hindi.png' }
            ]
        };
    }
};
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <!-- <v-menu location="bottom" :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn class="profileBtn custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="70"> <img :src=`@/assets/images/${}` height="70" alt="user" /> </v-avatar>
            </v-btn>
        </template> -->
    <v-sheet rounded="md" width="120" elevation="10" class="mt-2">
        <v-select v-model="$i18n.locale" label="Language" :items="langs" item-title="text" item-value="value">
            <template v-slot:selection="{ item }">
                <img :src="`/${item.raw.image}`" height="20" alt="user" />
            </template>
        </v-select>
    </v-sheet>
    <!-- </v-menu> -->
</template>
