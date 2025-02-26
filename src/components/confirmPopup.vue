<template>
    <uni-popup ref="popup" :animation="true" type="center" @change="popChange" :mask-click="maskClick">
        <view class="c-popup-box">
            <slot name="title">
                <view class="c-popup-title" v-if="config?.titleName">
                    {{ config.titleName }}
                    <text class="iconfont ka-icon-ic_base_close_md_simple" v-if="config?.showCloseIcon" @click="handleClose"></text>
                </view>
            </slot>
            <slot name="content">
                <view class="content" style="white-space: pre-wrap; text-align: center">
                    {{ config?.content }}
                </view>
            </slot>
            <slot name="footer">
                <view class="footer_btn">
                    <view class="closeBtn" @click="handleClose" v-if="config.showCloseBtn">{{ config.closeBtnText }}</view>
                    <view class="confirmBtn" @click="handleConfirm" :style="confirmBtnStyle" v-if="config.showConfirmBtn">{{ config.confirmBtnText }}</view>
                </view>
            </slot>
        </view>
    </uni-popup>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
    configData: {
        type: Object,
        default: () => ({
            titleName: '',
            showCloseIcon: false,
            content: '',
            showCloseBtn: true,
            showConfirmBtn: true,
            closeBtnText: '取消',
            confirmBtnText: '确认',
        })
    },
    confirmBtnStyle: {
        type: Object,
        default: () => ({})
    },
    maskClick: {
        type: Boolean,
        default: true
    }
})

const popup = ref(null)

const config = computed(() => ({
    titleName: props.configData.titleName || '',
    showCloseIcon: props.configData.showCloseIcon ?? false,
    content: props.configData.content || '',
    showCloseBtn: props.configData.showCloseBtn ?? true,
    showConfirmBtn: props.configData.showConfirmBtn ?? true,
    closeBtnText: props.configData.closeBtnText || '取消',
    confirmBtnText: props.configData.confirmBtnText || '确认',
}))

const emit = defineEmits(['open', 'close', 'confirm', 'popChange'])

const open = () => {
    popup.value.open()
}

const close = () => {
    popup.value.close()
}

const handleClose = () => {
    close()
    emit('close')
}

const handleConfirm = () => {
    close()
    emit('confirm')
}

const popChange = (e) => {
    emit('popChange', e)
}

defineExpose({
    open, close
})
</script>

<style lang="scss" scoped>
$--gray-g-10: #101828;
$--gray-g-07: #667085;
$--gray-g-06: #939EAF;
$--gray-g-04: #D0D5DD;
$--primary-p-06: #F20;

.c-popup-box {
    width: 622rpx;
    background-color: #fff;
    border-radius: 24rpx;
    padding: 48rpx 32rpx 32rpx;

    .c-popup-title {
        position: relative;
        display: flex;
        justify-content: center;
        color: $--gray-g-10;
        font-size: 34rpx;
        font-weight: 500;
        margin-bottom: 16rpx;

        .ka-icon-ic_base_close_md_simple {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 32rpx;
            color: $--gray-g-06;
        }
    }

    .content {
        display: flex;
        justify-content: center;
        font-size: 28rpx;
        color: $--gray-g-07;
    }

    .footer_btn {
        display: flex;
        margin-top: 32rpx;
        height: 88rpx;
        font-size: 30rpx;

        .closeBtn, .confirmBtn {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 200rpx;
            font-weight: 500;
        }

        .closeBtn {
            border: 2rpx solid $--gray-g-04;
            margin-right: 16rpx;
            color: $--gray-g-10;
        }

        .confirmBtn {
            background-color: $--primary-p-06;
            color: #fff;
        }
    }
}
</style>
