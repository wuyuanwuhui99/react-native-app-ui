import * as size from './Size';
import * as color from './Color';
import { Dimensions } from 'react-native'

export const boxDecoration = {
    backgroundColor:color.whiteColor,
    borderRadius: size.middleRadiusSize,
    padding: size.containerPaddingSize,
    marginTop: size.containerPaddingSize,
    width: Dimensions.get('window').width - size.containerPaddingSize*2,
};
export const pageStyle = {
    marginTop: 0,
    paddingLeft: size.containerPaddingSize,
    paddingRight: size.containerPaddingSize,
    backgroundColor: color.backgroundColor,
    width: Dimensions.get('window').width,
    height:Dimensions.get('window').height
};
export const margin = {
    marginBottom: size.containerPaddingSize
};
export const padding = {
    padding: size.containerPaddingSize
};
export const paddingBox = {
    marginLeft: size.containerPaddingSize,
    marginRight: size.containerPaddingSize
};
export const mainTitleStyle = {
    color: color.mainTitleColor,
    fontSize: size.bigFontSize,
    fontWeight: 'bold'
};
export const subTitleStyle = {
    color: color.subTitleColor,
    fontSize: size.smallFontSize
};
export const bottomDecoration = {
    borderBottomColor: 'borderColor',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid'
};
export const columnPadding = {//列边距
    top: size.columnPaddingSize,
    bottom: size.columnPaddingSize
};
