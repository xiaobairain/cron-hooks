/*
 * @Descripttion: 
 * @Author: Bean
 * @Date: 2020-09-01 09:36:59
 * @LastEditors: Bean
 * @LastEditTime: 2020-09-02 17:09:05
 */
export default {
  entry: '/src/index',
  doc: {
    themeConfig: { mode: 'light' },
    base: '/cron-hooks/',
  },
  esm: 'rollup',
  cjs: 'rollup',
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
  ],
  extractCSS: true,
}
