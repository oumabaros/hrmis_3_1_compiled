function PayrollCodeModel(Id, NameOnPayslip) {
    this.Id = ko.observable(Id);
    this.NameOnPayslip = ko.observable(NameOnPayslip);
}

function PayrollModel(Id, PayrollCodeId, EmployeeId, Amount, Balance, IsTurnedOff, Remarks, PayPeriodId,
                        NameOnPayslip, PPeriod, MandatoryItem, IsOpen, PayslipRank, ItemCode, Formula, NormalFormula,
                        TrackBalanceChanges, BalanceEffect, RoundToDigits
                        )
{
    this.Id = ko.observable(Id);
    this.PayrollCodeId = ko.observable(PayrollCodeId);
    this.EmployeeId = ko.observable(EmployeeId);
    this.Amount = ko.observable(Amount);
    this.Balance = ko.observable(Balance);
    this.IsTurnedOff = ko.observable(IsTurnedOff);
    this.Remarks = ko.observable(Remarks);
    this.PayPeriodId = ko.observable(PayPeriodId);
    this.NameOnPayslip = ko.observable(NameOnPayslip);
    this.PPeriod = ko.observable(PPeriod);
    this.MandatoryItem = ko.observable(MandatoryItem);
    this.IsOpen = ko.observable(IsOpen);
    this.PayslipRank = ko.observable(PayslipRank);
    this.ItemCode = ko.observable(ItemCode);
    this.Formula = ko.observable(Formula);
    this.NormalFormula = ko.observable(NormalFormula);
    this.TrackBalanceChanges = ko.observable(TrackBalanceChanges);
    this.BalanceEffect = ko.observable(BalanceEffect);
    this.RoundToDigits = ko.observable(RoundToDigits);
}

function PayrollModelMan(Id, PayrollCodeId, EmployeeId, Amount, Balance, IsTurnedOff, Remarks, PayPeriodId,
    NameOnPayslip, PPeriod, MandatoryItem, IsOpen, PayslipRank, ItemCode, Formula, NormalFormula,
    TrackBalanceChanges, BalanceEffect, RoundToDigits
) {
    this.Id = ko.observable(Id);
    this.PayrollCodeId = ko.observable(PayrollCodeId);
    this.EmployeeId = ko.observable(EmployeeId);
    this.Amount = ko.observable(Amount);
    this.Balance = ko.observable(Balance);
    this.IsTurnedOff = ko.observable(IsTurnedOff);
    this.Remarks = ko.observable(Remarks);
    this.PayPeriodId = ko.observable(PayPeriodId);
    this.NameOnPayslip = ko.observable(NameOnPayslip);
    this.PPeriod = ko.observable(PPeriod);
    this.MandatoryItem = ko.observable(MandatoryItem);
    this.IsOpen = ko.observable(IsOpen);
    this.PayslipRank = ko.observable(PayslipRank);
    this.ItemCode = ko.observable(ItemCode);
    this.Formula = ko.observable(Formula);
    this.NormalFormula = ko.observable(NormalFormula);
    this.TrackBalanceChanges = ko.observable(TrackBalanceChanges);
    this.BalanceEffect = ko.observable(BalanceEffect);
    this.RoundToDigits = ko.observable(RoundToDigits);
}

function PayrollRun(Id, PayrollCodeId, EmployeeId,
                    Formula, PayPeriodId,Amount,Balance) {
    this.Id = ko.observable(Id);
    this.PayrollCodeId = ko.observable(PayrollCodeId);
    this.EmployeeId = ko.observable(EmployeeId);
    this.Amount = ko.observable(Amount);
    this.Balance = ko.observable(Balance);
    this.PayPeriodId = ko.observable(PayPeriodId);
    this.Formula = ko.observable(Formula);
    
}

