<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#337ab7">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装报修</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						工装编码
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="form.CODE" placeholder=" " :focus="autoFocus" @confirm="getLoadScraperData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						工装名称
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.TONGS_TYPE_NAME" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						组织架构
					</view>
					<view class="form-value disabled ">
						<input class="form-input" disabled type="text" v-model="form.ORGANIZE_NAME">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						来源
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.SOURCES_NAME" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						状态
					</view>
					<view class="form-value disabled">
						<picker disabled mode="selector" :range="NameList" range-key="STATUS" @change="handlePickeLine">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="NameList[NameIndex] ? NameList[NameIndex].STATUS : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view>
				<!-- <view class="form-item">
					<view class="form-label align-right">
						呼叫类型
					</view>
					<view class="form-value">
						<picker mode="selector" :range="CallType" range-key="CALL_CODE" @change="CallChange">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="CallType[CallIndex] ? CallType[CallIndex].CALL_CODE : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view> -->
			</view>
		</view>

		<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
			<div class="toolbar-item">
				<view class="toolbar-btn" @tap="resetFormData(true)">
					<image src="../../static/icon/reset.png" mode="widthFix" class="icon-x"></image>
					<text class="tix">清除</text>
				</view>
				<view class="toolbar-btn primary" @tap="submitForm">
					<text class="tix">提交</text>
				</view>
			</div>
		</view>
	</gracePage>
</template>

<script src="./index.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 5em!important;	
	}
	.form-txt{
		font-size: 32rpx;
		border: none !important;
		line-height: 60rpx;
	}
</style>
