document.querySelector('.octicon-three-bars').addEventListener('click' , (e) => {
    if(document.querySelector('.search_wrapper').classList.contains('show-mobile-nav-list')) {
        document.querySelector('.search_wrapper').classList.remove('show-mobile-nav-list')
    }else {
        document.querySelector('.search_wrapper').classList.add('show-mobile-nav-list')
    }
    if(document.querySelector('.nav_menu_wrapper').classList.contains('show-mobile-nav-list')) {
        document.querySelector('.nav_menu_wrapper').classList.remove('show-mobile-nav-list')
    }else {
        document.querySelector('.nav_menu_wrapper').classList.add('show-mobile-nav-list')
    }
})
const github_data = {
    "token": "6f4083f401a13323f30a7aa02545d28f15c48aad",
    "username": 'EBEN4REAL'
}
const baseUrl = "https://api.github.com/graphql";

const headers = {
    "Content-Type" : "application/json",
    Authorization: "bearer " + "4a38338ca35453f47f75d99fb41b6d662120a8e0"
}


const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " year ago" : " years ago");
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " month ago" : " months ago");
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " day ago" : " days ago");
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " hour ago" : " hours ago");
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + (Math.floor(interval) == 1 ? " minute ago" : " minutes ago");
    }
    return Math.floor(seconds) + (Math.floor(interval) == 1 ? " second ago" : " seconds ago");
}

fetch(baseUrl, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
        query: `
            query {
                viewer {
                    avatarUrl
                    bio
                    name
                    repositories(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
                            pageInfo {
                                hasNextPage
                                endCursor
                            }
                            nodes {
                            name
                            url
                            updatedAt
                            isPrivate
                            owner {
                                login
                            }
                            defaultBranchRef {
                                name
                            }
                            primaryLanguage {
                                name
                                color
                            }
                            stargazerCount
                            forkCount
                            descriptionHTML
                            description
                        }
                        totalCount
                    }
                }
            } 
             
        `
    })
})
.then(res => res.json())
.then(res => {
    let avatarUrl = res.data.viewer.avatarUrl
    let bio =  res.data.viewer.bio
    document.querySelector('.profile_name').textContent =  res.data.viewer.name
    document.querySelector('.totalCount').textContent =  res.data.viewer.repositories.totalCount
    Array.from(document.querySelectorAll('.name')).forEach(el => {
        el.innerHTML = res.data.viewer.name
    })
    Array.from(document.querySelectorAll('.bio')).forEach(el => {
        el.textContent = bio
    })
    Array.from(document.querySelectorAll('.dp_img')).forEach(el => {
        el.src = avatarUrl
    })
    document.querySelector('.dp_img').src = avatarUrl
    let count = 0;
    let publicReposCount = res.data.viewer.repositories.nodes.filter(el => !el.isPrivate).length
    document.querySelector('.publicReposCount').textContent = publicReposCount;
    res.data.viewer.repositories.nodes.forEach(el => {
        count++;
        let child = `
        <div class="repo_list_wrapper">
            <div class="repo_list">
                <div class="repo_info">
                    <a class="repo_name" href="${el.url}">
                        ${el.name}
                    </a>
                    <div class="repo_info_content">
                        <div class="content_info">
                            <span class="repo-language-color" style="background: ${el.primaryLanguage.color}"></span><span> ${el.primaryLanguage.name}</span>
                        </div>
                    <div class="content_info null">
                            <span class="repo_info_svg_parent">
                                <svg class="octicon octicon-star mr-1 repo_info_svg" fill="#959da5" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                            </span><span class="tab_name_span"> ${el.stargazerCount}</span> 
                    </div>
                    <div class="content_info null">
                            <span class="repo_info_svg_parent">
                                <svg aria-label="fork" class="octicon octicon-repo-forked repo_info_svg" fill="#959da5" viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img"><path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path></svg>
                            </span><span class="tab_name_span"> ${el.forkCount}</span>
                    </div>
                        <div class="content_info">
                            <span>Updated ${timeSince(new Date(el.updatedAt))}</span>
                        </div>
                        
                    </div>
                </div>
                <div class="">
                    <button class="star_repo">
                        <svg class="octicon octicon-star mr-1 " fill="#959da5" viewBox="0 0 16 16" style="margin-right: 5px" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>
                        Star
                    </button>
                </div>
            </div>
        </div>
        `;
        document.querySelector('.repo_list_container').insertAdjacentHTML('afterend' , child)
    });
   
})
.catch(err => {
})
