<template>
    <!-- navbar -->
    <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <button type="button"
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-controls="mobile-menu" aria-expanded="false">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
                        <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                    <div class="flex flex-shrink-0 items-center">
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company">
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                            <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                                aria-current="page">Dashboard</a>
                            <a href="#"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Team</a>
                            <a href="#"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Projects</a>
                            <a href="#"
                                class="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Calendar</a>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <button type="button"
                        class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span class="absolute -inset-1.5"></span>
                        <span class="sr-only">View notifications</span>
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                            aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </svg>
                    </button>

                    <!-- Profile dropdown -->
                    <div class="relative ml-3">
                        <div>
                            <button @click="handlerOpenUser" type="button"
                                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                <span class="absolute -inset-1.5"></span>
                                <span class="sr-only">Open user menu</span>
                                <img class="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="">
                            </button>
                        </div>
                        <div v-if="isOpen"
                            class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                            <a @click="logout" href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem"
                                tabindex="-1" id="user-menu-item-2">Sign out</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Mobile menu, show/hide based on menu state. -->
        <div class="sm:hidden" id="mobile-menu">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <a href="#" class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                    aria-current="page">Dashboard</a>
                <a href="#"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>
                <a href="#"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>
                <a href="#"
                    class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>
            </div>
        </div>
    </nav>
    <div class="pt-4">
        <h1 class="thumnail">Finance Chart</h1>
        <div class="container">
            <div class="treeview">
                <ul id="myUL">
                    <TreeviewCom v-if="structData" :data="structData" :isShow="false">
                    </TreeviewCom>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
// import router from '@/router';
import axios from 'axios';

import TreeviewCom from './FinanceChart/TreeviewCom.vue';

