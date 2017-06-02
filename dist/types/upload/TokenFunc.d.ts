import Uploader from "./Uploader";
import BaseTask from "./task/BaseTask";
interface TokenFunc {
    (uploader: Uploader, task: BaseTask): string | Promise<string>;
}
export default TokenFunc;
