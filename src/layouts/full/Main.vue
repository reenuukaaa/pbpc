<script >
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import Logo from './logo/Logo.vue';
// Icon Imports
import { Menu2Icon, HistoryIcon, CalculatorIcon } from 'vue-tabler-icons';
import ProfileDD from './vertical-header/ProfileDD.vue';

export default {
    components: {
        NavGroup,
        NavItem,
        Logo,
        ProfileDD
    },
    data() {
        return {
            sidebarMenu: [
                { header: 'home' },
                {
                    title: 'Check Hypertension',
                    icon: CalculatorIcon,
                    to: '/'
                },
                {
                    title: 'History',
                    icon: HistoryIcon,
                    to: '/history'
                }
            ],
            sDrawer: true
        };
    }
};
</script>

<template>
    <!------Sidebar-------->
    <div>
        <v-navigation-drawer left elevation="0" app class="leftSidebar" v-model="sDrawer">
            <!---Logo part -->
            <div class="pa-5 pb-2">
                <Logo />
            </div>
            <!-- ---------------------------------------------- -->
            <!---Navigation -->
            <!-- ---------------------------------------------- -->
            <div>
                <perfect-scrollbar class="scrollnavbar">
                    <v-list class="pa-6 pt-2">
                        <!---Menu Loop -->
                        <template v-for="(item, i) in sidebarMenu">
                            <!---Item Sub Header -->
                            <NavGroup :item="item" v-if="item.header" :key="item.title" />

                            <!---Single Item-->
                            <NavItem :item="item" v-else class="leftPadding" />
                            <!---End Single Item-->
                        </template>
                    </v-list>
                    <!-- <div class="pa-4">
                        <ExtraBox />
                    </div> -->
                </perfect-scrollbar>
            </div>
        </v-navigation-drawer>
        <!------Header-------->
        <v-app-bar elevation="0" height="70">
            <div class="d-flex align-center justify-space-between w-100">
                <div>
                    <v-btn
                        class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
                        @click="sDrawer = !sDrawer"
                        icon
                        variant="flat"
                        size="small"
                    >
                        <Menu2Icon size="20" stroke-width="1.5" />
                    </v-btn>
                </div>
                <div>
                    <!-- User Profile -->
                    <ProfileDD />
                </div>
            </div>
        </v-app-bar>
    </div>
</template>
