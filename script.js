var data_load = document.getElementById('data_load');
var mytable = document.getElementById('mytable');
var mapleid = document.getElementById('mapleid');
var mapleid_ul = document.getElementById('mapleid_ul');
var id_dropdown = document.getElementById('id_dropdown');
var account_num = 0;
var data;

$(document).ready(function () {
    $(data_load).click(function () {
        account_num = 0;
        // mapleid_ul.removeChild();
        mapleid_ul.innerHTML = '';
        $.ajax({
            url: 'https://open.api.nexon.com/maplestory/v1/character/list',
            dataType: "json",
            beforeSend: function (xhr) {
                var apikey = document.getElementById('apikey').value;
                xhr.setRequestHeader("accept", "application/json")
                xhr.setRequestHeader("x-nxopen-api-key", apikey)
            }, success: function (datas) {
                data = datas;
                account_num = datas['account_list'].length;
                // console.log(account_num);

                var json = datas['account_list'][0]['character_list'];
                let character_class = new Array();
                let character_level = new Array();
                let character_name = new Array();
                let ocid = new Array();
                let world_name = new Array();
                for (i = 0; i < json.length; i++) {
                    character_class[i] = json[i].character_class;
                    character_level[i] = json[i].character_level;
                    character_name[i] = json[i].character_name;
                    ocid[i] = json[i].ocid;
                    world_name[i] = json[i].world_name;
                }

                set_dropdown();
                create_table(0);
            }
        })
    })
})

function set_dropdown() {
    id_dropdown.removeAttribute("disabled");
    var i;
    // console.log(account_num);

    for (i = 0; i < account_num; i++) {
        // console.log(i + 1 + "번");
        let add_li = document.createElement("li");
        let add_a = document.createElement("a");
        add_a.setAttribute("class", "dropdown-item");
        add_a.setAttribute("onclick", "create_table(" + i + ")");
        add_a.appendChild(document.createTextNode(i + 1 + "번"))
        add_li.appendChild(add_a);

        mapleid_ul.appendChild(add_li);
    }
}

function create_table(account_num) {
    let table = new DataTable("#mytable", {
        data: data['account_list'][account_num]['character_list'],
        pageLength: 25,
        searching: true,
        destroy: true,
        columns: [
            // {
            //     render: function (data, type, row, meta) {
            //         return meta.row + meta.settings._iDisplayStart + 1;
            //     }
            // },
            { "data": "world_name" },
            { "data": "character_level" },
            { "data": "character_class" },
            { "data": "character_name" },
            { "data": "ocid" }
        ]
    })

    table.on('click', 'tbody tr', function () {
        let data = table.row(this).data();
        alert('You clicked on ' + data["ocid"] + "'s row");
    });
}