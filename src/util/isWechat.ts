export default function isWechat(): boolean {
    return /micromessenger/i.test(navigator.userAgent);
}