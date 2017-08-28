<template>
    <div>
        <div class="index-addmod-01">
            <div class="addmod-01-main">
                <div class="addmod-title">
                <p><span>{{$lang('如何实现100%无差错交付？')}}</span></p>
                <p>{{$lang('VSWORK创新在线策略')}}</p>
                </div>
                <div class="box-flex-media-box">
                    <div class="addmod-left-img"></div>
                    <div class="flex1">
                    <dl class="addmod-dl">
                        <dt>{{$lang('任务发包者')}}</dt>
                        <dd>{{$lang('将您的项目和要求告诉VSWORK，并为您的项目自行定价或根据VSWORK的建议顶级，在VSWORK完成安全支付。')}}</dd>
                    </dl>
                    <dl class="addmod-dl">
                        <dt>{{$lang('项目管理者')}}</dt>
                        <dd>{{$lang('通过VSWORK严格测评的在线项目管理者，将从任务标准化分拆开始，作为您的“在线项目经理”全程管理项目进程，直至完成交付。')}}</dd>
                    </dl>
                    <dl class="addmod-dl">
                        <dt>{{$lang('在线工作者')}}</dt>
                        <dd>{{$lang('VSWORK为在线工作者提供经由标准化分拆的任务包，令任务和工作者之间能够进行精准匹配，并大大缩短工作时间，以及确保任务交付。')}}</dd>
                    </dl>
                    </div>
                </div>
            </div>
        </div>
        <div class="index-addmod-02">
            <div class="addmod-02-main">
                <div class="addmod-title">
                <p><span>{{$lang('VSWORK如何工作')}}</span></p>
                </div>
                <el-row :gutter="20">
                    <el-col :span="6" class="addmod-info">
                        <i class="addmod-i addmod-i-01"></i>
                        <h4>{{$lang('任务发布')}}</h4>
                        <p>{{$lang('发布并描述您的项目，VSWORK将为您匹配最佳在线项目管理者（S），开始管理您的项目。')}}</p>
                    </el-col>
                    <el-col :span="6" class="addmod-info">
                        <i class="addmod-i addmod-i-02"></i>
                        <h4>{{$lang('任务拆分')}}</h4>
                        <p>{{$lang('在线项目管理者（S）将您的项目分拆成标准化的VSWORK任务，并为您匹配雇用在线工作者（V）。')}}</p>
                    </el-col>
                    <el-col :span="6" class="addmod-info">
                        <i class="addmod-i addmod-i-03"></i>
                        <h4>{{$lang('进程管理')}}</h4>
                        <p>{{$lang('在VSWORK，您项目的全部工作进程将由在线项目管理者（S）全程管理，并确保项目在预定时间内交付。')}}</p>
                    </el-col>
                    <el-col :span="6" class="addmod-info">
                        <i class="addmod-i addmod-i-04"></i>
                        <h4>{{$lang('在线验收')}}</h4>
                        <p>{{$lang('在在线项目管理者（S）的协助下，VSWORK为您提供适配项目应用场景的在线验收方式，并帮助您完成安全支付。')}}</p>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>