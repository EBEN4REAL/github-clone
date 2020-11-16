const github_data = {
    "token": "e5db3875cf781acd309c54fd5fe20f22afc9862b",
    "username": 'EBEN4REAL'
}


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

const body = {
    "query": `
        user(login: ${github_data["username"]}) {
            issues(first: 10, orderBy: {field: CREATED_AT, direction: DESC}) {
                nodes {
                    title,
                    body,
                    closedAt
                }
            }
        }
    `
}

const baseUrl = "https://api.github.com/graphql";

const headers = {
    "Content-Type" : "application/json",
    Authentication: "bearer " + github_data["token"]
}
fetch(baseUrl, {
    method: "GET",
    headers: headers,
    body: JSON.stringify(body)
}).then(res => {
    console.log(JSON.stringify(res))
}).catch(err => {
    console.log(JSON.stringify(err))
})

