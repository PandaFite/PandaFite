/*
    status.js
    Copyright (C) Matt Jones - All Rights Reserved
*/
ytDisplay();
$.ajax({
    type: 'GET',
    url: 'https://api.twitch.tv/kraken/streams/' + username,
    headers: {
    'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
    },
    success: function(data) {
        console.log(data);
        if (data.stream) {
            online();
        }
        else {
            $.ajax({
                type: 'GET',
                url: 'https://cors-anywhere.herokuapp.com/https://tmi.twitch.tv/hosts?include_logins=1&host=' + userId,
                success: function(data) {
                    console.log(data);
                    if (data.hosts[0].target_login == null) {
                    streamOffline();
                }
                else {
                    var hostee = data.hosts[0].target_login;
                    $("#player").attr("src", "https://player.twitch.tv/?channel=" + hostee +"&autoplay=false")
                    $("#openApp").attr("href", "twitch://open?stream=" + hostee)

                    //get title, viewers, game, etc from hosted streamer
                    function getHostInfo() {
                        $.ajax({
                            type: 'GET',
                            url: 'https://api.twitch.tv/kraken/streams/' + data.hosts[0].target_login,
                            headers: {
                                'Client-ID': 'f2cmg4s30fnzmq7zbcx8rcsfxdc1san'
                            },
                            success: function(data) {
                                console.log(data);
                                if (data.stream) {
                                    $("#title").text("Panda is currently hosting " + data.stream.channel.display_name);
                                    $("#streaminfo").text(data.stream.channel.status);
                                    chatSrc = "https://www.twitch.tv/" + data.stream.channel.name + "/chat";
                                }
                                else streamOffline();
                            }
                        });


                    }
                    //auto update 10s interval
                    getHostInfo();
                    setInterval(getHostInfo,10000);

                }
                },
                error: function() {
                    playerError();
                }
            });
        }
    },
    error: function() {
        playerError();
    }
});
