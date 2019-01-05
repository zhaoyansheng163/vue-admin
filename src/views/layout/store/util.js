/**
 * +----------------------------------------------------------------------
 * | tpvue-admin [ 轻量级模块化Vue后台 ]
 * +----------------------------------------------------------------------
 * | Copyright (c) 2018-2019 http://tpvue.com All rights reserved.
 * +----------------------------------------------------------------------
 * | Licensed ( http://www.apache.org/licenses/LICENSE-2.0 )
 * +----------------------------------------------------------------------
 * | Author: jry <598821125@qq.com>
 * +----------------------------------------------------------------------
*/

/**
 * @description 本地存储和获取标签导航列表
 */
export const setTagviewsInLocalstorage = list => {
    localStorage.visitedviews = JSON.stringify(list)
}
/**
 * @returns {Array} 其中的每个元素只包含路由原信息中的name, path, meta三项
 */
export const getTagviewsFromLocalstorage = () => {
    const list = localStorage.visitedviews
    return list ? JSON.parse(list) : [{
            name: 'home',
            path: '/home',
            title: '首页'
        }  
    ]
}
