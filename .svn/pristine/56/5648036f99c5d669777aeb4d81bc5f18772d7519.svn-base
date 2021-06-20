<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#337ab7">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">生产退料</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						物料条码
					</view>
					<view class="form-value">
						<input class="form-input" :maxlength="-1" type="text" v-model="form.reelCode" placeholder=" " :focus="autoFocus" @confirm="getLoadScraperData">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						物料料号
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.PART_CODE" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						物料规格
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.PART_DESC" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						领料单号
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.DOCNO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						工单号
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.MO" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						项次
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.LineNo" placeholder=" ">
					</view>
				</view>

				
				<view class="form-item">
					<view class="form-label align-right">
						库别
					</view>
					<view class="form-value disabled">
						<input class="form-input" disabled type="text" v-model="form.WH" placeholder=" ">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						退料数量
					</view>
					<view class="form-value">
						<input class="form-input" type="number" v-model="form.QUANTITY" placeholder=" " :focus="autoFocusNewLocation" @confirm="autoFocusNewLocation = false">
					</view>
				</view>
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
</style>
