/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function isValidParams(param: any) {
  return parseInt(param.gen) > 9 ? false : true;
}
