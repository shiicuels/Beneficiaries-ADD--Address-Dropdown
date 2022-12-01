function EnableDisableTextBox(use_permanent_address){
    var present_address_line_one = document.getElementById("present_address_line_one");
    var present_address_line_two = document.getElementById("present_address_line_two");
    var present_region = document.getElementById("present_region");
    var present_province = document.getElementById("present_province");
    var present_city = document.getElementById("present_city");
    var present_barangay = document.getElementById("present_barangay");
    var present_postal_code = document.getElementById("present_postal_code");

    present_address_line_one.disabled = use_permanent_address.checked ? true : false,
    present_address_line_one.value = '';

    present_address_line_two.disabled = use_permanent_address.checked ? true : false,
    present_address_line_two.value = '';

    present_region.disabled = use_permanent_address.checked ? true : false,
    present_region.value = '';

    present_province.disabled = use_permanent_address.checked ? true : false,
    present_province.value = '';

    present_city.disabled = use_permanent_address.checked ? true : false,
    present_city.value = '';

    present_barangay.disabled = use_permanent_address.checked ? true : false,
    present_barangay.value = '';

    present_postal_code.disabled = use_permanent_address.checked ? true : false,
    present_postal_code.value = '';

}
function EnableDisableTextBox2(no_provincial_address){
    var provincial_address_line_one = document.getElementById("provincial_address_line_one");
    var provincial_address_line_two = document.getElementById("provincial_address_line_two");
    var provincial_region = document.getElementById("provincial_region");
    var provincial_province = document.getElementById("provincial_province");
    var provincial_city = document.getElementById("provincial_city");
    var provincial_barangay = document.getElementById("provincial_barangay");
    var provincial_postal_code = document.getElementById("provincial_postal_code");

    provincial_address_line_one.disabled = no_provincial_address.checked ? true : false,
    provincial_address_line_one.value = '';

    provincial_address_line_two.disabled = no_provincial_address.checked ? true : false,
    provincial_address_line_two.value = '';

    provincial_region.disabled = no_provincial_address.checked ? true : false,
    provincial_region.value = '';

    provincial_province.disabled = no_provincial_address.checked ? true : false,
    provincial_province.value = '';

    provincial_city.disabled = no_provincial_address.checked ? true : false,
    provincial_city.value = '';

    provincial_barangay.disabled = no_provincial_address.checked ? true : false,
    provincial_barangay.value = '';

    provincial_postal_code.disabled = no_provincial_address.checked ? true : false,
    provincial_postal_code.value = '';
}

// ----------------------[PERMANENT ADDRESS START]----------------------

getAllPermanentRegion();

$('#permanent_region').on('change', function(){

    //GET [Region] NAME
    var selected_region = $("#permanent_region option:selected").text();

    //SAVE it to the HIDDEN input
    $('input[name=permanent_region]').val(selected_region).text();

    //SEND [Region] CODE as parameter
    var region_code = $(this).val();

    //CALL the function that depends to the Code
    getAllPermanentProvince(region_code);
    getAllPermanentCity(region_code);

    //EMPTY the fields that do not depend
    $('#permanent_barangay').empty();
    $('#permanent_barangay').append('<option value="" Selected Disabled>Select Barangay</option>');
});

$('#permanent_province').on('change', function(){

    var selected_province = $("#permanent_province option:selected").text();
    $('input[name=permanent_province]').val(selected_province).text();

});

$('#permanent_city').on('change', function(){

    var selected_city = $("#permanent_city option:selected").text();
    $('input[name=permanent_city]').val(selected_city).text();
    var city_code = $(this).val();
    getAllPermanentBarangay(city_code);

});

$('#permanent_barangay').on('change', function(){

    var selected_barangay = $("#permanent_barangay option:selected").text();
    $('input[name=permanent_barangay]').val(selected_barangay).text();

});

function getAllPermanentRegion() {
    $.ajax({
        type: 'get',
        url: 'https://psgc.gitlab.io/api/regions',
        success: function(data) {

            //PARSING for foreach loop
            data = JSON.parse(data);

            //SORT data
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            //LOOP to display in dropdown
            data.forEach(element => {
                $('#permanent_region').append('<option value="'+element.code+'">'+element.name+'</option>');
            });

        },
    })
}

