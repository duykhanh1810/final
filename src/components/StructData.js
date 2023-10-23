const BANDWIDTH = 1 << 0;
const PENDING_VOLUME = 1 << 1;
const RECEIVED_SPEED = 1 << 2;
const PROCESSED_SPEED = 1 << 3
const PENDING_COUNT = 1 << 4;
const STATUS = 1 << 5;
const DEBUG = 1 << 6;
const CHILDREN = 1 << 7;

class StructData {
    static init(arr) {
        return new StructData(null,
            { Level: "Hub", Name: "Hub", DataKey: "Hub", DataMask: CHILDREN, Children: arr });
    }

    constructor(parent, cfg) {
        this.Parent = parent;
        this.Level = cfg.Level;
        this.Group = cfg.Group;
        this.Name = cfg.Name;
        this.DataKey = cfg.DataKey;
        this.DataMask = cfg.DataMask;
        // Has its own data
        this.HasBandwidth = (this.DataMask & BANDWIDTH) > 0;
        this.HasPendingVolume = (this.DataMask & PENDING_VOLUME) > 0;
        this.HasReceivedSpeed = (this.DataMask & RECEIVED_SPEED) > 0;
        this.HasProcessedSpeed = (this.DataMask & PROCESSED_SPEED) > 0;
        this.HasPendingCount = (this.DataMask & PENDING_COUNT) > 0;

        this.HasStatus = (this.DataMask & STATUS) > 0;
        if (this.HasStatus)
            this.Enabled = false;

        this.HasDebug = (this.DataMask & DEBUG) > 0;
        if (this.HasDebug)
            this.Debug = 0;

        this.HasChildren = (this.DataMask & CHILDREN) > 0;
        this.SumupDataMask = this.DataMask;
        // Create children struct
        if (this.HasChildren) {
            this.Children = [];
            for (let i = 0; i < cfg.Children.length; i++) {
                let child = new StructData(this, cfg.Children[i]);
                this.Children.push(child);
                this.SumupDataMask = this.SumupDataMask | child.SumupDataMask;
            }
        }
        // Has data from its own children
        this.HasSumupBandwidth = (this.SumupDataMask & BANDWIDTH) > 0;
        this.HasSumupPendingVolume = (this.SumupDataMask & PENDING_VOLUME) > 0;
        this.HasSumupReceivedSpeed = (this.SumupDataMask & RECEIVED_SPEED) > 0;
        this.HasSumupProcessedSpeed = (this.SumupDataMask & PROCESSED_SPEED) > 0;
        this.HasSumupPendingCount = (this.SumupDataMask & PENDING_COUNT) > 0;
        // Init data to 0
        if (this.HasSumupBandwidth)
            this.Bandwidth = 0;
        if (this.HasSumupPendingVolume)
            this.PendingVolume = 0;
        if (this.HasSumupReceivedSpeed)
            this.ReceivedSpeed = 0;
        if (this.HasSumupProcessedSpeed)
            this.ProcessedSpeed = 0;
        if (this.HasSumupPendingCount)
            this.PendingCount = 0;
    }

    update(stats) {
        if (this.Parent == null) {
            stats = { Children: stats };
        }
        // Reset data to 0
        if (this.HasSumupBandwidth)
            this.Bandwidth = 0;
        if (this.HasSumupPendingVolume)
            this.PendingVolume = 0;
        if (this.HasSumupReceivedSpeed)
            this.ReceivedSpeed = 0;
        if (this.HasSumupProcessedSpeed)
            this.ProcessedSpeed = 0;
        if (this.HasSumupPendingCount)
            this.PendingCount = 0;
        // Assign its own data
        if (this.HasBandwidth)
            this.Bandwidth = stats.Bandwidth;
        if (this.HasPendingVolume)
            this.PendingVolume = stats.PendingVolume;
        if (this.HasReceivedSpeed)
            this.ReceivedSpeed = stats.ReceivedSpeed;
        if (this.HasProcessedSpeed)
            this.ProcessedSpeed = stats.ProcessedSpeed;
        if (this.HasPendingCount)
            this.PendingCount = stats.PendingCount;

        if (this.HasStatus)
            this.Enabled = stats.Enabled;
        if (this.HasDebug)
            this.Debug = stats.Debug;
        // Calculate children data and sumup to this
        if (this.HasChildren) {
            for (let i = 0; i < stats.Children.length; i++) {
                let childStats = stats.Children[i];
                let child = this.Children[i];
                child.update(childStats);

                if (child.HasSumupBandwidth)
                    this.Bandwidth += child.Bandwidth;
                if (child.HasSumupPendingVolume)
                    this.PendingVolume += child.PendingVolume;
                if (child.HasSumupReceivedSpeed)
                    this.ReceivedSpeed += child.ReceivedSpeed;
                if (child.HasSumupProcessedSpeed)
                    this.ProcessedSpeed += child.ProcessedSpeed;
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

export default {
    data() {
        return {
            structData: null
        };
    },
    mounted() {
        this.initializeStructData();
        this.updateStructData();
    },
    methods: {
        initializeStructData() {
            const arr = [
                // Define your data structure here
            ];
            this.structData = StructData.init(arr);
        },
        updateStructData() {
            // Simulate receiving stats data
            const stats = {
                Bandwidth: 100,
                PendingVolume: 50,
                ReceivedSpeed: 200,
                ProcessedSpeed: 150,
                PendingCount: 10,
                Enabled: true,
                Debug: 1,
                Children: [
                    // Define your child stats data here
                ]
            };
            this.structData.update(stats);
        }
    }
};