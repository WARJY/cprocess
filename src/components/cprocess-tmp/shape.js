export const group = {
    size: { "width": 280, "height": 120 },
    shape: "vue-shape",
    zIndex: 1,
    data: {
        parent: true,
        rePosition: true,
        reSize: true
    },
    component: "Cgroup",
    ports: {
        groups: {
            in: {
                position: { name: 'left' },
            },
            out: {
                position: { name: 'right' },
            },
        },
        items: [
            { id: "in", group: "in" },
            { id: "out", group: "out" },
        ]
    },
    portMarkup: [
        {
            tagName: 'circle',
            selector: 'portBody',
            attrs: {
                r: 4,
                magnet: true,
                stroke: '#31d0c6',
                fill: '#fff',
                strokeWidth: 2,
            },
        },
    ],
}

export const action = {
    size: { "width": 250, "height": 50 },
    shape: "vue-shape",
    zIndex: 10,
    component: "Cchildren",
}

export const start = {
    size: { "width": 100, "height": 50 },
    shape: "vue-shape",
    zIndex: 10,
    component: "Cchildren",
    data: {
        type: "start",
        name: "开始"
    },
    ports: {
        groups: {
            out: {
                position: { name: 'right' },
            },
        },
        items: [
            { id: "out", group: "out" },
        ]
    },
    portMarkup: [
        {
            tagName: 'circle',
            selector: 'portBody',
            attrs: {
                r: 4,
                magnet: true,
                stroke: '#31d0c6',
                fill: '#fff',
                strokeWidth: 2,
            },
        },
    ],
}

export const end = {
    size: { "width": 100, "height": 50 },
    shape: "vue-shape",
    zIndex: 10,
    component: "Cchildren",
    data: {
        type: "end",
        name: "结束"
    },
    ports: {
        groups: {
            in: {
                position: { name: 'left' },
            },
        },
        items: [
            { id: "in", group: "in" },
        ]
    },
    portMarkup: [
        {
            tagName: 'circle',
            selector: 'portBody',
            attrs: {
                r: 4,
                magnet: true,
                stroke: '#31d0c6',
                fill: '#fff',
                strokeWidth: 2,
            },
        },
    ],
}