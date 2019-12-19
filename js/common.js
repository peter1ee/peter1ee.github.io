﻿if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", "/css/adapter.css");
    document.getElementsByTagName("head")[0].appendChild(link);
}
_indList = new Array();
_indList[0] = ([ "Google","Baidu","Bing", "Sogou","https://www.google.com/search?q=", "http://www.baidu.com/s?wd=","https://cn.bing.com/search?q=", "http://www.sogou.com/sogou?query="]);
_indList[1] = (["Scholar","Scholar","CNKI搜索", "百度学术", 
"https://scholar.google.com/scholar?hl=en&q=", "https://xues.glgoo.com/scholar?hl=zh-CN&q=", 
"http://scholar.cnki.net/result.aspx?rt=Journal&rl=zh&q=", "http://xueshu.baidu.com/s?wd="]);
_indList[2] = (["百度新闻", "新浪新闻","微信搜索","微博搜索",
 "http://news.baidu.com/ns?word=","http://search.sina.com.cn/?range=all&c=news&sort=time&q=","http://weixin.sogou.com/weixin?type=2&query=","http://s.weibo.com/weibo/"]);
_indList[3] = (["百度百科", "Wiki英文","wikiHow","百度文库", 
"http://baike.baidu.com/item/", "http://en.wikipedia.org/wiki/","http://zh.wikihow.com/","https://wenku.baidu.com/search?word="]);
_indList[4] = ([ "谷歌翻译","百度翻译","有道词典","英英词典",
 "https://translate.google.cn/#en/zh-CN/","http://fanyi.baidu.com/translate#zh/en/", "http://dict.youdao.com/search?q=","http://www.thefreedictionary.com/"]);
_indList[5] = (["淘宝","京东", "天猫", "当当", 
"https://s.taobao.com/search?q=","http://search.jd.com/Search?enc=utf-8&keyword=","http://list.tmall.com/search_product.htm?_input_charset=utf-8&q=","http://search.dangdang.com/?key="]);
_indList[6] = (["PDB","Molbase", "EBI", "ChemSpider", 
"http://www.rcsb.org/pdb/explore/explore.do?structureId=","http://chanpin.molbase.cn/search/?search_keyword=","https://www.ebi.ac.uk/ebisearch/search.ebi?db=allebi&requestFrom=searchBox&query=","http://www.chemspider.com/Chemical-Structure.236.html?rid="]);
_usrslt = 0;


var params={XOffset:0,YOffset:0,fontColor:"#444",fontColorHI:"#000",fontSize:"16px",fontFamily:"arial",borderColor:"gray",bgcolorHI:"#ebebeb",sugSubmit:!1};

//BaiduSuggestion.bind("iptsrh", params, show);
BaiduSuggestion.bind("iptsrh", params);

Msg = '请输入...';
$("#iptsrh").click(function(){
	if($("#iptsrh").val()==Msg) {
		$("#iptsrh").val('');
	}
});
$("#iptsrh").focus();

$("span[id$='srch']").click(function() {
	
    $("span[id$='srch']").attr("class", "bgsrh bgsrhnbt");
    $(this).attr("class", "bgsrh bgsrhbt");
    _usrslt = $(this).attr("tmp");
    $("#srhbt0").html(_indList[_usrslt][0]);
    if (_indList[_usrslt][1] == "") {
        $("#srhbt1").hide()
	} else {
        $("#srhbt1").show();
        $("#srhbt1").html(_indList[_usrslt][1])
    }
    if (_indList[_usrslt][2] == "") {
        $("#srhbt2").hide()
	} else {
        $("#srhbt2").show();
        $("#srhbt2").html(_indList[_usrslt][2])
    }
    if (_indList[_usrslt][3] == "") {
        $("#srhbt3").hide()
	} else {
        $("#srhbt3").show();
        $("#srhbt3").html(_indList[_usrslt][3])
    }
    $("#iptsrh").focus()
});
$("button[id^='srhbt']").click(function() {
    var _idstr = $(this).attr("id");
    _idstr = parseInt(_idstr.charAt(_idstr.length - 1)) + 4;
    _srhstr = $("#iptsrh").val();
    openTag(_idstr, _srhstr)
});
$(document).keydown(function(event) {
    if (event.keyCode == 13) {
        _srhstr = $("#iptsrh").val();
        if (_srhstr != "" && $("[class='bdSug_ml']").html() == null) {
            openTag(4, _srhstr)
        }
    }
});


function show(str) {
    openTag(4, str)
}
function HTMLDeCode(str) {
    var s = "";
    if (str.length == 0) {
        return ""
    }
    s = str.replace("&", "%26");
    return s;
}
function openTag(_idstr, _srhstr) {
	if (_srhstr=='') {
		$("#iptsrh").val(Msg);	
		$("#iptsrh").focus();
		return false;
	}
	if(_usrslt==2 && _idstr==5){_srhstr=utfToGbk(_srhstr,_indList[_usrslt][_idstr])}
	else{		
		_srhstr = encodeURI(_srhstr);
	}
	var newTab=window.open('about:blank');
	newTab.location.href = _indList[_usrslt][_idstr] + HTMLDeCode(_srhstr);
}
function utfToGbk(_str, _url) {
    $.ajaxSetup({
        async: false
    });
    $code = "";
    $.post("tran.php?f=1", {
        utf: _str
    },
    function(result) {
        $code = result;
    });
    return $code;
};