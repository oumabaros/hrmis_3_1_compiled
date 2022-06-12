

var ParamsViewModel = function () {
    var self = this;
    self.Params = ko.observableArray([]);
    self.Message = ko.observable();

    self.Id = ko.observable();
    self.PayrollCodeId = ko.observable();
    self.EmployeeId = ko.observable();
    self.Amount = ko.observable();
    self.Balance = ko.observable();
    self.IsTurnedOff = ko.observable();
    self.Remarks = ko.observable();
    self.PayPeriodId = ko.observable();
    self.NameOnPayslip = ko.observable();
    self.PPeriod = ko.observable();
    self.MandatoryItem = ko.observable(true);

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
    };

}
var pvm = new ParamsViewModel();
//vm.loadPayroll();
ko.applyBindings(pvm);