import {middleRadiusSize,containerPaddingSize,bigFontSize,columnPaddingSize,smallFontSize} from'./Size';
import {whiteColor,mainTitleColor,subTitleColor} from './Color';

export const boxDecoration = {...whiteColor, borderRadius:middleRadiusSize,padding:containerPaddingSize,marginLeft:containerPaddingSize,marginRight: containerPaddingSize,marginTop:containerPaddingSize};
export const margin = {marginBottom: containerPaddingSize};
export const padding = {padding:containerPaddingSize};
export const paddingBox = {marginLeft: containerPaddingSize,marginRight: containerPaddingSize};
export const mainTitleStyle = {color: mainTitleColor, fontSize: bigFontSize, fontWeight: 'bold'};
export const subTitleStyle ={color: subTitleColor, fontSize: smallFontSize};
export const bottomDecoration = {borderBottomColor: 'borderColor', borderBottomWidth:1, borderBottomStyle:'solid'};
export const columnPadding = {top: columnPaddingSize,bottom: columnPaddingSize};//列边距
