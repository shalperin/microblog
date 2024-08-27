const baseURL = 'https://shalperin.github.io/microblog/microblogs/';

    const folderPath = '/microblogs/';

    function loadMarkdown(index) {
        /* I'm going to guess that
        ```
        python3 -m http.server
        ```
        does not allow the parent directory or a random path to be served?
        
        const filePath = `./life.md` // that's ok

        const filePath = `../death.md` // is correctly a network error.

        */

        console.log(prod)
        var filePath = ""
        if (prod) {
            filePath = `${baseURL}${String(index).padStart(8, '0')}.md`;
        } else {
            filePath = `${folderPath}${String(index).padStart(8, '0')}.md`;
        }
        console.log(filePath)
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdown => {
                document.getElementById('markdown-content').innerHTML = marked.parse(markdown);
                updateButtons();
            })
            .catch(error => {
                console.error('Error fetching markdown file:', error);
            });
    }

    function updateButtons() {
        document.getElementById('next-button').disabled = currentIndex <= 1;
        document.getElementById('back-button').disabled = currentIndex >= totalFiles;
    }

    document.getElementById('next-button').addEventListener('click', () => {
        if (currentIndex > 1) {
            currentIndex--;
            loadMarkdown(currentIndex);
        }
    });

    document.getElementById('back-button').addEventListener('click', () => {
        if (currentIndex < totalFiles) {
            currentIndex++;
            loadMarkdown(currentIndex);
        }
    });

    // Load the last markdown file on page load
    loadMarkdown(currentIndex);