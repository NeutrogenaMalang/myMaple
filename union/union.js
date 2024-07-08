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


var mapleid_dropdown = document.getElementById('mapleid_dropdown')
var mapleid = document.getElementById('mapleid')
var mapleid_ul = document.getElementById('mapleid_ul')

var worldid_dropdown = document.getElementById('worldid_dropdown')
var worldid = document.getElementById('worldid')
var worldid_ul = document.getElementById('worldid_ul')

var account_num = 0
var world_length = 0
var select_world = false
var call_api_data = new Array()
let world_list = new Array()

// let union_table = new DataTable()
$(document).ready(function () {
    create_table("")

    $('#union_table').on('click', 'tbody tr', function () {
        var click_data = union_table.row(this).data()
        // console.log(click_data);
        console.log(click_data[5])
        var url = "https://maple.gg/u/" + click_data[5]
        window.open(url, "_blank")
        // alert(click_data[6])
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
            account_num = response_data["account_list"].length
            mapleid_ul.innerHTML = ""
            worldid_ul.innerHTML = ""
            call_api_data = response_data
            create_table(response_data["account_list"][0]["character_list"])
            flag = true
            select_world = true
        }
    })
}

var flag = false
// create data table
function create_table(api_data) {
    var world = 0
    if (select_world && flag) {
        // console.log(api_data)
        world = api_data
        api_data = call_api_data["account_list"][select_maple_id]["character_list"]
    }
    else if (flag) {
        // console.log(api_data)
        select_maple_id = api_data
        api_data = call_api_data["account_list"][api_data]["character_list"]
    }
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

            console.log(world_list)
            var world_union_list = new Array()
            world_length = world_list.length < 1 ? 0 : world_list.length
            console.log("월드 수: " + world_length)

            // 월드별
            for (i = 0; i < world_length + 1; i++) {
                // 직업별
                for (j = 0; j < json_data.length; j++) {
                    var character_level = ""
                    var character_name = ""
                    var character_ocid = ""

                    // 직업별 목록에 api data 입력
                    for (k = 0; k < api_data.length; k++) {
                        if (world_list[i] === api_data[k]["world_name"]
                            && (json_data[j].name === api_data[k]["character_class"]
                                || json_data[j].name[0] === api_data[k]["character_class"]
                                || json_data[j].name[1] === api_data[k]["character_class"]
                                || json_data[j].name[2] === api_data[k]["character_class"]
                                || json_data[j].name[3] === api_data[k]["character_class"]
                                || json_data[j].name[4] === api_data[k]["character_class"]
                                || json_data[j].name[5] === api_data[k]["character_class"])) {
                            character_level = api_data[k]["character_level"]
                            character_name = api_data[k]["character_name"]
                            character_ocid = api_data[k]["ocid"]
                            // console.log(api_data[k]["world_name"])
                        }
                    }
                    var type = Array.isArray(json_data[j].name) ? json_data[j].name[0] : json_data[j].name
                    union_list.push([
                        json_data[j].num,
                        json_data[j].type,
                        json_data[j].position,
                        // json_data[j].name[0],
                        type,
                        character_level,
                        character_name,
                        character_ocid
                    ])
                }
                // console.log(union_list)
                world_union_list.push(union_list)
                union_list = []
            }
            union_list = world_union_list[world]
            // console.log(world_union_list)
            console.log(union_list)

            union_table = new DataTable("#union_table", {
                data: union_list,
                pageLength: 50,
                searching: true,
                destroy: true,
                columnDefs: [
                    {
                        target: 0,
                        width: "10%",
                        className: "text-center"
                    }, {
                        target: 1,
                        width: "15%",
                        className: "text-center"
                    }, {
                        target: 2,
                        width: "10%",
                        className: "text-center"
                    }, {
                        target: 3,
                        width: "25%",
                        className: "text-center"
                    }, {
                        target: 4,
                        width: "10%",
                        className: "text-center"
                    }, {
                        target: 5,
                        width: "30%",
                        className: "text-center"
                    }, {
                        target: 6,
                        visible: false,
                        searchable: false
                    }]
            })

            mapleid_ul.innerHTML = ""
            worldid_ul.innerHTML = ""
            set_mapleid_dropdown()
            set_worldid_dropdown()
        }
    })
}

function set_mapleid_dropdown() {
    mapleid_dropdown.removeAttribute("disabled");
    var i;
    console.log(account_num);

    for (i = 0; i < account_num; i++) {
        console.log(i + 1 + "번")
        let add_li = document.createElement("li")
        let add_a = document.createElement("a")
        add_a.setAttribute("class", "dropdown-item")
        // var param = call_api_data["account_list"][i]["character_list"]
        // add_a.setAttribute("onclick", "create_table(" + JSON.stringify(param) + ")")
        add_a.setAttribute("onclick", "create_table(" + i + ")")

        add_a.appendChild(document.createTextNode(i + 1 + "번"))
        add_li.appendChild(add_a);

        mapleid_ul.appendChild(add_li);
    }
}

var select_maple_id = 0
function set_worldid_dropdown() {
    worldid_dropdown.removeAttribute("disabled");
    var i;
    console.log(world_length);

    for (i = 0; i < world_length; i++) {
        console.log(i + 1 + "번")
        let add_li = document.createElement("li")
        let add_a = document.createElement("a")
        add_a.setAttribute("class", "dropdown-item")
        // var param = call_api_data["account_list"][select_maple_id]["character_list"]
        // select_world = i
        // add_a.setAttribute("onclick", "create_table(" + JSON.stringify(param) + ")")
        add_a.setAttribute("onclick", "create_table(" + i + ")")

        add_a.appendChild(document.createTextNode(world_list[i]))
        add_li.appendChild(add_a);

        worldid_ul.appendChild(add_li);
    }
}