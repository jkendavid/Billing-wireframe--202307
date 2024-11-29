
function getValueHeader(type){
    switch (type) {
      case 'determinant':
        return [
          {code:"base",text:"Value",class:'colcomment',formula:'determinant_formula',noref:true,type:'base'},
          {code:"comment",text:"Comment",width:'400px',type:'comment',formula:'comment_formula'}
        ]
      case 'amount':
        return [
          {code:"amount",text:"Amount",formula:'amount_formula',type:'amount'},
        ]
      case 'baseprice':
        return [
          {code:"base",text:"Base",formula:'base_formula',type:'base'},
          {code:"price",text:"Price",formula:'price_formula',type:'price'},
          {code:"amount",text:"Amount",formula:'amount_formula',type:'amount'},
        ]
        case 'summary':
          return [
            {code:"amount",text:"Net Amount"},
            {code:"tax",text:"Tax Amount"},
            {code:"gross",text:"Gross Amount"},
          ]
        case 'charges':
        return [
        {code:"amount_prev",text:"Previous Amount",isamount:true,type:'amount'},
        {code:"amount",text:"Current Amount",isamount:true,type:'amount'},
        {code:"amount_diff",text:"Difference",isamount:true,type:'amount'}
        ]
        case 'financeval':
        return [
        {code:"amount",text:"Amount",isamount:true,type:'amount'},
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
        unit = ['charges','tax'].includes(variable.category)? variable.base_unit:variable.unit
        decimal = rounding_rules.filter(x=> x.code == (['charges','tax'].includes(variable.category)?variable.base_rounding:variable.rounding))[0].decimal_place
        break;
      case 'price':
        if(variable.base_unit =='Php'){
          unit = ''
          decimal = 0
        }else{
          unit ='Php/'+variable.base_unit        
        }
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
   
    var grandtotal = {amount:10000,tax_amount:0,gross_amount:0}

    
    html.push(`<div class="container" style="min-width: 1000px;">
      <ul class="nav nav-tabs" id="calcTab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="calculation-tab" data-toggle="tab" href="#calculation" role="tab" aria-controls="calculation" aria-selected="true">Calculation</a>
        </li>   
        <li class="nav-item">
            <a class="nav-link" id="summary-tab" data-toggle="tab" href="#summary" role="tab" aria-controls="summary" aria-selected="false">Summary</a>
          </li>`)

      
    if(calculation.amounts)html.push(`<li class="nav-item">
            <a class="nav-link" id="charges-tab" data-toggle="tab" href="#charges" role="tab" aria-controls="charges" aria-selected="false">Charges</a>
          </li>`)          
    
    if(calculation.finance_values_seller||calculation.finance_values_buyer)html.push(`<li class="nav-item">
            <a class="nav-link" id="financevalseller-tab" data-toggle="tab" href="#financeval" role="tab" aria-controls="charges" aria-selected="false">Finance Values</a>
          </li>`)     

    html.push('</ul>')

    html.push('<div class="tab-content mt-3" id="calcTabContent">')
    html.push('<div class="tab-pane fade show active" id="calculation" role="tabpanel" aria-labelledby="calculation-tab">')

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
        html.push(`<tr class="trtotal"><th colspan="${group.type=='baseprice'?3:1}">Total</th>${headers.filter(x=> x.type=='amount').map(x=> formatVariableTd('',totalAmounts,x)).join('')}</tr>`)
      }
      html.push('</table>')    
    })

    html.push(`<table class="table table-sm table-condensed table-bordered">`)  
    getValueHeader('amount').map(x=>{ 
        html.push(`<tr class="trtotal"><th>Total ${x.text}</th>${formatVariableTd('',grandtotal,x)}</tr>`)  
    })
    html.push(`</table>`)      
    html.push('</div>')
    
    html.push('<div class="tab-pane fade" id="summary" role="tabpanel" aria-labelledby="summary-tab">')  
    html.push('<table class="table table-sm table-condensed table-bordered">')   
    var summaryheader = getValueHeader('summary')
    html.push(`<tr><th style="width:300px">Category </th>${summaryheader.map(x=>`<th class="header">${x.text}</th>`).join('')}</tr>`)  
    var chargeCategoryTotal={}

    html.push(`<tr class="trtotal"><th>Total</th>${summaryheader.map(x=> formatVariableTd('',chargeCategoryTotal,x)).join('')}</tr>`)   
    html.push('</table>')  

    html.push('</div>')
    

    if(calculation.amounts){
        html.push('<div class="tab-pane fade" id="charges" role="tabpanel" aria-labelledby="charges-tab">')  
        html.push('<table class="table table-sm table-condensed table-bordered">')   
        var chargeheader = getValueHeader('charges')
        html.push(`<tr><th style="width:300px">Charge</th>${chargeheader.map(x=>`<th class="header">${x.text}</th>`).join('')}</tr>`)  
        var chargeTotal={}
        calculation.amounts.map(amount=>{  
            html.push(`<tr><td>${getVariable(amount.variable).text}</td>${chargeheader.map(x=> {
                chargeTotal[x.code]=(chargeTotal[x.code]??0)+amount[x.code]
                return formatVariableTd('',amount,x)
            }).join('')}</tr>`)   
        })  
        html.push(`<tr class="trtotal"><th>Total</th>${chargeheader.map(x=> formatVariableTd('',chargeTotal,x)).join('')}</tr>`)   
        html.push('</table>')  
        html.push('</div>')
    }
    
    if(calculation.finance_values_seller||calculation.finance_values_buyer){
        html.push('<div class="tab-pane fade" id="financeval" role="tabpanel" aria-labelledby="financeval-tab">')  
        html.push('<table class="table table-sm table-condensed table-bordered">')     
        var financevalheader = getValueHeader('financeval')

        if(calculation.finance_values_seller){
          html.push(`<tr><th style="width:500px">Finance Account Seller</th>${financevalheader.map(x=>`<th class="header">${x.text}</th>`).join('')}</tr>`)  
          var financevalTotal={}
          calculation.finance_values_seller.map(amount=>{ 
              html.push(`<tr><td>[${amount.account}] ${finance_accounts.filter(x=> x.code==amount.account)[0].text}</td>${financevalheader.map(x=> {
                  financevalTotal[x.code]=(financevalTotal[x.code]??0)+amount[x.code]
                  return formatVariableTd('',amount,x)
              }).join('')}</tr>`)   
          })  
          html.push(`<tr class="trtotal"><th>Total</th>${financevalheader.map(x=> formatVariableTd('',financevalTotal,x)).join('')}</tr>`)   
          html.push('</table>') 
        } 
        if(calculation.finance_values_buyer){
          html.push(`<tr><th style="width:500px">Finance Account Buyer</th>${financevalheader.map(x=>`<th class="header">${x.text}</th>`).join('')}</tr>`)  
          var financevalTotal={}
          calculation.finance_values_buyer.map(amount=>{ 
              html.push(`<tr><td>[${amount.account}] ${finance_accounts.filter(x=> x.code==amount.account)[0].text}</td>${financevalheader.map(x=> {
                  financevalTotal[x.code]=(financevalTotal[x.code]??0)+amount[x.code]
                  return formatVariableTd('',amount,x)
              }).join('')}</tr>`)   
          })  
          html.push(`<tr class="trtotal"><th>Total</th>${financevalheader.map(x=> formatVariableTd('',financevalTotal,x)).join('')}</tr>`)   
          html.push('</table>')  
        }

        html.push('</div>')
    }
    

    html.push('</div>')
    html.push('</div>')


    modal = modalShow(`Calculation Result`,html.join(''))
  }
