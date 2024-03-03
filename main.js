const loadForum = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const data = await res.json();
    const forumPosts = data.posts;
    loadingDisplay(true);
    setTimeout(() => {
        displayForumPost(forumPosts);
    }, 2000)

}



const displayForumPost = (forumPosts) => {

    const forumContainer = document.getElementById("forumContainer");
    forumContainer.innerHTML = "";
    const markReadCount = document.getElementById("markReadCount");
    markReadCount.innerText = 0;
    const forumReadContainerField = document.getElementById("forumReadContainer ");
    forumReadContainerField.innerHTML = "";
    let count = 0;
    forumPosts.forEach(post => {
        const singleForum = document.createElement("div");
        singleForum.classList.add("bg-slate-200", "p-6", "flex", "gap-4", "rounded-xl");
        singleForum.setAttribute("id", `singleForum${count}`)
        const title = post.title.replace(/'/g, "@");
        if (post.isActive === true) {
            singleForum.innerHTML = `
                    <div>
                        <div class="avatar indicator">
                            <span class="indicator-item badge badge-secondary border-white bg-green-500"></span>
                            <div class="w-20 h-20 rounded-lg">
                                <img alt="Tailwind CSS examples"
                                    src="${post.image}" />
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <p><span>#${post.category}</span><span class="ml-4 lg:ml-10">Author: ${post.author.name}</span></p>
                        <h4 class="text-2xl font-extrabold colorText my-4">${post.title}
                        </h4>
                        <p class="text-[#12132d9d] border-b-2 border-[#12132d9d] border-dashed pb-4">${post.description}</p>
                        <div class="mt-4 flex justify-between items-center">
                            <div>
                                <p class="text-[#12132d9d]">
                                    <span class="mr-3 lg:mr-5"><i class="fa-regular fa-message mr-2 lg:mr-4"></i>${post.comment_count}</span>
                                    <span class="mr-3 lg:mr-5"><i class="fa-regular fa-eye mr-2 lg:mr-4"></i>${post.view_count}</span>
                                    <span class="mr-3 lg:mr-5"><i class="fa-regular fa-clock mr-2 lg:mr-4"></i>${post.posted_time} min</span>
                                </p>
                            </div>
                            <div>
                               <button onclick="markRead('${title}','${post.view_count}')"> <i class="fa-regular fa-envelope-open bg-green-600 p-2 rounded-[100%] text-white"></i></button>
                            </div>
                        </div>
                    </div>
`
        }
        else {
            singleForum.innerHTML = `
                    <div>
                        <div class="avatar indicator">
                            <span class="indicator-item badge badge-secondary border-white bg-red-500"></span>
                            <div class="w-20 h-20 rounded-lg">
                                <img alt="Tailwind CSS examples"
                                    src="${post.image}" />
                            </div>
                        </div>
                    </div>
                    <div class="w-full">
                        <p><span># ${post.category}</span><span class="ml-10">Author : ${post.author.name}</span></p>
                        <h4 class="text-2xl font-extrabold colorText my-4">${post.title}
                        </h4>
                        <p class="text-[#12132d9d] border-b-2 border-[#12132d9d] border-dashed pb-4">${post.description}</p>
                        <div class="mt-4 flex justify-between items-center">
                            <div>
                                <p class="text-[#12132d9d]">
                                    <span class="mr-3 lg:mr-5"><i class="fa-regular fa-message mr-2 lg:mr-4"></i>${post.comment_count}</span>
                                    <span class="mr-3 lg:mr-5"><i class="fa-regular fa-eye mr-2 lg:mr-4"></i>${post.view_count}</span>
                                    <span class="mr-3 lg:mr-5"><i class="fa-regular fa-clock mr-2 lg:mr-4"></i>${post.posted_time} min</span>
                                </p>
                            </div>
                            <div>
                            <button onclick="markRead('${title}','${post.view_count}')"> <i class="fa-regular fa-envelope-open bg-green-600 p-2 rounded-[100%] text-white"></i></button>
                            </div>
                        </div>
                    </div>
`
        }
        console.log(post.title, post.view_count);
        forumContainer.appendChild(singleForum);
        count++;
    });

    loadingDisplay(false);
    const forum = document.getElementById("singleForum0");
    forum.classList.add("border-2", "border-slate-500", "bg-slate-300")

}


const markRead = (postTitle, postViewCount) => {
    postTitle = postTitle.replace(/@/g, "'")

    const markReadCount = document.getElementById("markReadCount");
    let markReadCountValue = markReadCount.innerText;
    markReadCountValue++;
    const forumReadContainerField = document.getElementById("forumReadContainer ")

    const singleForumRead = document.createElement("div");
    singleForumRead.classList.add("flex", "justify-between", "p-4", "bg-white", "rounded-xl", "mt-5");
    singleForumRead.innerHTML = `
    <div>${postTitle}</div>
                        <div class="flex items-center">
                            <i class="fa-solid fa-eye mr-4"></i>
                            <p>${postViewCount}</p>
                        </div>
    `
    forumReadContainerField.appendChild(singleForumRead);
    markReadCount.innerText = markReadCountValue;
}



const latestPost = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const data = await res.json();
    const latestPosts = data;
    displayLatestPost(latestPosts);
}



const displayLatestPost = (latestPosts) => {
    const latestPostContainer = document.getElementById("latestPostContainer");
    latestPosts.forEach(post => {
        console.log(post);

        const singlePost = document.createElement("div");
        singlePost.classList.add("card", "bg-base-100", "shadow-xl", "border-2");
        let postDate, designationName;
        if (post.author.posted_date) {
            postDate = post.author.posted_date;
        }
        else {
            postDate = "No publish date";
        }

        if (post.author.designation) {
            designationName = post.author.designation;
        }
        else {
            designationName = "Unknown"
        }

        singlePost.innerHTML = `
        <figure class="px-8 pt-8">
                    <img src="${post.cover_image}" alt="post"
                        class="rounded-xl" />
                </figure>
                <div class="card-body">
                    <p class="text-[#12132d9a]"><i class="fa-regular fa-calendar mr-4"></i><span>${postDate}</span></p>
                    <h2 class="card-title font-bold my-2">${post.title}</h2>
                    <p class="text-[#12132d9a]">${post.description}</p>
                    <div class="my-2 flex gap-4 items-center">
                        <div>
                            <img src="${post.profile_image}" alt="" class="rounded-[100%] w-9 h-9">
                        </div>
                        <div>
                            <h4 class="font-bold">${post.author.name}</h4>
                            <h3 class="text-[#12132d9a]">${designationName}</h3>
                        </div>
                    </div>
                </div>
        `

        latestPostContainer.appendChild(singlePost);
    });
}



const searchBtn = async () => {
    const inputFieldValue = document.getElementById("inputField").value;
    const inputValue = inputFieldValue.toLowerCase();
    console.log(inputValue);
    if (inputValue === "comedy" || inputValue === "music" || inputValue === "coding") {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputFieldValue}`);
        const data = await res.json();
        const forumPost = data.posts;
        const forumContainer = document.getElementById("forumContainer");
        forumContainer.innerHTML = "";
        loadingDisplay(true);
        setTimeout(() => {
            displayForumPost(forumPost);
        }, 2000);
    }
    else {
        window.alert("Please search the correct category");
        loadForum();
    }

}


const loadingDisplay = (isDisplay) => {
    const loadingSection = document.getElementById("loadingSection");

    if (isDisplay === true) {
        loadingSection.classList.remove("hidden");
        console.log(isDisplay);
    } else {
        loadingSection.classList.add("hidden");
        console.log(isDisplay);
    }


}

loadForum();
latestPost();