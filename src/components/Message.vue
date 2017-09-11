<template>
    <div>
        <div :class="roleName" v-if="!isTip">
            <div class="c-header">
                <img :src="src" class="header-img" />
                <i class="sfzm-i">
                    <img src="../assets/images/b-icon.png" v-if="role=='B'" />
                    <img src="../assets/images/s-icon.png" v-if="role=='S'" />
                    <img src="../assets/images/v-icon.png" v-if="role=='V'" />
                </i>
            </div>
            <div class="c-body">
                <p class="c-body_time">{{getTime(time)}}</p>
                <div class="c-body_main">
                    <p class="talk-p" v-html="value" ref="msg"></p>
                </div>
                <i class="zx-jt"></i>
                <!--<span class="read-state on">{{statusName}}</span>-->
            </div>

        </div>
        <div class="tips-news" v-else>
            <p v-html="value"></p>
        </div>
        <div class="tips-news" v-if="isEnd">
            <p>{{$lang('以上为聊天记录')}}</p>
        </div>

        <image-box ref="imageBox" />
    </div>
</template>
<script>
import moment from 'moment'
import ImageBox from '@/views/imagebox'

export default {
    components: { ImageBox },
    props: {
        status: {
            type: String,
            default: ""
        },
        src: {
            type: String,
            default: require("../assets/images/hdr.png")
        },
        value: {
            type: String,
            default: ""
        },
        isLeft: {
            type: Boolean,
            default: true
        },
        isEnd: {
            type: Boolean,
            default: false
        },
        isStart: {
            type: Boolean,
            default: false
        },
        time: {
            type: Number
        },
        role: {
            type: String,
            default: ""
        }
        //   isTip:{
        //       type:Boolean,
        //       default:false
        //   }
    },
    computed: {
        statusName() {
            var a = '已读'
            switch (this.status) {
                case 'Undelivered':
                    a = '未送达';
                    break;
                case 'Delivered':
                    a = '已送达';
                    break;
                case 'Read':
                    a = '已读';
                default:
            }
            return a;
        },
        roleName() {
            return this.isLeft ? ["talk-item", "clearfix", "talk-other-wrap"] : ["talk-item", "clearfix", "talk-me-wrap"]
        },
        isTip: {
            get() {
                return this.value.search(/^系统消息/) > -1 ? true : false
            }
        }
    },
    methods: {
        getTime(time) {
            return moment(time).format("YYYY-MM-DD HH:mm:ss");
        },
        selectMessage(e) {
            if (e.target.localName == 'img') {
                e.target.style.width = 'auto';
            }
        }
    },
    mounted() {
        if (/^<img/gm.test(this.value)) {
            this.$refs.msg.firstElementChild.addEventListener('click', e => this.$refs.imageBox.open(e.currentTarget.src));
            let download = document.createElement('a');
            download.target = '_blank';
            download.innerHTML = '下载';
            download.classList.add('download-img');
            download.onclick = () => {
                let url = this.$refs.msg.firstElementChild.src;
                fetch(url).then(r => r.blob()).then(o => {
                    console.log(o);
                    let a = document.createElement('a'), data = new Blob([o], { type: o.type });
                    a.href = URL.createObjectURL(data);
                    a.download = url.replace(/.*\//gmi, '');
                    a.click();
                    URL.revokeObjectURL(url);
                });
            }
            this.$refs.msg.appendChild(download);
        }
    }
}
</script>
<style>
.sfzm-i img {
    width: 15px;
    height: 15px;
}

.talk-p {
    position: relative;
}

.talk-p a.download-img {
    right: 0px;
    bottom: 0px;
    display: none;
    cursor: pointer;
    color: #ffffff;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 2px;
    padding: 0px 5px;
}

.talk-p:hover a.download-img {
    display: inline-block;
}

.talk-p .talk-p img {
    max-width: 100%;
}
</style>