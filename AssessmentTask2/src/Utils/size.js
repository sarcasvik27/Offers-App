import {Dimensions, Platform, StatusBar} from 'react-native';
import {scaleSize} from './mixins'

export const {width: WIDTH, height: HEIGHT} = Dimensions.get('screen');

export const HEADER_HEIGHT = Platform.OS === 'android' ? 50 : 40;

export const IS_BIG = HEIGHT > 812;

export const TOP = 
Platform.OS === 'android' 
        ? StatusBar.currentHeight || 0
        : HEIGHT >= 812
        ? 44
        : 20;

export {scaleSize};

export const SIZE_1 = scaleSize(1);
export const SIZE_2 = scaleSize(2);
export const SIZE_4 = scaleSize(4);
export const SIZE_5 = scaleSize(5);
export const SIZE_8 = scaleSize(8);
export const SIZE_9 = scaleSize(9);
export const SIZE_10 = scaleSize(10);
export const SIZE_11 = scaleSize(11);
export const SIZE_13 = scaleSize(13);
export const SIZE_14 = scaleSize(14);
export const SIZE_15 = scaleSize(15);
export const SIZE_16 = scaleSize(16);
export const SIZE_17 = scaleSize(17);
export const SIZE_18 = scaleSize(18);
export const SIZE_19 = scaleSize(19);
export const SIZE_20 = scaleSize(20);
export const SIZE_21 = scaleSize(21);
export const SIZE_22 = scaleSize(22);
export const SIZE_25 = scaleSize(25);
export const SIZE_26 = scaleSize(26);
export const SIZE_27 = scaleSize(27);
export const SIZE_28 = scaleSize(28);
export const SIZE_30 = scaleSize(30);
export const SIZE_37 = scaleSize(37);
export const SIZE_38 = scaleSize(38);
export const SIZE_40 = scaleSize(40);
export const SIZE_45 = scaleSize(45);
export const SIZE_50 = scaleSize(50);
export const SIZE_54 = scaleSize(54);
export const SIZE_60 = scaleSize(60);
export const SIZE_70 = scaleSize(70);
export const SIZE_74 = scaleSize(74);
export const SIZE_80 = scaleSize(80);
export const SIZE_90 = scaleSize(90);
export const SIZE_94 = scaleSize(94);
export const SIZE_100 = scaleSize(100);
export const SIZE_105 = scaleSize(105);
export const SIZE_120 = scaleSize(120);
export const SIZE_125 = scaleSize(125);
export const SIZE_130 = scaleSize(130);
export const SIZE_138 = scaleSize(138);
export const SIZE_140 = scaleSize(140);
export const SIZE_150 = scaleSize(150);
export const SIZE_156 = scaleSize(156);
export const SIZE_190 = scaleSize(190);
export const SIZE_200 = scaleSize(200);
export const SIZE_212 = scaleSize(212);
export const SIZE_220 = scaleSize(220);
export const SIZE_250 = scaleSize(250);
export const SIZE_265 = scaleSize(265);
export const SIZE_335 = scaleSize(335);
export const SIZE_340 = scaleSize(350);
export const SIZE_420 = scaleSize(420);
export const SIZE_500 = scaleSize(500);
export const SIZE_640 = scaleSize(640);