var OperationsViewModel = function () {
    var self = this;
    self.Payrolls = ko.observableArray([]);
    self.PayrollCodes = ko.observableArray([]);
    self.Employees = ko.observableArray([]);
    self.Params = ko.observableArray([]);
    self.ColumnNames = ko.observableArray([]);
    self.ItemCodes = ko.observableArray([]);
    self.TempCodes = ko.observableArray([]);
    self.LoadedCodes = ko.observableArray([]);
    self.CalcCodes = ko.observableArray([]);
    self.Balances = ko.observableArray([]);
    self.PayrollRuns = ko.observableArray([]);
    self.EmployeeIds = ko.observableArray([]);
    self.EmployeeIds_ = ko.observableArray([]);
    self.PayPeriods = ko.observableArray([]);

    self.progress = 0;
    self.Message = ko.observable();
    self.pItemCode = ko.observable();
    this.selectedHierarchy = ko.observable();
   
    /*Begin Functions Variables*/
    self.dep = ko.observable(0);
    self.spouse = ko.observable(0);
    self.bal = ko.observable(0.00);
    self.dis = ko.observable(0);
    self.rate = ko.observable(0.00);
    self.job_grade_id = ko.observable(0);
    self.job_id = ko.observable(0);
    self.loc_id = ko.observable(0);
    self.loc_id = ko.observable(0);
    self.int = ko.observable(0);
    self.month = ko.observable(0);
    self.prev_amt = ko.observable(0.00);
    self.prev_bal = ko.observable(0.00);
    self.rnd = ko.observable(0.00);
    self.year = ko.observable(0);
    self.curr = ko.observable(0);
    self.tax = ko.observable(0.00);
    self.mth_days = ko.observable(0);
    self.year_days = ko.observable(0);
    self.year_days_worked = ko.observable(0);
    self.years_worked = ko.observable(0.00);
    self.periods_worked = ko.observable(0);
    self.periods_worked_to_date = ko.observable(0);
    self.varcat = ko.observable(0);
    self.scale_amount = ko.observable(0.00);
    self.c_off_days = ko.observable(0);
    self.c_off = ko.observable(0);
    self.prorate = ko.observable(0.00);
    self.h_hid = ko.observable(0);
    self.loanInterest = ko.observable(0.00);
    self.loanPrincipal = ko.observable(0.00);
    self.loanRecovery = ko.observable(0.00);
    self.loanBalance = ko.observable(0.00);
    
    self.ItemCodes().forEach(function (v, i) {
        window[v.ItemCode] = 0.00;
    });
    /*End Functions Variables*/
    var DecimalPrecision = (function () {
        if (Number.EPSILON === undefined) {
            Number.EPSILON = Math.pow(2, -52);
        }
        this.round = function (n, p) {
            let r = 0.5 * Number.EPSILON * n;
            let o = 1; while (p-- > 0) o *= 10;
            if (n < 0)
                o *= -1;
            return Math.round((n + r) * o) / o;
        }
        this.ceil = function (n, p) {
            let r = 0.5 * Number.EPSILON * n;
            let o = 1; while (p-- > 0) o *= 10;
            if (n < 0)
                o *= -1;
            return Math.ceil((n + r) * o) / o;
        }
        this.floor = function (n, p) {
            let r = 0.5 * Number.EPSILON * n;
            let o = 1; while (p-- > 0) o *= 10;
            if (n < 0)
                o *= -1;
            return Math.floor((n + r) * o) / o;
        }
        return this;
    })();

    
    self.loadBalance = function () {

        self.Message("");
        var d = document.getElementById('txtEmployeeId').value;
        var l = document.getElementById('txtCurrentPeriod').value;

        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetBalance/" + d + "/" + l,
            success: function (data) {
                self.Balances(data);
                
            },
            error: function (err) {
                self.Message("Error Occured-Load Balance, Please Reload the Page and Try Again " + err.status);
            }
        });


    };


    self.selectParam = function (d) {

        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetTransactionsByCode/" + d,
            success: function (data) {
                
                self.Params(data);
                
            },
            error: function (err) {
                self.Message("Error Occured-Select Payroll Parameter, Please Reload the Page and Try Again " + err.status);
            }
        });

        return true;
    };

    self.loadTempCodes = function () {
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetTempCodes",
            success: function (data) {
                self.TempCodes(data);
                self.TempCodes().forEach(function (v) {
                    window[v] = 0;
                });
                
            },
            error: function (err) {
                self.Message("Error Occured-Load Codes, Please Reload the Page and Try Again " + err.status);
            }
        });
    };
       

    self.loadItemCodes = function () {
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetPayrollItems",
            success: function (data) {
                self.ItemCodes(data);
                self.ItemCodes_ = self.ItemCodes;
                
            },
            error: function (err) {
                self.Message("Error Occured-Load Item Codes, Please Reload the Page and Try Again " + err.status);
            }
        });
    };

    self.doTempCalculation = function () {
        var pcId = parseInt(document.getElementById('txtPayrollCodeId').value);
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetItemCode/" + pcId,
            success: function (data) {
                document.getElementById(data).onkeypress = function () {
                window[data] = Number(parseFloat(parseFloat(document.getElementById(data).value)).toFixed(2)).toLocaleString('en');
                    
                };
                self.updateVariables();
            },
            error: function (err) {
                self.Message("Error Occured-TempCalculation, Please Reload the Page and Try Again " + err.status);
            }
        });
        
    };

    self.addEvent=function (elm, evType, fn, useCapture) {
        if (elm.addEventListener) {
            elm.addEventListener(evType, fn, useCapture);
        }
        else if (elm.attachEvent) {
            elm.attachEvent('on' + evType, fn);
        }
        else {
            elm['on' + evType] = fn;
        }
    };

    self.doBalanceCalculation = function () {
        var elems = document.getElementsByClassName('PCodeBalance');
        function addEvent(event) {
            if (event.keyCode == 8) {
                self.doBalance();
            }
            else if (event.keyCode == 46) {
                self.doBalance();
            }
            else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                self.doBalance();
            }
            else {
            }
        };

        for (i = 0; i < elems.length; i++) {
            elems[i].addEventListener("keyup", addEvent);
        }
    };

    self.doBalance = function () {
        self.Payrolls().forEach(function (v, i) {
            if (v.TrackBalanceChanges == true && v.BalanceEffect == 1) {
                document.getElementById('bal_' + v.ItemCode).value = _.round(v.Balance, v.RoundToDigits).toFixed(v.RoundToDigits) ;
            }
            else if (v.TrackBalanceChanges == true && v.BalanceEffect == 2) {
                document.getElementById('bal_' + v.ItemCode).value = _.round(v.Balance + parseFloat(document.getElementById(v.ItemCode).value), v.RoundToDigits).toFixed(v.RoundToDigits);
            }
            else if (v.TrackBalanceChanges == true && v.BalanceEffect == 3) {
                document.getElementById('bal_' + v.ItemCode).value = _.round(v.Balance - parseFloat(document.getElementById(v.ItemCode).value), v.RoundToDigits).toFixed(v.RoundToDigits);
            
            }
            else {
            }
        });
    };

    
    self.Navigation = function () {
        $('input').keyup(function (e) {
            if (e.which == 39) { // right arrow
                $(this).closest('td').next().find('input').focus();

            } else if (e.which == 37) { // left arrow
                $(this).closest('td').prev().find('input').focus();

            } else if (e.which == 40) { // down arrow
                $(this).closest('tr').next().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();

            } else if (e.which == 38) { // up arrow
                $(this).closest('tr').prev().find('td:eq(' + $(this).closest('td').index() + ')').find('input').focus();
            }
        });

   
    };

    self.doCalculation = function () {
        var elems = document.getElementsByClassName('PCodeAmount');
         function addEvent (event) {
             if (event.keyCode == 8) {
                 self.doCalc();
             }
             else if (event.keyCode == 46) {
                 self.doCalc();
             }

             else if ((event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)) {
                 self.doCalc();
             }
             else {
                 
             }
                       
        };
                
        for (i = 0; i < elems.length; i++) {
            elems[i].addEventListener("keyup", addEvent);
        }

        var polls = document.getElementsByClassName('PCodeAmount');
        Array.prototype.forEach.call(polls, callback);

        function callback(element, iterator) {
            console.log(iterator, element.id);
            
        }
    };

    self.doZero = function () {
        
        $('input').bind('input propertychange', function () {
            //self.doCalc();
        });
        
    };

    self.doCalc = function () {
        self.ItemCodes().forEach(function (v, i) {
        if (v.Formula == null) {
            ko.utils.arrayForEach(self.Payrolls(),function (p) {
                
                if (document.getElementById(p.ItemCode()).value !== null) {
                    
                    var ic = document.getElementById(p.ItemCode()).value;
                    if (isNaN(ic) || typeof ic === 'undefined' ||ic===null) {
                        //document.getElementById(p.ItemCode()).value = "";// _.round(0, p.RoundToDigits);
                        document.getElementById(p.ItemCode()).value = 0;
                        //ic = 0;
                        self.doBalance();
                    }
                    else {
                        this.ItemCode = ic;
                        document.getElementById(p.ItemCode()).value =eval(this.ItemCode);// _.round((eval(this.ItemCode)), p.RoundToDigits).toFixed(p.RoundToDigits);
                        self.doBalance();
                    }
                }
                
                                               
            });
        }
        
        else {
            ko.utils.arrayForEach(self.Payrolls(), function (p) {
                if ((p.NormalFormula() != null)) {
                    //var amt = (self.getFunctionAmounts(p.ItemCode()))();
                    //alert(p.ItemCode() + ":" + amt);
                    //var result = (p.NormalFormula().includes('F_') ? self.getFunctionAmounts(p.ItemCode()) : eval(v.Formula));
                    var result = eval(v.Formula);
                    if (!isNaN(result)) {
                        if (document.getElementById(v.ItemCode) !== null) {
                            document.getElementById(v.ItemCode).value = _.round(result, p.RoundToDigits).toFixed(p.RoundToDigits);
                            self.doBalance();
                        }

                    }
                }
                else {
                }
                
            });
        }
    });
    };

    self.selectPRunItem = function (d, l) {
        self.Payrolls([]);
        
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetPayrollTransaction/" + d + "/" + l,
            success: function (data) {
                var mappedData = ko.utils.arrayMap(data, function (item) {
                    return new PayrollModel(
                        item.Id,
                        item.PayrollCodeId,
                        item.EmployeeId,
                        item.Amount,
                        item.Balance,
                        item.IsTurnedOff,
                        item.Remarks,
                        item.PayPeriodId,
                        item.NameOnPayslip,
                        item.PPeriod,
                        item.MandatoryItem,
                        item.IsOpen,
                        item.PayslipRank,
                        item.ItemCode,
                        item.Formula,
                        item.NormalFormula,
                        item.TrackBalanceChanges,
                        item.BalanceEffect,
                        item.RoundToDigits
                    );
                });

                self.Payrolls(mappedData);
                self.Payrolls.sorted(function (left, right) {
                    return left.PayslipRank === right.PayslipRank ? 0
                        : left.PayslipRank < right.PayslipRank ? -1
                            : 1;
                });
                self.doPRun(d,l);
                                
            },
            error: function (err) {
                self.Message("Error Occured-Select pRun Item, Please Reload the Page and Try Again " + err.status);
            }
        });
    };

    self.selectPRunItem_ = function (d, l) {
        $.ajax({
            type: "POST",
            url: "/api/PayrollTransactionsApi/SaveNewPayrollTransaction/"+d+"/"+l,
            //data:,
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'RequestVerificationToken': document.getElementById('RequestVerificationToken').value
            },
            success: function (data) {
                bootbox.alert({
                    message: "Payroll Run New Completed Successfuly!",
                    className: 'rubberBand animated',
                    centerVertical: true,
                    size: 'small'
                });
            },
            error: function (err) {
                bootbox.alert({
                    message: "Error In Payroll Run!",
                    className: 'rubberBand animated',
                    centerVertical: true,
                    size: 'small'
                });
            }
        });                
    };

    self.getFunctionAmounts = function (item) {
      
        if (item === 'ECLR') {
            return  self.F_LOANRECOV('ECLR');
        }
        else if (item === 'PAYE') {
            return  self.F_CALCTAX('BSC', 'PAYE');
        }
        else if (item === 'NHIF') {
            return  self.F_CALCTAX('BSC', 'NHIF');
        }
        else if (item === 'EWD') {
            return  self.F_MTHDAYSWRKD('WORK');
        }
        else if (item === 'WD') {
            return  self.F_MTHDAYS('WORK');
        }

    };
    self.doPRun = function (d,l) {
        var td = [];
        self.ItemCodes().forEach(function (v, i) {
            self.Payrolls().forEach(function (p, t) {
                if (v.ItemCode === p.ItemCode()) {
                    window[v.ItemCode] = p.Amount();
                }
                else {
                    
                }

            });
        });
        self.ItemCodes().forEach(function (v, i) {
           self.Payrolls().forEach(function (p, t) {
                if (v.ItemCode === p.ItemCode()) {
                    if (p.Formula() != null) {
                        var amt =self.getFunctionAmounts(p.ItemCode());
                        td.push({
                            "PayrollCodeID": p.PayrollCodeId(),
                            "EmployeeID": p.EmployeeId(),
                            "Amount": (p.NormalFormula().includes('F_') ? amt : eval(p.Formula())) ,
                            "Balance": p.Balance(),
                            "IsTurnedOff": p.IsTurnedOff(),
                            "Remarks": p.Remarks(),
                            "PayPeriodID": p.PayPeriodId()
                        });
                    }
                    else {
                        td.push({
                            "PayrollCodeID": p.PayrollCodeId(),
                            "EmployeeID": p.EmployeeId(),
                            "Amount": p.Amount(),
                            "Balance": p.Balance(),
                            "IsTurnedOff": p.IsTurnedOff(),
                            "Remarks": p.Remarks(),
                            "PayPeriodID": p.PayPeriodId()
                        });
                    }
                }
                else {
                    /*Ignore*/
                }

            });
        });
        
        $.ajax({
            type: "POST",
            url: "/api/PayrollTransactionsApi/PostPayrollTransaction",
            data: JSON.stringify(td),
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'RequestVerificationToken': document.getElementById('RequestVerificationToken').value
            },
            success: function (data) {
                           
            },
            error: function (err) {
                bootbox.alert({
                    message: "Error In Payroll Run! Try Again",
                    className: 'rubberBand animated',
                    centerVertical: true,
                    size: 'small'
                });
            }
        });
    };

    self.RollOver = function () {
        bootbox.confirm({
            title: "Destroy planet?",
            centerVertical: true,
            message: "Do You Want to Close Current Pay Period and Open a New Period? This Action Cannot Be Undone!",
            buttons: {
                confirm: {
                    label: '<i class="fa fa-check"></i> Confirm'
                },
                cancel: {
                    label: '<i class="fa fa-times"></i> Cancel'
                }
            },
            callback: function (result) {
                if (result) {
                    $.ajax({
                        type: "POST",
                        url: "/api/PayrollTransactionsApi/RollOver/",
                        //data:,
                        headers: {
                            'Accept': "application/json",
                            'Content-Type': "application/json",
                            //'RequestVerificationToken': document.getElementById('RequestVerificationToken').value
                        },
                        success: function (data) {
                            //makeProgress(); 
                            bootbox.alert({
                                message: "New Period Completed Successfuly!",
                                className: 'rubberBand animated',
                                centerVertical: true,
                                size: 'small'
                            });
                        },
                        error: function (err) {
                            bootbox.alert({
                                message: "Error In Creating New Period! Period Not Approved or Period Not Open",
                                className: 'rubberBand animated',
                                centerVertical: true,
                                size: 'small'
                            });
                        }
                    });               
                }
                else {
                }
            }
        });
    };

    self.pRun = function (p) {
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetEmployeeIds/"+p,
            success: function (data) {
                self.EmployeeIds(data);
                self.EmployeeIds().forEach(function (v, i) {
                    
                    document.getElementById('txtEmployeeId').value = v;
                    document.getElementById('txtCurrentPeriod').value = p;
                    self.selectPRunItem(v, p);
                                        
                });
                       
            },
            error: function (err) {
                
            }
        });
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetEmployeeIds_/" + p,
            success: function (data) {
                self.EmployeeIds_(data);
                                
                self.EmployeeIds_().forEach(function (v, i) {

                    document.getElementById('txtEmployeeId').value = v;
                    document.getElementById('txtCurrentPeriod').value = p;
                    self.selectPRunItem_(v, p);
                                       
                });
                
            },
            error: function (err) {
                bootbox.alert({
                    message: "Error In Payroll Run!",
                    className: 'rubberBand animated',
                    centerVertical: true,
                    size: 'small'
                });
            }
        });
        makeProgress(); 
        
    };
   
        
    self.formatMoney = function (number, decPlaces, decSep, thouSep) {
        //(123456789.12345).formatMoney(2); 
        //(123456789.12345).formatMoney(2, ".", ",");
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSep = typeof decSep === "undefined" ? "." : decSep;
        thouSep = typeof thouSep === "undefined" ? "," : thouSep;
        var sign = number < 0 ? "-" : "";
        var i = String(parseInt(number = Math.abs(Number(number) || 0).toFixed(decPlaces)));
        var j = (j = i.length) > 3 ? j % 3 : 0;

        return sign +
            (j ? i.substr(0, j) + thouSep : "") +
            i.substr(j).replace(/(\decSep{3})(?=\decSep)/g, "$1" + thouSep) +
            (decPlaces ? decSep + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
    };

    self.Round = function (number,precision) {
        var pair = (number + 'e').split('e')
        var value = Math.round(pair[0] + 'e' + (+pair[1] + precision))
        pair = (value + 'e').split('e')
        return +(pair[0] + 'e' + (+pair[1] - precision))
    };

    self.updateVariables = function (elements, data) {
        var e_id=document.getElementById('txtEmployeeId').value;
        var ppd = document.getElementById('txtInitialPeriod').value;
        //$("#t_pay").load(window.location.href +" #t_pay");        
        self.disableElements();
        self.disableBalanceElements();
        
        
    };

    self.disableBalanceElements = function () {
        self.Payrolls().forEach(function (p) {
            $(document.getElementById('bal_' + p.ItemCode)).prop('disabled', true);
        });

    };

    self.disableElements = function () {
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetCalcCodes",
            success: function (data) {
                self.CalcCodes(data);
                self.CalcCodes().forEach(function (p) {
                    $(document.getElementById(p)).prop('readonly', true);
                    });
                
            },
            error: function (err) {
                //alert(err.status );
            }
        });
    };

    self.loadPayroll = function() {

        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi",
            success: function (data) {
                self.Payrolls(data);
                self.Payrolls_ = self.Payrolls;
            },
            error: function (err) {
                
            }
        });

    };
       
    self.createFormula = function () {
        var e = document.getElementById('Formula');
        var selectedValue = e.options[e.selectedIndex].value;
        document.getElementById('txtFormula').value = document.getElementById('txtFormula').value + selectedValue;
    };

    self.createFunction = function () {
        var e = document.getElementById('Function');
        var selectedValue = e.options[e.selectedIndex].value;
        document.getElementById('txtFormula').value = document.getElementById('txtFormula').value + selectedValue;
    };
               
    self.insertElement = function (pc) {
        var e = document.getElementById('PayrollCode');
        var selectedValue = e.options[e.selectedIndex].value;
        document.getElementById('txtPayrollCodeId').value = selectedValue;
        var NameOnPS = document.getElementById('PayrollCode').options[e.selectedIndex].text;
        var em = document.getElementById('txtEmployeeId').value;
        var pp = document.getElementById('txtCurrentPeriod').value;
                
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetPayrollTransactionMan/" + em + "/" + pp + "/" + pc,
            success: function (data) {
                var mData = ko.utils.arrayMap(data, function (item) {
                    return new PayrollModelMan(
                        item.Id,
                        item.PayrollCodeId,
                        item.EmployeeId,
                        item.Amount,
                        item.Balance,
                        item.IsTurnedOff,
                        item.Remarks,
                        item.PayPeriodId,
                        item.NameOnPayslip,
                        item.PPeriod,
                        item.MandatoryItem,
                        item.IsOpen,
                        item.PayslipRank,
                        item.ItemCode,
                        item.Formula,
                        item.NormalFormula,
                        item.TrackBalanceChanges,
                        item.BalanceEffect,
                        item.RoundToDigits
                    );
                });
                
                self.Payrolls.push(mData[0]);
                
                self.Payrolls.sort(function (left, right) {
                    return left.PayslipRank() == right.PayslipRank() ? 0
                        : left.PayslipRank() < right.PayslipRank() ? -1
                                : 1;
                });
                
                self.disableElements();
                self.disableBalanceElements();
                self.doTempCalculation();
                self.doCalc();
                self.doCalculation();
                self.doBalance();
                self.doBalanceCalculation();
                self.Navigation();
                
            },
            error: function (err) {
                self.Message("Error Occured-New Item, Please Reload the Page and Try Again " + err.status);
            }
        });
         
    };

    self.changeEmployees = function (ppd) {
        $('#emp_partial').empty();
        $('#emp_partial').load("/PayrollTransactionsCustom/NextPartial/" + ppd, function () {

        });
                  
    };
    self.selectPayPeriod = function (ppd) {
        $('#emp_partial').empty();
        var emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        if (ppd == parseInt(document.getElementById('txtInitialPeriod').value)) {
            $('#emp_partial').empty();
            $('#emp_partial').load("/PayrollTransactions/InitialPartial", function () {

            });
        }
        else {
            self.changeEmployees(ppd);            
        }
        document.getElementById('txtCurrentPeriod').value=ppd;
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/SelectPayPeriod/" + ppd,
            success: function (data) {
                self.PayPeriods(data);
                document.getElementById("active_period").innerHTML ="";
                document.getElementById("period_status").innerHTML = "";
               
                self.PayPeriods().forEach(function (v, i) {
                    document.getElementById("active_period").innerHTML = v["PeriodDescription"];
                    document.getElementById("period_status").innerHTML = v["IsOpen"] == true ? "Open" : "Closed";
                    
                    
                });
            },
            error: function (err) {
                self.Message("Error Occured In Period Load, Please Reload the Page and Try Again " + err.status);
            }
        });
        self.selectItem(event, emp_id,ppd);
    };
    

    self.savePayroll = function () {
        var td = [];

        self.Payrolls().forEach(function (p, i) {

            var PayrollCodeId = parseInt(document.getElementById('Pc_' + p.ItemCode()).value);
            var EmployeeId = parseInt(document.getElementById('txtEmployeeId').value);
            var Amount = parseFloat(document.getElementById(p.ItemCode()).value);
            var Balance = parseFloat(document.getElementById('bal_' + p.ItemCode()).value);
            var IsTurnedOff = document.getElementById('Off_' + p.ItemCode()).checked;
            var OffVal = IsTurnedOff == true ? 1 : 0;
            var Remarks = document.getElementById('Remarks_' + p.ItemCode()).value;
            var PayPeriodId = parseInt(document.getElementById('txtCurrentPeriod').value);
         
            td.push({
                "PayrollCodeID": PayrollCodeId,
                "EmployeeID": EmployeeId,
                "Amount": Amount,
                "Balance": Balance,
                "IsTurnedOff": OffVal,
                "Remarks": Remarks,
                "PayPeriodID":PayPeriodId
            });
         });

        var emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        var ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
                
        $.ajax({
            type: "POST",
            url: "/api/PayrollTransactionsApi/SavePayrollTransaction/" + emp_id+"/"+ppd,
            data: JSON.stringify(td),
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json",
                'RequestVerificationToken': document.getElementById('RequestVerificationToken').value
            },
            success: function (data) {
                bootbox.alert({
                    message: "Record Saved Successfuly!",
                    className: 'rubberBand animated',
                    centerVertical: true,
                    size: 'small'
                });
            },
            error: function (err) {
                self.Message("Error Occurred-Add, Please Reload the Page and Try Again " + err.status);
            }
        });
        
    };

    
    self.deletePayroll = function (d) {
        bootbox.confirm({
            title: "Delete Item?",
            centerVertical: true,
            message: "Are You Sure You Want To Delete?",
            className: 'rubberBand animated',
            buttons: {
                confirm: {
                    label: '<i class="fa fa-times"></i> Confirm'
                },
                cancel: {
                    label: '<i class="fa fa-check"></i> Cancel'
                }
            },
            callback: function (result) {
                self.Payrolls.remove(function (item) {
                    return item.ItemCode() == d;
                });
            }
        });
        
        
    };
    self.getEmployee = function (d) {
        self.Employees(null);
        $.ajax({
            type: "GET",
            url: "/api/EmployeesApi/GetEmployee/" + d,
            success: function (data) {
                self.Employees(data);
            },
            error: function (err) {
                self.Message("Error Occured In Employee Load, Please Reload the Page and Try Again " + err.status);
            }
        });
    };

    self.turnOff = function (i) {
        var chk = document.getElementById("Off_" + i);
        var formula = document.getElementById("offCalc_" + i).value;
        var initial = document.getElementById("Toggle_" + i).value;
        
        if (chk.checked) {
                    
            $('input').bind('input propertychange', function () {
                
            });
            var eq = ko.utils.arrayFirst(self.Payrolls(), function (currentCode) {
                return currentCode.ItemCode() == i;
            });

            if (eq) {
                eq.Amount(0);
            }
            document.getElementById(i).value = 0;
            self.Payrolls().forEach(function (p) {
                //alert(p.ItemCode() + "=" + p.Amount());
            });
            self.ItemCodes().forEach(function (v, i) {
                if (v.Formula == null) {
                    ko.utils.arrayForEach(self.Payrolls(), function (p) {
                        //alert(p.ItemCode() + " Null=" + p.Amount());
                    });
                }

                else {
                    ko.utils.arrayForEach(self.Payrolls(), function (p) {
                        if ((p.NormalFormula() != null)) {
                            
                            var result = eval(v.Formula);
                            
                            if (!isNaN(result)) {
                                if (document.getElementById(v.ItemCode) !== null) {
                                    var qual = ko.utils.arrayFirst(self.Payrolls(), function (currentCode) {
                                        return currentCode.ItemCode() == i;
                                    });
                                    if (!qual) {
                                        document.getElementById(v.ItemCode).value = _.round(result, p.RoundToDigits).toFixed(p.RoundToDigits);

                                    }
                                    else {
                                        alert(v.ItemCode);
                                    }
                                }

                            }
                        }
                        else {
                        }
                    });
                }
            });
            
            $('input').bind('input propertychange', function () {
                //alert("Change");
            });

            
            return true;
        }
        else {
            
            document.getElementById(i).value = initial;
            self.doCalc();
            
            return true;
        }
        return true;
    };

    self.PayCodes = function () {
        self.PayrollCodes([]);
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetPayrollCodes",
            success: function (data) {
                if (!$.trim(data)) {
                    bootbox.alert({
                        message: "No Payroll Code Data!",
                        buttons: {
                            ok: {
                                label: '<i class="fa fa-times"></i> Ok'
                            },
                        },
                        className: 'rubberBand animated',
                        centerVertical: true,
                        size: 'small'
                    });
                }
                else {
                    var mappedData = ko.utils.arrayMap(data, function (item) {
                        return new PayrollCodeModel(item.Id,item.NameOnPayslip);
                    });

                    self.PayrollCodes(mappedData);
                    self.PayrollCodes.sort(function (left, right) {
                        return left.NameOnPayslip() == right.NameOnPayslip() ? 0
                            : left.NameOnPayslip() < right.NameOnPayslip() ? -1
                                : 1;
                    });
                    
                }

            },
            error: function (err) {
                self.Message("Error Occured-Loading PayrollCodes " + err.status);
            }
        });
    };

    self.addPCode = function (i) {
        var chk = document.getElementById("pc_" + i);
        var e = document.getElementById("PayPeriod_");
        var ppd = e.options[e.selectedIndex].value;
        var pc_name = "";
        
        $.ajax({
            type: "GET",
            async:false,
            url: "/api/PayrollTransactionsApi/RefreshTransaction/"+i,
            success: function (data) {
                pc_name = data;

            },
            error: function (err) {
                self.Message("Error Occured-Loading PayrollCodes " + err.status);
            }
        });

        if (chk.checked) {
            $("#t_header").append("<th id=" + i + ">" + pc_name + "</th>");
            var qry =document.getElementById("txtQry").value + "PayrollTransaction.PayrollCodeID=" + i;
            document.getElementById("txtQry").value = qry+" OR ";
            return true;
        }
        else {
            $("#" + i).remove();
            var str = document.getElementById("txtQry").value;
            str.replace("PayrollTransaction.PayrollCodeID=" + i, "Hey");
            document.getElementById("txtQry").value = "";
            document.getElementById("txtQry").value = str;
            return true;
        }
    };
    self.selectItem = function (event,d, l) {
        self.Payrolls([]);
        self.getEmployee(d);
        var e = document.getElementById('PayPeriod');
        var p = e.options[e.selectedIndex].value;
        
        $(document.getElementById('PayrollCode')).prop('disabled', false);
        $(document.getElementById('PayPeriod')).prop('disabled', false);
        $(document.getElementById('btnSaveTop')).prop('disabled', false);
        $(document.getElementById('btnSaveBottom')).prop('disabled', false);
        document.getElementById('txtEmployeeId').value = d; 
        document.getElementById('txtCurrentPeriod').value = p;
        document.getElementById('txtCurrentPeriod').value = p;
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/getPpdStatus/" +p,
            success: function (data) {
                document.getElementById('txtPayPeriodStatus').value=data;
                if (data == false) {
                    $(document.getElementById('PayrollCode')).prop('disabled', true);
                }
            },
            error: function (err) {
                self.Message("Error Occured-Get Period Status, Please Reload the Page and Try Again " + err.status);
            }
                
        });
                
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetPayrollTransaction/" + d + "/" + p,
            success: function (data) {
                if (!$.trim(data)) {
                    bootbox.alert({
                        message: "No Payroll Transaction Data!",
                        buttons: {
                            ok: {
                                label: '<i class="fa fa-times"></i> Ok'
                            },
                        },
                        className: 'rubberBand animated',
                        centerVertical: true,
                        size: 'small'
                    });
                }
                else {
                    var mappedData = ko.utils.arrayMap(data, function (item) {
                        return new PayrollModel(
                            item.Id,
                            item.PayrollCodeId,
                            item.EmployeeId,
                            item.Amount,
                            item.Balance,
                            item.IsTurnedOff,
                            item.Remarks,
                            item.PayPeriodId,
                            item.NameOnPayslip,
                            item.PPeriod,
                            item.MandatoryItem,
                            item.IsOpen,
                            item.PayslipRank,
                            item.ItemCode,
                            item.Formula,
                            item.NormalFormula,
                            item.TrackBalanceChanges,
                            item.BalanceEffect,
                            item.RoundToDigits
                        );
                    });

                    self.Payrolls(mappedData);
                    self.Payrolls.sort(function (left, right) {
                        return left.PayslipRank() == right.PayslipRank() ? 0
                            : left.PayslipRank() < right.PayslipRank() ? -1
                                : 1;
                    });
                    self.doCalc();
                    self.doCalculation();
                    self.doBalance();
                    self.doBalanceCalculation();
                    self.Navigation();
                    
                    //alert("Tax=" + self.F_CALCTAX_(14177777217.96,180,'NSSF'));
                }
                                
            },
            error: function (err) {
                self.Message("Error Occured-Select Item, Please Reload the Page and Try Again " + err.status);
            }

        });
        
    };
    self.selector = function (event, x, c) {
        self.selectFirstItem(event, x, c);
        //setTimeout(self.selectFirstItem(event, x, c), 1000);
        self.selectFirstItem(event, x, c);
        
    };
    self.selector_ = function (event, x, c) {
        self.selectItem(event, x, c);
        //setTimeout(self.selectFirstItem(event, x, c), 1000);
        self.selectItem(event, x, c);

    };
    self.reloadData = function (event, x, c) {
        self.Payrolls([]);
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetPayrollTransaction/" + x + "/" + c,
            success: function (data) {
                if (!$.trim(data)) {

                }
                else {
                    for (var i = 0; i < data.length; i++) {
                        // Important: Create a new tweet object instead of using 'this' here.
                        var payrolls = {};
                        payrolls.Id = ko.observable(data[i].Id)
                        payrolls.PayrollCodeId = ko.observable(data[i].PayrollCodeId);
                        payrolls.EmployeeId = ko.observable(data[i].EmployeeId);
                        payrolls.Amount = ko.observable(data[i].Amount);
                        payrolls.Balance = ko.observable(data[i].Balance);
                        payrolls.IsTurnedOff = ko.observable(data[i].IsTurnedOff);
                        payrolls.Remarks = ko.observable(data[i].Remarks);
                        payrolls.PayPeriodId = ko.observable(data[i].PayPeriodId);
                        payrolls.NameOnPayslip = ko.observable(data[i].NameOnPayslip);
                        payrolls.PPeriod = ko.observable(data[i].PPeriod);
                        payrolls.MandatoryItem = ko.observable(data[i].MandatoryItem);
                        payrolls.IsOpen = ko.observable(data[i].IsOpen);
                        payrolls.PayslipRank = ko.observable(data[i].PayslipRank);
                        payrolls.ItemCode = ko.observable(data[i].ItemCode);
                        payrolls.Formula = ko.observable(data[i].Formula);
                        payrolls.NormalFormula = ko.observable(data[i].NormalFormula);
                        payrolls.TrackBalanceChanges = ko.observable(data[i].TrackBalanceChanges);
                        payrolls.BalanceEffect = ko.observable(data[i].BalanceEffect);
                        payrolls.RoundToDigits = ko.observable(data[i].RoundToDigits);

                        self.Payrolls.push(payrolls);
                    }
                }

            },
            error: function (err) {
                self.Message("Error Occured-Reload, Please Reload the Page and Try Again " + err.status);
            }
        });

    };

    self.selectFirstItem = function (event,d, l) {
        self.Payrolls([]);
        self.getEmployee(d);
        
        var e = document.getElementById('PayPeriod');
        var p = e.options[e.selectedIndex].value;

        $(document.getElementById('PayrollCode')).prop('disabled', false);
        $(document.getElementById('PayPeriod')).prop('disabled', false);
        $(document.getElementById('btnSaveTop')).prop('disabled', false);
        $(document.getElementById('btnSaveBottom')).prop('disabled', false);
        document.getElementById('txtEmployeeId').value = d;
        document.getElementById('txtCurrentPeriod').value = l;
        document.getElementById('txtCurrentPeriod').value = l;
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/getPpdStatus/" + l,
            success: function (data) {
                document.getElementById('txtPayPeriodStatus').value = data;
                if (data == false) {
                    $(document.getElementById('PayrollCode')).prop('disabled', true);
                }
            },
            error: function (err) {
                self.Message("Error Occured-Get Period Status, Please Reload the Page and Try Again " + err.status);
            }

        });
                
        $.ajax({
            type: "GET",
            url: "/api/PayrollTransactionsApi/GetPayrollTransaction/" + d + "/" + l,
            success: function (data) {
                if (!$.trim(data)) {
                    bootbox.alert({
                        message: "No Payroll Transaction Data!",
                        buttons: {
                            ok: {
                                label: '<i class="fa fa-times"></i> Ok'
                            },
                        },
                        className: 'rubberBand animated',
                        centerVertical: true,
                        size: 'small'
                    });
                }
                else {
                    var mappedData = ko.utils.arrayMap(data, function (item) {
                        return new PayrollModel(
                            item.Id,
                            item.PayrollCodeId,
                            item.EmployeeId,
                            item.Amount,
                            item.Balance,
                            item.IsTurnedOff,
                            item.Remarks,
                            item.PayPeriodId,
                            item.NameOnPayslip,
                            item.PPeriod,
                            item.MandatoryItem,
                            item.IsOpen,
                            item.PayslipRank,
                            item.ItemCode,
                            item.Formula,
                            item.NormalFormula,
                            item.TrackBalanceChanges,
                            item.BalanceEffect,
                            item.RoundToDigits
                        );
                    });

                    self.Payrolls(mappedData);
                    self.Payrolls.sort(function (left, right) {
                        return left.PayslipRank() == right.PayslipRank() ? 0
                            : left.PayslipRank() < right.PayslipRank() ? -1
                                : 1;
                    });
                    self.doCalc();
                    self.doCalculation();
                    self.doBalance();
                    self.doBalanceCalculation();
                    self.Navigation();
                    
                    //alert(self.F_WORKYEARS());
                    
                    /*self.F_CALCTAX('BSC', 'PAYE').then(function (result) {
                        console.log('Rockers!', result)
                    });*/
                }

            },
            error: function (err) {
                self.Message("Error Occured-Select Item, Please Reload the Page and Try Again " + err.status);
            }
        });
        
    };


    self.gettoken = function () {
        var token = $('input[name="__RequestVerificationToken"]');
        token = $(token).val();
        return token;
    };

    /*==============================Start Functions==================================*/
    self.F_BASIC =  function () {
        var bsc = parseFloat(document.getElementById('BSC').value);
        return  bsc();
    };

    self.F_LOANINT =  function (pc) {
        var emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        var ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/LoanInterest/" + ppd + "/" + emp_id + "/" + pc,
            success: function (data) {
                self.loanInterest(data);
            },
            error: function (err) {
                self.Message("Error Occured-LoanInterest, Please Try Again " + err.status);
            }
        });

        return self.loanInterest();
    };

    self.F_LOANPRINC =  function (pc) {
        var emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        var ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/LoanPrincipal/" + ppd + "/" + emp_id + "/" + pc,
            success: function (data) {
                self.loanPrincipal(data);
            },
            error: function (err) {
                self.Message("Error Occured-LoanPrincipal, Please Try Again " + err.status);
            }
        });

        return self.loanPrincipal();
    };

    self.F_LOANRECOV = function (pc) {
        var emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        var ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/LoanRecovery/" + ppd + "/" + emp_id + "/" + pc,
            success: function (data) {
                self.loanRecovery(data);
            },
            error: function (err) {
                self.Message("Error Occured-LoanRecovery, Please Try Again " + err.status);
            }
        });

        return  self.loanRecovery();
    };

    self.F_LOANBAL = function (lt) {
        var emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        var ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        var loanType = parseInt(lt);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/LoanBalance/" + ppd + "/" + emp_id + "/" + loanType,
           
            success: function (data) {
                self.loanBalance(data);
            },
            error: function (err) {
                self.Message("Error Occured-LoanBalance, Please Try Again " + err.status);
            }
        });

        return  self.loanBalance();
    };

    self.F_ID_HIERARCHY =  function (l) {
        var emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        var ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/HierarchyId/" + l + "/" + emp_id,
           
            success: function (data) {
                self.h_hid(data);
            },
            error: function (err) {
                self.Message("Error Occured-HIERARCHY_ID, Please Try Again " + err.status);
            }
        });

        return self.h_hid();
    };

    self.incr_num=function (x) {
        var lastdigit = Number(x.charAt(x.length - 1));
        if (lastdigit != 9) return (x.substring(0, x.length - 1)) + "" + (lastdigit + 1);
        if (x == "9") return "10";
        return incr_num(x.substring(0, x.length - 1)) + "0";
    };

    self.F_WORKYEARS =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/YearsWorked/" + emp_id,
           
            success: function (data) {
                self.years_worked(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_YEARS WORKED, Please Try Again " + err.status);
            }
        });

        return SchemeNumber(self.years_worked()).toPrecision(6);
        
    };

    self.F_CUTOFFDAYS =  function (d,t) {
        var emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        var ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        var d_ = d.replace(new RegExp('/', 'g'), '-');
        
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/CutOffDays/" + emp_id +"/"+ ppd + "/" + d_ + "/" + t,
           
            success: function (data) {
                self.c_off(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_CUTOFFDAYS WORKED, Please Try Again " + err.status);
            }
        });

        return  self.c_off();
    };

    self.F_CUTOFFDAYSWRKD =  function (d, t) {
        var emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        var ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        var d_ = d.replace(new RegExp('/', 'g'), '-');
        //alert(d_);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/CutOffDaysWorked/" + emp_id + "/" + ppd + "/" + d_ + "/" + t,
           
            success: function (data) {
                self.c_off_days(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_CUTOFFDAYS WORKED, Please Try Again " + err.status);
            }
        });

        return self.c_off_days();
    };

    self.F_WORKPER =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/PeriodsWorkedToDate/" + emp_id,
           
            success: function (data) {
                self.periods_worked_to_date(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_PERIODS WORKED TO DATE, Please Try Again " + err.status);
            }
        });

        return  self.periods_worked_to_date();
    };

    self.F_SCALEAMT =  function (p) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/ScaleAmount/" + emp_id + "/" + p,
           
            success: function (data) {
                self.scale_amount(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_SCALEAMT, Please Try Again " + err.status);
            }
        });

        return  self.scale_amount();
    };

    self.F_VARCAT =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/VarCat/" + emp_id+"/"+ppd,
           
            success: function (data) {
                self.varcat(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_VARCAT, Please Try Again " + err.status);
            }
        });

        return  self.varcat();
    };
    self.F_WORKPERINYR =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtInitialPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/PeriodsWorked/" + emp_id+"/"+ppd,
           
            success: function (data) {
                self.periods_worked(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_PERIODS WORKED, Please Try Again " + err.status);
            }
        });

        return  self.periods_worked();
    };
    self.F_BALAMT =  function (p) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/GetBalance/" + p + "/" + emp_id + "/" + ppd,
           
            success: function (data) {
                self.bal(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_BALAMT, Please Try Again " + err.status);
            }
        });
        return self.bal();
    };

    self.F_CALCTAX =function (p,v) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        val = 0.00;
        dc = document.getElementById(p);

        if (dc == null) {
            val = p;
        }
        else {
            val = parseFloat(document.getElementById(p).value);
        }
       
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/CalcTax/" + val + "/" + v + "/" + emp_id,
           
            success: function (data) {
                self.tax(data);
                                
            },
            error: function (err) {
                self.Message("Error Occured-F_CALCTAX, Please Try Again " + err.status);
            }
        });
        
        return self.tax();
    };

    
    self.F_CALCTAX_ =  function (p,e, v) {
        
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/CalcTax/" + p + "/" + v + "/" + e,

            success: function (data) {
                self.tax(data);

            },
            error: function (err) {
                self.Message("Error Occured-F_CALCTAX_, Please Try Again " + err.status);
            }
        });
        return  self.tax();
    };
     
    self.F_DEP_CHILD =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/DepChild/" + emp_id,
           
            success: function (data) {
                self.dep(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_DEP_CHILD, Please Try Again " + err.status);
            }
        });

        return self.dep();
    };
        
    self.F_DEP_SPOUSE =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/DepSpouse/" + emp_id,
           
            success: function (data) {
                self.spouse(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_DEP_SPOUSE, Please Try Again " + err.status);
            }
        });
        return self.spouse();
    };

    self.F_DISABLED =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/Disabled/" + emp_id,
            success: function (data) {
                self.dis(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_DISABLED, Please Try Again " + err.status);
            }
        });
        return self.dis();
    };

    self.F_EXCHRATE =  function (c) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/ExchRate/" + c + "/" + ppd,
           
            success: function (data) {
                self.rate(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_EXCHRATE, Please Try Again " + err.status);
            }
        });
        return self.rate();
    };

    self.F_ID_CURR =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/Currency/" + emp_id,
           
            success: function (data) {
                self.curr(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_CURR, Please Try Again " + err.status);
            }
        });

        return self.curr();
    };

    self.F_ID_GRADE =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/JobGradeId/" + emp_id,
           
            success: function (data) {
                self.job_grade_id(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_ID_GRADE, Please Try Again " + err.status);
            }
        });
        return self.job_grade_id();
    };

    self.F_ID_JOB =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/JobId/" + emp_id,
           
            success: function (data) {
                self.job_id(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_ID_JOB, Please Try Again " + err.status);
            }
        });
        return self.job_id();
    };

    self.F_ID_LOCTN =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/LocationId/" + emp_id,
           
            success: function (data) {
                self.loc_id(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_ID_LOCTN, Please Try Again " + err.status);
            }
        });
        return self.loc_id();
    };

    self.F_ID_PAYGRP =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/PayrollGroupId/" + emp_id,
           
            success: function (data) {
                self.pg_id(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_ID_PAYGRP, Please Try Again " + err.status);
            }
        });
        return self.pg_id();
    };

    self.F_INT =  function (p) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/Int/" + p + "/" + emp_id + "/" + ppd,
            success: function (data) {
                self.int(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_INT, Please Try Again " + err.status);
            }
        });
        return self.int();
    };

    self.F_YEARDAYS =  function (c_type) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/YearDays/" + emp_id + "/" + ppd + "/" + c_type,
           
            success: function (data) {
                self.year_days(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_YEARDAYS, Please Try Again " + err.status);
            }
        });
        return self.year_days();
    };

    self.F_YEARDAYSWRKD =  function (c_type) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/YearDaysWorked/" + emp_id + "/" + ppd + "/" + c_type,
           
            success: function (data) {
                self.year_days_worked(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_YEARDAYSWRKD, Please Try Again " + err.status);
            }
        });
        return self.year_days_worked();
    };

    self.F_MTHDAYS =  function (c_type) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/MthDays/" + emp_id +"/" + ppd + "/" + c_type,
           
            success: function (data) {
                self.mth_days(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_MTHDAYS, Please Try Again " + err.status);
            }
        });
        return self.mth_days();
    };
    
    self.F_PRORATE =  function (pc, c_type) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/Prorate/" + emp_id + "/" + ppd + "/" + c_type+"/"+pc,
           
            success: function (data) {
                self.prorate(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_PRORATE, Please Try Again " + err.status);
            }
        });
        return self.prorate();
    };
    self.F_MTHDAYSWRKD =  function (c_type) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/DaysWorked/" + emp_id + "/" + ppd + "/" + c_type,
           
            success: function (data) {
                self.mth_days(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_MTHDAYS, Please Try Again " + err.status);
            }
        });
        return self.mth_days();
    };

    self.F_MONTH =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/Month/" + ppd,
           
            success: function (data) {
                self.month(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_MONTH, Please Try Again " + err.status);
            }
        });
        return parseInt(self.month());
    };

    self.F_PREVAMT =  function (p) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/Amount/" + p + "/" + emp_id + "/" + ppd,
           
            success: function (data) {
                self.prev_amt(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_PREVAMT, Please Try Again " + err.status);
            }
        });
        return self.prev_amt();
    };

    self.F_PREVBAL =  function (p) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/BalAmt/" + p + "/" + emp_id + "/" + ppd,
           
            success: function (data) {
                self.prev_bal(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_PREVBAL, Please Try Again " + err.status);
            }
        });
        return self.prev_bal();
    };

    self.F_ROUND =  function (p,prec) {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);
        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/Round/" + p + "/" + prec + "/" + emp_id + "/" + ppd,
           
            success: function (data) {
                self.rnd(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_ROUND, Please Try Again " + err.status);
            }
        });
        return self.rnd();
    };

    self.F_YEAR =  function () {
        emp_id = parseInt(document.getElementById('txtEmployeeId').value);
        ppd = parseInt(document.getElementById('txtCurrentPeriod').value);

        $.ajax({
            type: "GET",
            url: "/api/FunctionsApi/Year/" + ppd,
           
            success: function (data) {
                self.year(data);
            },
            error: function (err) {
                self.Message("Error Occured-F_YEAR, Please Try Again " + err.status);
            }
        });
        return parseInt(self.year());
    };

/*==
/*==============================End Functions==================================*/
};