export default {
    name: 'BieuDo',
    components: { TreeviewCom },
    data() {
        return {
            message: 'Bieu do',
            isOpen: false,
            // dbObj: null,
            stats: Array,
            structObj: [],
            structData: null,

            BANDWIDTH: 1 << 0,
            PENDING_VOLUME: 1 << 1,
            RECEIVED_SPEED: 1 << 2,
            PROCESSED_SPEED: 1 << 3,
            PENDING_COUNT: 1 << 4,
            STATUS: 1 << 5,
            DEBUG: 1 << 6,
            CHILDREN: 1 << 7,
        }
    },
    created() {
        // this.checkAuthentication();
        this.findStructs();
        setInterval(this.findStats, 1000);
    },
    render() {
        if (this.structData === null) {
            // Handle the case when structData is null
            return null; // or you can show a loading indicator or an error message
        }

        // Render the component normally when structData is not null
        // Access the structData properties without any issues
        return (
            this.findStructs()
        )
    },
    methods: {
        handlerOpenUser() {
            this.isOpen = !this.isOpen;
        },
        logout() {
            const url = 'http://localhost:5287/PorxyServer';
            const json = {
                act: {
                    A: "Logout",
                }
            };

            // Xóa cookie từ local storage
            localStorage.clear();

            // Chuyển về trang login
            window.location.href = '/login';

            return axios
                .get(
                    url + "?jsonString=" + JSON.stringify(json),
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                )
                .then(response => {
                    return response.data.SResult;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async getStruct() {
            const url = 'http://localhost:5287/PorxyServer';
            const data = {
                act: {
                    A: "GetStruct",
                },
            };
            try {
                const response = await axios.get(url + '?jsonString=' + JSON.stringify(data) + '&loginCookie=' + localStorage.getItem('login-Cookie'), {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.status === 200) {
                    console.log('Get Struct thành công');
                    console.log('Response:', response.data);
                    if (response.data.SResult.C == 0)
                        var dbObj = JSON.parse(response.data.SResult.D);
                    return dbObj;
                } else {
                    console.error('Yêu cầu không thành công. Mã trạng thái:', response.status);
                }
            } catch (error) {
                console.error('Yêu cầu không thành công:', error);
            }
        },
        async getStats() {
            const url = 'http://localhost:5287/PorxyServer';
            const data = {
                act: {
                    A: "GetStats",
                },
            };
            try {
                const response = await axios.get(url + '?jsonString=' + JSON.stringify(data) + '&loginCookie=' + localStorage.getItem('login-Cookie'), {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.status === 200) {
                    console.log('Get Stats thành công');
                    console.log('Response:', response.data);
                    return response.data;
                } else {
                    console.error('Yêu cầu không thành công. Mã trạng thái:', response.status);
                }
            } catch (error) {
                console.error('Yêu cầu không thành công:', error);
            }
        },
        initData(arr) {
            return new StructData(null, {
                Level: "Hub",
                Name: "Hub",
                DataKey: "Hub",
                DataMask: this.CHILDREN,
                Children: arr,
            });
        },
        findStats() {
            this.getStats().then(response => {
                this.stats = JSON.parse(response.SResult.D);

                if (this.structData) {
                    this.structData.update(this.stats);
                }
            });
        },
        findStructs() {
            this.getStruct().then(response => {
                this.isLoading = true;
                if (response) {
                    this.structObj = response;
                    this.structData = this.initData(this.structObj);
                    this.findStats()
                } else {
                    console.log('GetStruct thất bại');
                }
                this.isLoading = false;
            });
        },
    },
    watch() {
        this.structData
    }
}

const BANDWIDTH = 1 << 0;
const PENDING_VOLUME = 1 << 1;
const RECEIVED_SPEED = 1 << 2;
const PROCESSED_SPEED = 1 << 3
const PENDING_COUNT = 1 << 4;
const STATUS = 1 << 5;
const DEBUG = 1 << 6;
const CHILDREN = 1 << 7;

class StructData {

    constructor(parent, cfg) {
        // ??
        this.BANDWIDTH = 1 << 0
        this.PENDING_VOLUME = 1 << 1;
        this.RECEIVED_SPEED = 1 << 2;
        this.PROCESSED_SPEED = 1 << 3
        this.PENDING_COUNT = 1 << 4;
        this.STATUS = 1 << 5;
        this.DEBUG = 1 << 6;
        this.CHILDREN = 1 << 7;
        //

        this.Parent = parent;
        this.Level = cfg.Level;
        this.Group = cfg.Group;
        this.Name = cfg.Name;
        this.DataKey = cfg.DataKey;
        this.DataMask = cfg.DataMask;

        this.HasBandwidth = (this.DataMask & BANDWIDTH) > 0;
        this.HasPendingVolume = (this.DataMask & PENDING_VOLUME) > 0;
        this.HasReceivedSpeed = (this.DataMask & RECEIVED_SPEED) > 0;
        this.HasProcessedSpeed = (this.DataMask & PROCESSED_SPEED) > 0;
        this.HasPendingCount = (this.DataMask & PENDING_COUNT) > 0;
        this.HasStatus = (this.DataMask & STATUS) > 0;
        this.HasDebug = (this.DataMask & DEBUG) > 0;
        this.HasChildren = (this.DataMask & CHILDREN) > 0;
        this.SumupDataMask = this.DataMask;
        this.Enabled = false;
        this.Debug = 0;
        //

        this.Children = [];
        if (this.HasChildren && cfg.Children != null) {
            // if (!this.Children) {
            for (let i = 0; i < cfg.Children.length; i++) {
                let child = new StructData(this, cfg.Children[i]);
                this.Children.push(child);
                this.SumupDataMask = this.SumupDataMask | child.SumupDataMask;
            }
        }

        this.HasSumupBandwidth = (this.SumupDataMask & BANDWIDTH) > 0;
        this.HasSumupPendingVolume = (this.SumupDataMask & PENDING_VOLUME) > 0;
        this.HasSumupReceivedSpeed = (this.SumupDataMask & RECEIVED_SPEED) > 0;
        this.HasSumupProcessedSpeed = (this.SumupDataMask & PROCESSED_SPEED) > 0;
        this.HasSumupPendingCount = (this.SumupDataMask & PENDING_COUNT) > 0;

        this.Bandwidth = 0;
        this.PendingVolume = 0;
        this.ReceivedSpeed = 0;
        this.ProcessedSpeed = 0;
        this.PendingCount = 0;
    }

    update(stats) {
        if (this.Parent == null) {
            stats = { Children: stats };
        }

        this.Bandwidth = 0;
        this.PendingVolume = 0;
        this.ReceivedSpeed = 0;
        this.ProcessedSpeed = 0;
        this.PendingCount = 0;

        if (this.HasBandwidth) this.Bandwidth = stats.Bandwidth;
        if (this.HasPendingVolume) this.PendingVolume = stats.PendingVolume;
        if (this.HasReceivedSpeed) this.ReceivedSpeed = stats.ReceivedSpeed;
        if (this.HasProcessedSpeed) this.ProcessedSpeed = stats.ProcessedSpeed;
        if (this.HasPendingCount) this.PendingCount = stats.PendingCount;

        if (this.HasStatus) this.Enabled = stats.Enabled;
        if (this.HasDebug) this.Debug = stats.Debug;

        if (this.HasChildren) {
            for (let i = 0; i < stats.Children.length; i++) {
                let childStats = stats.Children[i];
                let child = this.Children[i];
                child.update(childStats);

                if (child.HasSumupBandwidth) this.Bandwidth += child.Bandwidth;
                if (child.HasSumupPendingVolume) this.PendingVolume += child.PendingVolume;
                if (child.HasSumupReceivedSpeed) this.ReceivedSpeed += child.ReceivedSpeed;
                if (child.HasSumupProcessedSpeed) this.ProcessedSpeed += child.ProcessedSpeed;
                if (child.HasSumupPendingCount)
                    this.PendingCount += child.PendingCount;
            }
        }
    }

    getChartData() {
        if (this.HasSumupBandwidth) {
            return { time: new Date(), value: this.Bandwidth };
        }
        else if (this.HasSumupProcessedSpeed) {
            return { time: new Date(), value: this.ProcessedSpeed };
        }
        else if (this.HasSumupReceivedSpeed) {
            return { time: new Date(), value: this.ReceivedSpeed };
        }
        else return null;
    }

    getPath() {
        let current = this;
        let path = {};
        while (current.Parent != null) {
            path[current.Level] = current.DataKey;
            current = current.Parent;
        }
        return path;
    }

}
</script>
<style>
ui,
li {
    list-style: none;
}

.custome-background {
    background-color: #373737;
}

.treeview {
    margin-top: 20px;
    position: relative;
}

.thumnail {
    text-align: center;
    color: darkslateblue;
    font-family: Garamond, serif;
    font-size: 50px;
}
</style>