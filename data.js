var window_categories =[
    {window:'parties',code:'GEN', text:'Generator', approval:'THREESTEP',fields:[
        {variable:'name',required:'true'},
        {variable:'address',required:'true'},
        {variable:'tin',required:'false'},
        {variable:'gentype',required:'true'},
    ]},
    {window:'parties',code:'RES', text:'Retail Electricity Supplier', approval:'ONESTEP',fields:[
        {variable:'name',required:'true'},
        {variable:'address',required:'true'},
        {variable:'tin',required:'false'},
        {variable:'creditrating',required:'false'},
    ]},
    {window:'parties',code:'DU', text:'Distribution Utilities', approval:'ONESTEP',fields:[
        {variable:'name',required:'true'},
        {variable:'address',required:'true'},
        {variable:'tin',required:'false'},
        {variable:'creditrating',required:'false'},
    ]},
    {window:'parties',code:'DCC', text:'Directly Connected Customer', approval:'ONESTEP',fields:[
        {variable:'name',required:'true'},
        {variable:'address',required:'true'},
        {variable:'tin',required:'false'},
        {variable:'creditrating',required:'false'},
    ]},
    {window:'parties',code:'CC', text:'Contestable Customer', approval:'ONESTEP',fields:[
        {variable:'name',required:'true'},
        {variable:'address',required:'true'},
        {variable:'tin',required:'false'},
        {variable:'creditrating',required:'false'},
    ]},
    {window:'parties',code:'CUSTOM', text:'Custom Party type', approval:'ONESTEP',fields:[
    ]},
    {window:'contracts',code:'PSA_COAL', text:'PSA Coal', approval:'THREESTEP',fields:[
        {variable:'freetext1',required:'false'},
    ]},
    {window:'contracts',code:'PSA_SOLAR', text:'PSA Solar', approval:'ONESTEP',fields:[
        {variable:'freetext1',required:'false'},
        {variable:'freetext2',required:'false'},
    ]},
    {window:'contracts',code:'RSC', text:'Retail supply Contract', approval:'ONESTEP',fields:[
    ]},
    {
        window:'dynamics',code:'INDEX', text:'Monthly Index', approval:'ONESTEP',
        filter:'finconst',fields:[
            {variable:'forex',required:'true',active:'true'},
            {variable:'ncrcpi',required:'true',active:'true'},
            {variable:'phpcpi',required:'true',active:'true'},
            {variable:'comment',required:'false',active:'true'},]
    },
    {
        window:'dynamics',code:'PLANT', text:'Monthly Plant Data', approval:'ONESTEP',
        filter:'plant_sources',fields:[
            {variable:'pmq',required:'true',active:'true'},
            {variable:'coalmt',required:'true',active:'true'},
            {variable:'coalcost',required:'true',active:'true'},
            {variable:'comment',required:'false',active:'true'},]
    },
    {
        window:'dynamics',code:'MBCQ', text:'Monthly BCQ', approval:'ONESTEP',
        filter:'wesm_buyer_bid',fields:[
            {variable:'bcq',required:'true',active:'true'},
            {variable:'mq',required:'true',active:'true'},
            {variable:'lr',required:'true',active:'true'},]
    },
    {
        window:'dynamics',code:'FINCONST', text:'Finance Constants', approval:'ADMIN',
        filter:'finconst',fields:[{variable:'vatrate',required:'true',active:'true'},]
    },
]

var approval_rules = [
    {code:'THREESTEP',text:'Three Step'},
    {code:'ONESTEP',text:'One Step'},
    {code:'ADMIN',text:'Admin'},
]

var approval_steps = [
    {rule:'THREESTEP',index:1,code:'THREESTEPFIRST',text:'1st Approval',skipable:'false', approver:['MKTG','MKTGMGR']},
    {rule:'THREESTEP',index:2,code:'THREESTEPSECOND',text:'2nd Approval',skipable:'false', approver:['MKTGMGR']},
    {rule:'THREESTEP',index:3,code:'THREESTEPFINAL',text:'Final Approval',skipable:'false', approver:['MKTGMGR']},
    {rule:'ONESTEP',index:1,code:'ONESTEPFINAL',text:'Final One Step Approval',skipable:'false', approver:['MKTG','MKTGMGR']},
    {rule:'ADMIN',index:1,code:'ADMAPR',text:'Admin Approval',skipable:'false', approver:['MKTGMGR']},
]

var regex_validations = [
    {code:'code', pattern:'^[a-zA-Z0-9_/-]+$', text:'Alpha numeric, underscore and dash only'},
    {code:'tin', pattern:"^\\d{3}-\\d{3}-\\d{3}-\\d{3}$", text:'Format should be ###-###-###-### (ex. 987-654-321-000)'},
]

var variables = [
    {category:'system',code:'owned',type:'bool',text:'Owned'},
    {category:'system',code:'code',type:'text',text:'Code',regex:'code'},
    {category:'system',code:'period_from',type:'period',text:'Period From'},
    {category:'system',code:'period_to',type:'period',text:'Period To'},
    {category:'system',code:'index',type:'number',text:'Index', min:0, max:99}, 
   

    {category:'system',code:'contract',type:'domain',text:'Contract'},
    {category:'system',code:'buyer',type:'domain',text:'Buyer'},
    {category:'system',code:'seller',type:'domain',text:'Seller'},
    {category:'system',code:'billing_template',type:'domain',text:'Billing Template'},

    {category:'system',code:'period',type:'period',text:'Period'},
    {category:'system',code:'date',type:'domain',text:'Date'},
    {category:'system',code:'hour',type:'domain',text:'Hour'},
    {category:'system',code:'interval5m',type:'domain',text:'5-minute interval'},
    {category:'system',code:'interval1h',type:'domain',text:'Hourly Interval'},

    {category:'inputs',code:'name',type:'text',text:'Name',description:'',active:'active'},
    {category:'inputs',code:'address',type:'text',text:'Address',description:'',active:'active'},
    {category:'inputs',code:'tin',type:'text',text:'TIN',description:'',active:'active',regex:'tin'},
    {category:'inputs',code:'msp',type:'domain',text:'Metering Service Provider',description:'',active:'active'},
    {category:'inputs',code:'creditrating',type:'domain',text:'Credit Rating',description:'',active:'active'},  
    {category:'inputs',code:'gentype',type:'domain',text:'Type',description:'',active:'active'},  
    {category:'inputs',code:'cc',type:'number',text:'Contracted Capacity',description:'',active:'active',rounding:'kw',unit:'MW', min:0},
    {category:'inputs',code:'crfr',type:'number',text:'Capital Recovery Fee Rate',description:'',active:'active',rounding:'rate',unit:'Php/kW'},
    {category:'inputs',code:'fomr',type:'number',text:'Fixed O&M Fee Rate',description:'',active:'active',rounding:'rate',unit:'Php/kW'},
    {category:'inputs',code:'vomr',type:'number',text:'Variable O&M Fee Rate',description:'',active:'active',rounding:'rate',unit:'Php/kWh'},
    {category:'inputs',code:'er194r',type:'number',text:'ER-194 Rate',description:'',active:'active',rounding:'rate',unit:'Php/kWh'},
    {category:'inputs',code:'forexb',type:'number',text:'FOREX base',description:'',active:'active',rounding:'index',unit:''},
    {category:'inputs',code:'ncrcpib',type:'number',text:'NCR CPI base',description:'',active:'active',rounding:'index',unit:''},     
    {category:'inputs',code:'forex',type:'number',text:'FOREX',description:'',active:'active',rounding:'index',unit:''},
    {category:'inputs',code:'ncrcpi',type:'number',text:'NCR CPI',description:'',active:'active',rounding:'index',unit:''},
    {category:'inputs',code:'phpcpi',type:'number',text:'PHP CPI',description:'',active:'active',rounding:'index',unit:''},
    {category:'inputs',code:'pmq',type:'number',text:'Metered Quantity',description:'',active:'active',rounding:'index',unit:'kWh'},
    {category:'inputs',code:'coalmt',type:'number',text:'Coal Consumption',description:'',active:'active',rounding:'index',unit:'MT'},
    {category:'inputs',code:'coalcost',type:'number',text:'Delivered Coal Price',description:'',active:'active',rounding:'index',unit:'Php/MT'},  
    {category:'inputs',code:'bcq',type:'number',text:'BCQ',description:'',active:'active',rounding:'kw',unit:'kWh'},
    {category:'inputs',code:'mq',type:'number',text:'MQ',description:'',active:'active',rounding:'kw',unit:'kWh'},
    {category:'inputs',code:'lr',type:'number',text:'Line Rental',description:'',active:'active',rounding:'php',unit:'Php'},
    {category:'inputs',code:'comment',type:'text',text:'Comment',description:'',active:'active'},
    {category:'inputs',code:'freetext1',type:'text',text:'Free text 1',description:'',active:'active'},
    {category:'inputs',code:'freetext2',type:'text',text:'Free text 2',description:'',active:'active'},

    

    {category:'inputs',code:'vatrate',type:'number',text:'VAT Rate',description:'',active:'active',rounding:'',unit:'', min:0},

    {category:'filters',code:'plant_sources',type:'domain',text:'Plant Source',description:'',active:'active'}, 
    {category:'filters',code:'finconst',type:'domain',text:'Finance Constants',description:'',active:'active'}, 
    {category:'filters',code:'wesm_buyer_bid',type:'domain',text:'WESM Buyer Billing ID',description:'',active:'active'}, 
    
   
    {category:'dynamic',code:'constype',type:'domain',text:'Constant Type',description:'',active:'active'},  
    {category:'dynamic',code:'value',type:'number',text:'Value',description:'',active:'active',rounding:'general',unit:''},
    {category:'dynamic',code:'comment',type:'text',text:'Comment',description:'',active:'active'},

    {category:'dynamic',code:'bcq',type:'number',text:'BCQ',description:'',active:'active',rounding:'kw',unit:'kWh'},
    {category:'dynamic',code:'vat_rate',type:'number',text:'VAT RATE',description:'',active:'active',rounding:'general',unit:''},
   

    {category:'determinants',code:'vatr',type:'number',text:'VAT Rate',description:'',active:'active',rounding:'general',unit:''},
    {category:'determinants',code:'forexb',type:'number',text:'Forex Base',description:'',active:'active',rounding:'index',unit:''},
    {category:'determinants',code:'forexc',type:'number',text:'Forex Current',description:'',active:'active',rounding:'index',unit:''},
    {category:'determinants',code:'ncrcpib',type:'number',text:'NCR CPI Base',description:'',active:'active',rounding:'index',unit:''},
    {category:'determinants',code:'ncrcpic',type:'number',text:'NCR CPI Current',description:'',active:'active',rounding:'index',unit:''},
    {category:'determinants',code:'rateindex',type:'number',text:'Rate Index',description:'',active:'active',rounding:'index',unit:''},
    {category:'determinants',code:'pmq',type:'number',text:'Metered Quantity',description:'',active:'active',rounding:'kWh',unit:'kWh'},
    {category:'determinants',code:'coalmt',type:'number',text:'Coal Consumption',description:'',active:'active',rounding:'index',unit:'MT'},
    {category:'determinants',code:'coalcost',type:'number',text:'Delivered Coal Price',description:'',active:'active',rounding:'index',unit:'Php'},  
    {category:'determinants',code:'cc',type:'number',text:'Contracted Capacity',description:'',active:'active',rounding:'kw',unit:'kW', min:0},
    {category:'determinants',code:'energy',type:'number',text:'Delivered Energy',description:'',active:'active',rounding:'kw',unit:'kWh'},
    {category:'determinants',code:'crfr',type:'number',text:'Capital Recovery Fee Rate',description:'',active:'active',rounding:'rate',unit:'Php/kW'},
    {category:'determinants',code:'fomr',type:'number',text:'Fixed O&M Fee Rate',description:'',active:'active',rounding:'rate',unit:'Php/kW'},
    {category:'determinants',code:'vomr',type:'number',text:'Variable O&M Fee Rate',description:'',active:'active',rounding:'rate',unit:'Php/kWh'},
    {category:'determinants',code:'er194r',type:'number',text:'ER-194 Rate',description:'',active:'active',rounding:'rate',unit:'Php/kWh'},
    {category:'determinants',code:'fuelr',type:'number',text:'Fuel Rate',description:'',active:'active',rounding:'rate',unit:'Php/kWh'},
    
    {category:'charges',code:'crf',type:'number',text:'Capital Recovery Fee',description:'',active:'active',base_rounding:'kw',base_unit:'kW',price_rounding:'rate',amount_rounding:'php'},
    {category:'charges',code:'fom',type:'number',text:'Fixed O&M Fee',description:'',active:'active',base_rounding:'kw',base_unit:'kW',price_rounding:'rate',amount_rounding:'php'},
    {category:'charges',code:'vom',type:'number',text:'Variable O&M Fee',description:'',active:'active',base_rounding:'kw',base_unit:'kWh',price_rounding:'rate',amount_rounding:'php'},
    {category:'charges',code:'er194',type:'number',text:'ER-194',description:'',active:'active',base_rounding:'kwh',base_unit:'kWh',price_rounding:'rate',amount_rounding:'php'},
    {category:'charges',code:'fuel',type:'number',text:'Fuel Charge',description:'',active:'active',base_rounding:'kwh',base_unit:'kWh',price_rounding:'rate',amount_rounding:'php'},
    
    {category:'tax',code:'vat',type:'number',text:'VAT',description:'',active:'active',rounding:'php'},
   
     
]

