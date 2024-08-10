

$('body').prepend(
`<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Data
              </a>
              <div class="dropdown-menu" aria-labelledby="servicesDropdown">
                <a class="dropdown-item" href="parties.html">Parties</a>
                <a class="dropdown-item" href="contracts.html">Contracts</a>
                <a class="dropdown-item" href="dynamics.html">Period Data</a>
              </div>
          </li>
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Billing
              </a>
              <div class="dropdown-menu" aria-labelledby="servicesDropdown">
                  <a class="dropdown-item" href="billing_templates.html">Billing Templates</a>
                  <a class="dropdown-item" href="template_default.html">Template Default</a>
                  <a class="dropdown-item" href="billing_calculation.html">Billing Calculation</a>
                  <a class="dropdown-item" href="billing_generation.html">Billing Generation</a>
              </div>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="servicesDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Configuration
            </a>
            <div class="dropdown-menu" aria-labelledby="servicesDropdown">
                <a class="dropdown-item" href="variables.html">Variables</a>
                <a class="dropdown-item" href="window_categories.html">Window Category</a>
                <a class="dropdown-item" href="approval_rules.html">Approval Rules</a>
                <a class="dropdown-item" href="rounding_rules.html">Rounding Rules</a>
                <a class="dropdown-item" href="regex_validations.html">Regex Validations</a>
                <a class="dropdown-item" href="tax_rules.html">Tax Rules</a>
                <a class="dropdown-item" href="finance_accounts.html">Finance Accounts</a>
                <a class="dropdown-item" href="finance_account_link.html">Finance Accounts Link</a>
            </div>
        </li>
          
      </ul>

      <ul class="navbar-nav ml-auto mr-5">         
          <li class="nav-item">              
            <button type="button" class="btn btn-primary" id="resdbCommitBtn" onclick="resDbCommit()">Commit
                <span id="spinner" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="display:none;"></span>
            </button>
          </li>
      </ul>
      <ul class="navbar-nav">         
          <li class="nav-item">
              <select class="form-control" id="user" required onchange="handleUserChange()">
                <option value="MKTG">MKTG</option>
                <option value="MKTGMNGR">MKTGMNGR</option>
              </select>
          </li>
      </ul>
  </div>
</nav>

<div class="modal" id="popup" tabindex="-1" role="dialog">
<div class="modal-dialog modal-dialog-scrollable" role="document"  style="min-width: max-content;">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="popupTitle"></h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p id="popupMessage"></p>  
    </div>
  </div>
</div>
</div>

`
)

function handleUserChange() {}

function Arg(name) {
    url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getUser(){
    return document.getElementById("user").value;
}

function getCurrentTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes;
}  

function doesValueExistInColumn(dataTable, columnIdx, valueToCheck) {
var columnData = dataTable.column(columnIdx).data().toArray();
return columnData.includes(valueToCheck);
}


function TableRecordExist(dataTable, conditions){
    for (var i = 0; i < dataTable.rows().count(); i++) {
        var output = true;        
        for (var c = 0; c < conditions.length; c++) {
            var condition = conditions[c]
            var cell = dataTable.rows().data()[i][condition.index];
            switch (condition.cond){
                case '!=':
                    output &&= cell != condition.value
                    break;
                case '>':
                    output &&= cell > condition.value
                    break;
                case '<':
                    output &&= cell < condition.value
                    break;
                default:
                    output &&= cell == condition.value
            }
        }
        if (output == true) return true
    }
    return false
}


function periodVal(text){
    return parseInt(text.replace('-', ''))
}


function pause(n) {    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(); 
      }, n); 
    });
}


function RefCode(pref) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let referenceNumber = '';
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        referenceNumber += characters.charAt(randomIndex);
    }
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        referenceNumber += numbers.charAt(randomIndex);
    }
    return pref+referenceNumber;
}
  
function getFloat(str){
    return  parseFloat(str.toString().replace(/,/g, ''));
}

