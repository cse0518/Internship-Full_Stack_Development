/***********************************************************************************************
  날짜 관련 공통 함수   
  Version 1.0
  작성자 : 윤지현
  작성일 : 2013년 12월 24일
  설명 : 날짜와 관련된 함수들의 집합이다.
***********************************************************************************************/
/*
var date, dateValue;
var year, month, day;
var seperator = '-';
*/
var getDate = {};

getDate.prototype = {

    init: function(s) {
        this.date = new Date();
        this.year = date.getFullYear();
        this.month = date.getMonth()+1;
        this.day = date.getDate();
        this.dateValue = date.getTime();
        this.seperator = s ? s : '-';
        this.lastDay = [31,28,31,30,31,30,31,31,30,31,30,31];
    },
    addZero: function(value) {
        return value.toString().length > 1 ? value : '0' + value;
    },
    getValue: function(str){
        var dateObj = str.split(this.seperator);
        this.d = new Date(dateObj[0], dateObj[1]-1, dateObj[2]);
        return this.d.getTime();
    },
    formatter: function(value) {
        this.date = new Date(value);

        return this.date.getFullYear() + this.seperator + this.addZero(this.date.getMonth()+1) + this.seperator + this.addZero(this.date.getDate());
    },
    getNowDate: function(s) {
        this.init(s);
    	return this.formatter(this.dateValue, this.seperator);
    },
    add: function(value, s) {
        this.init(s);
        return this.formatter(this.dateValue + value*1000*60*60*24);
    },
    sub: function(value, s) {
        this.init(s);
        return this.formatter(this.dateValue - value*1000*60*60*24);
    },
    calRefDate: function(fromDate, toDate) {
        this.fdValue = this.getValue(fromDate);
        this.tdValue = this.getValue(toDate);
        return parseInt((this.tdValue - this.fdValue)/(1000*60*60*24));
    },
    getRefDate: function(opt, dateStr) {
        this.init();
        var vDate = dateStr ? this.getValue(dateStr) : dateValue;
        this.date = new Date(vDate);

        switch(typeof(opt)){
            default: 
                return this.formatter(this.date.getTime() + opt*1000*60*60*24);
            case('object'):
                this.date = new Date(this.year, this.month-1+opt.month, this.day+opt.day);
                /*
                this.dayCnt = 0;
                this.opt = JSON.parse(JSON.stringify(opt));

                if(typeof(opt.day) != 'undefined') {
                    this.dayCnt += opt.day;
                }
                
                if(typeof(opt.month) != 'undefined') {
                    var mCnt = this.date.getMonth();
                    var curDay = this.date.getDate();
                    for(var i=0; i<opt.month; i++) {
                        this.dayCnt += this.lastDay[(mCnt+i) % 12];
                        if((opt.month-1) == i && curDay > this.lastDay[(mCnt+i+1) % 12]) {
                            this.dayCnt -= curDay - this.lastDay[(mCnt+i+1) % 12];
                        }
                    }
                }
                
                if(typeof(opt.year) != 'undefined') {
                    if(opt.year < 0) {
                        for(var i=opt.year; i<0; i++){
                            this.dayCnt -= (this.year+i) % 4 == 0 ? 366 : 365;
                        }
                    } else {
                        for(var i=0; i<opt.year; i++){
                            this.dayCnt += (this.year+i) % 4 == 0 ? 366 : 365;
                        }
                    }
                }
                return this.formatter(this.date.getTime() + this.dayCnt*1000*60*60*24);
                 */
                return this.formatter(this.date.getTime());
        };
    }
};
