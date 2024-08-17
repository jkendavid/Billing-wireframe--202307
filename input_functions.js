

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
