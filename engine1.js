let currentIndex = 2;  // Start with the last file (e.g., 00000003.md)
    const totalFiles = 2;  // Adjust this based on the number of markdown files you have
    const folderPath = '/microblogs/';

    function loadMarkdown(index) {
        const filePath = `${folderPath}${String(index).padStart(8, '0')}.md`;

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