function getAllPermanentProvince(region_code) {
    $.ajax({
        type: 'get',
        url: 'https://psgc.gitlab.io/api/regions/'+region_code+'/provinces',
        success: function(data) {

            //CLEAR result from previous selected
            $('#permanent_province').empty();

            data = JSON.parse(data);
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            //RESELECT so must clear the input
            $('#permanent_province').append('<option value="" Selected Disabled>Select Province</option>');

            //ADDING [Metro Manila] as a result
            if(region_code==130000000){ $('#permanent_province').append('<option value="Metro Manila">Metro Manila</option>'); }
            else
            {
                data.forEach(element => {
                    $('#permanent_province').append('<option value="'+element.code+'">'+element.name+'</option>');
                });
            }
        },
    })
}

function getAllPermanentCity(region_code) {
    $.ajax({
        type: 'get',
        url:  'https://psgc.gitlab.io/api/regions/'+region_code+'/cities-municipalities',
        success: function(data) {

            //CLEAR result from previous selected
            $('#permanent_city').empty();

            data = JSON.parse(data);
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            //RESELECT so must clear the input
            $('#permanent_city').append('<option value="" Selected Disabled>Select City</option>');

            data.forEach(element => {
                $('#permanent_city').append('<option value="'+element.code+'">'+element.name+'</option>');
            });
        },
    })
}

function getAllPermanentBarangay(city_or_municipality_code) {
    $.ajax({
        type: 'get',
        url:  'https://psgc.gitlab.io/api/cities-municipalities/'+city_or_municipality_code+'/barangays',
        success: function(data) {

            $('#permanent_barangay').empty();
            data = JSON.parse(data);
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });


            data.forEach(element => {
                $('#permanent_barangay').append('<option value="'+element.code+'">'+element.name+'</option>');
            });
        },
    })
}

// -----------------------[PERMANENT ADDRESS END]-----------------------

// -----------------------[PRESENT ADDRESS START]-----------------------

getAllPresentRegion();

$('#present_region').on('change', function(){

    //GET [Region] NAME
    var selected_region = $("#present_region option:selected").text();

    //SAVE it to the HIDDEN input
    $('input[name=present_region]').val(selected_region).text();

    //SEND [Region] CODE as parameter
    var region_code = $(this).val();

    //CALL the function that depends to the Code
    getAllPresentProvince(region_code);
    getAllPresentCity(region_code);

    //EMPTY the fields that do not depend
    $('#present_barangay').empty();
    $('#present_barangay').append('<option value="" Selected Disabled>Select Barangay</option>');
});

$('#present_province').on('change', function(){

    var selected_province = $("#present_province option:selected").text();
    $('input[name=present_province]').val(selected_province).text();

});

$('#present_city').on('change', function(){

    var selected_city = $("#present_city option:selected").text();
    $('input[name=present_city]').val(selected_city).text();
    var city_code = $(this).val();
    getAllPresentBarangay(city_code);

});

$('#present_barangay').on('change', function(){

    var selected_barangay = $("#present_barangay option:selected").text();
    $('input[name=present_barangay]').val(selected_barangay).text();

});

function getAllPresentRegion() {
    $.ajax({
        type: 'get',
        url: 'https://psgc.gitlab.io/api/regions',
        success: function(data) {

            //PARSING for foreach loop
            data = JSON.parse(data);

            //SORT data
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            //LOOP to display in dropdown
            data.forEach(element => {
                $('#present_region').append('<option value="'+element.code+'">'+element.name+'</option>');
            });

        },
    })
}

function getAllPresentProvince(region_code) {
    $.ajax({
        type: 'get',
        url: 'https://psgc.gitlab.io/api/regions/'+region_code+'/provinces',
        success: function(data) {

            //CLEAR result from previous selected
            $('#present_province').empty();

            data = JSON.parse(data);
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            //RESELECT so must clear the input
            $('#present_province').append('<option value="" Selected Disabled>Select Province</option>');

            //ADDING [Metro Manila] as a result
            if(region_code==130000000){ $('#present_province').append('<option value="Metro Manila">Metro Manila</option>'); }
            else
            {
                data.forEach(element => {
                    $('#present_province').append('<option value="'+element.code+'">'+element.name+'</option>');
                });
            }
        },
    })
}

function getAllPresentCity(region_code) {
    $.ajax({
        type: 'get',
        url:  'https://psgc.gitlab.io/api/regions/'+region_code+'/cities-municipalities',
        success: function(data) {

            //CLEAR result from previous selected
            $('#present_city').empty();

            data = JSON.parse(data);
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            //RESELECT so must clear the input
            $('#present_city').append('<option value="" Selected Disabled>Select City</option>');

            data.forEach(element => {
                $('#present_city').append('<option value="'+element.code+'">'+element.name+'</option>');
            });
        },
    })
}

