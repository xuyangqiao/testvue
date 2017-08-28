<template>
    <el-cascader clearable
        class="width-100-ts"
        expand-trigger="hover"
        :placeholder="$lang('专业分类')"
        :options="options"
        v-model="selected"
        @change="handleChange">
    </el-cascader>
</template>
<script>
    export default {
        props:{
            value:String,
            dataSource:{
                type:Array,
                default:()=>[]
            },
            defaultVal: {
                type:Array,
                default:()=>[]
            },
            onChange:Function
        },
        data(){
            return {
                // options:[],
                // selected:[]
            }
        },
        methods:{
            handleChange(value){
                // console.log(value)
                // console.log(this.selected);
                this.onChange(value[value.length-1],value)
            }
        },
        computed:{
            options(){
                return (this.dataSource||[]).map(item=>{
                    var a= {
                        value:item.key,
                        label:item.cnValue
                    }
                    if(item.list&&item.list.length){
                        Object.assign(a,{
                            children:(item.list||[]).map(item=>{
                                var b={
                                    value:item.key,
                                    label:item.cnValue,
                                }
                                if(item.list&&item.list.length){
                                    Object.assign(b,{
                                        children:(item.list||[]).map(item=>{
                                            return {
                                                value:item.key,
                                                label:item.cnValue
                                            }
                                        })
                                    })
                                }
                                return b;
                            })
                        })
                    }
                    return a;
                })
            },
            selected:{
                get(){
                    var data=[];
                    for(let i=0;i<this.dataSource.length;i++){
                        let item=this.dataSource[i];
                        if(item.key==this.value){
                            data.push(item.key);
                            break;
                        }
                        if(item.list&&item.list.length>0){
                            for(let j=0;j<item.list.length;j++){
                                let item1=item.list[j];
                                if(item1.key==this.value){
                                    data.push(item.key);
                                    data.push(item1.key);
                                    break;
                                }
                                if(item1.list&&item1.list.length>0){
                                    for(let k=0;k<item1.list.length;k++){
                                        let item2=item1.list[k];
                                        if(item2.key==this.value){
                                            data.push(item.key);
                                            data.push(item1.key);
                                            data.push(item2.key);
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    return data;
                }
            }
        },
        mounted(){
            // const AppClass = this.dataSource?this.dataSource:JSON.parse(sessionStorage.getItem("TaskParam")||{}).AppClass;
            // this.options=AppClass.map(item=>{
            //     return {
            //         value:item.key,
            //         label:item.cnValue,
            //         children:item.list.length>0?item.list.map(item=>{
            //             return {
            //                 value:item.key,
            //                 label:item.cnValue,
            //                 children:item.list.length>0?item.list.map(item=>{
            //                     return {
            //                         value:item.key,
            //                         label:item.cnValue
            //                     }
            //                 }):null
            //             }
            //         }):null
            //     }
            // })
        }
    }
</script>
