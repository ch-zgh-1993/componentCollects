/**
 * @author zgh
 * @date 2018-08-30
 * @module showList
 * @description showList 页面
 *
 */

// 创造数据
const fakerData = {
    total: 40,
    data: []
};
for(let i = 0; i < 40; i++){
    fakerData.data.push({
        markProcess: [{
            labels: {
                level1: i,
                level2: i,
                level3: i
            }
        }],
        url: 'no-img.png'
    });
}

// 初始化实例
var app = new Vue({
    el: '#app',
    data() {
        return {
            model:{
                total: null,//总页数
                size:20,//每页显示条目个数不传默认10
                page:1,//当前页码
            },
            imgs: []
        }
    },
    methods:{
        //页码切换执行方法
        pageFn(val){
            this.model.page=val;
            getList(val, 20, this);
        }
    }
});

// 注册展示图片组件
Vue.component('img-group', {
    template: `
                    <figure>
                      <div class="img-wrapper">
                        <img v-bind:src="url">
                      </div>
                        <template v-for="obj in markProcess">
                            <label>{{ tagName(obj) }}</label>
                        </template>
                    </figure>
                `,
    props: ['url', 'mark-process'],
    methods: {
        tagName (obj) {
            let str = "";
            let labels = obj.labels;
            for(let i = 1; i < 4; i++){
                let index = labels['level' + i];
                if(index){
                    if(i === 1){
                        str += index;
                    }else{
                        str += ' / ' + index;
                    }
                }
            }
            return str;
        }
    },
    computed: {
    }
});

// 更新数据
function getList(page, pagesize, app){
    //  项目中自定义发送组件
    // Tool.request({
    //     type: 'get',
    //     data: 'page=' + page + '&pagesize=' + pagesize,
    //     url: '/getAllList',
    //     success (data) {
    //         if(app.model.total === null){
    //             app.model.total = data.total;
    //         }
    //         app.imgs = data.data;
    //     }
    // });
    let indexData = fakerData.data.slice((page-1)*pagesize, page*pagesize);
    let index = {
        total: fakerData.total,
        data: indexData
    };
    if(app.model.total === null){
        app.model.total = index.total;
    }
    app.imgs = index.data;
}

// init page
!function(){
    let content = document.getElementById('img_list');
    content.style.height = window.innerHeight - 200 + 'px';
}();