var variable_domain_codes = [
    {variable:'owned',code:'Yes'},
    {variable:'owned',code:'No'},
    {variable:'var_type',code:'domain'},
    {variable:'var_type',code:'number'},
    {variable:'var_type',code:'text'},
    {variable:'var_type',code:'period'},
    {variable:'var_type',code:'date'},
    {variable:'delivery_sein',code:'SEIN01'},
    {variable:'delivery_sein',code:'SEIN02'},
    {variable:'msp',code:'MSP01'},
    {variable:'msp',code:'MSP02'},
    {variable:'creditrating',code:'AAA'},
    {variable:'creditrating',code:'AA'},
    {variable:'creditrating',code:'A'},
    {variable:'release',code:'prelim'},
    {variable:'release',code:'final'},
    {variable:'constype',code:'vatr'},
    
    {variable:'plant_sources',code:'PLANT01'},
    {variable:'plant_sources',code:'PLANT02'},
    {variable:'finconst',code:'General'},
    {variable:'wesm_buyer_bid',code:'WESMBIDDU01'},
    {variable:'wesm_buyer_bid',code:'WESMBIDDU02'},
    {variable:'gentype',code:'COAL'},
    {variable:'gentype',code:'SOLAR'},
    {variable:'gentype',code:'WIND'},
    {variable:'gentype',code:'HYDRO'},
    {variable:'gentype',code:'GEOTHERMAL'},
    {variable:'gentype',code:'OTHERS'},
]

var rounding_rules =[
    {code:'kwh',text:'kWh Rounding',decimal_place:7,description:'',},
    {code:'php',text:'Php Amounts Rounding',decimal_place:2,description:'',},
    {code:'rate',text:'Rates Rounding',decimal_place:2,description:'',},
    {code:'kw',text:'kW Rounding',decimal_place:7,description:'',},
    {code:'index',text:'Index Rounding',decimal_place:4,description:'',},
    {code:'general',text:'General Rounding',decimal_place:8,description:'',},
]

var tax_rules =[
    {code:'vat',text:'Value Added Tax',items:[{variable:'vat', formula:'[@.net_amount]*0.12',rounding:'php'}]},
]

var window_fields = [    
    {field:'name',category:'GEN',field_locs:'row' ,instance:'single',required:true},    
    {field:'addr',category:'GEN',field_locs:'row' ,instance:'single',required:true},
    {field:'tin',category:'GEN',field_locs:'row' ,instance:'single',required:true},
    {field:'wesm_buyer_bid',category:'GEN',field_locs:'detail' ,instance:'single',required:true},
    {field:'plant_sources',category:'GEN',field_locs:'detail' ,instance:'single',required:true},    
    {field:'name',category:'DU',field_locs:'row' ,instance:'single',required:true},   
    {field:'addr',category:'DU',field_locs:'row' ,instance:'single',required:true},
    {field:'tin',category:'DU',field_locs:'row' ,instance:'single',required:true},
    {field:'wesm_buyer_bid',category:'DU',field_locs:'row' ,instance:'single',required:true},
    {field:'creditrating',category:'DU',field_locs:'row' ,instance:'single',required:true},
    {field:'name',category:'RES',field_locs:'row' ,instance:'single',required:true},   
    {field:'wesm_buyer_bid',category:'RES',field_locs:'row' ,instance:'single',required:true},
    {field:'addr',category:'RES',field_locs:'row' ,instance:'single',required:false},
    {field:'tin',category:'RES',field_locs:'row' ,instance:'single',required:true},
    {field:'name',category:'DCC',field_locs:'row' ,instance:'single',required:true},   
    {field:'addr',category:'DCC',field_locs:'row' ,instance:'single',required:false},
    {field:'tin',category:'DCC',field_locs:'row' ,instance:'single',required:true},
    {field:'wesm_buyer_bid',category:'DCC',field_locs:'row' ,instance:'single',required:true},
    {field:'name',category:'CC',field_locs:'row' ,instance:'single',required:true},   
    {field:'addr',category:'CC',field_locs:'row' ,instance:'single',required:false},
    {field:'tin',category:'CC',field_locs:'row' ,instance:'single',required:true},
    {field:'wesm_buyer_bid',category:'CC',field_locs:'row' ,instance:'single',required:true},
    {field:'delivery_sein',category:'CC',field_locs:'row' ,instance:'multiple',required:true},
    {field:'msp',category:'CC',field_locs:'row' ,instance:'single',required:true},
    
    {field:'period_from',category:'PSA_COAL',field_locs:'row' ,instance:'single',required:true},
    {field:'period_to',category:'PSA_COAL',field_locs:'row' ,instance:'single',required:true},
    {field:'plant_sources',category:'PSA_COAL',field_locs:'row' ,instance:'single',required:true},
    {field:'cc',category:'PSA_COAL',field_locs:'detail' ,instance:'single',required:true},
    {field:'crfr',category:'PSA_COAL',field_locs:'detail' ,instance:'single',required:true},
    {field:'fomr',category:'PSA_COAL',field_locs:'detail' ,instance:'single',required:true},
    {field:'vomr',category:'PSA_COAL',field_locs:'detail' ,instance:'single',required:true},
    {field:'er194r',category:'PSA_COAL',field_locs:'detail' ,instance:'single',required:true},
    {field:'forexb',category:'PSA_COAL',field_locs:'detail' ,instance:'single',required:true},
    {field:'ncrcpib',category:'PSA_COAL',field_locs:'detail' ,instance:'single',required:true},
   
    {field:'period',category:'INDEX',field_locs:'key' ,instance:'single',required:true},
    {field:'ncrcpi',category:'INDEX',field_locs:'row' ,instance:'single',required:true},
    {field:'forex',category:'INDEX',field_locs:'row' ,instance:'single',required:true},
    {field:'comment',category:'INDEX',field_locs:'row' ,instance:'single',required:true},
   
    {field:'period',category:'PLANT',field_locs:'key' ,instance:'single',required:true},
    {field:'plant_sources',category:'PLANT',field_locs:'detail' ,instance:'single',required:true},
    {field:'pmq',category:'PLANT',field_locs:'detail' ,instance:'single',required:true},
    {field:'coalmt',category:'PLANT',field_locs:'detail' ,instance:'single',required:true},
    {field:'coalcost',category:'PLANT',field_locs:'detail' ,instance:'single',required:true},
    {field:'comment',category:'INDEX',field_locs:'row' ,instance:'single',required:true},
    
    {field:'period',category:'MBCQ',field_locs:'key' ,instance:'single',required:true},
    {field:'release',category:'MBCQ',field_locs:'row' ,instance:'single',required:true},
    {field:'contract',category:'MBCQ',field_locs:'detail' ,instance:'single',required:true},
    {field:'bcq',category:'MBCQ',field_locs:'detail' ,instance:'single',required:true},
    {field:'comment',category:'INDEX',field_locs:'row' ,instance:'single',required:true},
    
    {field:'constype',category:'CONS',field_locs:'key' ,instance:'single',required:true},
    {field:'value',category:'CONS',field_locs:'row' ,instance:'single',required:true},
    {field:'comment',category:'CONS',field_locs:'row' ,instance:'single',required:false},
]

var parties = [
    {category:'GEN',code:'GEN01'},
    {category:'GEN',code:'GEN02'},
    {category:'DU',code:'DU01'},
    {category:'DU',code:'DU02'},
    {category:'RES',code:'RES01'},
    {category:'RES',code:'RES02'},
    {category:'CC',code:'CC01'},
    {category:'CC',code:'CC02'},
]

contracts = [
    {category:'PSA_COAL',code:'PSA-GEN01-00001',seller:'GEN01',buyer:'DU01'},
    {category:'PSA_COAL',code:'PSA-GEN01-00002',seller:'GEN01',buyer:'DU02'},
]

