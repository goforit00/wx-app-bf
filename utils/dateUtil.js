/**
 * 格式化时间
 * @param date
 * @param fmt
 * @returns {*}
 */
function format(date, fmt) {
    var o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    if (!this.isNotEmpty(fmt)) {
        fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
}

function formatToDate(dateStr) {
    if (this.isNotEmpty(dateStr)) {
        return new Date(Date.parse(dateStr.replace(/-/g, "/")));
    }
    return '';
}

/**
 * 得到一天的开始 date类型
 * @param date
 */
function getDateStart(date) {
    var fmt = 'yyyy-MM-dd';
    var dateStartStr = this.getDateStartStr(date, fmt);
    var startTime = new Date(Date.parse(dateStartStr));
    return startTime;
}

/**
 * 得到一天的开始 str 类型
 * @param date
 */
function getDateStartStr(date, fmt) {
    if (typeof fmt == 'undefined') {
        fmt = 'yyyy-MM-dd';
    }
    var dateStr = this.format(date, fmt);
    dateStr += ' 00:00:00';
    return dateStr;
}

/**
 * 得到一天的结束 date类型
 * @param date
 */
function getDateEnd(date) {
    var fmt = 'yyyy-MM-dd';
    var dateEndStr = this.getDateEndStr(date, fmt);
    var endTime = new Date(Date.parse(dateEndStr));
    return endTime;
}

/**
 * 得到一天的结束 str 类型
 * @param date
 */
function getDateEndStr(date, fmt) {
    if (typeof fmt == 'undefined') {
        fmt = 'yyyy-MM-dd';
    }
    var endStr = this.format(date, fmt);
    endStr += ' 23:59:59';
    return endStr;
}

/**
 * 两个时间比较大小
 * @param d1
 * @param d2
 */
function compareDate(d1, d2) {
    if (d1 && d2) {
        if (d1.getTime() > d2.getTime()) {
            return 1;
        } else if (d1.getTime() == d2.getTime()) {
            return 0;
        } else if (d1.getTime() < d2.getTime()) {
            return -1;
        }
    }
}

/**
 * 得到星期几, 支持中英
 * @param date
 * @param type
 * @returns {string}
 */
function getWeek(date, type) {
    if (date) {
        if (!this.isNotEmpty(type)) {
            type = 0;
        }
        var index = date.getDay();
        var dateStr = '';
        switch (type) {
            case this.WEEKTYPE.ZH_DAYNAME:
                dateStr = _options.ZH.dayNames[index];
                break;
            case this.WEEKTYPE.ZH_SDAYNAME:
                dateStr = _options.ZH.shortDayNames[index];
                break;
            case this.WEEKTYPE.US_DAYNAME:
                dateStr = _options.US.dayNames[index];
                break;
            case this.WEEKTYPE.US_SDAYNAME:
                dateStr = _options.US.shortDayNames[index];
                break;
        }
        return dateStr;
    }
}

/**
 * 是否为闰年
 * @param date
 * @returns {boolean}
 */
function isLeapYear(date) {
    if (date instanceof Date) {
        return (0 == date.getYear() % 4 && (( date.getYear() % 100 != 0) || (date.getYear() % 400 == 0)));
    }
    console.warn('argument format is wrong');
    return false;
}

/**
 * 字符串是否为正确的时间格式，支持 - /
 * @param dateStr
 * @returns {boolean}
 */
function isValidDate(dateStr) {
    if (this.isNotEmpty(dateStr)) {
        var r = dateStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
        if (r == null) {
            return false;
        }
        var d = new Date(r[1], r[3] - 1, r[4]);
        var num = (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
        return (num != 0);
    }
}

/**
 * 增加天数
 * @param date
 * @param dayNum
 */
function addDay(date, dayNum) {
    if (this.isNotEmpty(date) && this.isNotEmpty(dayNum) && date instanceof Date && typeof dayNum == 'number') {
        date.setDate(date.getDate() + dayNum);
    } else {
        console.warn('date or dayNum format wrong');
    }
    return date;
}

function addDayStr(dateStr, dayNum) {
    var date = '';
    if (this.isNotEmpty(dateStr) && this.isNotEmpty(dayNum) && typeof dayNum == 'number') {
        date = this.formatToDate(dateStr);
        date.setDate(date.getDate() + dayNum);
    } else {
        console.warn('dateStr or dayNum format wrong');
    }
    return date;
}

/**
 * 增加月份
 * @param date
 * @param dayNum
 */
function addMonth(date, monthNum) {
    if (this.isNotEmpty(date) && this.isNotEmpty(monthNum) && date instanceof Date && typeof monthNum == 'number') {
        date.setMonth(date.getMonth() + monthNum);
    } else {
        console.warn('date or monthNum format wrong');
    }
    return date;
}

function addMonthStr(dateStr, monthNum) {
    var date = '';
    if (this.isNotEmpty(dateStr) && this.isNotEmpty(monthNum) && typeof monthNum == 'number') {
        date = this.formatToDate(dateStr);
        date.setMonth(date.getMonth() + monthNum);
    } else {
        console.warn('date or monthNum format wrong');
    }
    return date;
}

/**
 * 增加年份
 * @param date
 * @param dayNum
 */
function addYear(date, yearNum) {
    if (this.isNotEmpty(date) && this.isNotEmpty(yearNum) && date instanceof Date && typeof yearNum == 'number') {
        date.setYear(date.getFullYear() + yearNum);
    } else {
        console.warn('date or yearNum format wrong');
    }
    return date;
}

function addYearStr(dateStr, yearNum) {
    var date = '';
    if (this.isNotEmpty(dateStr) && this.isNotEmpty(yearNum) && typeof yearNum == 'number') {
        date = this.formatToDate(dateStr);
        date.setYear(date.getFullYear() + yearNum);
    } else {
        console.warn('date or yearNum format wrong');
    }
    return date;
}


/**
 * 是否为空
 * @param str
 * @returns {boolean}
 */
function isNotEmpty(str) {
    if (str != '' && str != null && typeof str != 'undefined') {
        return true;
    }
    console.warn('argument format is wrong');
    return false;
}

//定义内部常量
var WEEKTYPE = {
    "ZH_DAYNAME": 0,
    "ZH_SDAYNAME": 1,
    "US_DAYNAME": 2,
    "US_SDAYNAME": 3
}

module.exports = {
    format: format,
    formatToDate :formatToDate,
    getDateStart: getDateStart,
    getDateStartStr:getDateStartStr,
    getDateEnd:getDateEnd,
    getDateEndStr:getDateEndStr,
    compareDate:compareDate,
    getWeek:getWeek,
    isLeapYear:isLeapYear,
    isValidDate:isValidDate,
    addDay:addDay,
    addDayStr:addDayStr,
    addMonth:addMonth,
    addMonthStr:addMonthStr,
    addYear:addYear,
    addYearStr:addYearStr,
    isNotEmpty:isNotEmpty
}