<template>
    <li>
        <div class="caret">
            <div class="description-container">
                <a class="description">Level: {{ data.Level }}</a>
                <a class="description">Name: {{ data.Name }}</a>
                <a class="description" v-if="data.Group">Group: {{ data.Group }}</a>
                <button v-if="hasChildren" @click="toggleChildren" class="btn btn-outline-success button-container">
                    <i :class="localShowChildren ? 'fas fa-angle-double-up' : 'fas fa-angle-double-down'"></i>
                </button>
            </div>
            <transition name="fade">
                <div v-if="localIsShow">
                    <highcharts :options="chartOptions"></highcharts>
                </div>
            </transition>
            <button @click="toggleChart" class="btn btn-outline-success">
                <i :class="localIsShow ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
            </button>
            <div class="data-container">
                <a class="datamask-enum">
                    Bandwidth:
                    <span class="data-value-g">{{ data.Bandwidth.toFixed(2) }} KBps</span>
                </a>
                <a class="datamask-enum">
                    Pending Volumn:
                    <span class="data-value-o">{{ data.PendingVolume.toFixed(2) }} KB</span>
                </a>
                <a class="datamask-enum">
                    Received Speed:
                    <span class="data-value-g">{{ data.ReceivedSpeed.toFixed(2) }} mps</span>
                </a>
                <a class="datamask-enum">
                    Processed Speed:
                    <span class="data-value-g">{{ data.ProcessedSpeed.toFixed(2) }} mps</span>
                </a>
                <a class="datamask-enum">
                    Pending Count:
                    <span class="data-value-o">{{ data.PendingCount.toFixed(2) }} mps</span>
                </a>
            </div>
        </div>
        <div v-if="localShowChildren">
            <ul v-if="data.Children" class="nested pl-5">
                <TreeviewCom v-for="(item, index) in data.Children" :key="index" :data="item" :is-show="localIsShow">
                </TreeviewCom>
            </ul>
        </div>
    </li>
</template>

<script>
import { Chart } from 'highcharts-vue'
// import moment from 'moment'  
export default {
    name: 'TreeviewCom',
    components: {
        highcharts: Chart
    },
    props: {
        data: Object,
        isShow: Boolean
    },
    data() {
        return {
            localIsShow: this.isShow,
            localShowChildren: false,
            counting: 0,

            chartOptions: {
                accessibility: {
                    enabled: false
                },
                chart: {
                    type: 'spline',
                    style: {
                        height: "350px",
                        width: "100%",
                    },
                    backgroundColor: "black",
                },
                title: {
                    text: ''
                },
                xAxis: {
                    tickPositions: [0, 450, 900, 1350, 1800], //4 khoang du lieu ma chart cung cap
                    labels: {
                        style: {
                            color: 'red' // Màu chữ cho trục X
                        },
                        formatter: function () {
                            switch (this.value) {
                                case 0: return '0';
                                case 450: return '15p';
                                case 900: return '30p';
                                case 1350: return '45p';
                                case 1800: return '60p';
                                default: return '';
                            }
                        }
                        // formatter: function () {
                        //     const minutes = Math.floor(this.value / 60); // Convert seconds to minutes
                        //     const seconds = this.value % 60; // Remaining seconds

                        //     return `${minutes}m ${seconds}s`;
                        // }
                    }
                },
                yAxis: {
                    labels: {
                        style: {
                            color: 'green', // Màu chữ cho trục y màu lục
                        }
                    },
                },
                series: [{
                    data: [this.data.Bandwidth],
                    colorData: [], //mảng màu của line
                    color: '#FF9900',
                    name: 'Bandwidth',
                    type: 'spline',
                    pointStart: 0, // Điểm bắt đầu của dữ liệu
                    pointInterval: 1, // Khoảng cách giữa các điểm dữ liệu
                    width: 2,
                    marker: {
                        enabled: false // Tắt hiển thị điểm dữ liệu
                    },
                }]
            }
        };
    },
    computed: {
        hasChildren() {
            return this.data.Children && this.data.Children.length > 0;
        },
    },
    methods: {
        toggleChart() {
            this.localIsShow = !this.localIsShow;
        },
        toggleChildren() {
            this.localShowChildren = !this.localShowChildren;
        },
        updateData(newData) {
            // this.chartOptions.series[0].data.push(newData.Bandwidth)            

            let price = newData.Bandwidth;
            this.counting++;
            if (this.counting < 1800) {
                this.chartOptions.series[0].data[this.counting] = price //Thay the phan tu thu count torng mang de hien thi ra bieu do
            }
            else {
                //Day phan tu price moi vao vi tri cuoi cung
                this.chartOptions.series[0].data.push(price);
                //Day phan tu dau tien cua mang ra ngoai
                this.chartOptions.series[0].data.shift();
            }
        },
    },
    created() {
        //Chay 1 vong lap 1800 lan
        for (var i = 0; i < 1800; i++) {
            this.chartOptions.series[0].data.push(null);
        }
        setInterval(this.getData, 1000);
    },
    watch: {
        data: {
            handler(newData, oldData) {
                console.log(this.data);
                console.log(oldData);
                console.log('Data changed: ', newData);
                this.updateData(newData);
            },
            deep: true
        }
    },
};

</script>

<style>
.caret {
    margin-bottom: 15px;
    background-color: #222221;
    padding: 20px;
    text-decoration: none;
    list-style: none;
    position: relative;
    border-radius: 10px;
}

.description {
    margin-right: 50px;
}

.description-container {
    margin-bottom: 15px;
}

.description,
.datamask-enum {
    text-decoration: none;
    list-style: none;
    color: #8f8fbe;
}

.data-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px;
    margin-top: 20px;
    text-decoration: none;
    list-style: none;
}

.data-value-o {
    color: orangered;
    /* Màu sắc của dữ liệu */
}

.data-value-g {
    color: greenyellow;
    /* Màu sắc của dữ liệu */
}

.button-container {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 38px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.1s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.group-name {
    color: #999;
    /* Định dạng màu sắc cho tên group */
    font-weight: bold;
    /* Định dạng đậm cho tên group */
    margin-top: 0.5rem;
    /* Thêm khoảng cách giữa các group */
}
</style>