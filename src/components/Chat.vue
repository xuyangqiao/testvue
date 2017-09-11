<template>
    <div class="chart-right">
        <div class="chart-k-wrap">
            <h4 class="chart-k-title" v-html="chatConfig.youname"></h4>
            <div class="chart-k-body" id="wrapperasdfghj">
                <div class="tips-news" v-if="isLoad" @click="loadmore()">
                    <p>{{$lang('加载更多数据')}}</p>
                </div>
                <div class="tips-news" v-else>
                    <p>{{$lang('暂无聊天记录')}}</p>
                </div>
                <Message :isLeft="!item.isAdmin" :role="item.role" :time="item.time" :isEnd="item.isEnd" :isStart="item.isStart" :value="item.data" :src="item.src" v-for="(item,i) in messages" :key="i"></Message>
                <!--<Message :isLeft="false"></Message>-->
                <!--<div class="tips-news">
                                                                                                                            <p>{{$lang('以上为昨日聊天记录')}}</p>
                                                                                                                        </div>
                                                                                                                        <div class="tips-news">
                                                                                                                            <span>2017-06-05  19:03</span>
                                                                                                                            <p>{{$lang('V端已上传文件')}}</p>
                                                                                                                        </div>-->
            </div>
            <div class="chart-k-footer" v-if="!isHistory">
                <div class="edit-other">
                    <a href="javascript:;" class="photo-icon">
                        <input type="file" id="file" name="image" @change="sendPrivateImg" accept="image/gif, image/jpeg, image/png">
                    </a>
                    <a href="javascript:;" class="face-icon" @click="showEmoji=!showEmoji"></a>
                    <ul class="emoji-wrapper" v-show="showEmoji">
                        <li v-for="(item,i) in emoji" :key="i" class="webim-emoji-item" @click="selectEmoji(item)"><img :src="getUrl(item)" /></li>
                    </ul>
                </div>

                <textarea :placeholder="$lang('请输入……')" rows="4" v-model="content"></textarea>
                <div class="btn-right">
                    <el-button type="sure" :disabled="isdisabled" @click="sendGroupText">{{$lang('发送')}}</el-button>
                    <el-button type="sure" v-if="chatConfig.userphone&&chatConfig.youphone" :disabled="Boolean(istimeout)" @click="sendMessageText">{{$lang('短信发送')}}({{istimeout}}s)</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
/*.chart-k-body{
    position: relative;
}*/

.photo-icon {
    overflow: hidden;
}

.emoji-wrapper {
    z-index: 1;
    position: absolute;
    width: 280px;
    height: 194px;
    bottom: 50px;
    left: -40px;
    border-radius: 2px;
    background: #fff;
    box-sizing: border-box;
    padding: 4px;
    box-shadow: rgba(0, 0, 0, 0.298039) 0px 4px 12px 0px;
}

.emoji-wrapper li {
    cursor: pointer;
    display: inline-block;
    margin: 2px 3px 0 3px;
}

.edit-other {
    position: relative;
}

#file {
    opacity: 0;
    height: 100%;
}

.small-img {
    width: 150px;
}
</style>

<script>
import emojs from '@/apis/emojs.js'
import Message from '@/components/Message'
import { saveChatMsg, getChatMsgList, vsendToS } from '@/apis/task'
import { getUserInfo } from '@/apis/storage.js'
import moment from 'moment'
import { client, uploadFile, progress } from '@/apis/uploadFile'
console.log("...", getUserInfo())
var conn = {};
conn = new WebIM.connection({
    isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
    https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
    url: WebIM.config.xmppURL,
    isAutoLogin: true,
    heartBeatWait: WebIM.config.heartBeatWait,
    autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
    autoReconnectInterval: WebIM.config.autoReconnectInterval
});

