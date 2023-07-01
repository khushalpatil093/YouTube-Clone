const baseUrl = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyBlG4b5kcbwtTA8w2Xk_hq2S4GoukJA5Mw";

const container = document.getElementById("video-container");

async function getVideos(q) {
    const url = `${baseUrl}/search?key=${API_KEY}&part=snippet&q=${q}&type=videos&maxResults=20`;
    const response = await fetch(url);
    const data = await response.json();

    const videos = data.items;
    getVideoData(videos);
}

async function getVideoData(videos) {
    let videoData = [];
    for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const videoId = video.id.videoId;
        videoData.push(await getVideoDetails(videoId));
    }
    console.log(videoData);
    renderVideos(videoData);
}

async function getVideoDetails(videoId) {
    const url = `${baseUrl}/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=video_id(videoId)`;
    const response = await fetch(url);
    const data = await response.json();

    return data.items[0];
}


function renderVideos(videos) {

    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML=``;

    for(let i=0; i<videos.length; ++i) {
        const video = videos[i];
        videoContainer.innerHTML += `
                <div class="vd" onclick="openVideoDetails('${video.id}')">
                    <img src="${video.snippet.thumbnails.high.url}" />
                </div>
                <div class="video-item">
                    <div class="image">
                        <img src="./Assets/aside-images/User-Avatar.svg"/>
                    </div>
                    <div class="video">
                        <div>
                            <p style="font-size: 18px;">${video.snippet.localized.title}</p>
                        </div>
                        <div><p>Lorem ipsum dolor sit amet</p></div>
                        <div class="video-watch">
                            <p>15k views</p>
                            <p>1 week ago</p>
                        </div>
                    </div>
                </div>
                `;
    }
}

function openVideoDetails(videoId) {
    localStorage.setItem("videoId", videoId);
    window.open("/videoDetails.html");
}

getVideos("");

