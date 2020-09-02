/* eslint-disable */
/*
 * @Descripttion: 
 * @version: 
 * @Author: Bean
 * @Date: 2020-07-31 14:52:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2020-07-31 17:27:19
 */ 

/**
  * Validates a cron expression.
  *
  * @param cronExpression The expression to validate
  * @return True is expression is valid
  */
 export function cronValidate(cronExpression) {

  if(!cronExpression){
    return false;
  }

 // alert("校验函数的开始！");  ['0', '0', '0', '*', '*', '?'] 时分秒日月周
 const cronParams = cronExpression.split(" ");

 if (cronParams.length < 6 || cronParams.length > 7) {
   return false;
 }

 // CronTrigger cronTrigger = new CronTrigger();
 // cronTrigger.setCronExpression( cronExpression );

 if (cronParams[3] == "?" || cronParams[5] == "?") {
   // Check seconds param
   if (!checkSecondsField(cronParams[0])) {
     return false;
   }

   // Check minutes param
   if (!checkMinutesField(cronParams[1])) {
     return false;
   }

   // Check hours param
   if (!checkHoursField(cronParams[2])) {
     return false;
   }

   // Check day-of-month param
   if (!checkDayOfMonthField(cronParams[3])) {
     return false;
   }

   // Check months param
   if (!checkMonthsField(cronParams[4])) {
     return false;
   }

   // Check day-of-week param
   if (!checkDayOfWeekField(cronParams[5])) {
     return false;
   }

   // Check year param
   // eslint-disable-next-line eqeqeq
   if (cronParams.length == 7) {
     if (!checkYearField(cronParams[6])) {
       return false;
     }
   }

   return true;
 } 
   return false;
 
}

function checkSecondsField(secondsField) {
 return checkField(secondsField, 0, 59);
}


function checkField(secondsField, minimal, maximal) {
 if (secondsField.indexOf("-") > -1) {
   const startValue = secondsField.substring(0, secondsField.indexOf("-"));
   const endValue = secondsField.substring(secondsField.indexOf("-") + 1);

   if (!(checkIntValue(startValue, minimal, maximal, true) && checkIntValue(endValue, minimal, maximal, true))) {
     return false;
   }
   try {
     const startVal = parseInt(startValue, 10);
     const endVal = parseInt(endValue, 10);

     return endVal > startVal;
   } catch (e) {
     return false;
   }
 } else if (secondsField.indexOf(",") > -1) {
   return checkListField(secondsField, minimal, maximal);
 } else if (secondsField.indexOf("/") > -1) {
   return checkIncrementField(secondsField, minimal, maximal);
 } else if (secondsField.indexOf("*") != -1) {
   return true;
 } else {
   return checkIntValue(secondsField, minimal, maximal);
 }
}

function checkIntValue(value, minimal, maximal, checkExtremity) {
 try {
   const val = parseInt(value, 10);
   // 判断是否为整数
   if (value == val) {
     if (checkExtremity) {
       if (val < minimal || val > maximal) {
         return false;
       }
     }

     return true;
   }

   return false;
 } catch (e) {
   return false;
 }
}

function checkMinutesField(minutesField) {
 return checkField(minutesField, 0, 59);
}

function checkHoursField(hoursField) {
 return checkField(hoursField, 0, 23);
}

function checkDayOfMonthField(dayOfMonthField) {
 if (dayOfMonthField == "?") {
   return true;
 }

 if (dayOfMonthField.indexOf("L") >= 0) {
   return checkFieldWithLetter(dayOfMonthField, "L", 1, 7, -1, -1);
 } if (dayOfMonthField.indexOf("W") >= 0) {
   return checkFieldWithLetter(dayOfMonthField, "W", 1, 31, -1, -1);
 } else if (dayOfMonthField.indexOf("C") >= 0) {
   return checkFieldWithLetter(dayOfMonthField, "C", 1, 31, -1, -1);
 } else {
   return checkField(dayOfMonthField, 1, 31);
 }
}


function checkMonthsField(monthsField) {

  let monthStr = monthsField;
  monthStr = monthStr.replace('JAN', '1');
  monthStr = monthStr.replace('FEB', '2');
  monthStr = monthStr.replace('MAR', '3');
  monthStr = monthStr.replace('APR', '4');
  monthStr = monthStr.replace('MAY', '5');
  monthStr = monthStr.replace('JUN', '6');
  monthStr = monthStr.replace('JUL', '7');
  monthStr = monthStr.replace('AUG', '8');
  monthStr = monthStr.replace('SEP', '9');
  monthStr = monthStr.replace('OCT', '10');
  monthStr = monthStr.replace('NOV', '11');
  monthStr = monthStr.replace('DEC', '12');

  return checkField(monthStr, 1, 31);
}

