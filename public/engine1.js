const baseURL = 'https://microblog-e0839.web.app/microblogs/';

    const folderPath = '/microblogs/';

    function loadPost(index) {
        console.log(`trying to load  post ${index}`)
        if (index <0 || index > totalFiles) {
            index = totalFiles
        }
        /* I'm going to guess that
        ```
        python3 -m http.server
        ```
        does not allow the parent directory or a random path to be served?
        
        const filePath = `./life.md` // that's ok

        const filePath = `../death.md` // is correctly a network error.

        */
        
        // console.log(`prod = prod`)
        var filePath = ""
        if (prod) {
            filePath = `${baseURL}${String(index).padStart(8, '0')}.md`;
        } else {
            filePath = `${folderPath}${String(index).padStart(8, '0')}.md`;
        }
        //console.log(filePath)
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdown => {
                document.getElementById('markdown-content').innerHTML = marked.parse(markdown);
                updateButtons()
            })
            .catch(error => {
                console.error('Error fetching markdown file:', error);
            });
    }

    function pushHash(index) {
        let state = `/post/${index}`
        console.log(`pushing or repushing hash ${state}`)
        window.location.hash = state;
    }
    
    function hashChange() {
        let postId = getHashState();
        console.log(`hash changed - postId is ${postId} in hashchange`)
        currentIndex = postId
        loadPost(postId);
    }
    
    function getHashState() {
        // console.log("checking hash state")
        const hash = window.location.hash
        if (hash.startsWith('#/post/')) {
            // console.log("have hash state")
            const postId = hash.split('/')[2];
            // console.log(`postId is ${postId}`)
            return postId;
        } else {
            // console.log("no hash state")
        }
    }

    
    function updateButtons() {
        document.getElementById('next-button').disabled = currentIndex <= 1;
        document.getElementById('back-button').disabled = currentIndex >= totalFiles;
    }

    document.getElementById('next-button').addEventListener('click', () => {
        if (currentIndex > 1) {
            currentIndex--;
            pushHash(currentIndex)
        }
    });

    document.getElementById('back-button').addEventListener('click', () => {
        if (currentIndex < totalFiles) {
            currentIndex++;
            pushHash(currentIndex)
        }
    });

    console.log("adding hash change listener")
    window.addEventListener('hashchange', hashChange)

    // Load the last markdown file on page load
    let index = getHashState()
    if (index === undefined) {
        console.log("It looks like we tried to load the blog root.")
        pushHash(currentIndex)
    } else {
        console.log(`it looks like we tried to load a specfic page index is ${index}`)
        currentIndex = index
        loadPost(currentIndex)
    }
    
//    loadPost(currentIndex);
