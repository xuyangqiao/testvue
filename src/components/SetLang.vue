<template>
    <div>
        <p>
            <a href="javascript:;" class="nh-a-03" :class="{selected:(lang=='CN' || lang==null)}" @click="$setLang('CN')">中文</a>
            <span>|</span>
            <a href="javascript:;" class="nh-a-03" :class="{selected:lang=='EN'}" @click="$setLang('EN')">English</a>
        </p>
    </div>
</template>