function checkDayOfWeekField(dayOfWeekField) {

 if (dayOfWeekField == "?") {
   return true;
 }

 if (dayOfWeekField.indexOf("L") >= 0) {
   return checkFieldWithLetter(dayOfWeekField, "L", 1, 7, -1, -1);
 } if (dayOfWeekField.indexOf("C") >= 0) {
   return checkFieldWithLetter(dayOfWeekField, "C", 1, 7, -1, -1);
 } else if (dayOfWeekField.indexOf("#") >= 0) {
   return checkFieldWithLetter(dayOfWeekField, "#", 1, 7, 1, 5);
 } else {
   // "MON,WED,FRI" 字符串
   let weekStr = dayOfWeekField;
   weekStr = weekStr.replace('SUN', '1');
   weekStr = weekStr.replace('MON', '2');
   weekStr = weekStr.replace('TUE', '3');
   weekStr = weekStr.replace('WED', '4');
   weekStr = weekStr.replace('THU', '5');
   weekStr = weekStr.replace('FRI', '6');
   weekStr = weekStr.replace('SAT', '7');

   return checkField(weekStr, 1, 7);
 }
}

function checkYearField(yearField) {
 return checkField(yearField, 1970, 2099);
}


function checkFieldWithLetter(value, letter, minimalBefore, maximalBefore,
 minimalAfter, maximalAfter) {
 let canBeAlone = false;
 let canHaveIntBefore = false;
 let canHaveIntAfter = false;
 let mustHaveIntBefore = false;
 let mustHaveIntAfter = false;

 if (letter == "L") {
   canBeAlone = true;
   canHaveIntBefore = true;
   canHaveIntAfter = false;
   mustHaveIntBefore = false;
   mustHaveIntAfter = false;
 }
 if (letter == "W" || letter == "C") {
   canBeAlone = false;
   canHaveIntBefore = true;
   canHaveIntAfter = false;
   mustHaveIntBefore = true;
   mustHaveIntAfter = false;
 }
 if (letter == "#") {
   canBeAlone = false;
   canHaveIntBefore = true;
   canHaveIntAfter = true;
   mustHaveIntBefore = true;
   mustHaveIntAfter = true;
 }

 let beforeLetter = "";
 let afterLetter = "";

 if (value.indexOf(letter) >= 0) {
   beforeLetter = value.substring(0, value.indexOf(letter));
 }

 if (!value.endsWith(letter)) {
   afterLetter = value.substring(value.indexOf(letter) + 1);
 }

 if (value.indexOf(letter) >= 0) {
   if (letter == value) {
     return canBeAlone;
   }

   if (canHaveIntBefore) {
     if (mustHaveIntBefore && beforeLetter.length == 0) {
       return false;
     }

     if (!checkIntValue(beforeLetter, minimalBefore, maximalBefore, true)) {
       return false;
     }
   } else {
     if (beforeLetter.length > 0) {
       return false;
     }
   }

   if (canHaveIntAfter) {
     if (mustHaveIntAfter && afterLetter.length == 0) {
       return false;
     }

     if (!checkIntValue(afterLetter, minimalAfter, maximalAfter, true)) {
       return false;
     }
   } else {
     if (afterLetter.length > 0) {
       return false;
     }
   }
 }

 return true;
}

/*    function checkIntValue(value, minimal, maximal) {
     return checkIntValue(value, minimal, maximal, true);
 } */

function checkIncrementField(value, minimal, maximal) {
 const start = value.substring(0, value.indexOf("/"));

 const increment = value.substring(value.indexOf("/") + 1);

 if (!("*" == start)) {
   return checkIntValue(start, minimal, maximal, true) && checkIntValue(increment, minimal, maximal, false);
 } 
   return checkIntValue(increment, minimal, maximal, true);
 
}



function checkListField(value, minimal, maximal) {
 const st = value.split(",").sort((x, y) => Number(x) - Number(y));

 const values = new Array(st.length);

 for (let j = 0; j < st.length; j++) {
   values[j] = st[j];
 }

 let previousValue = -1;

 for (let i = 0; i < values.length; i++) {
   const currentValue = values[i];

   if (!checkIntValue(currentValue, minimal, maximal, true)) {
     return false;
   }

   try {
     const val = parseInt(currentValue, 10);

     if (val <= previousValue) {
       return false;
     } 
       previousValue = val;
     
   } catch (e) {
     // we have always an int
   }
 }

 return true;
}

