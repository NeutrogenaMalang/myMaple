var data_load = document.getElementById('data_load');
var mytable = document.getElementById('mytable');
var mapleid = document.getElementById('mapleid');
var mapleid_ul = document.getElementById('mapleid_ul');
var id_dropdown = document.getElementById('id_dropdown');
var account_num = 0;
var data2;
const data = new Array();
let num = new Array();
let character_type = new Array();
let position = new Array();
let position_name = new Array();
let character_class = new Array();
let character_level = new Array();
let character_name = new Array();
let ocid = new Array();
let world_name = new Array();

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
                // console.log(datas);

                // data = datas;
                data2 = datas;
                account_num = datas['account_list'].length;

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
    $.ajax({
        url: './type_list.json',
        dataSrc: "data",
        dataType: "json",
        success: function (characters) {

            num.length = 0;
            character_type.length = 0;
            position.length = 0;
            position_name.length = 0;
            character_class.length = 0;
            character_level.length = 0;
            character_name.length = 0;
            ocid.length = 0;
            world_name.length = 0;
            data.length = 0;

            character_num = characters.length;
            var character_table = characters['data'];
            // console.log(data2);
            var json = data2['account_list'][account_num]['character_list'];

            for (i = 0; i < json.length; i++) {
                character_class[i] = json[i].character_class;
                character_level[i] = json[i].character_level;
                character_name[i] = json[i].character_name;
                ocid[i] = json[i].ocid;
                world_name[i] = json[i].world_name;
            }
            for (i = 0; i < character_table.length; i++) {
                num[i] = character_table[i].num;
                character_type[i] = character_table[i].type;
                position[i] = character_table[i].position;
                position_name[i] = character_table[i].name;

                var flag = false;

                for (j = 0; j < json.length; j++) {
                    if (position_name[i] === character_class[j]) {
                        data.push([
                            num[i],
                            character_type[i],
                            position[i],
                            position_name[i],
                            world_name[j],
                            character_level[j],
                            character_name[j],
                            ocid[j]
                        ]);
                        flag = true;
                    }
                }
                if (flag === false) {
                    data.push([
                        num[i],
                        character_type[i],
                        position[i],
                        position_name[i],
                        "",
                        "",
                        "",
                        ""
                    ]);
                }
            }
            let table2 = new DataTable("#mytable", {
                data: data,
                pageLength: 25,
                searching: true,
                destroy: true
            })
            table2.on('click', 'tbody tr', function () {
                let data = table2.row(this).data();
                // console.log(data[7]);
                alert('You clicked on ' + data[7] + "'s row");
            });
        }
    })
    // let table = new DataTable("#mytable", {
    //     data: data['account_list'][account_num]['character_list'],
    //     pageLength: 25,
    //     searching: true,
    //     destroy: true,
    //     columns: [
    //         // { "data": "type" },
    //         // {
    //         //     render: function (data, type, row, meta) {
    //         //         return meta.row + meta.settings._iDisplayStart + 1;
    //         //     }
    //         // },
    //         { "data": "world_name" },
    //         { "data": "character_level" },
    //         { "data": "character_class" },
    //         { "data": "character_name" },
    //         { "data": "ocid" }
    //     ]
    // })


}