function nFormat(number,digit=null){
    number=getFloat(number==''?'0':number);
    if(digit==null){
        var numberString = number.toString();
        var match = numberString.match(/\.(\d+)/);
        digit= match==null?0:match[1].length 
        digit=digit>8?8:digit
    }
    return number.toLocaleString(undefined, {
        minimumFractionDigits: digit,
        maximumFractionDigits: digit
    });
}

if (typeof JSON === 'undefined') {
    JSON = {
      stringify: function (obj) {
        var seen = [];
        return JSON.stringify(obj, function (key, val) {
          if (typeof val === 'object' && val !== null) {
            if (seen.indexOf(val) !== -1) {
              return;
            }
            seen.push(val);
          }
          return val;
        });
      },
      parse: function (str) {
        return JSON.parse(str);
      }
    };
}


function deepCopy(obj) {
return JSON.parse(JSON.stringify(obj));
}


function updateSelectOption(opt,data,all='',classindex = null){
    var value = opt.val();
    opt.empty();
    if(all!=''){ 
        opt.append($('<option>', {
            value: '',
            text: all
        }));
    }

    $.each(data, function(index, value) {
        opt.append($(`<option>`, {
            value: value[0],
            text: value[0],
            class: classindex!=null?value[classindex]:''
        }));
    });
    opt.val(value);
}


function splitTodiv(text){
    var parts = text.split('|');
    var arr = []
    for (var i = 0; i < parts.length; i++) {
      arr.push('<div>' + parts[i] + '</div>');
    }
    return arr.join('');
}



function htmlText(htmlString){
    var tempElement = $('<div>').html(htmlString);
    return tempElement.children().text();
}


function getDataRow(data,code,col){
    for (var i = 0; i < data.length; i++) {
        if(data[i][col] == code )return data[i];
    }
}


function popupShow(title,messages){
    $('#popupTitle').text(title);
    var msgModalText = $('#popupMessage')
    msgModalText.empty();
    for (var i = 0; i < messages.length; i++) {
        msgModalText.append(`<div>${messages[i]}.</div>`);
    }
    $('#popup').show()
}

function popupHide(){
    $('#popup').hide()
}


function cellVariableRef(ref){
    var row = getDataRow(dataVariables,ref,1);
    var title= 'NAN'
    if(!!row){
        title = `${row[2]}, ${row[3]}`
    }
    return `<a href="#" title="${title}">${ref}</a>`
}


function cellContractRef(ref){
    var row = getDataRow(dataContract,ref,0);
    var title= 'NAN'
    if(!!row){
        title = 
`Type: ${row[1]} 
Seller: ${row[2]}
Buyer: ${row[3]}
Period From: ${row[5]}
Period To:  ${row[6]}`
    }
    return `<a href="#" title="${title}">${ref}</a>`
}


function cellPartyRef(ref){
    var row = getDataRow(dataParties,ref,0);
    var title= 'NAN'
    if(!!row){
        title = 
`Name: ${row[1]} 
Type: ${row[2]}`
    }
    return `<a href="#" title="${title}">${ref}</a>`
}

function cellTemplateRef(ref){
    var row = getDataRow(dataTemplates,ref,0);
    var title= 'NAN'
    if(!!row){
        title =  row[1]
    }
    return `<a href="#" title="${title}">${ref}</a>`
}

function cellTableRef(ref){
    var row = getDataRow(dataVariableTables,ref,0);
    var title= 'NAN'
    if(!!row){
        title = row[1]
    }
    return `<a href="#" title="${title}">${ref}</a>`
}

function cellRoundingRef(ref){
    var row = getDataRow(dataRoundingRule,ref,0);
    var title= 'NAN'
    if(!!row){
        title = 
`${row[1]} 
(${row[3]} ${row[2]})`
    }
    return `<a href="#" title="${title}">${ref}</a>`
}

function cellFinanceAccountRef(ref){
    var row = getDataRow(dataFinanceAccount,ref,0);
    var title= 'NAN'
    if(!!row){
        title = row[1]
    }
    return `<a href="#" title="${title}">${ref}</a>`
}


