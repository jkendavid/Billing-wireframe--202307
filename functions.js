function timeStamp(){
    return new Date().getTime();
}


var modal 

function modalShow(title,body){
    $('.modal').remove();
    var modalId = `modal${timeStamp()}`
    var htmlModal = `    
    <div class="modal" id="${modalId}" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-dialog-scrollable" role="document"   style="min-width: max-content;">
            <div class="modal-content">
                <div class="modal-header">   
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            <div class="modal-body">${body}</div>
        </div>
        </div>
    </div>`
    $('#container').append(htmlModal);
    var modal = $('#'+modalId)
    modal.modal('show');
    return modal
}

function getOptionDomain(variable){
    var options = []    
    switch (variable) {
        case 'buyer':
            parties.forEach(x => options.push({value:x.code,text:x.code}));
            break;
        case 'seller':
            parties.forEach(x => options.push({value:x.code,text:x.code}));
            break;
        case 'contract':
            contracts.forEach(x => options.push({value:x.code,text:x.code}));
            break;
        case 'billing_template':
            billing_templates.forEach(x => options.push({value:x.code,text:x.code}));
            break;
        case 'rounding':
            rounding_rules.forEach(x => options.push({value:x.code,text:x.text}));
            break;
        case 'approval':
            approval_rules.forEach(x => options.push({value:x.code,text:x.text}));
            break;
        case 'billing_null_handling_rules':
            billing_null_handling_rules.forEach(x => options.push({value:x.code,text:x.code}));
            break;
        case 'tax_rules':
            tax_rules.forEach(x => options.push({value:x.code,text:x.code}));
            break;
        case 'regex':
            regex_validations.forEach(x => options.push({value:x.code,text:x.code}));
            break;
        case 'code_structure':
            options.push({value:'regex',text:'Regex'})
            options.push({value:'formula',text:'Formula'})
            options.push({value:'query',text:'Query'})
            break;
        case 'bool':
            options.push({value:1,text:'Yes'})
            options.push({value:0,text:'No'})
            break;
        default:
            variable_domain_codes.filter(x => x.variable === variable).forEach(x => options.push({value:x.code,text:x.code}));
    }
    return options
}

function htmlControlFormat(type,cotrol,label,required){
    var html = ''
    switch (type) {
        case 'form':
            html =  `
            <div class="form-group row">
                    <label for="newCode" class="col-md-4 col-form-label">${label}${required?'<span class="required">*</span>':''}</label>
                    <div class="col-md-8">${cotrol}</div>
                </div>`
            break;
        default:
            html = cotrol
    }
    return html;
}

function htmlControl(obj,readonly=false){
    switch (obj.type) {
        case 'text':
            return htmlControl_Text(obj,readonly)
        case 'code':
            return htmlControl_Code(obj,readonly)
        case 'domain':
            return htmlControl_Option(obj,readonly)
        case 'number':
            return htmlControl_Number(obj,readonly)
        case 'period':
            return htmlControl_Period(obj,readonly)
        case 'bool':
            obj.options=[{value:'true',text:'Yes'},{value:'false',text:'No'}]
            return htmlControl_Option(obj,readonly)
        default:
    }
}


function htmlControl_Code(obj,readonly=false){
    return htmlControlFormat(obj.selector,`<textarea ${obj.extension} prevval="${obj.value}" type="text" class="form-control" val="${obj.code}" ${obj.required?'required':''}  ${obj.readonly&&readonly?'readonly':''}>${obj.value??''}</textarea>`,obj.text,obj.required) 
}

function htmlControl_Text(obj,readonly=false){
    var strValue = obj.value?`value="${obj.value}"`:''
    return htmlControlFormat(obj.selector,`<input ${obj.extension} prevval="${obj.value}" type="text" ${strValue} class="form-control" val="${obj.code}" ${obj.required?'required':''}  ${obj.readonly&&readonly?'readonly':''}>`,obj.text,obj.required) 
}

function htmlControl_Number(obj,readonly=false){
    var strValue = obj.value!=undefined?`value="${obj.value}"`: obj.id=='index'?'value="1"':''
    var strMin = obj.min!=undefined?`min="${obj.min}"`:''
    var strMax = obj.max!=undefined?`max="${obj.max}"`:''
    return htmlControlFormat(obj.selector,`<input ${strMin} ${strMax} ${obj.extension} prevval="${obj.value}" type="number" step="${obj.step}" ${strValue} class="form-control" val="${obj.code}" ${obj.required?'required':''}  ${obj.readonly&&readonly?'readonly':''}>`,obj.text,obj.required) 
}