contract_update_trans = [
    {
        contract:'PSA-GEN01-00001',period_from:'2023-01',period_to:'2033-12',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[ 
            {status:'submitted',sub_status:'THREESTEPFIRST',update_by:'MKTG',update_time:'2023-01-01 00:00',remarks:''},
            {status:'submitted',sub_status:'THREESTEPFINAL',update_by:'MKTG',update_time:'2023-01-01 00:00',remarks:''},
            {status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},
        ],
        texts:[

        ],
        numbers:[
            {variable:'cc',period_start:'2023-01',value:10},
            {variable:'crfr',period_start:'2023-01',value:1000},
            {variable:'fomr',period_start:'2023-01',value:4000},
            {variable:'vomr',period_start:'2023-01',value:500},
            {variable:'er194r',period_start:'2023-01',value:100},
            {variable:'forexb',period_start:'2023-01',value:55},
            {variable:'ncrcpib',period_start:'2023-01',value:3},
        ],
        codes:[
        ],
        filters:[
            {variable:'finconst',period_start:'2024-01',value:'General'},
            {variable:'plant_sources',period_start:'2024-01',value:'PLANT01'},
            {variable:'wesm_buyer_bid',period_start:'2024-01',value:'WESMBIDDU01'},
        ],
        templates:[
            {period_start:'2024-01',value:'TEMPL_DEF_COAL'},
        ],
    },     
    {
        contract:'PSA-GEN01-00002',period_from:'2023-01',period_to:'2033-12',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[ 
            {status:'submitted',sub_status:'THREESTEPFIRST',update_by:'MKTG',update_time:'2023-01-01 00:00',remarks:''},
            {status:'submitted',sub_status:'THREESTEPFINAL',update_by:'MKTG',update_time:'2023-01-01 00:00',remarks:''},
            {status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},
        ],
        texts:[

        ],
        numbers:[
            {variable:'cc',period_start:'2023-01',value:5},
            {variable:'crfr',period_start:'2023-01',value:1000},
            {variable:'fomr',period_start:'2023-01',value:4000},
            {variable:'vomr',period_start:'2023-01',value:600},
            {variable:'forexb',period_start:'2023-01',value:55},
            {variable:'ncrcpib',period_start:'2023-01',value:3},
            {variable:'er194r',period_start:'2023-01',value:100},
        ],
        codes:[
        ],
        filters:[
            {variable:'finconst',period_start:'2024-01',value:'General'},
            {variable:'plant_sources',period_start:'2023-01',value:'PLANT01'},
            {variable:'wesm_buyer_bid',period_start:'2024-01',value:'WESMBIDDU02'},
        ],
        templates:[
            {period_start:'2024-01',value:'TEMPL_DEF_COAL'},
        ],
    },
    {
        contract:'PSA-GEN01-00002',period_from:'2024-01',period_to:'2033-12',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[ 
            {status:'submitted',sub_status:'THREESTEPFIRST',update_by:'MKTG',update_time:'2023-01-01 00:00',remarks:''},
            {status:'submitted',sub_status:'THREESTEPFINAL',update_by:'MKTG',update_time:'2023-01-01 00:00',remarks:''},
           ],
        texts:[

        ],
        numbers:[
            {variable:'cc',period_start:'2024-01',value:5},
            {variable:'cc',period_start:'2025-01',value:10},
            {variable:'crfr',period_start:'2024-01',value:1000},
            {variable:'fomr',period_start:'2024-01',value:4000},
            {variable:'vomr',period_start:'2024-01',value:500},
            {variable:'er194r',period_start:'2024-01',value:100},
            {variable:'forexb',period_start:'2023-01',value:55},
            {variable:'ncrcpib',period_start:'2023-01',value:3},
        ],
        codes:[
        ],
        filters:[
            {variable:'finconst',period_start:'2024-01',value:'General'},
            {variable:'plant_sources',period_start:'2024-01',value:'PLANT01'},
            {variable:'wesm_buyer_bid',period_start:'2024-01',value:'WESMBIDDU02'},
        ],
        templates:[
            {period_start:'2024-01',value:'TEMPL_DEF_COAL'},
        ],
    }
]

party_update_trans = [
    {
        party:'GEN01',owned:'true',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
        texts:[
            {variable:'name',value:'Generator 1'},
            {variable:'address',value:'Gen addr 1'},
            {variable:'tin',value:'000-000-000-001'},
        ],numbers:[],codes:[ {variable:'gentype',value:'COAL'},],
    }, 
    {
        party:'GEN02',owned:'true',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
        texts:[
            {variable:'name',value:'Generator 2'},
            {variable:'address',value:'Gen addr 2'},
            {variable:'tin',value:'000-000-000-002'},            
        ],numbers:[],codes:[{variable:'gentype',value:'SOLAR'},],
    }, 
    {
        party:'DU01',owned:'false',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
        texts:[
            {variable:'name',value:'Distribution Utilities 1'},
            {variable:'address',value:'DU 1 addr'},
            {variable:'tin',value:'000-000-000-003'},
        ],numbers:[],codes:[{variable:'creditrating',value:'AAA'},],
    }, 
    {
        party:'DU02',owned:'false',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
        texts:[
            {variable:'name',value:'Distribution Utilities 2'},
            {variable:'address',value:'DU 2 addr'},
            {variable:'tin',value:'000-000-000-004'},
        ],numbers:[],codes:[{variable:'creditrating',value:'AAA'},],
    }, 
    {
        party:'RES01',owned:'false',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
        texts:[
            {variable:'name',value:'Retail electricity 1'},
            {variable:'address',value:'RES 1 addr'},
            {variable:'tin',value:'000-000-000-005'},
        ],numbers:[],codes:[{variable:'creditrating',value:'AAA'}],
    }, 
    {
        party:'RES02',name:'RES 2',address:'RES addr 2',tin:'000-000-006',owned:'false',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
        texts:[
            {variable:'name',value:'Retail electricity 2'},
            {variable:'address',value:'RES 2 addr'},
            {variable:'tin',value:'000-000-000-006'},
        ],numbers:[],codes:[{variable:'creditrating',value:'AAA'}],
    }, 
    {
        party:'CC01',owned:'false',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
        texts:[
            {variable:'name',value:'Contestable Customer 1'},
            {variable:'address',value:'CC 1 addr'},
            {variable:'tin',value:'000-000-000-007'},
        ],numbers:[],codes:[{variable:'creditrating',value:'AAA'}],
    }, 
    {
        party:'CC02',name:'CC 2',address:'CC addr 2',tin:'000-000-008',owned:'false',create_by:'MKTG', create_time:'2022-12-15 00:00', 
        status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
        texts:[
            {variable:'name',value:'Contestable Customer 2'},
            {variable:'address',value:'CC 2 addr'},
            {variable:'tin',value:'000-000-000-008'},],numbers:[],codes:[{variable:'creditrating',value:'AAA'}],
    }, 
]


dynamic_update_trans = [
    {category:'FINCONST',period_from:'2024-01',period_to:'2099-12',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'finconst',value:'General'},
            texts:[],
            numbers:[
                {variable:'vatrate',value:0.12},
        ]}
    ]},
    {category:'INDEX',period_from:'2024-01',period_to:'2024-01',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-01-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'finconst',value:'General'},
            texts:[
                {variable:'comment',value:'based on previous month'},],
            numbers:[
                {variable:'forex',value:60},
                {variable:'ncrcpi',value:3.5},
                {variable:'phpcpi',value:4.2},
        ]}
    ]},
    {category:'INDEX',period_from:'2024-02',period_to:'2024-02',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-02-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'finconst',value:'General'},
            texts:[
                {variable:'comment',value:'based on previous month'},],
            numbers:[
                {variable:'forex',value:50},
                {variable:'ncrcpi',value:2.5},
                {variable:'phpcpi',value:3.2},
        ]}
    ]},
    {category:'INDEX',period_from:'2024-03',period_to:'2024-03',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'finconst',value:'General'},
            texts:[
                {variable:'comment',value:'based on previous month'},],
            numbers:[
                {variable:'forex',value:54},
                {variable:'ncrcpi',value:3.5},
                {variable:'phpcpi',value:3.5},
        ]}
    ]},
    {category:'INDEX',period_from:'2024-04',period_to:'2024-04',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'finconst',value:'General'},
            texts:[
                {variable:'comment',value:'based on previous month'},],
            numbers:[
                {variable:'forex',value:54},
                {variable:'ncrcpi',value:3.5},
                {variable:'phpcpi',value:3.5},
        ]}
    ]},
    {category:'INDEX',period_from:'2024-05',period_to:'2024-05',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'finconst',value:'General'},
            texts:[
                {variable:'comment',value:'based on previous month'},],
            numbers:[
                {variable:'forex',value:58.2},
                {variable:'ncrcpi',value:3.3},
                {variable:'phpcpi',value:3.7},
        ]}
    ]},
    {category:'PLANT',period_from:'2024-01',period_to:'2024-01',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'plant_sources',value:'PLANT01'},
            texts:[],
            numbers:[
                {variable:'pmq',value:800000},
                {variable:'coalmt',value:900000},
                {variable:'coalcost',value:3000},
        ]},
        {
            filter:{variable:'plant_sources',value:'PLANT02'},
            texts:[],
            numbers:[
                {variable:'pmq',value:700000},
                {variable:'coalmt',value:1200000},
                {variable:'coalcost',value:2800},
        ]}
    ]},
    {category:'PLANT',period_from:'2024-02',period_to:'2024-02',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'plant_sources',value:'PLANT01'},
            texts:[],
            numbers:[
                {variable:'pmq',value:800000},
                {variable:'coalmt',value:900000},
                {variable:'coalcost',value:3000},
        ]},
        {
            filter:{variable:'plant_sources',value:'PLANT02'},
            texts:[],
            numbers:[
                {variable:'pmq',value:700000},
                {variable:'coalmt',value:1200000},
                {variable:'coalcost',value:2800},
        ]}
    ]},
    {category:'PLANT',period_from:'2024-03',period_to:'2024-03',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'plant_sources',value:'PLANT01'},
            texts:[],
            numbers:[
                {variable:'pmq',value:800000},
                {variable:'coalmt',value:900000},
                {variable:'coalcost',value:3000},
        ]},
        {
            filter:{variable:'plant_sources',value:'PLANT02'},
            texts:[],
            numbers:[
                {variable:'pmq',value:700000},
                {variable:'coalmt',value:1200000},
                {variable:'coalcost',value:2800},
        ]}
    ]},
    {category:'PLANT',period_from:'2024-04',period_to:'2024-04',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'plant_sources',value:'PLANT01'},
            texts:[],
            numbers:[
                {variable:'pmq',value:800000},
                {variable:'coalmt',value:900000},
                {variable:'coalcost',value:3000},
        ]},
        {
            filter:{variable:'plant_sources',value:'PLANT02'},
            texts:[],
            numbers:[
                {variable:'pmq',value:700000},
                {variable:'coalmt',value:1200000},
                {variable:'coalcost',value:2800},
        ]}
    ]},
    {category:'PLANT',period_from:'2024-05',period_to:'2024-05',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'plant_sources',value:'PLANT01'},
            texts:[],
            numbers:[
                {variable:'pmq',value:800000},
                {variable:'coalmt',value:900000},
                {variable:'coalcost',value:3000},
        ]},
        {
            filter:{variable:'plant_sources',value:'PLANT02'},
            texts:[],
            numbers:[
                {variable:'pmq',value:700000},
                {variable:'coalmt',value:1200000},
                {variable:'coalcost',value:2800},
        ]}
    ]},
    {category:'MBCQ',period_from:'2024-01',period_to:'2024-01',
    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
    filters:[
        {
            filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU01'},
            texts:[],
            numbers:[
                {variable:'bcq',value:1752},
                {variable:'mq',value:2355},
                {variable:'lr',value:28000},
        ]},
        {
            filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU02'},
            texts:[],
            numbers:[
                {variable:'bcq',value:1254},
                {variable:'mq',value:1954},
                {variable:'lr',value:48000},
        ]}
    ]},{category:'MBCQ',period_from:'2024-02',period_to:'2024-02',
        status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
        filters:[
            {
                filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU01'},
                texts:[],
                numbers:[
                    {variable:'bcq',value:1752},
                    {variable:'mq',value:2355},
                    {variable:'lr',value:28000},
            ]},
            {
                filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU02'},
                texts:[],
                numbers:[
                    {variable:'bcq',value:1254},
                    {variable:'mq',value:1954},
                    {variable:'lr',value:48000},
            ]}
        ]},{category:'MBCQ',period_from:'2024-03',period_to:'2024-03',
            status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
            filters:[
                {
                    filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU01'},
                    texts:[],
                    numbers:[
                        {variable:'bcq',value:1752},
                        {variable:'mq',value:2355},
                        {variable:'lr',value:28000},
                ]},
                {
                    filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU02'},
                    texts:[],
                    numbers:[
                        {variable:'bcq',value:1254},
                        {variable:'mq',value:1954},
                        {variable:'lr',value:48000},
                ]}
            ]},{category:'MBCQ',period_from:'2024-04',period_to:'2024-04',
                status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
                filters:[
                    {
                        filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU01'},
                        texts:[],
                        numbers:[
                            {variable:'bcq',value:1752},
                            {variable:'mq',value:2355},
                            {variable:'lr',value:28000},
                    ]},
                    {
                        filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU02'},
                        texts:[],
                        numbers:[
                            {variable:'bcq',value:1254},
                            {variable:'mq',value:1954},
                            {variable:'lr',value:48000},
                    ]}
                ]},{category:'MBCQ',period_from:'2024-05',period_to:'2024-05',
                    status:[{status:'approved',sub_status:'',update_by:'MKTGMNGR',update_time:'2023-03-01 00:00',remarks:''},],
                    filters:[
                        {
                            filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU01'},
                            texts:[],
                            numbers:[
                                {variable:'bcq',value:1752},
                                {variable:'mq',value:2355},
                                {variable:'lr',value:28000},
                        ]},
                        {
                            filter:{variable:'wesm_buyer_bid',value:'WESMBIDDU02'},
                            texts:[],
                            numbers:[
                                {variable:'bcq',value:1254},
                                {variable:'mq',value:1954},
                                {variable:'lr',value:48000},
                        ]}
                    ]},
]


