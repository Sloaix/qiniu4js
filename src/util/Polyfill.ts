// /**
//  * Object.assign polyfill
//  */
// if (typeof Object.assign != 'function') {
//     Object.assign = function (target) {
//         if (target == null) {
//             throw new TypeError('Cannot convert undefined or null to object');
//         }
//
//         target = Object(target);
//         for (let index = 1; index < arguments.length; index++) {
//             let source = arguments[index];
//             if (source != null) {
//                 for (let key in source) {
//                     if (Object.prototype.hasOwnProperty.call(source, key)) {
//                         target[key] = source[key];
//                     }
//                 }
//             }
//         }
//         return target;
//     };
// }
//
// /**
//  * canvas.toBlob polyfill
//  */
// if (!HTMLCanvasElement.prototype.toBlob) {
//     Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
//         value: function (callback, type, quality) {
//
//             let binStr = atob(this.toDataURL(type, quality).split(',')[1]),
//                 len = binStr.length,
//                 arr = new Uint8Array(len);
//
//             for (let i = 0; i < len; i++) {
//                 arr[i] = binStr.charCodeAt(i);
//             }
//
//             callback(new Blob([arr], {type: type || 'image/png'}));
//         }
//     });
// }
//
// /**
//  * endsWith polyfill
//  */
// if (!String.prototype.endsWith) {
//     let toString = {}.toString;
//     let endsWith = function (search) {
//         if (this == null) {
//             throw TypeError();
//         }
//         let string = String(this);
//         if (search && toString.call(search) == '[object RegExp]') {
//             throw TypeError();
//         }
//         let stringLength = string.length;
//         let searchString = String(search);
//         let searchLength = searchString.length;
//         let pos = stringLength;
//         if (arguments.length > 1) {
//             let position = arguments[1];
//             if (position !== undefined) {
//                 // `ToInteger`
//                 pos = position ? Number(position) : 0;
//                 if (pos != pos) { // better `isNaN`
//                     pos = 0;
//                 }
//             }
//         }
//         let end = Math.min(Math.max(pos, 0), stringLength);
//         let start = end - searchLength;
//         if (start < 0) {
//             return false;
//         }
//         let index = -1;
//         while (++index < searchLength) {
//             if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
//                 return false;
//             }
//         }
//         return true;
//     };
//     if (Object.defineProperty) {
//         Object.defineProperty(String.prototype, 'endsWith', {
//             'value': endsWith,
//             'configurable': true,
//             'writable': true
//         });
//     } else {
//         String.prototype.endsWith = endsWith;
//     }
// }