function htmlControl_Period(obj,readonly=false){
    var strValue = obj.value?`value="${obj.value}"`:''
    return htmlControlFormat(obj.selector,`<input ${obj.extension} prevval="${obj.value}" type="month" ${strValue} class="form-control" val="${obj.code}" ${obj.required?'required':''}  ${obj.readonly&&readonly?'readonly':''}>`,obj.text,obj.required) 
}


function htmlControl_Option(obj,readonly=false){
    var htmlOption = htmlControl_Option_Options(obj)
    return htmlControlFormat(obj.selector,`<select ${obj.extension} class="form-control" prevval="${obj.value}" val="${obj.code}" ${obj.required?'required':''}  ${obj.readonly&&readonly?'readonly':''} ${obj.multiple?'multiple':''}>${htmlOption}</select>`,obj.text,obj.required) 
}

function htmlControl_Option_Options(obj){
    var htmlOption = []
    if(obj.blank??true)htmlOption.push(`<option value=""></option>`);
    if(!obj.options)obj.options = getOptionDomain(obj.code)
    obj.options.map(option=> {
        var selected = obj.value==option.value?'selected':''
        htmlOption.push(`<option value="${option.value}" ${selected}>${option.text}</option>`)
    })  
    return htmlOption.join('')
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

function getLast(obj){
    return obj?obj[obj.length-1]:null
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

function toProperCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}


function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getPeriod(str){
    return Number(str.replace(/-/g, ''));
}

function toPeriod(num){
    var str = num.toString()
    var year = str.slice(0, 4);
    var month = str.slice(4, 6);
    return `${year}-${month}`;
}

function getVariable(code){
   return deepCopy(variables).filter(x=> x.code == code)[0]
}


function getGroupLast(data, groupFields) {
    var latestItems = {};  
    data.forEach(function (item) {
      var groupKey = groupFields.map(field => item[field]).join('|');  
      item.groupKey = groupKey
      latestItems[groupKey] = item;
    });  
    return Object.values(latestItems);
}

function getSplitKey(split,splitfields){
    var obj = {}
    split.map(x=>{obj[x.field] = x.value})
    return splitfields.map(x => obj[x]).filter(x=> x!='').join('|');       
}


function showPromptRemarks(required=false){
    var remarks = prompt(`Remarks${required?'*':''}`);
    if(required&&String(remarks).trim() == "") {
        alert("Remarks Required")
        remarks = null
    }
    return {ok:remarks!=null, text:remarks};
}

const hasDuplicates = array => new Set(array).size !== array.length;

function testRegex(pattern, text) {
    const regex = new RegExp(pattern);
    return regex.test(text);
}


function fieldValidation(variable, value){
    //required check
    if (variable.required && !value) return({ok:false, message:`${variable.text} [Cannot be blank]`})

    //regex check
    if (value&&variable.regex) {     
        var regex = regex_validations.filter(x=> x.code == variable.regex)[0]
        var validationResult = testRegex(regex.pattern,value)
        if(!validationResult) return({ok:false, message:`${variable.text} [Error on "${value}", ${regex.text}]`})
    }
    
    //min max check
    if (value < variable.min) return({ok:false, message:`${variable.text} [Min value is ${variable.min}]`})
    if (value > variable.max) return({ok:false, message:`${variable.text} [Max value is ${variable.max}]`})

    //code check
    if(variable.code_structure=='regex'){
        const isRegexPattern = str => { try { new RegExp(str); return true; } catch (error) { return false; } };
        if(!isRegexPattern(value)) return({ok:false, message:`${variable.text} [Error on ${value}, invalid regex pattern]`})
    }
    return {ok:true}
}



function getLatestContractData(final=false){ 
    const checkStatus = (status) => final ? status === 'approved' : status !== 'canceled';

    var query = deepCopy(contract_update_trans)
    .filter(x=> checkStatus(getLast(x.status).status))
    .map(tran=>{
      var contract = contracts.filter(x=> x.code == tran.contract)[0]
      //get last status of the transaction
      tran.statuslog = tran.status
      var stat = getLast(tran.status)
      ;tran = {...tran,...stat, ...contract}
      var sub_status = approval_steps.filter(x=> x.code == tran.sub_status)[0]
      tran.sub_status_text = sub_status?sub_status.text:''
      tran.remarks = tran.statuslog.filter(x=> x.remarks).map(x=> `${x.update_by}: ${x.remarks}`).join('</br>')
      return tran
    })
    return getGroupLast(query,['code'])
  }


  function getLatestPartyData(final=false){ 
    const checkStatus = (status) => final ? status === 'approved' : status !== 'canceled';

    var query = deepCopy(party_update_trans)
    .filter(x=> checkStatus(getLast(x.status).status))
    .map(tran=>{
      var party = parties.filter(x=> x.code == tran.party)[0]
      //get last status of the transaction
      tran.statuslog = tran.status
      var stat = getLast(tran.status)
      ;tran = {...tran,...stat, ...party}
      var sub_status = approval_steps.filter(x=> x.code == tran.sub_status)[0]
      tran.sub_status_text = sub_status?sub_status.text:''
      tran.remarks = tran.statuslog.filter(x=> x.remarks).map(x=> `${x.update_by}: ${x.remarks}`).join('</br>')
      return tran
    })
    return getGroupLast(query,['code'])
  }

  function getLatestDynamic(final=false){ 
    const checkStatus = (status) => final ? status === 'approved' : status !== 'canceled';

    var query = deepCopy(dynamic_update_trans)
    .filter(x=> checkStatus(getLast(x.status).status))
    .map(tran=>{
      //get last status of the transaction
      tran.statuslog = tran.status
      var stat = getLast(tran.status)
      ;tran = {...tran,...stat}
      var sub_status = approval_steps.filter(x=> x.code == tran.sub_status)[0]
      tran.sub_status_text = sub_status?sub_status.text:''
      tran.remarks = tran.statuslog.filter(x=> x.remarks).map(x=> `${x.update_by}: ${x.remarks}`).join('</br>')
      return tran
    })
    return getGroupLast(query,['category','period_from'])
  }


  function formatNumber(value,decimalmin,decimalmax){
    return  value?value.toLocaleString('en-US', { minimumFractionDigits: decimalmin, maximumFractionDigits: decimalmax }):''
  }


  function getPeriodBetWeen(periodFrom, periodTo){
    var periods = []
    var period=periodFrom
    do {
        periods.push(period)
        period += (period.toString().slice(-2)=='12')?89:1
    } while (period <= periodTo);
    return periods
  }

  function crossJoin(objs1, objs2) {
    const result = [];
    for (let obj1 of objs1) {
      for (let obj2 of objs2) {
        result.push({ ...obj1,...obj2});
      }
    }    
    return result;
  }



function p(item){
    console.log(item)
}
var xx
var x1
var x2
var x3
var x4




//Billing Calculation 
  function getValueHeader(type){
    switch (type) {
      case 'determinant':
        return [
          {code:"base",text:"Value",class:'colcomment',formula:'determinant_formula',noref:true,type:'base'},
          {code:"comment",text:"Comment",width:'400px',type:'comment',formula:'comment_formula'}
        ]
      case 'amount':
        return [
          {code:"net_amount",text:"Net Amount",formula:'amount_formula',type:'amount'},
          {code:"tax_amount",text:"Tax Amount",type:'amount'},
          {code:"gross_amount",text:"Gross Amount",type:'amount'}]
      case 'baseprice':
        return [
          {code:"base",text:"Base",formula:'base_formula',type:'base'},
          {code:"price",text:"Price",formula:'price_formula',type:'price'},
          {code:"net_amount",text:"Net Amount",isamount:true,type:'amount',calculation:'[@.base]*[@.price]'},
          {code:"tax_amount",text:"Tax Amount",isamount:true,type:'amount',calculation:'0.12*[@.net_amount]'},
          {code:"gross_amount",text:"Gross Amount",isamount:true,type:'amount',calculation:'[@.net_amount]+[@.tax_amount]'}
        ]
      default:
        return []
    }
  }

  function formatVariableTd(code,item,header){
    var value = item[header.code]
    var unit 
    var decimal
    var variable = getVariable(code)
    switch (header.type){
      case 'comment':
        return`<td class="variableComment">${item.comment??''}</td>`
      case 'amount': 
        unit = 'Php' 
        decimal = 2
        break;
      case 'base':
        unit = variable.category=='charges'? variable.base_unit:variable.unit
        decimal = rounding_rules.filter(x=> x.code == (variable.category=='charges'?variable.base_rounding:variable.rounding))[0].decimal_place
        break;
      case 'price':
        unit ='Php/'+variable.base_unit
        decimal = rounding_rules.filter(x=> x.code == variable.price_rounding)[0].decimal_place
        break;
    }   

    if (typeof value === 'number') {
      value = formatNumber(value,(header.type=='amount')?decimal:0,decimal)
    } else {
      value = `<a href="#" class="mx-2 aerror" title="${value}">ERROR</a>`
      unit = ''
    }


    return `<td><div class="variableTd">
                <span class="variableTdValue">${value}</span>
                ${unit==''?'':`<span class="variableTdUnit">${unit}</span>`}
              </div></td>`
  }
  
  function viewCalculated(ctrl){
    var tr = $(ctrl).closest('tr')
    var contract = $(tr.find('td[data="contract"]')[0]).text()
    var revision_number = $(tr.find('td[data="revision_number"]')[0]).text()
    var period = getPeriod($(tr.find('td[data="period"]')[0]).text())
    var html = []
    
    var calculation = deepCopy(billing_calculations).filter(x=> getPeriod(x.period)==period && x.contract==contract && x.revision_number == revision_number)[0] 
   
    var grandtotal = {net_amount:10000,tax_amount:0,gross_amount:0}

    calculation.values.map(group=>{
      var headers = getValueHeader(group.type)
      var ischarge = group.type!='determinant'
      html.push('<table class="table table-sm table-condensed table-bordered">')
      html.push(`<tr><th style="width:300px">${group.text}</th>${headers.map(x=>`<th class="header">${x.text}</th>`).join('')}</tr>`)
      var totalAmounts= {}
      group.items.map(item=>{
        var variable = deepCopy(variables.filter(x=> x.code == item.variable))[0]
        html.push(`<tr><td>${variable.text}</td>`)
        headers.map(header=>{
          html.push(formatVariableTd(variable.code,item,header))
          if(header.type=='amount'){
            totalAmounts[header.code]=item[header.code]+(totalAmounts[header.code]??0)
            grandtotal[header.code]=item[header.code]+(grandtotal[header.code]??0)
          }
        })
        html.push('</tr>')
      })
      if(ischarge){
        html.push(`<tr class="trtotal"><th colspan="${group.type=='baseprice'?3:1}">Total</th>${headers.filter(x=> x.isamount).map(x=> formatVariableTd('',totalAmounts,x)).join('')}</tr>`)
        
      }
      html.push('</table>')    
    })

    

    html.push(`<table class="table table-sm table-condensed table-bordered">`)  
    getValueHeader('amount').map(x=>{ 
        html.push(`<tr class="trtotal"><th>Total ${x.text}</th>${formatVariableTd('',grandtotal,x)}</tr>`)  
    })
    html.push(`</table>`)  

    


    modal = modalShow(`Calculation Result`,html.join(''))
  }










//resdb API


const resDbUrl = 'https://samplebilling-a335.restdb.io/rest/wireframe/66b4ec34eb728d7b000069c2'
const resDbApiKey = '66b4de10b8678aea9d284a9f'


function resDbCommit(){

    $('#resdbCommitBtn').attr('disabled', true);
    $('#spinner').show();
    var jsondata = {"jasondata": {
        window_categories,
        approval_rules,
        approval_steps,
        regex_validations,
        variables,
        variable_domain_codes,
        rounding_rules,
        tax_rules,
        window_fields,
        parties,
        contracts,
        contract_update_trans,
        party_update_trans,
        dynamic_update_trans,
        billing_null_handling_rules,
        billing_templates,
        template_default,
        billing_calculations
    }};

    fetch(resDbUrl, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'x-apikey': resDbApiKey,
        'Cache-Control': 'no-cache'
    },
    body: JSON.stringify(jsondata) // Use body to send data
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
    console.log('Data Committed');
    })
    .catch(error => {
    console.error('Error:', error); // Log any errors
    })
    .finally(() => {
      $('#resdbCommitBtn').attr('disabled', false);
      $('#spinner').hide();
    });
}


async function resDbLoad() {
    return true
    try {
      const response = await fetch(resDbUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-apikey': resDbApiKey,
          'Cache-Control': 'no-cache'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      const obj = data.jasondata;
  
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          eval(`${key} = obj[key];`);
        }
      }
  
      console.log('Data has been loaded and processed.');
      return true;
    } catch (error) {
      console.error('Error:', error);
      return false; 
    }
}
