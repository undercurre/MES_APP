<template>
	<view>
		<gracePage :customHeader="true">
			<graceHeader slot="gHeader" background="#337ab7">
				<view class="grace-header-body">
					<!-- 返回按钮 -->
					<text class="grace-header-icons grace-icons  grace-white" @tap="goback">&#xe600;</text>
					<!-- 中间内容 -->
					<view class="grace-header-content-noflex main-tit"><text class="grace-white" style="font-size: 38rpx;">工装点检</text></view>
				</view>
			</graceHeader>
			<view slot="gBody" class="grace-body">
				<view class="form-content">
					<view class="form-item">
						<view class="form-label align-right">
							工装编码：
						</view>
						<view class="form-value">
							<input class="form-input" type="text" v-model="form.TONGS_BODYMARK" placeholder=" " @focus="autoFocus = true;"
							 :focus="autoFocus" @blur="autoFocus = false;" @confirm="getFeida">
						</view>
					</view>
					<view class="form-item">
						<u-table style="position: relative;height: 900rpx;overflow: auto;">
							<u-tr class="u-tr" style="display: -webkit-box;position: sticky;top: 0;">
								<u-th class="u-tr" style="width: 25%;flex: 0 0 25%;">工装编码</u-th>
								<u-th class="u-tr"style="width: 25%;flex: 0 0 25%;">工装名称</u-th>
								<u-th class="u-tr" style="width: 25%;flex: 0 0 25%;">位置</u-th>
								<u-th class="u-tr" style="width: 25%;flex: 0 0 25%;">确认结果</u-th>
							</u-tr>
							<u-tr class="u-tr" style="display: -webkit-box;" v-for="(item, index) in list" :key="index">
								<u-td class="u-tr" style="width: 25%;flex: 0 0 25%;overflow: hidden;line-height: 21px;">{{ item.CODE }}</u-td>
								<u-td class="u-tr" style="width: 25%;flex: 0 0 25%;overflow: hidden;line-height: 21px;">{{ item.TONGS_TYPE }}</u-td>
								<u-td class="u-tr" style="width: 25%;flex: 0 0 25%;overflow: hidden;line-height: 21px;">{{ item.STORE_NAME }}</u-td>
								<u-td class="u-tr" style="width: 25%;flex: 0 0 25%;overflow: hidden;line-height: 21px;">
									<!-- {{item.VDETAIL_STATUS}} -->
									<!-- 未验证,1:合格,2.不合格 -->
									<text v-if="item.VDETAIL_STATUS == '未验证'">未验证</text>
									<text style="color: red;" v-else-if="item.VDETAIL_STATUS == '不合格'">不合格</text>
									<text style="color: rgb(3, 163, 89);" v-else-if="item.VDETAIL_STATUS == '合格'">合格</text>
									<text v-else></text>
								</u-td>
							</u-tr>
						</u-table>
					</view>
					<uni-pagination style="width: 100%;display: block;" show-icon="true" :total="totalCountdata" @change="changeReason4"
					 :current="subData.Page" v-if="subData.CHECK_CODE">
					</uni-pagination>
					<uni-pagination style="width: 100%;display: block;" show-icon="true" :total="totalCount" @change="changeReason3"
					 :current="Form.Page" v-else>
					</uni-pagination>
					
				</view>
			</view>
			<view class="grace-footer grace-grids grace-nowrap toolbar-bottom" slot="gFooter">
				<div class="toolbar-item">
					<view class="toolbar-btn" @tap="goback">
						<image src="../../static/icon/close.png" mode="widthFix" class="icon-x"></image>
						<text class="tix">关闭</text>
					</view>
					<view class="toolbar-btn primary" @tap="submitForm">
						<text class="tix">提交</text>
					</view>
				</div>
			</view>
		</gracePage>
	</view>
</template>

<script src="./details.js"></script>

<style scoped lang="scss">
	@import '~@/styles/publics.scss';
	.form-label {
		width: 6em !important;
	}
	.detail{
		background: #1890FF;
		color: #fff;
	    border-radius: 8rpx;
	}
</style>
