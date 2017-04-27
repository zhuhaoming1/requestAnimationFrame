function Loading (){
	this.ele = '<div class="jcs_dialog"><div class="j_inner"><img src="../jcs_dialog/cai.png" alt="">'+
				'<span class="j_move"></span></div></div>';
	this.timerj = null;
	this.startH = 0;
	this.createLink();
}
Loading.prototype = {
	openL: function (){
		var that = this;
		$('html').append($(this.ele))
		if($('.jcs_dialog').length>1){
			return;
		}			
		this.timerj=setInterval(function(){
			that.startH++;
			if(that.startH>=76){that.startH=0}
			document.querySelector('.j_move').style.height=that.startH+'px';
			document.querySelector('.j_move').style.backgroundPosition='0 '+(-76+that.startH)+'px';
		},15);
		
	},
	closeL: function (){
		var that = this;
		setTimeout(function(){
			$('.jcs_dialog').remove();
			clearInterval(that.timerj);
			that.startH = 0;
			that.timerj = null;			
		},500)
		
	},
	createLink: function (){
		$('head').append('<link rel="stylesheet" href="../jcs_dialog/jcs_dialog.css">')
	}
}
var DialogZ = {
	init:function(opt){
		var defaults = {
			msg: "您确认要执行此操作吗？",
			trueCallback:null,
			falseCallback:null
		};
		this.settings = $.extend({},defaults,opt);
		this.addDom();
		this.addEvent();
	},
	addDom:function(){
		this.ele='<div class="maskz"><div class="jcs_decision"><p class="jcs_decision_tit">'+this.settings.msg+'</p>'+
				'<p class="jcs_decision_true">确定</p>'+
				'<p class="jcs_decision_false" >取消</p></div></div>',
			that = this;
		if($('.maskz').length>=1){
			return;
		}else{
			this.createLink();
			$('html').append($(this.ele))
		}
	},
	addEvent:function(){
		var that = this;
		$('.jcs_decision').on('click',function(e){
			var trg = $(e.target);
			if(trg.hasClass('jcs_decision_true')){
				that.settings.trueCallback();
				that.remoDom();
			}else if(trg.hasClass('jcs_decision_false')){
				that.settings.falseCallback();
				that.remoDom();
			}
		})
	},
	remoDom:function(){
		$('.maskz').remove();
	},
	createLink: function (){
		$('head').append('<link rel="stylesheet" href="../jcs_dialog/jcs_dialog.css">')
	}
}