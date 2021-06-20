<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#337ab7">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">拆分条码</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view @submit="submitForm" class="form-content">
				<view class="form-item">
					<text class="form-label align-right">旧条码</text>
					<view class="form-value">
						<input ref="oldBarcode" :maxlength="-1" :selection-start="currentSelection === 'oldBarcode' && selection ? selectionStart : 0"
						 :selection-end="currentSelection === 'oldBarcode' && selection ? selectionEnd : -1" type="text" :focus="autoFocus"
						 @focus.stop="handleFocus('oldBarcode', formData.oldBarcode)" @confirm="handleCheckOldBarcode" v-model="formData.oldBarcode"
						 @input="selection = false" class="form-input" placeholder="请输入旧条码" />
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">料号</text>
					<view class="form-value"><input type="text" v-model="netData.PART_NO" class="form-input" disabled placeholder="" /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">名称</text>
					<view class="form-value"><input type="text" v-model="netData.PART_NAME" class="form-input" disabled placeholder="" /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">数量</text>
					<view class="form-value"><input type="text" v-model="netData.ORIGINAL_QUANTITY" class="form-input" disabled
						 placeholder="" /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">描述</text>
					<view class="form-value"><input type="text" v-model="netData.PART_DESC" class="form-input" disabled placeholder="" /></view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">新条码</text>
					<view class="form-value">
						<input ref="newBarcode" :selection-start="currentSelection === 'newBarcode' && selection ? selectionStart : 0"
						 :selection-end="currentSelection === 'newBarcode' && selection ? selectionEnd : -1" type="text" :focus="autoNextFocus"
						 @focus.stop="handleFocus('newBarcode', formData.newBarcode)" @confirm="handleCheckNewBarcode" v-model="formData.newBarcode"
						 @input="selection = false" class="form-input" placeholder="请输入新条码" />
					</view>
				</view>
				<view class="form-item">
					<text class="form-label align-right">拆分数量</text>
					<view class="form-value no-border flex">
						<graceNumberBox style="margin-left: 10rpx;" @change="handleChange" inputPadding="0" btnFontSize="20px" btnSize="30rpx"
						 inputColor="#444444" inputHeight="60rpx" inputFontSize="18px" width="100px" :value="formData.original_qty"></graceNumberBox>
					</view>
				</view>
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn " @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<!-- <image src="../../static/icon/yes.png" mode="widthFix" class="icon-x"></image> -->
					<text class="tix">确定</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./splitBarcode.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';

	.form-label {
		width: 5em !important;
	}
</style>