var billing_null_handling_rules =[    
    {code:'general',description:'General Handling',variable_onnull:'error',base_onnull:'error',rate_onnull:'error',amount_onnull:'error',vat_onnull:'error',comment_onnull:'null',lineshow:'always'},    
    {code:'zerodefault',description:'Default Zero Value',variable_onnull:'zero',base_onnull:'zero',rate_onnull:'zero',amount_onnull:'zero',vat_onnull:'zero',comment_onnull:'null',lineshow:'always'},    
    {code:'optional',description:'Optional Lines',variable_onnull:'zero',base_onnull:'zero',rate_onnull:'zero',amount_onnull:'zero',vat_onnull:'zero',comment_onnull:'null',lineshow:'hidewhenallzero'}
]


var billing_templates =[
    {code:'COALFIRM',description:'Coal Firm Contract Template',
    versions:[
        {version_number:0,status:'active',remarks:'',create_by:'user',create_time:'2024-01-01 00:00',
            item_groups:[
                {index:1,type:'determinant',text:'Indices',internal:'false',items:[
                    {index:1,variable:'forexb',determinant_formula:'[CONTRACT.forexb]',null_handling_rules:'general'},
                    {index:2,variable:'forexc',determinant_formula:'[INDEX.forex]',null_handling_rules:'general',comment_formula:'[INDEX.comment]'},
                    {index:3,variable:'ncrcpib',determinant_formula:'[CONTRACT.ncrcpib]',null_handling_rules:'general'},
                    {index:4,variable:'ncrcpic',determinant_formula:'[INDEX.ncrcpi]',null_handling_rules:'general',comment_formula:'[INDEX.comment]'},
                    {index:5,variable:'rateindex',determinant_formula:'[forexc]/[forexb]*[ncrcpic]/[ncrcpib]',null_handling_rules:'general'},
                ]},
                {index:2,type:'determinant',text:'Plant Data',internal:'false',items:[
                    {index:1,variable:'pmq',determinant_formula:'[PLANT.pmq]',null_handling_rules:'general'},
                    {index:2,variable:'coalmt',determinant_formula:'[PLANT.coalmt]',null_handling_rules:'general'},
                    {index:3,variable:'coalcost',determinant_formula:'[PLANT.coalcost]',null_handling_rules:'general'},
                ]},
                {index:3,type:'determinant',text:'Quantities',internal:'false',items:[
                    {index:1,variable:'cc',determinant_formula:'[CONTRACT.cc]',null_handling_rules:'general'},
                    {index:2,variable:'energy',determinant_formula:'[MBCQ.bcq]',null_handling_rules:'general'},
                ]},
                {index:4,type:'determinant',text:'Rates',internal:'false',items:[
                    {index:1,variable:'crfr',determinant_formula:'[CONTRACT.crfr]',null_handling_rules:'general'},
                    {index:1,variable:'fomr',determinant_formula:'[CONTRACT.fomr]',null_handling_rules:'general'},
                    {index:1,variable:'vomr',determinant_formula:'[CONTRACT.vomr]',null_handling_rules:'general'},
                    {index:1,variable:'er194r',determinant_formula:'[CONTRACT.er194r]',null_handling_rules:'general'},
                    {index:1,variable:'fuelr',determinant_formula:'[coalcost]*[coalmt]/[pmq]',null_handling_rules:'general'},
                ]},
                {index:5,type:'baseprice',text:'Fixed Charge',internal:'false',items:[
                    {index:1,variable:'crf',base_formula:'[cc]*1000',base_unit:'kW',price_formula:'[crfr]*[rateindex]',amount_formula:'[base]*[price]',tax_rule:'vat',null_handling_rules:'general'},
                    {index:2,variable:'fom',base_formula:'[cc]*1000',base_unit:'kW',price_formula:'[fomr]',amount_formula:'[base]*[price]',tax_rule:'vat',null_handling_rules:'general'},
                ]},
                {index:6,type:'baseprice',text:'Variable Charge',internal:'false',items:[
                    {index:1,variable:'vom',base_formula:'[energy]',base_unit:'kWh',price_formula:'[vomr]-[er194r]',amount_formula:'[base]*[price]',tax_rule:'vat',null_handling_rules:'general'},
                    {index:2,variable:'er194',base_formula:'[energy]',base_unit:'kWh',price_formula:'[er194r]',amount_formula:'[base]*[price]',null_handling_rules:'general'},
                    {index:3,variable:'fuel',base_formula:'[energy]',base_unit:'kWh',price_formula:'[fuelr]',amount_formula:'[base]*[price]',tax_rule:'vat',null_handling_rules:'general'},
                ]},
            ]
        },
        {version_number:1,status:'draft',remarks:'',create_by:'user',create_time:'2024-02-02 00:00',
        item_groups:[
            {index:1,type:'determinant',text:'Indices',internal:'false',items:[
                {index:1,variable:'forexb',determinant_formula:'[CONTRACT.forexb]',null_handling_rules:'general'},
                {index:2,variable:'forexc',determinant_formula:'[INDEX.forex]',null_handling_rules:'general',comment:'[INDEX.comment]'},
                {index:3,variable:'ncrcpib',determinant_formula:'[CONTRACT.ncrcpib]',null_handling_rules:'general'},
                {index:4,variable:'ncrcpic',determinant_formula:'[INDEX.ncrcpi]',null_handling_rules:'general',comment:'[INDEX.comment]'},
            ]},
            {index:2,type:'determinant',text:'Plant Data',internal:'false',items:[
                {index:1,variable:'pmq',determinant_formula:'[PLANT.pmq]',null_handling_rules:'general'},
                {index:2,variable:'coalmt',determinant_formula:'[PLANT.coalmt]',null_handling_rules:'general'},
                {index:3,variable:'coalcost',determinant_formula:'[PLANT.coalcost]',null_handling_rules:'general'},
            ]},
            {index:3,type:'determinant',text:'Quantities',internal:'false',items:[
                {index:1,variable:'cc',determinant_formula:'[CONTRACT.cc]',null_handling_rules:'general'},
                {index:2,variable:'energy',determinant_formula:'[MBCQ.bcq]',null_handling_rules:'general'},
            ]},
            {index:4,type:'determinant',text:'Rates',internal:'false',items:[
                {index:1,variable:'crfr',determinant_formula:'[CONTRACT.crfr]',null_handling_rules:'general'},
                {index:1,variable:'fomr',determinant_formula:'[CONTRACT.fomr]',null_handling_rules:'general'},
                {index:1,variable:'vomr',determinant_formula:'[CONTRACT.vomr]',null_handling_rules:'general'},
                {index:1,variable:'er194r',determinant_formula:'[CONTRACT.er194r]',null_handling_rules:'general'},
                {index:1,variable:'fuelr',determinant_formula:'[coalcost]*[coalmt]/[pmq]',null_handling_rules:'general'},
            ]},
            {index:5,type:'baseprice',text:'Fixed Charge',internal:'false',items:[
                {index:1,variable:'crf',base_formula:'[cc]*1000',base_unit:'kW',price_formula:'[crfr]',tax_rule:'vat',null_handling_rules:'general'},
                {index:2,variable:'fom',base_formula:'[cc]*1000',base_unit:'kW',price_formula:'[fomr]',tax_rule:'vat',null_handling_rules:'general'},
            ]},
            {index:6,type:'baseprice',text:'Variable Charge',internal:'false',items:[
                {index:1,variable:'vom',base_formula:'[energy]',base_unit:'kWh',price_formula:'[vomr]-[er194r]',tax_rule:'vat',null_handling_rules:'general'},
                {index:2,variable:'er194',base_formula:'[energy]',base_unit:'kWh',price_formula:'[er194r]',null_handling_rules:'general'},
                {index:3,variable:'fuel',base_formula:'[energy]',base_unit:'kWh',price_formula:'[fuelr]',tax_rule:'vat',null_handling_rules:'general'},
            ]},
        ]
    },
    ]},
]

