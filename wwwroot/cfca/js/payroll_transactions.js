var ViewModel = function () {
    var self = this;

    self.Id = ko.observable();
    self.EmployeeId = ko.observable();
    self.PayrollCodeId = ko.observable();
    self.Description = ko.observable();
    self.Amount = ko.observable();
    self.Balance = ko.observable();
    self.IsTurnedOff = ko.observable();
    self.Remarks = ko.observable();
    self.PayPeriodId = ko.observable();

    var TransUri = '/api/GetPayrollTransaction/';

    function ajaxFunction(uri, method, data) {
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null
        }).fail(function (jqXHR, textStatus, errorThrown) {
            alert('Error: ' + errorThrown);
        });
    }

    self.clearFields = function () {
        self.Mutated.removeAll();
    }

    self.addTransaction = function () {

        var TransObject = {
            Id:self.observable(),
            EmployeeId : self.EmployeeId(),
            PayrollCodeId: self.PayrollCodeId(),
            Description:self.Description(),
            Amount: self.Amount(),
            Balance: self.Balance(),
            IsTurnedOff: self.IsTurnedOff(),
            Remarks: self.Remarks(),
            PayPeriodId:self.PayPeriodId()

            
        };

        self.Mutated.push(TransObject);
    };

    self.removeTransaction = function (trans) {
        self.Mutated.remove(trans);
    };

    self.saveAll = function saveAll() {
        for (var i = 0; i < self.Mutated().length; i++) {
            var TransObject1 = {
                Id: self.Mutated()[i].Id,
                EmployeeId: self.Mutated()[i].EmployeeId,
                PayrollCodeId: self.Mutated()[i].PayrollCodeId,
                Description: self.Mutated()[i].Description,
                Amount: self.Mutated()[i].Amount,
                Balance: self.Mutated()[i].Balance,
                IsTurnedOff: self.Mutated()[i].IsTurnedOff,
                Remarks: self.Mutated()[i].Remarks,
                PayPeriodId: self.Mutated()[i].PayPeriodId
                                
            };
            ajaxFunction(TransUri, 'POST', TransObject1).done(
                function () {
                    if (i == self.Mutated().length - 1) {
                    }
                }
            );
        }
        self.clearFields();
        alert('All Records added successfully!');
        gettransList();
    };

    self.saveUser = function saveTrans() {
        var TransObject = {
            Id: self.Mutated()[i].Id,
            EmployeeId: self.EmployeeId(),
            PayrollCodeId: self.PayrollCodeId(),
            Description: self.Description(),
            Amount: self.Amount(),
            Balance: self.Balance(),
            IsTurnedOff: self.IsTurnedOff(),
            Remarks: self.Remarks(),
            PayPeriodId: self.PayPeriodId()
        };
        ajaxFunction(TransUri, 'POST', TransObject).done(function () {
            self.clearFields();
            alert('Transaction added successfully!');
            gettransList()
        });
    }

    function gettransList() {
        $("div.loadingZone").show();
        ajaxFunction(TransUri, 'GET').done(function (data) {
            $("div.loadingZone").hide();
            self.transList(data);
        });
    }

    self.detailTrans = function (selectedTrans) {
        var TransObject = {
            Id: selectedTrans.Id,
            EmployeeId: selectedTrans.EmployeeId,
            PayrollCodeId: selectedTrans.PayrollCodeId,
            Description: selectedTrans.Description,
            Amount: selectedTrans.Amount,
            Balance: selectedTrans.Balance,
            IsTurnedOff: selectedTrans.IsTurnedOff,
            Remarks: selectedTrans.Remarks,
            PayPeriodId: selectedTrans.PayPeriodId
                       
            
        };
        self.Mutated.push(TransObject);
        $('#Save').hide();
        $('#Clear').hide();
        $('#Add').hide();
        $('#SaveAll').hide();
        $('#Update').show();
        $('#Delete').show();
        $('#Cancel').show();
    };

    self.cancel = function () {
        self.clearFields();
        $('#Save').hide();
        $('#Clear').show();
        $('#Add').show();
        $('#SaveAll').show();
        $('#Update').hide();
        $('#Delete').hide();
        $('#Cancel').hide();
    }

    self.updateTrans = function () {
        for (var i = 0; i < self.Mutated().length; i++) {
            var TransObject = {
                Id: self.Mutated()[i].Id,
                EmployeeId: self.Mutated()[i].EmployeeId,
                PayrollCodeId: self.Mutated()[i].PayrollCodeId,
                Description: self.Mutated()[i].Description,
                Amount: self.Mutated()[i].Amount,
                Balance: self.Mutated()[i].Balance,
                IsTurnedOff: self.Mutated()[i].IsTurnedOff,
                Remarks: self.Mutated()[i].Remarks,
                PayPeriodId: self.Mutated()[i].PayPeriodId
            };
            ajaxFunction(TransUri + self.Mutated()[i].TransId, 'PUT', TransObject).done(function () {
                if (i == self.Mutated().length - 1) { }
            });
        }
        alert('Some Transactions updated successfully!');
        gettransList();
        self.cancel();
    }

    self.deleteTrans = function () {
        for (var i = 0; i < self.Mutated().length; i++) {
            ajaxFunction(TransUri + self.Mutated()[i].TransId, 'DELETE').done(function () {
                if (i == self.Mutated().length - 1) { }
            })
        }
        alert('Some Transactions deleted successfully!');
        gettransList();
        self.cancel();
    }

    gettransList();
};
ko.options.deferUpdates = true;
ko.applyBindings(new ViewModel());