function GetCountryOffice() {

    var e = document.getElementById('Hierarchy');
    var pid = e.options[e.selectedIndex].value;
    document.getElementById('HS').value = pid;
    var label = document.createElement("label");
    document.getElementById('CountryOfficeLabel').innerHTML = "";
    document.getElementById('CountryOfficeWrapper').innerHTML = "";
    $.ajax({
        type: "GET",
        url: "/api/HierarchyStructuresApi/GetChildren/" + pid,
        async: false,
        success: function (data) {


            if (Object.keys(data).length > 0) {

                var select = document.createElement("select");
                select.name = "CountryOffice";
                select.id = "CountryOffice"
                select.setAttribute('onchange', 'GetDepartment()');
                var option_ = document.createElement("option");
                option_.text = "Select Country Office";
                select.appendChild(option_);
                keys = Object.keys(data);
                keys.forEach(key => {
                    var option = document.createElement("option");
                    option.value = data[key]["Id"];
                    option.text = data[key]["LevelName"];
                    label.innerHTML = GetHierarchyName(data[key]["HierarchyId"]);
                    select.appendChild(option);
                });


                label.htmlFor = "CountryOffice";

                document.getElementById("CountryOfficeLabel").appendChild(label);
                document.getElementById("CountryOfficeWrapper").appendChild(select);

            }
            else {
                alert('No More Records Found');
            }
        },
        error: function (err) {

        }
    });
}

function GetDepartment() {
    var e = document.getElementById("CountryOffice");
    var pid = parseInt(e.options[e.selectedIndex].value);
    var label = document.createElement("label");
    document.getElementById('CO').value = pid;
    document.getElementById('DepartmentLabel').innerHTML = "";
    document.getElementById('DepartmentWrapper').innerHTML = "";
    $.ajax({
        type: "GET",
        url: "/api/HierarchyStructuresApi/GetChildren/" + pid,
        async: false,
        success: function (data) {
            if (Object.keys(data).length > 0) {
                var select = document.createElement("select");
                var option_ = document.createElement("option");
                option_.text = "Select Department";
                select.appendChild(option_);
                select.setAttribute('onchange', 'GetUnit()');
                select.name = "Department";
                select.id = "Department"
                keys = Object.keys(data);
                keys.forEach(key => {
                    var option = document.createElement("option");
                    option.value = data[key]["Id"];
                    option.text = data[key]["LevelName"];
                    label.innerHTML = GetHierarchyName(data[key]["HierarchyId"]);
                    select.appendChild(option);
                });


                label.htmlFor = "Department";

                document.getElementById("DepartmentLabel").appendChild(label);
                document.getElementById("DepartmentWrapper").appendChild(select);

            }
            else {
                alert('No More Records Found');
            }
        },
        error: function (err) {

        }
    });
}

function GetUnit() {
    var e = document.getElementById('Department');
    var pid = e.options[e.selectedIndex].value;
    var label = document.createElement("label");
    document.getElementById('DEPT').value = pid;
    document.getElementById('UnitLabel').innerHTML = "";
    document.getElementById('UnitWrapper').innerHTML = "";
    $.ajax({
        type: "GET",
        url: "/api/HierarchyStructuresApi/GetChildren/" + pid,
        async: false,
        success: function (data) {
            if (Object.keys(data).length > 0) {
                var select = document.createElement("select");
                var option_ = document.createElement("option");
                option_.text = "Select Unit";
                select.appendChild(option_);
                select.setAttribute('onchange', 'GetFinalUnit()');
                select.name = "Unit";
                select.id = "Unit"
                keys = Object.keys(data);
                keys.forEach(key => {
                    var option = document.createElement("option");
                    option.value = data[key]["Id"];
                    option.text = data[key]["LevelName"];
                    label.innerHTML = GetHierarchyName(data[key]["HierarchyId"]);
                    select.appendChild(option);
                });


                label.htmlFor = "Unit";

                document.getElementById("UnitLabel").appendChild(label);
                document.getElementById("UnitWrapper").appendChild(select);

            }
            else {
                alert('No More Records Found');
            }
        },
        error: function (err) {

        }
    });
}

function GetFinalUnit() {
    var e = document.getElementById('Unit');
    var pid = e.options[e.selectedIndex].value;
    document.getElementById('UT').value = pid;
    alert('No More Records Found');
}

function GetHierarchyName(hid) {
    var LevelName = "";
    $.ajax({
        type: "GET",
        url: "/api/HierarchyStructuresApi/GetHierarchyName/" + hid,
        async: false,
        success: function (data) {
            if (Object.keys(data).length > 0) {
                /*keys.forEach(key => {
                    LevelName = data[key]["LevelName"];
                });*/
                LevelName = data;
            }
            else {
                alert('No More Records Found');
            }
        },
        error: function (err) {

        }
    });

    return LevelName;
}