var invoice_templates =[
    {code:'INVOICE01',description:'Invoice 01 template'}
]

 
var billing_setup = [
    {
        code:'SETUP_COAL',description:'',template:'COALFIRM',finance_scheme_buyer:'FSCoalMain',finance_scheme_seller:'FSCoalMain',
        reports:[{party:'buyer',code:'COALFIRM_INVOICE',text:'Invoice'}]
    }
]

var contract_billing_setup =[
    {contract:'PSA-GEN01-00001',period_start:'202101',setup:'SETUP_COAL'},
    {contract:'PSA-GEN01-00002',period_start:'202101',setup:'SETUP_COAL'},
]



var billing_calculations = [{
    report_period:'2024-04',
    period:'2024-04',
    contract:'PSA-GEN01-00002',
    revision_number:0,
    template:'COALFIRM',
    version_number:0,
    status:[
        {code:'calculated',update_by:'MKTG',update_time:'2024-05-05 12:31'},
        {code:'for-approval',update_by:'MKTG',update_time:'2024-05-05 12:31',sub_status:'THREESTEPFIRST'},
        {code:'approved',update_by:'MKTG',update_time:'2024-05-05 12:31'},
        {code:'released',update_by:'MKTG',update_time:'2024-05-05 12:31'},
    ],
    values:[
        {index:1,type:'determinant',text:'Indices',internal:'false',items:[
            {index:1,variable:'forexb',base:55,comment:''},
            {index:2,variable:'forexc',base:58.2,comment:'Based on previous month'},
            {index:3,variable:'ncrcpib',base:3,comment:''},
            {index:4,variable:'ncrcpic',base:3.3,comment:'Based on previous month'},
            {index:5,variable:'rateindex',base:1.164,comment:''},
        ]},
        {index:2,type:'determinant',text:'Plant Data',internal:'false',items:[
            {index:1,variable:'pmq',base:8000,comment:''},
            {index:2,variable:'coalmt',base:900000,comment:''},
            {index:3,variable:'coalcost',base:3000,comment:''},
        ]},
        {index:3,type:'determinant',text:'Quantities',internal:'false',items:[
            {index:1,variable:'cc',base:5000,comment:''},
            {index:2,variable:'energy',base:1254,comment:''},
        ]},
        {index:4,type:'determinant',text:'Rates',internal:'false',items:[
            {index:1,variable:'crfr',base:1000,comment:''},
            {index:2,variable:'fomr',base:4000,comment:''},
            {index:3,variable:'vomr',base:500,comment:''},
            {index:4,variable:'er194r',base:100,comment:''},
            {index:5,variable:'fuelr',base:3375,comment:''},
        ]},
        {index:5,type:'baseprice',text:'Fixed Charge',internal:'false',items:[
            {index:1,variable:'crf',base:5000,price:1164,net_amount:5820000,tax_amount:698400,gross_amount:6518400},
            {index:2,variable:'fom',base:5000,price:4000,net_amount:20000000,tax_amount:2400000,gross_amount:22400000},
        ]},
        {index:6,type:'baseprice',text:'Variable Charge',internal:'false',items:[
            {index:1,variable:'vom',base:1254,price:400,net_amount:501600,tax_amount:60192,gross_amount:561792},
            {index:2,variable:'er194',base:1254,price:100,net_amount:125400,tax_amount:0,gross_amount:125400},
            {index:3,variable:'fuel',base:1254,price:3375,net_amount:4232250,tax_amount:507870,gross_amount:4740120},
        ]},
    ],
    amounts:[
        {variable:'crf',amount_prev:0,amount:5820000,amount_diff:5820000},
        {variable:'fom',amount_prev:0,amount:20000000,amount_diff:20000000},
        {variable:'vom',amount_prev:0,amount:501600,amount_diff:501600},
        {variable:'er194',amount_prev:0,amount:125400,amount_diff:125400},
        {variable:'fuel',amount_prev:0,amount:4232250,amount_diff:4232250},
        {variable:'vat',amount_prev:0,amount:3666462,amount_diff:3666462},
    ]
    },
    {
        report_period:'2024-05',
        period:'2024-05',
        contract:'PSA-GEN01-00002',
        revision_number:0,
        template:'COALFIRM',
        version_number:0,
        status:[
            {code:'calculated',update_by:'MKTG',update_time:'2024-05-05 12:31'},
            {code:'for-approval',update_by:'MKTG',update_time:'2024-05-05 12:31',sub_status:'THREESTEPFIRST'},
            {code:'approved',update_by:'MKTG',update_time:'2024-05-05 12:31'},
        ],
        values:[
            {index:1,type:'determinant',text:'Indices',internal:'false',items:[
                {index:1,variable:'forexb',base:55,comment:''},
                {index:2,variable:'forexc',base:58.2,comment:'Based on previous month'},
                {index:3,variable:'ncrcpib',base:3,comment:''},
                {index:4,variable:'ncrcpic',base:3.3,comment:'Based on previous month'},
                {index:5,variable:'rateindex',base:1.164,comment:''},
            ]},
            {index:2,type:'determinant',text:'Plant Data',internal:'false',items:[
                {index:1,variable:'pmq',base:8000,comment:''},
                {index:2,variable:'coalmt',base:900000,comment:''},
                {index:3,variable:'coalcost',base:3000,comment:''},
            ]},
            {index:3,type:'determinant',text:'Quantities',internal:'false',items:[
                {index:1,variable:'cc',base:5000,comment:''},
                {index:2,variable:'energy',base:1254,comment:''},
            ]},
            {index:4,type:'determinant',text:'Rates',internal:'false',items:[
                {index:1,variable:'crfr',base:1000,comment:''},
                {index:2,variable:'fomr',base:4000,comment:''},
                {index:3,variable:'vomr',base:500,comment:''},
                {index:4,variable:'er194r',base:100,comment:''},
                {index:5,variable:'fuelr',base:3375,comment:''},
            ]},
            {index:5,type:'baseprice',text:'Fixed Charge',internal:'false',items:[
                {index:1,variable:'crf',base:5000,price:1164,net_amount:5820000,tax_amount:698400,gross_amount:6518400},
                {index:2,variable:'fom',base:5000,price:4000,net_amount:20000000,tax_amount:2400000,gross_amount:22400000},
            ]},
            {index:6,type:'baseprice',text:'Variable Charge',internal:'false',items:[
                {index:1,variable:'vom',base:1254,price:400,net_amount:501600,tax_amount:60192,gross_amount:561792},
                {index:2,variable:'er194',base:1254,price:100,net_amount:125400,tax_amount:0,gross_amount:125400},
                {index:3,variable:'fuel',base:1254,price:3375,net_amount:4232250,tax_amount:507870,gross_amount:4740120},
            ]},
        ],
        amounts:[
            {variable:'crf',amount_prev:0,amount:5820000,amount_diff:5820000},
            {variable:'fom',amount_prev:0,amount:20000000,amount_diff:20000000},
            {variable:'vom',amount_prev:0,amount:501600,amount_diff:501600},
            {variable:'er194',amount_prev:0,amount:125400,amount_diff:125400},
            {variable:'fuel',amount_prev:0,amount:4232250,amount_diff:4232250},
            {variable:'vat',amount_prev:0,amount:3666462,amount_diff:3666462},
        ]
        },
]


var finance_accounts =[
    {code:'GLR0001',text:'Fixed Charges Receivable',description:'',active:'true',create_by:'user',create_time:'2024-01-01 00:00',update_by:'user',update_time:'2024-01-01 00:00'},
    {code:'GLP0001',text:'Fixed Charges Payable',description:'',active:'true',create_by:'user',create_time:'2024-01-01 00:00',update_by:'user',update_time:'2024-01-01 00:00'},
    {code:'GLR0002',text:'Variable Charges Receivable',description:'',active:'true',create_by:'user',create_time:'2024-01-01 00:00',update_by:'user',update_time:'2024-01-01 00:00'},
    {code:'GLP0002',text:'Variable Charges Payable',description:'',active:'true',create_by:'user',create_time:'2024-01-01 00:00',update_by:'user',update_time:'2024-01-01 00:00'},
    {code:'GLR0050',text:'Non-Vatable Receivable',description:'',active:'true',create_by:'user',create_time:'2024-01-01 00:00',update_by:'user',update_time:'2024-01-01 00:00'},
    {code:'GLP0050',text:'Non-Vatable Payable',description:'',active:'true',create_by:'user',create_time:'2024-01-01 00:00',update_by:'user',update_time:'2024-01-01 00:00'},
    {code:'GLR0100',text:'Tax Receivable',description:'',active:'true',create_by:'user',create_time:'2024-01-01 00:00',update_by:'user',update_time:'2024-01-01 00:00'},
    {code:'GLP0100',text:'Tax Payable',description:'',active:'true',create_by:'user',create_time:'2024-01-01 00:00',update_by:'user',update_time:'2024-01-01 00:00'},
]


var finance_schemes =[
    {code:'FSCoalMain',text:'Coal Main Scheme',description:'',create_by:'user',create_time:'2024-01-01 00:00',update_by:'user',update_time:'2024-01-01 00:00',
        lines:[
            {charge:'crf',account_pos:'GLR0001',account_neg:'GLP0001',active:'true',update_by:'user',update_time:'2024-01-01 00:00'},
            {charge:'fom',account_pos:'GLR0001',account_neg:'GLP0001',active:'true',update_by:'user',update_time:'2024-01-01 00:00'},
            {charge:'vom',account_pos:'GLR0002',account_neg:'GLP0002',active:'true',update_by:'user',update_time:'2024-01-01 00:00'},
            {charge:'er194',account_pos:'GLR0050',account_neg:'GLP0050',active:'true',update_by:'user',update_time:'2024-01-01 00:00'},
            {charge:'fuel',account_pos:'GLR0002',account_neg:'GLP0002',active:'true',update_by:'user',update_time:'2024-01-01 00:00'},
            {charge:'vat',account_pos:'GLR0100',account_neg:'GLP0100',active:'true',update_by:'user',update_time:'2024-01-01 00:00'},
        ]
    },
]


