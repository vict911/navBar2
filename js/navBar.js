/**
 * 
 * @authors Vict Chen (vict911@163.com)
 * @date    2017-09-14
 * @version navBar2.0.2
 */
/*配置showMore的展开动作*/
function navSwitch(id){
    if($("#"+id+" .secNavBar_ul").is(":visible")){
        $("#"+id+" .secNavBar_ul").stop().slideUp(100);
    }else{
        $(".navBar_ul li .secNavBar_ul").slideUp(100)
        $("#"+id+" .secNavBar_ul").stop().slideDown(100);
    }
}
/*未配置showMore的展开动作*/
function navSwitchShowmore(id){
    if($("#"+id+" .secNavBar_ul").is(":visible")){
        $("#"+id+" .secNavBar_ul").stop().slideUp(100);
        $("#"+id+" .showMore").removeClass("open");
    }else{
        $(".navBar_ul li .secNavBar_ul").slideUp(100);
        $(".navBar_ul li .showMore").removeClass("open");
        $("#"+id+" .secNavBar_ul").stop().slideDown(100);
        $("#"+id+" .showMore").addClass("open");
    }
}
(function(){
    var navBar = function(navContent,activePage){
        var fst = navContent.firstClass;//一级菜单对象
        var sty = navContent.styles;//navBar的样式对象
        var fstNavLength = fst.length;//一级菜单的数量
        /*创建nav容器*/
        var navBody='<div class="navBarOut"><div class="navBar">'+
        '<a href="'+sty.logo.linkUrl+'" class="logo_area"><img src="'+sty.logo.imgUrl+'"></a>'+
        '<ul class="navBar_ul"></ul>'+
        '</div></div>'
        $("body").prepend(navBody);
        /*循环创建一级菜单*/
        for(var a=0;a<fstNavLength;a++){
            if(fst[a].hasScd==false){
                //无二级菜单的一级菜单
                $(".navBar_ul").append('<li id="'+fst[a].pageId+'"><a class="first_nav_name" href="'+fst[a].linkUrl+'"><span>'+fst[a].pageName+'</span></a></li>')
            }else{
                //含二级菜单的一级菜单
                /*配置了styles并且配置了showMore项*/
                if(sty&&sty.showMore&&sty.showMore==true){
                    $(".navBar_ul").append('<li id="'+fst[a].pageId+'">'+
                        '<a class="first_nav_name"  onclick="navSwitchShowmore(\''+fst[a].pageId+'\')"><span>'+fst[a].pageName+'</span><img src="images/show-more.png" class="showMore"></a>'+
                    '<ul class="secNavBar_ul"></ul>'+
                    '</li>');
                }else{
                /*未配置styles或配置了styles但未配置showMore或showMore配置为false*/
                    $(".navBar_ul").append('<li id="'+fst[a].pageId+'">'+
                        '<a class="first_nav_name"  onclick="navSwitch(\''+fst[a].pageId+'\')"><span>'+fst[a].pageName+'</span></a>'+
                    '<ul class="secNavBar_ul"></ul>'+
                    '</li>');
                }
                /*循环创建二级菜单*/
                var scd = fst[a].secondClass;//(某一级菜单下)二级菜单对象
                var scdNavLength = scd.length;//(某一级菜单下)二级菜单对象的个数
                for(var b=0;b<scdNavLength;b++){
                    $("#"+fst[a].pageId+" .secNavBar_ul").append('<li><a id="'+scd[b].pageId+'" class="second_nav_name" href="'+scd[b].linkUrl+'">'+scd[b].pageName+'</a></li>');
                }
            }
        }
        $(".navBar_ul").css('height',(window.innerHeight-50)+'px')//初始化导航高度
        $(window).resize(function(){
            $(".navBar_ul").css('height',(window.innerHeight-50)+'px')//初始化导航高度
        });
        $("#"+activePage).addClass("active");
        $("#"+activePage).parents(".secNavBar_ul").show();
        $("#"+activePage).parents("li").find(".showMore").addClass("open");
    }
    window.navBar = navBar;
})();
