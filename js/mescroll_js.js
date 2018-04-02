$(function () {
    var mescroll = new MeScroll("mescroll", { //第一个参数"mescroll"对应上面布局结构div的id
        //如果您的下拉刷新是重置列表数据,那么down完全可以不用配置,具体用法参考第一个基础案例
        //解析: down.callback默认调用mescroll.resetUpScroll(),而resetUpScroll会将page.num=1,再触发up.callback
        down: {
            callback: downCallback //下拉刷新的回调,别写成downCallback(),多了括号就自动执行方法了
        },
        up: {
            callback: upCallback , //上拉加载的回调
            isBounce: false //如果您的项目是在iOS的微信,QQ,Safari等浏览器访问的,建议配置此项.解析(必读)
        }
    });
//下拉刷新的回调
    function downCallback() {
        $.ajax({
            url: 'xxxxxx',
            success: function(data) {
                //联网成功的回调,隐藏下拉刷新的状态;
                mescroll.endSuccess(); //无参
                //设置数据
                //setXxxx(data);//自行实现 TODO
            },
            error: function(data) {
                //联网失败的回调,隐藏下拉刷新的状态
                mescroll.endErr();
            }
        });
    }
//上拉加载的回调 page = {num:1, size:10}; num:当前页 默认从1开始, size:每页数据条数,默认10
    function upCallback(page) {
        $.ajax({
            url: 'xxxxxx?num=' + page.num + "&size=" + page.size, //如何修改page.num从0开始 ?
            success: function(curPageData) {
                //联网成功的回调,隐藏下拉刷新和上拉加载的状态;
                //mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空,显示empty配置的内容;
                //列表如果无下一页数据,则提示无更多数据,(注意noMoreSize的配置)

                //方法一(推荐): 后台接口有返回列表的总页数 totalPage
                //必传参数(当前页的数据个数, 总页数)
                //mescroll.endByPage(curPageData.length, totalPage);

                //方法二(推荐): 后台接口有返回列表的总数据量 totalSize
                //必传参数(当前页的数据个数, 总数据量)
                //mescroll.endBySize(curPageData.length, totalSize);

                //方法三(推荐): 您有其他方式知道是否有下一页 hasNext
                //必传参数(当前页的数据个数, 是否有下一页true/false)
                //mescroll.endSuccess(curPageData.length, hasNext);

                //方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.
                //如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
                //如果传了hasNext,则翻到第二页即可显示无更多数据.
                //mescroll.endSuccess(curPageData.length);

                //设置列表数据
                //setListData(curPageData);//自行实现 TODO
            },
            error: function(e) {
                //联网失败的回调,隐藏下拉刷新和上拉加载的状态
                mescroll.endErr();
            }
        });
    }
});
