const baseUrl = "https://www.googleapis.com/youtube/v3";
const API_KEY = "AIzaSyBlG4b5kcbwtTA8w2Xk_hq2S4GoukJA5Mw";


const video_container = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");
const comments_Container = document.getElementById("comments");

video_container.src = `https://www.youtube.com/embed/${videoId}`

async function getComments() {
    const url = `${baseUrl}/commentThreads?key=${API_KEY}&videoId=${videoId}&maxResults=80&order=time&part=snippet`;
    const response = await fetch(url, {
        method: "get",
    });
    const data = await response.json();

    const comments = data.items;
    renderComments()
}

function renderComments(comments) {
    comments_Container.innerHTML = "";
    comments.forEach((comment) => {
        comments_Container.innerHTML += `

        `;
    });
}

getComments();