const templatePdfString ="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Ij8+PHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iMy4xLTcwMSI+CjxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CjxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiICB4bWxuczpwZGY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGRmLzEuMy8iPgo8cGRmOlByb2R1Y2VyPk1pY3Jvc29mdMKuIEV4Y2Vswq4gZm9yIE1pY3Jvc29mdCAzNjU8L3BkZjpQcm9kdWNlcj48L3JkZjpEZXNjcmlwdGlvbj4KPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyI+CjxkYzpjcmVhdG9yPjxyZGY6U2VxPjxyZGY6bGk+UmFkZWx5biBNYXkgRGF2aWQ8L3JkZjpsaT48L3JkZjpTZXE+PC9kYzpjcmVhdG9yPjwvcmRmOkRlc2NyaXB0aW9uPgo8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KPHhtcDpDcmVhdG9yVG9vbD5NaWNyb3NvZnTCriBFeGNlbMKuIGZvciBNaWNyb3NvZnQgMzY1PC94bXA6Q3JlYXRvclRvb2w+PHhtcDpDcmVhdGVEYXRlPjIwMjQtMDgtMThUMTA6NTA6NDgrMDg6MDA8L3htcDpDcmVhdGVEYXRlPjx4bXA6TW9kaWZ5RGF0ZT4yMDI0LTA4LTE4VDEwOjUwOjQ4KzA4OjAwPC94bXA6TW9kaWZ5RGF0ZT48L3JkZjpEZXNjcmlwdGlvbj4KPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIj4KPHhtcE1NOkRvY3VtZW50SUQ+dXVpZDo5RTU4NDAwNC0wMkY4LTRBMkUtQjUxQS0yNzVBNEVGRjFCODM8L3htcE1NOkRvY3VtZW50SUQ+PHhtcE1NOkluc3RhbmNlSUQ+dXVpZDo5RTU4NDAwNC0wMkY4LTRBMkUtQjUxQS0yNzVBNEVGRjFCODM8L3htcE1NOkluc3RhbmNlSUQ+PC9yZGY6RGVzY3JpcHRpb24+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8L3JkZjpSREY+PC94OnhtcG1ldGE+PD94cGFja2V0IGVuZD0idyI/Pg0KZW5kc3RyZWFtDQplbmRvYmoNCjY0IDAgb2JqDQo8PC9EaXNwbGF5RG9jVGl0bGUgdHJ1ZT4+DQplbmRvYmoNCjY1IDAgb2JqDQo8PC9UeXBlL1hSZWYvU2l6ZSA2NS9XWyAxIDQgMl0gL1Jvb3QgMSAwIFIvSW5mbyAzIDAgUi9JRFs8MDQ0MDU4OUVGODAyMkU0QUI1MUEyNzVBNEVGRjFCODM+PDA0NDA1ODlFRjgwMjJFNEFCNTFBMjc1QTRFRkYxQjgzPl0gL0ZpbHRlci9GbGF0ZURlY29kZS9MZW5ndGggMTYzPj4NCnN0cmVhbQ0KeJw10EkSwWAQhuFOQgYRBDETs5hZ2VlZu4HTuZC9Y6iyU/Hnf+lFP9Vd1d+iRVSlqaF6KJJxh6fG+GgsT2NfgaXz0riJiKkOItnCDvZwgA2soQgmGPBLOWaZt/+UhxxY4IIDNvhQAA8aUIYSBFCFECoQQR1q0IE2tKAJA+hDD7owhhEMIYY5zGAKE1jBEhJYqL/4b/3ywNKcHprLWeQLg3wTbQ0KZW5kc3RyZWFtDQplbmRvYmoNCnhyZWYNCjAgNjYNCjAwMDAwMDAwMTAgNjU1MzUgZg0KMDAwMDAwMDAxNyAwMDAwMCBuDQowMDAwMDAwMTYzIDAwMDAwIG4NCjAwMDAwMDAyMTkgMDAwMDAgbg0KMDAwMDAwMDUwOSAwMDAwMCBuDQowMDAwMDAwNzc3IDAwMDAwIG4NCjAwMDAwMDE2MTQgMDAwMDAgbg0KMDAwMDAwMTc4OSAwMDAwMCBuDQowMDAwMDAyMDM1IDAwMDAwIG4NCjAwMDAwMDIwODggMDAwMDAgbg0KMDAwMDAwMDAxMSA2NTUzNSBmDQowMDAwMDAwMDEyIDY1NTM1IGYNCjAwMDAwMDAwMTMgNjU1MzUgZg0KMDAwMDAwMDAxNCA2NTUzNSBmDQowMDAwMDAwMDE1IDY1NTM1IGYNCjAwMDAwMDAwMTYgNjU1MzUgZg0KMDAwMDAwMDAxNyA2NTUzNSBmDQowMDAwMDAwMDE4IDY1NTM1IGYNCjAwMDAwMDAwMTkgNjU1MzUgZg0KMDAwMDAwMDAyMCA2NTUzNSBmDQowMDAwMDAwMDIxIDY1NTM1IGYNCjAwMDAwMDAwMjIgNjU1MzUgZg0KMDAwMDAwMDAyMyA2NTUzNSBmDQowMDAwMDAwMDI0IDY1NTM1IGYNCjAwMDAwMDAwMjUgNjU1MzUgZg0KMDAwMDAwMDAyNiA2NTUzNSBmDQowMDAwMDAwMDI3IDY1NTM1IGYNCjAwMDAwMDAwMjggNjU1MzUgZg0KMDAwMDAwMDAyOSA2NTUzNSBmDQowMDAwMDAwMDMwIDY1NTM1IGYNCjAwMDAwMDAwMzEgNjU1MzUgZg0KMDAwMDAwMDAzMiA2NTUzNSBmDQowMDAwMDAwMDMzIDY1NTM1IGYNCjAwMDAwMDAwMzQgNjU1MzUgZg0KMDAwMDAwMDAzNSA2NTUzNSBmDQowMDAwMDAwMDM2IDY1NTM1IGYNCjAwMDAwMDAwMzcgNjU1MzUgZg0KMDAwMDAwMDAzOCA2NTUzNSBmDQowMDAwMDAwMDM5IDY1NTM1IGYNCjAwMDAwMDAwNDAgNjU1MzUgZg0KMDAwMDAwMDA0MSA2NTUzNSBmDQowMDAwMDAwMDQyIDY1NTM1IGYNCjAwMDAwMDAwNDMgNjU1MzUgZg0KMDAwMDAwMDA0NCA2NTUzNSBmDQowMDAwMDAwMDQ1IDY1NTM1IGYNCjAwMDAwMDAwNDYgNjU1MzUgZg0KMDAwMDAwMDA0NyA2NTUzNSBmDQowMDAwMDAwMDQ4IDY1NTM1IGYNCjAwMDAwMDAwNDkgNjU1MzUgZg0KMDAwMDAwMDA1MCA2NTUzNSBmDQowMDAwMDAwMDUxIDY1NTM1IGYNCjAwMDAwMDAwNTIgNjU1MzUgZg0KMDAwMDAwMDA1MyA2NTUzNSBmDQowMDAwMDAwMDU0IDY1NTM1IGYNCjAwMDAwMDAwNTUgNjU1MzUgZg0KMDAwMDAwMDA1NiA2NTUzNSBmDQowMDAwMDAwMDU3IDY1NTM1IGYNCjAwMDAwMDAwNTggNjU1MzUgZg0KMDAwMDAwMDA1OSA2NTUzNSBmDQowMDAwMDAwMDYwIDY1NTM1IGYNCjAwMDAwMDAwMDAgNjU1MzUgZg0KMDAwMDAwMzA2MiAwMDAwMCBuDQowMDAwMDAzMzMxIDAwMDAwIG4NCjAwMDAwMTQyODggMDAwMDAgbg0KMDAwMDAxNzQ3MCAwMDAwMCBuDQowMDAwMDE3NTE1IDAwMDAwIG4NCnRyYWlsZXINCjw8L1NpemUgNjYvUm9vdCAxIDAgUi9JbmZvIDMgMCBSL0lEWzwwNDQwNTg5RUY4MDIyRTRBQjUxQTI3NUE0RUZGMUI4Mz48MDQ0MDU4OUVGODAyMkU0QUI1MUEyNzVBNEVGRjFCODM+XSA+Pg0Kc3RhcnR4cmVmDQoxNzg3OA0KJSVFT0YNCnhyZWYNCjAgMA0KdHJhaWxlcg0KPDwvU2l6ZSA2Ni9Sb290IDEgMCBSL0luZm8gMyAwIFIvSURbPDA0NDA1ODlFRjgwMjJFNEFCNTFBMjc1QTRFRkYxQjgzPjwwNDQwNTg5RUY4MDIyRTRBQjUxQTI3NUE0RUZGMUI4Mz5dIC9QcmV2IDE3ODc4L1hSZWZTdG0gMTc1MTU+Pg0Kc3RhcnR4cmVmDQoxOTM1NA0KJSVFT0Y="

var invoicetemplateinput = `print([billing.reference],{x:580,y:124})
print([billing.period],{x:580,y:139})
print([billing.update_time],{x:580,y:154})
print([billing.due_date],{x:580,y:170})


print([buyer.name],{x:280,y:218})
print([buyer.address],{x:280,y:234})
print([buyer.tin],{x:280,y:249})


y = 330
[calcs].map(v=>{
	print(v.text,{x:130,y})
	print(v.base,{x:250,y})
	print(v.gross_amount,{x:480,y,justify:'right'})
	y+=15
})
print('Previous Charges',{x:130,y})
print('-'+[charges.previous_amount],{x:480,y,justify:'right'})

print([charges.diff_amount],{x:480,y:435,justify:'right'})

y = 330
[finvals].map(v=>{
	print(v.text,{x:510,y})
	print(v.amount,{x:780,y,justify:'right'})
	y+=15
})

print([finvals.amount],{x:780,y:435,justify:'right'})`









var dataPartyFilterFields = [
    ['1','Category','Yes'],
]

var dataPartyFreeFields = [
    ['1','Category','Filter','Yes'],
    ['2','Address','TRUE'],
    ['3','TIN','TRUE'],
    ['4','','TRUE'],
]

var dataPartyFreeDetails = [
    ['1','Category','Filter','Yes'],
    ['2','Address','TRUE'],
    ['3','TIN','TRUE'],
    ['4','','TRUE'],
]






var dataContract =[
    ['PSA-GENCO1-DU01-001','PSA','GEN01','DU01',0,'2024-01','2034-12','','NEW','No',''],
    ['PSA-GENCO1-RES01-001','PSA','GEN01','RES01',0,'2023-01','2033-12','','APPROVED','Yes',''],
    ['RSC-RESO1-CC01-001','RSC','RES01','CC01',0,'2024-02','2034-12','','APPROVED','Yes',''],
]

