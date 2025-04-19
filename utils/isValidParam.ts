/* eslint-disable  @typescript-eslint/no-explicit-any */

/**
 * @description
 * The utility that checks whether a generations URL route is valid or not
 */

export default function isValidParams(param: any) {
  return parseInt(param.gen) > 9 ? false : true;
}
