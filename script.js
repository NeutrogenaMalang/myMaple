var data_load = document.getElementById('data_load');
var mytable = document.getElementById('mytable');

$(document).ready(function () {
    // const Url = 'https://jsonplaceholder.typicode.com/posts';
    $(data_load).click(function () {
        $.ajax({
            url: 'https://open.api.nexon.com/maplestory/v1/character/list',
            dataType: "json",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("accept", "application/json")
                xhr.setRequestHeader("x-nxopen-api-key", apikey)
            }, success: function (data) {
                // console.log(data['account_list'][0]['character_list']);
                // var json = data['account_list'][0]['character_list'];
                // let character_class = new Array();
                // let character_level = new Array();
                // let character_name = new Array();
                // let ocid = new Array();
                // let world_name = new Array();
                // for (i = 0; i < json.length; i++) {
                //     character_class[i] = json[i].character_class;
                //     character_level[i] = json[i].character_level;
                //     character_name[i] = json[i].character_name;
                //     ocid[i] = json[i].ocid;
                //     world_name[i] = json[i].world_name;
                // }
                // let table = document.getElementById('mytable');

                let table = new DataTable("#mytable", {
                    data: data['account_list'][0]['character_list'],
                    pageLength: 100,
                    searching: true,
                    columns: [
                        { "data": "world_name" },
                        { "data": "character_level" },
                        { "data": "character_class" },
                        { "data": "character_name" },
                        { "data": "ocid" }
                    ]
                })

                table.on('click', 'tbody tr', function () {
                    let data = table.row(this).data();
                    // console.log(table.row(this));
                    console.log(table.row(this).data());
                    // console.log(table.row(this).data(0));
                    console.log(table.row(this).data()["ocid"]);

                    alert('You clicked on ' + data["ocid"] + "'s row");
                });

                // for (i = 0; i < ocid.length; i++) {
                //     let tr = document.createElement("tr");

                //     let td1 = document.createElement("td");
                //     td1.appendChild(document.createTextNode(character_class[i] + ""));

                //     let td2 = document.createElement("td");
                //     td2.appendChild(document.createTextNode(character_level[i] + ""));

                //     let td3 = document.createElement("td");
                //     td3.appendChild(document.createTextNode(character_name[i] + ""));

                //     let td4 = document.createElement("td");
                //     td3.appendChild(document.createTextNode(ocid[i] + ""));

                //     let td5 = document.createElement("td");
                //     td3.appendChild(document.createTextNode(world_name[i] + ""));

                //     tr.appendChild(td1);
                //     tr.appendChild(td2);
                //     tr.appendChild(td3);
                //     tr.appendChild(td4);
                //     tr.appendChild(td5);

                //     table.appendChild(tr);
                // }
            }
        })
    })
})