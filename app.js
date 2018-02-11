(function(funcName, baseObj) {
    funcName = funcName || "docReady";
    baseObj = baseObj || window;
    var readyList = [];
    var readyFired = false;
    var readyEventHandlersInstalled = false;

    function ready() {
        if (!readyFired) {
            readyFired = true;
            for (var i = 0; i < readyList.length; i++) {
                readyList[i].fn.call(window, readyList[i].ctx);
            }
            readyList = [];
        }
    }

    function readyStateChange() {
        if (document.readyState === "complete") {
            ready();
        }
    }

    baseObj[funcName] = function(callback, context) {
        if (typeof callback !== "function") {
            throw new TypeError("callback for docReady(fn) must be a function");
        }

        if (readyFired) {
            setTimeout(function() { callback(context); }, 1);
            return;
        } else {
            readyList.push({ fn: callback, ctx: context });
        }
        if (document.readyState === "complete") {
            setTimeout(ready, 1);
        } else if (!readyEventHandlersInstalled) {
            if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded", ready, false);
                window.addEventListener("load", ready, false);
            } else {
                document.attachEvent("onreadystatechange", readyStateChange);
                window.attachEvent("onload", ready);
            }
            readyEventHandlersInstalled = true;
        }
    }
})("docReady", window);

docReady(function() {
    var day_names = [];

    function getDaysInMonth(month, year) {
        var date = new Date(year, month, 1);
        var days = [];
        var i = 1;
        day_names = [];
        while (date.getMonth() === month) {
            days.push(new Date(date).toLocaleString().split(",")[0]);
            day_names.push(new Date(date).getDay());
            date.setDate(date.getDate() + 1);
        }
        return days;
    }

    document.getElementById("getCal").onsubmit = function(e) {
        e.preventDefault();
        var monthSelect,
            monthVal,
            yearVal,
            elems = this.elements;
        for (i = 0; i < elems.length; i++) {
            if (elems[i].name == "month") {
                monthSelect = elems[i];
                monthVal = parseInt(monthSelect.options[monthSelect.selectedIndex].value);
            }
            if (elems[i].name == "year") {
                yearVal = elems[i].value;
            }
        }
        var days = [];
        if (yearVal > 0) {
            days = getDaysInMonth(monthVal, yearVal);
            document.getElementById("dates").getElementsByTagName('tbody')[0] = "";
            var html = "<tr>";
            for (i = 0; i < days.length; i++) {
                if(day_names[i] == 0) {
                  html +='<tr>'
                }
                html += '<td>';
                html += days[i];
                html += '</td>';
                if(day_names[i] == 6) {
                  html +='</tr>';
                }
            }
            html += "</tr>";
            prevMonthDays = getDaysInMonth(monthVal-1, yearVal);
            nextMonthDays = getDaysInMonth(monthVal+1, yearVal);
            document.getElementById("dates").getElementsByTagName('tbody')[0].innerHTML = html;
            var firstRow = document.getElementById("dates").getElementsByTagName('tbody')[0].getElementsByTagName('tr')[0].getElementsByTagName('td');
            var fe = firstRow.length;
            // for(fe)
            // for(i=0;i < )
        } else {
            alert("Please enter a valid Year.");
        }
    }

    function calculateFirstRow(day_names) {

    }

    function initday(day) {
        var daterow = document.getElementById("dates").getElementsByTagName('tbody')[0];
        var html = "<tr>";
    }

});