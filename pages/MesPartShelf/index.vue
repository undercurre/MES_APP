<template>
	<gracePage :customHeader="true">
		<graceHeader slot="gHeader" background="#337ab7">
			<view class="grace-header-body">
				<!-- 返回按钮 -->
				<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
				<!-- 中间内容 -->
				<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">上架</text></view>
			</view>
		</graceHeader>
		<view slot="gBody" class="grace-body">
			<view class="form-content">
				<view class="form-item">
					<view class="form-label align-right">
						储位
					</view>
					<view class="form-value ">
						<input class="form-input" type="text" v-model.trim="form.STORAGE" placeholder=" "  @focus="autoFocus = true;"
							 :focus="autoFocus" @blur="autoFocus = false;">
					</view>
				</view>
				<view class="form-item">
					<view class="form-label align-right">
						物料条码
					</view>
					<view class="form-value ">
						<input class="form-input" type="text" v-model.trim="form.CODE" placeholder=" " @focus="autoFocusNaN = false;"
							 :focus="autoFocusNaN" @blur="autoFocusNaN = false;"  @confirm="getLoadData">
					</view>
				</view>
				
				<view class="form-item">
					<u-table style="position: relative;height: 830rpx;overflow: auto;">
						<u-tr class="u-tr" style="display: -webkit-box;position: sticky;top: 0;">
							<u-th class="u-tr" style="width: 30%;flex: 0 0 30%;">料号</u-th>
							<u-th class="u-tr"style="width: 30%;flex: 0 0 30%;">条码</u-th>
							<u-th class="u-tr" style="width: 15%;flex: 0 0 15%;">储位</u-th>
							<u-th class="u-tr" style="width: 15%;flex: 0 0 15%;">数量</u-th>
							<!-- <u-th class="u-tr" style="width: 18%;flex: 0 0 18%;">点检数量</u-th> -->
							<!-- <u-th class="u-tr" style="width: 14%;flex: 0 0 14%;">条码</u-th> -->
						</u-tr>
						<u-tr class="u-tr" style="display: -webkit-box;" v-for="(item, index) in list" :key="index">
							<u-td class="u-tr" style="width: 30%;flex: 0 0 30%;overflow: hidden;line-height: 21px;">{{ item.PART_CODE }}</u-td>
							<u-td class="u-tr" style="width: 30%;flex: 0 0 30%;overflow: hidden;line-height: 21px;">{{ item.REEL_CODE }}</u-td>
							<u-td class="u-tr" style="width: 15%;flex: 0 0 15%;overflow: hidden;line-height: 21px;">{{ item.STORAGE }}</u-td>
							<u-td class="u-tr" style="width: 15%;flex: 0 0 15%;overflow: hidden;line-height: 21px;">{{ item.QTY }}</u-td>
							<!-- <u-td class="u-tr" style="width: 18%;flex: 0 0 18%;overflow: hidden;line-height: 21px;"  :style="{color: item.FEEDER_TYPE_TOTAL == 40 ? '#179415' : '#EF5757'}">{{ item.CHECK_QTY||0 }}</u-td> -->
							<!-- <u-td class="u-tr" style="width: 14%;flex: 0 0 14%;overflow: hidden;line-height: 21px;"><text class="detail" @tap="detailClick(item)">明细</text></u-td> -->
						</u-tr>
					</u-table>
				</view>
				<uni-pagination style="width: 100%;display: block;" show-icon="true" :total="totalCount" @change="changeReason3"
				 :current="form.Page">
				</uni-pagination>
				<!-- <view class="form-item">
					<view class="form-label align-right">
						料号
					</view>
					<view class="form-value">
						<picker mode="selector" :range="NameList" range-key="CHINESE" @change="handlePickeLine">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="NameList[NameIndex] ? NameList[NameIndex].CHINESE : ''"
								 placeholder=" ">
								<text class="grace-select-menu-icon icon-allow-b"></text>
							</div>
						</picker>
					</view>
				</view> -->
				<!-- <view class="form-item">
					<view class="form-label align-right">
						状态
					</view>
					<view class="form-value disabled">
						<picker mode="selector" disabled :range="STATUSList" range-key="CODE" @change="handleSTATUS">
							<div class="picker-s">
								<input class="form-input" disabled type="text" :value="STATUSList[STATUSIndex] ? STATUSList[STATUSIndex].CODE : ''"
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
		width: 5em !important;
	}

	.form-txt {
		font-size: 32rpx;
		border: none !important;
		line-height: 60rpx;
	}
</style>