var dataFieldData =[
    ['wesmbuybid','DU01','Yes'],
    ['wesmbuybid','RES01','Yes'],
    ['wesmbuybid','CC01','Yes'],
    ['wesmselbid','GEN01','Yes'],
    ['wesmselbid','RES01','Yes'],
    ['wesmselmtn','05GEN01_U01','Yes'],
    ['wesmselmtn','05GEN01_U02','Yes'],
    ['wesmbuymtn','02DU01_L01','Yes'],
    ['wesmbuymtn','02DU01_L02','Yes'],
    ['wesmbuymtn','01DU02_L02','Yes'],
    ['metersin','200291340102','Yes'],
    ['metersin','200291340103','Yes'],
    ['plant','GEN01','Yes'],
]

var dataRoundingRule =[
    ['RR_AMOUNT','Amount Rounding Rule','2','RND'],
    ['RR_MW','MW Rounding Rule','4','RND'],
    ['RR_KWH','KWH Rounding Rule','7','RND'],
    ['RR_PKWH','PHP/KWH Rounding Rule','4','RND'],
    ['RR_PKW','PHP/KW Rounding Rule','4','RND'],
    ['RR_INDEX','INDEX Rounding Rule','4','RND'],
]

var dataVariableTables = [
    ['**FIELDS','**Fields Table','','','','No'],
    ['**FUNCTIONS','**Function Table','','','','No'],
    ['**TEXT','**Text Table','','','','No'],
    ['**CHARGES','**Charge Table','','','','No'],
    ['CONTRACTS','Contract data','dbo.vw_contracs','periodfrom|periodto|contract','Yes','Yes'],
    ['DWSA','DWSA data','dbo.vw_dwsa','period|metersin','Yes','Yes'],
    ['STLBID','Settlement Data Per Billing ID','dbo.vw_stlbid','interval5m|wesmbuybid|wesmsellbid','Yes','Yes'],
    ['STLSEIN','Settlement Data Per SEIN','dbo.vw_stlsein','interval5m|metersin','Yes','Yes']
]


