Array.prototype.sortOnDesc = function() { 
    let dup = this.slice(), props, prop;
    if(!arguments.length) return dup.sort()
    let args = Array.prototype.slice.call(arguments);
    return dup.sort(function(a, b)
    {
        props = args.slice()
        prop = props.shift()
        while(a[prop] == b[prop] && props.length) prop = props.shift()
        return a[prop] == b[prop] ? 0 : a[prop] < b[prop] ? 1 : -1
    })
}

function Arrayfy(obj) {
    let arr = []
    forEach(obj, item => arr.push(item))
    return arr
}

function Arrayfy2(str) {
    let x = str.split('""')
    return  x.map(item => item.replace('"', ''))
}

function shuffleArray (arra1) {
    let ctr = arra1.length, temp, index;
    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function sortObject(obj) {
    if(!obj) return []
    let arr = []
    forEach(obj, (item, key) => {
        if(!item["count"]) item["count"] = 0
        if(!item["score"]) item["score"] = 0
        arr.push(Object.assign(item, {id: key}))
    })
    return arr.sortOnDesc("score", "count")
}

function sortByKey(data, key, sort) {
    if(!data) return
    if(sort == "desc") return data.sort((a,b) => (a[key] > b[key]) ? -1 : ((b[key] > a[key]) ? 1 : 0));
    else return data.sort((a,b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
}

function set(obj, field, field2, value, type) {
    
    if(field == undefined || field2 == undefined || value == undefined) return
    if(obj[field] == undefined) obj[field] = {}
    let o = obj[field]
    
    if(!type) {
        
        if(value == "count"){
            if(o[field2] == undefined) o[field2] = {}
            if(!o[field2]["count"]) o[field2]["count"] = 0
            return o[field2]["count"] += 1
        } else if(value == "score") {
            if(o[field2] == undefined) o[field2] = {}
            if(!o[field2]["score"]) o[field2]["score"] = 0
            return o[field2]["score"] += 100
        }  else {
            if(o[field2] != undefined) return false
            return o[field2] = value
        }

    } else {
        if(o[field2] == undefined) o[field2] = []
        o[field2].push(value)
        return true
    }
}

function command($elem, mode) {
    if(!$elem) return
    if(mode == true) {
        if($elem.data("busy") === true) return true
        $elem.data("busy", true)
        $elem.data("html", $elem.html())
        $elem.html(`<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>`)
        return false
    } else {
        $elem.data("busy", false)
        $elem.html($elem.data("html"))
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function noErrorParse(data) {
    if(!data) return {}
    let d = {}
    try {d = JSON.parse(data)} catch(e) {d = {}}
    return d
}

function f(number, prefix = "$") {
    if(!isNaN(number)){
        number = number.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.')
        number = number.split('').reverse().join('').replace(/^[\.]/,'')
    }
    return prefix + number
}

function shuffleArray (arra1 = []) {
    let ctr = arra1.length, temp, index;

    while (ctr > 0) {
        index = Math.floor(Math.random() * ctr);
        ctr--;
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}

function forEach(data, callback) 
{
    if (!data) return;
    
    var type = Object.prototype.toString.call(data);

    if(type == "[object Object]") {
        Object.keys(data).forEach((key, index) => callback(data[key], key, index));
    } else {
        if(type != "[object Array]") data = [data];
        data.forEach(callback);
    }

}


function getElemById(arr, id, idField = "id") {
    let ret = {}
    forEach(arr, item => {if(item[idField] == id) ret = item})
    return ret
}

let FormValidations = {
    ContainsNumbers (str) {
        return /^\d+$/.test(str)
    },

    ContainsLetters (str) {
        const matches = str.match(/[a-z]/gi)
        return !!matches ? matches.length > 0 : false
    },

    ContainsSpecialChars (str) {
        return /^[!@#\$%\^\&*\)\(+=._-]+$/g.test(str)
    },

    IsValidPhoneNumber (str) {
        return /^[\+]?\d+$/g.test(str)
    },

    IsValidEmail(str) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str)
    }
}

ValidateInputFormEmpty = fields => {
    for (let key of Object.keys(fields)) {
        if (fields[key].toString().trim() === "") return true
    }
    return false
}

function setInputFilter(textbox, inputFilter, errMsg) {

    let events = ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"]
    events.forEach(function(event) {
        textbox.addEventListener(event, function(e) {
            if(this.value == "") {
                this.oldValue = ""
                this.classList.remove("input-error");
                return;
            }
            if (inputFilter(this.value)) {
        
                if (["keydown","mousedown","focusout"].indexOf(e.type) >= 0){
                    this.classList.remove("input-error");
                    this.setCustomValidity("");
                }
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
               
                this.classList.add("input-error");
                this.setCustomValidity(errMsg);
                this.reportValidity();
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
             
                this.value = "";
            }
        });
    });
}


function _(cond, vtrue, vfalse = "") {
    if(cond) return vtrue
    else return vfalse
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

function extractString(string, subString) {
    let pos = getPosition(string, subString, 1)
    return [string.substring(0, pos), string.substring(pos + 1)]
}

function collapsible() {

    let coll = document.getElementsByClassName("collapsible");
    let i;

    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("collap-active");
            let content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function $$(str) {
    return document.querySelectorAll(str)
}