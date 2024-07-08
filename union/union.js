var mapleid = document.getElementById('mapleid');
var mapleid_ul = document.getElementById('mapleid_ul');
var id_dropdown = document.getElementById('id_dropdown');
var account_num = 0;
var data2;
// const data = new Array();
let num = new Array();
let character_type = new Array();
let position = new Array();
let position_name = new Array();
let character_class = new Array();
let character_level = new Array();
let character_name = new Array();
let ocid = new Array();
let world_name = new Array();



let world_list = new Array()
// let union_table = new DataTable()
$(document).ready(function () {
    create_table("")

    $('#union_table').on('click', 'tbody tr', function () {
        var click_data = union_table.row(this).data()
        // console.log(click_data);
        console.log(click_data[5])
        alert(click_data[6])
    });
})

// 로드 버튼 클릭 > api call
document.getElementById('load_button').onclick = function load_api_data() {
    $.ajax({
        url: 'https://open.api.nexon.com/maplestory/v1/character/list',
        dataType: "json",
        beforeSend: function (xhr) {
            var apikey = document.getElementById('apikey').value;
            xhr.setRequestHeader("accept", "application/json")
            xhr.setRequestHeader("x-nxopen-api-key", apikey)
        }, success: function (response_data) {
            // set_dropdown();
            create_table(response_data["account_list"][0]["character_list"])
        }
    })
}

// create data table
function create_table(api_data) {
    $.ajax({
        url: "../data/type_list.json",
        dataSrc: "data",
        dataType: "json",
        success: function (data) {
            var json_data = data['data']
            let union_list = new Array()

            for (j = 0; j < api_data.length; j++) {
                if (!world_list.includes(api_data[j]["world_name"])) {
                    world_list.push(api_data[j]["world_name"])
                }
            }

            // console.log(world_list)
            var world_union_list = new Array()
            var world_length = world_list.length < 1 ? 1 : world_list.length

            // 월드별
            for (i = 0; i < world_length; i++) {
                // 직업별
                for (j = 0; j < json_data.length; j++) {
                    var character_level = ""
                    var character_name = ""
                    var character_ocid = ""

                    // 직업별 목록에 api data 입력
                    for (k = 0; k < api_data.length; k++) {
                        if (world_list[i] === api_data[k]["world_name"]
                            && json_data[j].name === api_data[k]["character_class"]) {
                            character_level = api_data[k]["character_level"]
                            character_name = api_data[k]["character_name"]
                            character_ocid = api_data[k]["ocid"]
                            // console.log(api_data[k]["world_name"])
                        }
                    }
                    union_list.push([
                        json_data[j].num,
                        json_data[j].type,
                        json_data[j].position,
                        json_data[j].name,
                        character_level,
                        character_name,
                        character_ocid
                    ])
                }
                // console.log(union_list)
                world_union_list.push(union_list)
                union_list = []
            }
            union_list = world_union_list[0]
            // console.log(world_union_list)
            // console.log(union_list)

            union_table = new DataTable("#union_table", {
                data: union_list,
                pageLength: 50,
                searching: true,
                destroy: true
            })
        }
    })
}

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