var dataVariables = [
    ['**FIELDS','contract','Contract','','','','No','Yes'],
    ['**FIELDS','periodfrom','Period From','','','','No','Yes'],
    ['**FIELDS','periodto','Period From','','','','No','Yes'],
    ['**FIELDS','period','Period','','','','No','Yes'],
    ['**FIELDS','deldate','Delivery Date','','','','No','Yes'],
    ['**FIELDS','delhour','Delivery Hour','','','','No','Yes'],
    ['**FIELDS','interval5m','5-minute Interval','','','','No','Yes'],
    ['**FIELDS','interval1h','Hourly Interval','','','','No','Yes'],
    ['**FIELDS','plant','Plant','','','','Yes','Yes'],
    ['**FIELDS','wesmbuybid','Buyer WESM Billing ID','','','','Yes','Yes'],
    ['**FIELDS','wesmselbid','Seller WESM Billing ID','','','','Yes','Yes'],
    ['**FIELDS','wesmbuymtn','Buyer WESM MTN','','','','Yes','Yes'],
    ['**FIELDS','wesmselmtn','Seller WESM MTN','','','','Yes','Yes'],
    ['**FIELDS','metersin','Meter SIN','','','','Yes','Yes'],
    ['CONTRACTS','C_CC','Contracted Capacity','MW','RR_MW','','Yes','Yes'],
    ['CONTRACTS','C_MEOT','Minimum Offtake Energy','kWh','RR_KWH','','Yes','Yes'],
    ['CONTRACTS','C_CRF','Capital Recovery Fee','Php/kW','RR_KWH','','Yes','Yes'],
    ['CONTRACTS','C_FOM','Fixed O&M Fee','Php/kW','RR_PKW','','Yes','Yes'],
    ['CONTRACTS','C_VOM','Variable O&M Fee','Php/kWh','RR_PKWH','','Yes','Yes'],
    ['CONTRACTS','C_ER194','ER-194 Fee','Php/kWh','RR_PKWH','','Yes','Yes'],
    ['CONTRACTS','C_VC','Variable Charge','Php/kWh','RR_PKWH','','Yes','Yes'],
    ['CONTRACTS','C_ADMIN','Admin Charge','Php/kWh','RR_PKWH','','Yes','Yes'],
    ['CONTRACTS','C_NCRCPIB','Base NCR CPI','','RR_INDEX','','Yes','Yes'],
    ['CONTRACTS','C_FOREXB','Base FOREX','','RR_INDEX','','Yes','Yes'],
    ['**CHARGES','CRF','Capital Recovery Fee','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','FOM','Fixed O&M Fee','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','VOM','Variable  O&M Fee','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','ER194','ER-194','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','FUEL','Fuel Charge','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','VC','Variable Charge','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','ADMIN','ADMIN Charge','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSATRANS','Transmission Charge','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSASYSLOSS','System Loss Charge','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSADEMAND','Demand Charge','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSAENERGY','Energy Charge','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSAMETERING','Metering Charge','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSASUPPLY','Supply Charge','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSAPFADJ','Power Factor Adjustment','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSACURPT','Current RPT','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSALOCFRTAX','Local Franchise Tax','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSALIFELINE','Lifeline Rate Subsidy','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSASENIORDC','Senior Subsidy/Discount','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSATRAC','TRAC','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSAMISSIO','Missionary','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSAENVIR','Environmental Fund','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSANPCSCC','NPC Stranded Contract Costs','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSANPCDEBT','NPC Stranded Debts','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSADUSCC','DU Stranded Contract Costs','Php','RR_AMOUNT','','Yes','Yes'],
    ['**CHARGES','DWSAEQTAXROY','Equalization of Taxes and Royalties','Php','RR_AMOUNT','','Yes','Yes'],
    ['**FUNCTIONS','FX_IX', 'Index','','RR_INDEX','','Yes','Yes'],
    ['**FUNCTIONS','FX_ENBILLED', 'Billed Energy','kWh','RR_KWH','','Yes','Yes'],
    ['**FUNCTIONS','FX_FUELR', 'Fuel Rate','Php/kWh','RR_PKWH','','Yes','Yes'],
    ['**TEXT','TXT_IDX','Indices','','','','Yes','Yes'],
    ['**TEXT','TXT_PLNT','Plant Data','','','','Yes','Yes'],
    ['**TEXT','TXT_QTY','Quantities','','','','Yes','Yes'],
    ['**TEXT','TXT_RATES','Rates','','','','Yes','Yes'],
    ['**TEXT','TXT_FXC','Fixed Charge','','','','Yes','Yes'],
    ['**TEXT','TXT_VARC','Variable Charge','','','','Yes','Yes'],
    ['**TEXT','TXT_GENC','Generation Charge','','','','Yes','Yes'],
    ['**TEXT','TXT_DWSA','DWSA','','','','Yes','Yes'],    
    ['DWSA','DWSA_TRANS_B','Transmission Charge Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SYSLOSS_B','System Loss Charge Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_DEMAND_B','Demand Charge Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_ENERGY_B','Energy Charge Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_METERING_B','Metering Charge Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SUPPLY_B','Supply Charge Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_PFADJ_B','Power Factor Adjustment Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_CURPT_B','Current RPT Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_LOCFRTAX_B','Local Franchise Tax Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_LIFELINE_B','Lifeline Rate Subsidy Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SENIORDC_B','Senior Subsidy/Discount Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_TRAC_B','TRAC Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_MISSIO_B','Missionary Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_ENVIR_B','Environmental Fund Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_NPCSCC_B','NPC Stranded Contract Costs Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_NPCDEBT_B','NPC Stranded Debts Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_DUSCC_B','DU Stranded Contract Costs Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_EQTAXROY_B','Equalization of Taxes and Royalties Base','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_TRANS_R','Transmission Charge Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SYSLOSS_R','System Loss Charge Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_DEMAND_R','Demand Charge Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_ENERGY_R','Energy Charge Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_METERING_R','Metering Charge Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SUPPLY_R','Supply Charge Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_PFADJ_R','Power Factor Adjustment Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_CURPT_R','Current RPT Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_LOCFRTAX_R','Local Franchise Tax Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_LIFELINE_R','Lifeline Rate Subsidy Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SENIORDC_R','Senior Subsidy/Discount Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_TRAC_R','TRAC Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_MISSIO_R','Missionary Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_ENVIR_R','Environmental Fund Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_NPCSCC_R','NPC Stranded Contract Costs Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_NPCDEBT_R','NPC Stranded Debts Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_DUSCC_R','DU Stranded Contract Costs Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_EQTAXROY_R','Equalization of Taxes and Royalties Rate','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_TRANS_A','Transmission Charge Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SYSLOSS_A','System Loss Charge Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_DEMAND_A','Demand Charge Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_ENERGY_A','Energy Charge Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_METERING_A','Metering Charge Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SUPPLY_A','Supply Charge Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_PFADJ_A','Power Factor Adjustment Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_CURPT_A','Current RPT Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_LOCFRTAX_A','Local Franchise Tax Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_LIFELINE_A','Lifeline Rate Subsidy Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SENIORDC_A','Senior Subsidy/Discount Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_TRAC_A','TRAC Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_MISSIO_A','Missionary Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_ENVIR_A','Environmental Fund Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_NPCSCC_A','NPC Stranded Contract Costs Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_NPCDEBT_A','NPC Stranded Debts Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_DUSCC_A','DU Stranded Contract Costs Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_EQTAXROY_A','Equalization of Taxes and Royalties Amount','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_TRANS_V','Transmission Charge VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SYSLOSS_V','System Loss Charge VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_DEMAND_V','Demand Charge VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_ENERGY_V','Energy Charge VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_METERING_V','Metering Charge VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SUPPLY_V','Supply Charge VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_PFADJ_V','Power Factor Adjustment VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_CURPT_V','Current RPT VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_LOCFRTAX_V','Local Franchise Tax VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_LIFELINE_V','Lifeline Rate Subsidy VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_SENIORDC_V','Senior Subsidy/Discount VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_TRAC_V','TRAC VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_MISSIO_V','Missionary VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_ENVIR_V','Environmental Fund VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_NPCSCC_V','NPC Stranded Contract Costs VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_NPCDEBT_V','NPC Stranded Debts VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_DUSCC_V','DU Stranded Contract Costs VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['DWSA','DWSA_EQTAXROY_V','Equalization of Taxes and Royalties VAT','Php','RR_AMOUNT','','Yes','Yes'],
    ['PLANTMD','PL_GEN','Plant Generation','kWh','RR_KWH','','Yes','Yes'],
    ['PLANTMD','PL_COALMT','Coal Consumption','kWh','RR_MT','','Yes','Yes'],
    ['PLANTMD','PL_DCP','Delivered Coal Price','Php/MT','RR_PMT','','Yes','Yes'],
    ['STLBID','STL_BCQPRE','Settlement BCQ Prelim','','RR_KWH','','Yes','Yes'],
    ['STLBID','STL_BCQFNL','Settlement BCQ Final','','RR_KWH','','Yes','Yes'],
    ['STLSEIN','STL_MQPRE','Settlement BCQ Prelim','','RR_KWH','','Yes','Yes'],
    ['STLSEIN','STL_MQFNL','Settlement BCQ Final','','RR_KWH','','Yes','Yes'],
]

function dataVariablesFilter(tables = [],include=true) {
    var arr = [];    
    $.each(dataVariables, function(index, row) {
        var check =tables.includes(row[0])
        if (!include) check=!check;
        if (check||tables.length === 0) {
            arr.push([row[1]]);
        }
    });
    return arr;
}

var dataParties =[
    ['GEN01','Generator 1','GEN','Yes',''],
    ['DU01','Distribution Utilities 1','DU/EC','No',''],
    ['RES01','Retail Electricity Supplier 1','RES','Yes',''],
    ['CC01','Contestable Customer 1','CC','No',''],
]




var dataContractVariables =[
    ['PSA-GENCO1-DU01-001','C_CC','1','0','10','','','NEW','No',''],
    ['PSA-GENCO1-DU01-001','C_CC','2','0','15','2029-01','2029-12','NEW','No',''],
    ['PSA-GENCO1-DU01-001','C_MEOT','1','0','1,440,000','','','NEW','No',''],
    ['PSA-GENCO1-DU01-001','C_CRF','1','0','2,000','','','NEW','No',''],
    ['PSA-GENCO1-DU01-001','C_FOM','1','0','300','','','NEW','No',''],
    ['PSA-GENCO1-DU01-001','C_VOM','1','0','0.3','','','NEW','No',''],
    ['PSA-GENCO1-DU01-001','C_ER194','1','0','0.01','','','NEW','No',''],
    ['PSA-GENCO1-DU01-001','C_NCRCPIB','1','0','4.6','','','NEW','No',''],
    ['PSA-GENCO1-DU01-001','C_FOREXB','1','0','56','','','NEW','No',''],
    ['PSA-GENCO1-RES01-001','C_VARIABLE','1','0','1.45','','','APPROVED','Yes',''],
    ['PSA-GENCO1-RES01-001','C_ER194','1','0','0.01','','','APPROVED','Yes',''],
    ['PSA-GENCO1-RES01-001','C_ADMIN','1','0','0.5','','','APPROVED','Yes',''],
    ['RSC-RESO1-CC01-001','C_VARIABLE','1','0','1.45','','','APPROVED','Yes',''],
    ['RSC-RESO1-CC01-001','C_ADMIN','1','0','1','','','APPROVED','Yes',''],
]



var dataContractFields =[
    ['PSA-GENCO1-DU01-001','plant','1','0','GEN01','','','NEW','No',''],
    ['PSA-GENCO1-DU01-001','wesmselbid','1','0','GEN01','','','NEW','No',''],
    ['PSA-GENCO1-DU01-001','wesmbuybid','1','0','DU01','','','NEW','No',''],
    ['PSA-GENCO1-RES01-001','plant','1','0','GEN01','','','NEW','No',''],
    ['PSA-GENCO1-RES01-001','wesmselbid','1','0','GEN01','','','APPROVED','Yes',''],
    ['PSA-GENCO1-RES01-001','wesmbuybid','1','0','CC01','','','APPROVED','Yes',''],
    ['PSA-RESO1-CC01-001','plant','1','0','GEN01','','','NEW','No',''],
    ['RSC-RESO1-CC01-001','metersin','1','0','200291340102','','','APPROVED','Yes',''],
]



var dataContractTemplates =[
    ['PSA-GENCO1-DU01-001','1','0','PSADU_V01.00','','','NEW','No',''],
    ['PSA-GENCO1-RES01-001','1','0','PSARES_V01.00','','','APPROVED','Yes',''],
    ['RSC-RESO1-CC01-001','1','0','RSC_V01.00','','','APPROVED','Yes',''],
]

var dataTemplates =[
    ['PSADU_V01.00','PSA Template for DU Version 1.0','ACTIVE'],
    ['PSARES_V01.00','PSA Template for RES Version 1.0','ACTIVE'],
    ['RSC_V01.00','RSC Template Version 1.0','ACTIVE'],
]



var dataTemplateVariables =[
    ['PSADU_V01.00',1,'---Indices---','','Print'],
    ['PSADU_V01.00',2,'[IX_FOREX] FOREX, Usd/Php','','Print'],
    ['PSADU_V01.00',3,'[C_FOREXB] Base FOREX, Usd/Php','','Print'],
    ['PSADU_V01.00',4,'[IX_NCRCPI] NCR CPI','','Print'],
    ['PSADU_V01.00',5,'[C_NCRCPIB] Base NCR CPI,','','Print'],
    ['PSADU_V01.00',6,'[V_IX] Index,','ROUND([IX_NCRCPI]/[C_NCRCPIB]*[IX_FOREX]/[C_FOREXB],6)','Print'],
    ['PSADU_V01.00',7,'---Plant Data---','','Print'],
    ['PSADU_V01.00',8,'[PL_GEN] Plant Generation, kWh','','Print'],
    ['PSADU_V01.00',9,'[PL_COALMT] Coal Consumption, MT','','Print'],
    ['PSADU_V01.00',10,'[PL_DCP] Delivered Coal Price, Php/MT','','Print'],
    ['PSADU_V01.00',11,'---Quantities---','',''],
    ['PSADU_V01.00',12,'[C_CC] Contracted Capacity, MW','','Print'],
    ['PSADU_V01.00',13,'[STL_BCQ] Settlement Data BCQ, kWh','','Save'],
    ['PSADU_V01.00',14,'[V_EN] Energy Delivered, kWh','SUM([STL_BCQ])','Print'],
    ['PSADU_V01.00',15,'---Rates---','',''],
    ['PSADU_V01.00',16,'[C_CRF] Capital Recovery Fee, Php/kWh','','Print'],
    ['PSADU_V01.00',17,'[C_FOM] Fixed O&M Fee, Php/MW','','Print'],
    ['PSADU_V01.00',18,'[C_VOM] Variable O&M Fee, Php/kWh','','Print'],
    ['PSADU_V01.00',19,'[C_ER194] ER-194, Php/kWh','','Print'],
    ['PSADU_V01.00',20,'[V_FUELR] Fuel Rate, Php/kWh','[PL_DCP]*[PL_COALMT]/[PL_GEN]','Print'],
    ['PSARES_V01.00',1,'---Plant Data---','','Print'],
    ['PSARES_V01.00',2,'[PL_GEN] Plant Generation, kWh','','Print'],
    ['PSARES_V01.00',3,'[PL_COALMT] Coal Consumption, MT','','Print'],
    ['PSARES_V01.00',4,'[PL_DCP] Delivered Coal Price, Php/MT','','Print'],
    ['PSARES_V01.00',5,'---Quantities---','',''],
    ['PSARES_V01.00',6,'[STL_BCQ] Settlement Data BCQ, kWh','','Save'],
    ['PSARES_V01.00',7,'[V_EN] Energy Delivered, kWh','SUM([STL_BCQ])','Print'],
    ['PSARES_V01.00',8,'---Rates---','',''],
    ['PSARES_V01.00',9,'[C_VC] Variable Charge, Php/kWh','','Print'],
    ['PSARES_V01.00',10,'[C_ADMIN] Admin Charge, Php/kWh','','Print'],
    ['PSARES_V01.00',11,'[C_ER194] ER-194, Php/kWh','','Print'],
    ['PSARES_V01.00',12,'[V_FUELR] Fuel Rate, Php/kWh','[PL_DCP]*[PL_COALMT]/[PL_GEN]','Print'],
]

var dataTemplateCharges = [
    ['PSADU_V01.00',1,'---Fixed Charge---','','','',''],
    ['PSADU_V01.00',2,'[CRF]Capital Recovery Fee, PHP','[C_CC]*1000','[C_CRF]*[V_IX]','ROUND([A]*[B],2)','[C]*[VAT]'],
    ['PSADU_V01.00',3,'[FOM]Fixed O&M Fee, PHP','[C_CC]*1000','[C_CRF]','ROUND([A]*[B],2)','[C]*[VAT]'],
    ['PSADU_V01.00',4,'---Generation Charge---','','','',''],
    ['PSADU_V01.00',5,'[FUEL] Fuel Charge, Php','[V_EN]','[V_FUELR]','ROUND([A]*[B],2)	','[C]*[VAT]'],
    ['PSADU_V01.00',6,'[VOM] Variable O&M Fee, PHP','[V_EN]','[C_VOM]-[C_ER194]','ROUND([A]*[B],2)','[C]*[VAT]'],
    ['PSADU_V01.00',7,'[ER194] ER-194, PHP','[V_EN]','[C_ER194]','ROUND([A]*[B],2)','0'],
]


var dataFinanceAccount = [
    ['CRFEV','CRF Expense Vatable','','Yes'],
    ['CRFRV','CRF Revenue Vatable','','Yes'],
    ['ER194ENV','ER-194 Expense Non-Vatable','','Yes'],
    ['ER194RNV','ER-194 Revenue Non-Vatable','','Yes'],
    ['FOMEV','Fixed O&M Expense Vatable','','Yes'],
    ['FOMRV','Fixed O&M Revenue Vatable','','Yes'],
    ['FUELEV','Fuel Expense Vatable','','Yes'],
    ['FUELRV','Fuel Revenue Vatable','','Yes'],
    ['RESSUPEV','RES Supply Expense Vatable','','Yes'],
    ['RESSUPRV','RES Supply Revenue Vatable','','Yes'],
    ['RESVATEV','RES VAT Expense Vatable','','Yes'],
    ['RESVATRV','RES VAT Revenue Vatable','','Yes'],
    ['GENVATEV','Gen VAT Expense Vatable','','Yes'],
    ['GENVATRV','Gen VAT Revenue Vatable','','Yes'],
    ['VOMEV','Variable O&M Expense Vatable','','Yes'],
    ['VOMRV','Variable O&M Revenue Vatable','','Yes'],
]


var dataFinanceAccountLink =[
    ['GEN01','SELLER','CRF[BASE]','CRFRV','CRFEV'],
    ['GEN01','SELLER','FOM[BASE]','FOMRV','FOMEV'],
    ['GEN01','SELLER','VOM[BASE]','VOMRV','VOMEV'],
    ['GEN01','SELLER','ER194[BASE]','ER194RNV','ER194ENV'],
    ['GEN01','SELLER','FUEL[BASE]','FUELRV','FUELEV'],
    ['GEN01','SELLER','CRF[VAT]|FOM[VAT]|VOM[VAT]|ER194[VAT]|FUEL[VAT]','GENVATRV','GENVATEV'],
    ['RES01','BUYER','CRF[VAT]|FOM[VAT]|VOM[VAT]|ER194[VAT]|FUEL[VAT]','RESVATEV','RESVATRV'],
    ['RES01','BUYER','CRF[BASE]|FOM[BASE]|VOM[BASE]|ER194[BASE]|FUEL[BASE]','RESVATEV','RESVATRV'],
]


