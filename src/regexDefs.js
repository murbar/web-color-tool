// 0..100 with leading zeros
export const hectoMatch = /^0*(?:[0-9][0-9]?|100)$/;

// 0..360 with leading zeros
export const degreeMatch = /^(0?[0-9]?[0-9]|[1-2][0-9][0-9]|3[0-5][0-9]|360)$/;

// 000..255
export const byteMatch = /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/;

// 000..FFF or 000000..FFFFFF
export const hexColorMatch = /^([0-9a-f]{3}|[0-9a-f]{6})$/i;

// 0..FFFFFF
export const hexCharsMatch = /^[0-9a-f]{1,6}$/i;
