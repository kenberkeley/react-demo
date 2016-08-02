/**
 * 保证url前带'/'
 * @param  {String} url
 * @return {String}
 */
export default url => url.startsWith('/') ? url : '/' + url
