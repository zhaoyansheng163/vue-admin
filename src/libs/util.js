let util = {

};

// 设置网页标题
util.title = function (title) {
    title = title ? title + '-tpvue' : 'tpvue管理后台';
    window.document.title = title;
};

export default util;