function getAllPresentBarangay(city_or_municipality_code) {
    $.ajax({
        type: 'get',
        url:  'https://psgc.gitlab.io/api/cities-municipalities/'+city_or_municipality_code+'/barangays',
        success: function(data) {

            $('#present_barangay').empty();
            data = JSON.parse(data);
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            data.forEach(element => {
                $('#present_barangay').append('<option value="'+element.code+'">'+element.name+'</option>');
            });
        },
    })
}

// ------------------------[PRESENT ADDRESS END]------------------------

// ----------------------[PROVINCIAL ADDRESS START]---------------------

getAllProvincialRegion();

$('#provincial_region').on('change', function(){

    //GET [Region] NAME
    var selected_region = $("#provincial_region option:selected").text();

    //SAVE it to the HIDDEN input
    $('input[name=provincial_region]').val(selected_region).text();

    //SEND [Region] CODE as parameter
    var region_code = $(this).val();

    //CALL the function that depends to the Code
    getAllProvincialProvince(region_code);
    getAllProvincialCity(region_code);

    //EMPTY the fields that do not depend
    $('#provincial_barangay').empty();
    $('#provincial_barangay').append('<option value="" Selected Disabled>Select Barangay</option>');
});

$('#provincial_province').on('change', function(){

    var selected_province = $("#provincial_province option:selected").text();
    $('input[name=provincial_province]').val(selected_province).text();

});

$('#provincial_city').on('change', function(){

    var selected_city = $("#provincial_city option:selected").text();
    $('input[name=provincial_city]').val(selected_city).text();
    var city_code = $(this).val();
    getAllProvincialBarangay(city_code);

});

$('#provincial_barangay').on('change', function(){

    var selected_barangay = $("#provincial_barangay option:selected").text();
    $('input[name=provincial_barangay]').val(selected_barangay).text();

});

function getAllProvincialRegion() {
    $.ajax({
        type: 'get',
        url: 'https://psgc.gitlab.io/api/regions',
        success: function(data) {

            //PARSING for foreach loop
            data = JSON.parse(data);

            //SORT data
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            //LOOP to display in dropdown
            data.forEach(element => {
                $('#provincial_region').append('<option value="'+element.code+'">'+element.name+'</option>');
            });

        },
    })
}

function getAllProvincialProvince(region_code) {
    $.ajax({
        type: 'get',
        url: 'https://psgc.gitlab.io/api/regions/'+region_code+'/provinces',
        success: function(data) {

            //CLEAR result from previous selected
            $('#provincial_province').empty();

            data = JSON.parse(data);
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            //RESELECT so must clear the input
            $('#provincial_province').append('<option value="" Selected Disabled>Select Province</option>');

            //ADDING [Metro Manila] as a result
            if(region_code==130000000){ $('#provincial_province').append('<option value="Metro Manila">Metro Manila</option>'); }
            else
            {
                data.forEach(element => {
                    $('#provincial_province').append('<option value="'+element.code+'">'+element.name+'</option>');
                });
            }
        },
    })
}

function getAllProvincialCity(region_code) {
    $.ajax({
        type: 'get',
        url:  'https://psgc.gitlab.io/api/regions/'+region_code+'/cities-municipalities',
        success: function(data) {

            //CLEAR result from previous selected
            $('#provincial_city').empty();

            data = JSON.parse(data);
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            //RESELECT so must clear the input
            $('#provincial_city').append('<option value="" Selected Disabled>Select City</option>');

            data.forEach(element => {
                $('#provincial_city').append('<option value="'+element.code+'">'+element.name+'</option>');
            });
        },
    })
}

function getAllProvincialBarangay(city_or_municipality_code) {
    $.ajax({
        type: 'get',
        url:  'https://psgc.gitlab.io/api/cities-municipalities/'+city_or_municipality_code+'/barangays',
        success: function(data) {

            $('#provincial_barangay').empty();
            data = JSON.parse(data);
            data.sort(function(a,b){ return a.name.localeCompare(b.name); });

            data.forEach(element => {
                $('#provincial_barangay').append('<option value="'+element.code+'">'+element.name+'</option>');
            });
        },
    })
}

// -----------------------[PROVINCIAL ADDRESS END]----------------------