/* 缓存消息处理 */
// function detailMessage(data,from,type,id){
//     var localContent = new Array();
//     if (localStorage[group]) {
//         localContent = JSON.parse(localStorage[group]);
//     }
//     localContent[localContent.length] = {
//         'time':crtTimeFtt(),
//         'data':data,//数据
//         'from':from,//谁发的
//         'type':type,//文本类型 text,emoji,file,picture
//         'id':id//消息id
//     };
//     localStorage[group] = JSON.stringify(localContent);//存储本地；
// }
export default {
    components: { Message },
    props: {
        chatConfig: {
            type: Object,
            default: function() {
                return {}
            }
        },
        isHistory: {
            type: Boolean,
            default: false
        },
        isReserve: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            content: "",
            groupid: "",
            send: false,
            showEmoji: false,
            emoji: emojs,
            messages: [],
            isLoad: false,
            currentPage: 1,
            lastTime: Date.now(),
            isdisabled: true,
            istimeout: 0

        }
    },
    mounted() {
        const that = this;
        // var conn = {};

        conn.listen({
            onOpened: function(message) {          //连接成功回调，连接成功后才可以发送消息
                //如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
                // 手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
                // 所以无需调用conn.setPresence();
                console.log("%c [opened] 连接已成功建立", "color: green")
            },
            onTextMessage: function(message) {
                // 在此接收和处理消息，根据message.type区分消息来源，私聊或群组或聊天室
                console.log(message);
                // document.getElementById(that.id)
                if (message.type == "groupchat") {
                    message.isAdmin = !that.isReserve;
                    message.src = that.chatConfig.youimg
                    message.time = Date.now()
                    message.role = that.chatConfig.youRole
                    that.messages.push(message);
                    that.scrollTop();
                }
            },  //收到文本消息
            onEmojiMessage: (message) => {
                // 当为WebIM添加了Emoji属性后，若发送的消息含WebIM.Emoji里特定的字符串，connection就会自动将
                // 这些字符串和其它文字按顺序组合成一个数组，每一个数组元素的结构为{type: 'emoji(或者txt)', data:''}
                // 当type='emoji'时，data表示表情图像的路径，当type='txt'时，data表示文本消息
                for (var i = 0; i < message.data.length; i++) {
                    var img = message.data[i];
                    var string;
                    if (img.type == 'txt') { string = string + img.data; }
                    else { string = string + '<img class="emoji" ' + 'src="' + img.data + '" />'; }
                }
                string = string.replace('undefined', '');
                if (message.type == "groupchat") {
                    this.messages.push({
                        data: string,
                        src: that.chatConfig.youimg,
                        isAdmin: !that.isReserve,
                        role: that.chatConfig.youRole,
                        time: Date.now()
                    })
                    that.scrollTop();
                }

            },   //收到表情消息
            onPictureMessage: (message) => {
                var that = this;
                if (message.type == "groupchat") {
                    that.messages.push({
                        data: `<img src="${message.url}" class='small-img'/>`,
                        src: that.chatConfig.youimg,
                        isAdmin: !that.isReserve,
                        role: that.chatConfig.youRole,
                        time: Date.now()
                    })
                    that.scrollTop();
                }
            }, //收到图片消息
            onFileMessage: (message) => {
                console.log("File", message);
                var that = this;
                if (message.type == "groupchat") {
                    that.messages.push({
                        data: `<img src="${message.url}" class='small-img'/>`,
                        time: Date.parse(new Date()),
                        isAdmin: !that.isReserve,
                        role: that.chatConfig.youRole,
                        time: Date.now()
                    })
                    that.scrollTop();
                }
            },    //收到文件消息
            onOnline: function() {
                console.log('onLine');
            },                  //本机网络连接成功
            onOffline: function() {
                console.log('offline');
            },                 //本机网络掉线
            onError: function(message) {
                console.log('Error');
                console.log(message);
                if (message && message.type == 1) {
                    console.warn('连接建立失败！请确认您的登录账号是否和appKey匹配。')
                }
            }
        })


        // //当前用户登录
        // conn.close();
        this.userLogin();
        // //创建全组
        // this.createGroup()
        this.messages = [];
        setTimeout(() => {
            this.getChatList();
        }, 2000)
    },
    methods: {
        loadmore() {
            this.currentPage = this.currentPage + 1;
            this.getChatList()
        },
        getChatList() {
            getChatMsgList({ currentPage: this.currentPage, pageSize: 20, groupId: this.chatConfig.groupid, time: this.lastTime }).then(res => {
                if (res.success) {

                    if (res.data.result.length) {
                        this.isLoad = true;
                        res.data.result.forEach((item, i) => {
                            const { data, fromUser, time } = item;
                            this.messages.unshift({
                                isStart: i == 0 ? true : false,
                                data,
                                isAdmin: fromUser == this.chatConfig.userid ? this.isReserve : !this.isReserve,
                                src: fromUser == this.chatConfig.userid ? this.chatConfig.userimg : this.chatConfig.youimg,
                                isEnd: i === res.data.result.length - 1 ? true : false,
                                time: time,
                                role: fromUser == this.chatConfig.userid ? this.chatConfig.userRole : this.chatConfig.youRole,
                            })
                            if (i === res.data.result.length - 1) {
                                this.lastTime = time;
                            }
                            this.scrollTop(200);
                        })
                    } else {
                        this.isLoad = false;
                    }
                    this.isdisabled = false;
                }
            })
        },
        scrollTop() {
            setTimeout((num) => {
                var div = document.getElementById("wrapperasdfghj");
                div.scrollTop = div.scrollHeight + 500;

            }, 500)
        },
        sendPrivateImg() {
            var id = conn.getUniqueId();                   // 生成本地消息id
            var msg = new WebIM.message('file', id);        // 创建文件消息
            var input = document.getElementById('file');  // 选择文件的input  id必填
            var file = WebIM.utils.getFileUrl(input);      // 将文件转化为二进制文件
            var allowType = { 'jpg': true, 'gif': true, 'png': true, 'bmp': true, 'zip': true, 'txt': true, 'doc': true, 'pdf': true };
            var file_url;
            if (file.filetype.toLowerCase() in allowType) {
                var option = {
                    apiUrl: WebIM.config.apiURL,
                    file: file,
                    to: this.chatConfig.groupid,                       // 接收消息对象
                    roomType: false,
                    onFileUploadError: function() {      // 消息上传失败
                        console.log('onFileUploadError');
                    },
                    onFileUploadComplete: function(aa) {   // 消息上传成功
                        console.log('onFileUploadComplete', aa);
                        file_url = aa.uri + "/" + aa.entities[0].uuid;
                    },
                    success: () => {
                        // this.setMessage({
                        //     data: `<img src="${file_url}" class='small-img'/>`,
                        //     src: this.chatConfig.userimg,
                        //     isAdmin: this.isReserve,
                        //     role: this.chatConfig.userRole,
                        // })
                    },
                    flashUpload: WebIM.flashUpload
                };
                msg.set(option);
                msg.setGroup('groupchat');
                conn.send(msg.body);

                client.then(oss => {
                    oss.multipartUpload(`/chat/${this.$route.query.id}/_${Math.random().toString(36).substring(2)}-${Date.now()}-${file.filename}`, file.data, {
                        progress: function* (p) { console.log(p); }
                    }).then(data => {
                        this.setMessage({
                            data: `<img src="${data.url || data.res.requestUrls[0].replace(/\?.*/gm, '')}" class='small-img'/>`,
                            src: this.chatConfig.userimg,
                            isAdmin: this.isReserve,
                            role: this.chatConfig.userRole,
                        });
                    });
                })
            }
        },
        getUrl(item) {
            return require('../assets/faces/' + item.value)
        },
        selectEmoji(item) {
            this.content += item.name;
            this.showEmoji = false;
        },
        userLogin() {
            console.log(`我${this.chatConfig.userid}登录了,要在${this.chatConfig.groupid}聊天`)
            const options = {
                apiUrl: WebIM.config.apiURL,
                user: this.chatConfig.userid,
                pwd: "96e79218965eb72c92a549dd5a330112",
                appKey: WebIM.config.appkey
            };
            conn.open(options);
            localStorage[this.chatConfig.groupid] = localStorage[this.chatConfig.groupid] || [];
        },
        sendGroupText() {
            if (!this.content) {
                return;
            }
            this.__sendGroupText(this.content, () => {
                setTimeout(() => { this.content = "" }, 0)
            })
        },
        __sendGroupText(content, successfn) {
            var id = conn.getUniqueId();            // 生成本地消息id
            var msg = new WebIM.message('txt', id); // 创建文本消息
            var option = {
                msg: content,             // 消息内容
                to: this.chatConfig.groupid,                     // 接收消息对象(群组id) 1500193488586
                roomType: false,
                // chatType: 'chatRoom',
                success: (respData) => {
                    console.log('send room text success', respData);
                    //缓存发送数据
                    var emojiMessage = WebIM.utils.parseEmoji(content);
                    this.setMessage({
                        data: emojiMessage,
                        src: this.chatConfig.userimg,
                        isAdmin: this.isReserve,
                        role: this.chatConfig.userRole,
                    })
                    successfn && successfn()
                },
                fail: function() {
                    console.log('failed');
                }
            };
            msg.set(option);
            msg.setGroup('groupchat');
            conn.send(msg.body);
        },
        setMessage({ data, src, isAdmin }) {
            this.messages.push({ data, src, isAdmin, role: this.chatConfig.userRole });
            saveChatMsg({
                time: Date.now(),
                data: data,
                fromUser: this.chatConfig.userid,
                groupId: this.chatConfig.groupid
            }).then(res => {
                console.log("res...", res)
            })
            this.scrollTop();
        },
        sendMessage(fileName) {
            this.__sendGroupText(`系统消息：${moment().format('YYYY-MM-DD HH:mm:ss')}  ${this.chatConfig.username}用户上传${fileName}文件`)
        },
        sendMessageText() {
            if (!this.content) {
                return;
            }
            if (this.istimeout) {
                return;
            }
            vsendToS(this.chatConfig.userphone, this.chatConfig.youphone, this.content, this.chatConfig.id).then((res) => {
                console.log("message", res)
            })
            this.__sendGroupText(this.content, () => {
                this.istimeout = 60 * 10;

                var timeid = setInterval(() => {
                    this.istimeout = this.istimeout - 1;
                    if (this.istimeout <= 0) {
                        clearInterval(this.timeid);
                        this.istimeout = 0;
                    }
                }, 1000);

                setTimeout(() => { this.content = "" }, 0)
            })


        }
    }
}

</script>